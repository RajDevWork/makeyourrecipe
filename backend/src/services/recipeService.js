const Recipe = require('../models/Recipe');
const Category = require('../models/Category');
const User = require('../models/User');
const Like = require('../models/Like');
const Bookmark = require('../models/Bookmark');
const Comment = require('../models/Comment');
const { redisClient } = require('../config/redis');
const cloudinary = require('../config/cloudinary');
const AppError = require('../utils/AppError');
const { slugify } = require('../utils/helpers');

class RecipeService {
  // Create new recipe
  static async createRecipe(recipeData, files, userId) {
    try {
      const recipe = new Recipe({
        ...recipeData,
        author: userId,
        seo: {
          slug: slugify(recipeData.title),
          metaTitle: recipeData.title,
          metaDescription: recipeData.description.substring(0, 160)
        }
      });

      // Upload images to Cloudinary
      if (files && files.length > 0) {
        const uploadedImages = await Promise.all(
          files.map(async (file) => {
            const result = await cloudinary.uploader.upload(file.path, {
              folder: 'recipes',
              transformation: [
                { width: 800, height: 600, crop: 'limit' },
                { quality: 'auto' }
              ]
            });
            return result.secure_url;
          })
        );
        recipe.images = uploadedImages;
      }

      await recipe.save();

      // Update category recipe count
      await Category.findByIdAndUpdate(recipe.category, {
        $inc: { recipeCount: 1 }
      });

      // Update user's recipe count
      await User.findByIdAndUpdate(userId, {
        $inc: { 'stats.totalRecipes': 1 }
      });

      // Clear relevant caches
      await this.clearRecipeCaches();

      return recipe;
    } catch (error) {
      throw error;
    }
  }

  // Get recipe by ID with population
  static async getRecipeById(recipeId, userId = null) {
    try {
      // Check cache first
      const cachedRecipe = await redisClient.get(`recipe_${recipeId}`);
      if (cachedRecipe) {
        return JSON.parse(cachedRecipe);
      }

      const recipe = await Recipe.findById(recipeId)
        .populate('author', 'name email avatar bio stats')
        .populate('category', 'name slug')
        .populate({
          path: 'comments',
          match: { parentComment: null, isDeleted: false },
          populate: {
            path: 'user',
            select: 'name avatar'
          },
          options: { sort: { createdAt: -1 } }
        });

      if (!recipe) {
        throw new AppError('Recipe not found', 404);
      }

      // Increment view count
      await Recipe.findByIdAndUpdate(recipeId, {
        $inc: { 'stats.views': 1 }
      });

      // Check if user has liked or bookmarked
      if (userId) {
        const [isLiked, isBookmarked] = await Promise.all([
          Like.exists({ user: userId, recipe: recipeId }),
          Bookmark.exists({ user: userId, recipe: recipeId })
        ]);
        recipe._doc.isLiked = !!isLiked;
        recipe._doc.isBookmarked = !!isBookmarked;
      }

      // Cache recipe for 1 hour
      await redisClient.set(`recipe_${recipeId}`, 3600, JSON.stringify(recipe));

      return recipe;
    } catch (error) {
      throw error;
    }
  }

  // Update recipe
  static async updateRecipe(recipeId, updateData, files, userId, userRole) {
    try {
      const recipe = await Recipe.findById(recipeId);
      
      if (!recipe) {
        throw new AppError('Recipe not found', 404);
      }

      // Check authorization
      if (recipe.author.toString() !== userId && userRole !== 'admin') {
        throw new AppError('You can only update your own recipes', 403);
      }

      // Update basic fields
      Object.keys(updateData).forEach(key => {
        if (key !== 'imagesToDelete' && key !== 'newImages') {
          recipe[key] = updateData[key];
        }
      });

      // Update SEO slug if title changed
      if (updateData.title && updateData.title !== recipe.title) {
        recipe.seo = {
          slug: slugify(updateData.title),
          metaTitle: updateData.title,
          metaDescription: updateData.description?.substring(0, 160) || recipe.seo.metaDescription
        };
      }

      // Handle image deletion
      if (updateData.imagesToDelete && updateData.imagesToDelete.length > 0) {
        await Promise.all(
          updateData.imagesToDelete.map(async (imageUrl) => {
            // Extract public ID from Cloudinary URL
            const publicId = imageUrl.split('/').slice(-2).join('/').split('.')[0];
            await cloudinary.uploader.destroy(publicId);
          })
        );
        recipe.images = recipe.images.filter(img => !updateData.imagesToDelete.includes(img));
      }

      // Upload new images
      if (files && files.length > 0) {
        const uploadedImages = await Promise.all(
          files.map(async (file) => {
            const result = await cloudinary.uploader.upload(file.path, {
              folder: 'recipes',
              transformation: [
                { width: 800, height: 600, crop: 'limit' },
                { quality: 'auto' }
              ]
            });
            return result.secure_url;
          })
        );
        recipe.images.push(...uploadedImages);
      }

      await recipe.save();

      // Clear caches
      await this.clearRecipeCaches(recipeId);

      return recipe;
    } catch (error) {
      throw error;
    }
  }

  // Delete recipe
  static async deleteRecipe(recipeId, userId, userRole) {
    try {
      const recipe = await Recipe.findById(recipeId);
      
      if (!recipe) {
        throw new AppError('Recipe not found', 404);
      }

      // Check authorization
      if (recipe.author.toString() !== userId && userRole !== 'admin') {
        throw new AppError('You can only delete your own recipes', 403);
      }

      // Delete images from Cloudinary
      if (recipe.images && recipe.images.length > 0) {
        await Promise.all(
          recipe.images.map(async (imageUrl) => {
            const publicId = imageUrl.split('/').slice(-2).join('/').split('.')[0];
            await cloudinary.uploader.destroy(publicId);
          })
        );
      }

      // Delete associated data
      await Promise.all([
        Like.deleteMany({ recipe: recipeId }),
        Bookmark.deleteMany({ recipe: recipeId }),
        Comment.deleteMany({ recipe: recipeId })
      ]);

      await recipe.deleteOne();

      // Update category recipe count
      await Category.findByIdAndUpdate(recipe.category, {
        $inc: { recipeCount: -1 }
      });

      // Update user's recipe count
      await User.findByIdAndUpdate(recipe.author, {
        $inc: { 'stats.totalRecipes': -1 }
      });

      // Clear caches
      await this.clearRecipeCaches(recipeId);

      return { success: true };
    } catch (error) {
      throw error;
    }
  }

  // Get all recipes with filters and pagination
  static async getAllRecipes(filters, pagination, userId = null) {
    try {
      const { page = 1, limit = 10, sort = '-createdAt' } = pagination;
      const {
        category,
        difficulty,
        cookingTime,
        search,
        tags,
        author,
        status = 'published'
      } = filters;

      const query = { status };
      
      if (category) query.category = category;
      if (difficulty) query.difficulty = difficulty;
      if (author) query.author = author;
      
      if (tags && tags.length > 0) {
        query.tags = { $in: tags };
      }
      
      if (cookingTime) {
        const [min, max] = cookingTime.split('-');
        query['cookingTime.total'] = {};
        if (min) query['cookingTime.total'].$gte = parseInt(min);
        if (max) query['cookingTime.total'].$lte = parseInt(max);
      }

      if (search) {
        query.$text = { $search: search };
      }

      const skip = (page - 1) * limit;
      
      const [recipes, total] = await Promise.all([
        Recipe.find(query)
          .populate('author', 'name avatar')
          .populate('category', 'name slug')
          .sort(sort)
          .skip(skip)
          .limit(parseInt(limit)),
        Recipe.countDocuments(query)
      ]);

      // Check if user has liked/bookmarked recipes
      if (userId && recipes.length > 0) {
        const recipeIds = recipes.map(r => r._id);
        const [likes, bookmarks] = await Promise.all([
          Like.find({ user: userId, recipe: { $in: recipeIds } }),
          Bookmark.find({ user: userId, recipe: { $in: recipeIds } })
        ]);

        const likedSet = new Set(likes.map(l => l.recipe.toString()));
        const bookmarkedSet = new Set(bookmarks.map(b => b.recipe.toString()));

        recipes.forEach(recipe => {
          recipe._doc.isLiked = likedSet.has(recipe._id.toString());
          recipe._doc.isBookmarked = bookmarkedSet.has(recipe._id.toString());
        });
      }

      return {
        data: recipes,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw error;
    }
  }

  // Get trending recipes
  static async getTrendingRecipes(limit = 10) {
    try {
      // Check cache
      const cached = await redisClient.get('trending_recipes');
      if (cached) {
        return JSON.parse(cached);
      }

      const recipes = await Recipe.find({ status: 'published' })
        .sort({ 'stats.views': -1, 'stats.likes': -1, createdAt: -1 })
        .limit(limit)
        .populate('author', 'name avatar')
        .populate('category', 'name');

      // Cache for 1 hour
      await redisClient.set('trending_recipes', 3600, JSON.stringify(recipes));

      return recipes;
    } catch (error) {
      throw error;
    }
  }

  // Get featured recipes
  static async getFeaturedRecipes(limit = 6) {
    try {
      // Check cache
      const cached = await redisClient.get('featured_recipes');
      if (cached) {
        return JSON.parse(cached);
      }

      const recipes = await Recipe.find({ status: 'published' })
        .sort({ 'stats.likes': -1, createdAt: -1 })
        .limit(limit)
        .populate('author', 'name avatar')
        .populate('category', 'name');

      // Cache for 1 hour
      await redisClient.set('featured_recipes', 3600, JSON.stringify(recipes));

      return recipes;
    } catch (error) {
      throw error;
    }
  }

  // Like/unlike recipe
  static async toggleLike(recipeId, userId) {
    try {
      const existingLike = await Like.findOne({ user: userId, recipe: recipeId });
      
      if (existingLike) {
        await existingLike.deleteOne();
        await Recipe.findByIdAndUpdate(recipeId, { $inc: { 'stats.likes': -1 } });
        await User.findByIdAndUpdate(userId, { $inc: { 'stats.totalLikes': -1 } });
        return { liked: false };
      } else {
        await Like.create({ user: userId, recipe: recipeId });
        await Recipe.findByIdAndUpdate(recipeId, { $inc: { 'stats.likes': 1 } });
        await User.findByIdAndUpdate(userId, { $inc: { 'stats.totalLikes': 1 } });
        return { liked: true };
      }
    } catch (error) {
      throw error;
    }
  }

  // Bookmark/unbookmark recipe
  static async toggleBookmark(recipeId, userId, note = null) {
    try {
      const existingBookmark = await Bookmark.findOne({ user: userId, recipe: recipeId });
      
      if (existingBookmark) {
        await existingBookmark.deleteOne();
        await Recipe.findByIdAndUpdate(recipeId, { $inc: { 'stats.saves': -1 } });
        return { bookmarked: false };
      } else {
        await Bookmark.create({ user: userId, recipe: recipeId, note });
        await Recipe.findByIdAndUpdate(recipeId, { $inc: { 'stats.saves': 1 } });
        return { bookmarked: true };
      }
    } catch (error) {
      throw error;
    }
  }

  // Add comment to recipe
  static async addComment(recipeId, userId, content, parentComment = null) {
    try {
      const comment = await Comment.create({
        content,
        user: userId,
        recipe: recipeId,
        parentComment
      });

      const populatedComment = await Comment.findById(comment._id)
        .populate('user', 'name avatar');

      // Update recipe comment count
      await Recipe.findByIdAndUpdate(recipeId, {
        $inc: { 'stats.comments': 1 }
      });

      return populatedComment;
    } catch (error) {
      throw error;
    }
  }

  // Get comments for recipe
  static async getRecipeComments(recipeId, page = 1, limit = 20) {
    try {
      const skip = (page - 1) * limit;
      
      const [comments, total] = await Promise.all([
        Comment.find({ recipe: recipeId, parentComment: null, isDeleted: false })
          .populate('user', 'name avatar')
          .populate({
            path: 'replies',
            match: { isDeleted: false },
            populate: {
              path: 'user',
              select: 'name avatar'
            }
          })
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(parseInt(limit)),
        Comment.countDocuments({ recipe: recipeId, parentComment: null, isDeleted: false })
      ]);

      return {
        data: comments,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw error;
    }
  }

  // Search recipes
  static async searchRecipes(searchTerm, filters = {}, pagination = {}) {
    try {
      const { page = 1, limit = 20 } = pagination;
      const query = {
        status: 'published',
        $text: { $search: searchTerm }
      };

      if (filters.category) query.category = filters.category;
      if (filters.difficulty) query.difficulty = filters.difficulty;
      if (filters.tags && filters.tags.length) query.tags = { $in: filters.tags };

      const skip = (page - 1) * limit;
      
      const [recipes, total] = await Promise.all([
        Recipe.find(query)
          .populate('author', 'name avatar')
          .populate('category', 'name')
          .sort({ score: { $meta: 'textScore' } })
          .skip(skip)
          .limit(parseInt(limit)),
        Recipe.countDocuments(query)
      ]);

      return {
        data: recipes,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw error;
    }
  }

  // Get similar recipes
  static async getSimilarRecipes(recipeId, limit = 5) {
    try {
      const recipe = await Recipe.findById(recipeId);
      if (!recipe) {
        throw new AppError('Recipe not found', 404);
      }

      const similarRecipes = await Recipe.find({
        _id: { $ne: recipeId },
        status: 'published',
        $or: [
          { category: recipe.category },
          { tags: { $in: recipe.tags } }
        ]
      })
        .limit(limit)
        .populate('author', 'name avatar')
        .populate('category', 'name');

      return similarRecipes;
    } catch (error) {
      throw error;
    }
  }

  // Get recipe analytics for author
  static async getRecipeAnalytics(recipeId, userId) {
    try {
      const recipe = await Recipe.findById(recipeId);
      
      if (!recipe) {
        throw new AppError('Recipe not found', 404);
      }

      if (recipe.author.toString() !== userId) {
        throw new AppError('You can only view analytics for your own recipes', 403);
      }

      // Get weekly views
      const weeklyViews = await Recipe.aggregate([
        { $match: { _id: recipe._id } },
        { $unwind: '$views' },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$views.date' } },
            count: { $sum: '$views.count' }
          }
        },
        { $sort: { _id: -1 } },
        { $limit: 7 }
      ]);

      return {
        views: recipe.stats.views,
        likes: recipe.stats.likes,
        saves: recipe.stats.saves,
        shares: recipe.stats.shares,
        comments: recipe.stats.comments || 0,
        weeklyViews: weeklyViews.reverse()
      };
    } catch (error) {
      throw error;
    }
  }

  // Clear recipe-related caches
  static async clearRecipeCaches(recipeId = null) {
    try {
      const keys = [
        'trending_recipes',
        'featured_recipes',
        'homepage_recipes',
        'popular_recipes'
      ];
      
      if (recipeId) {
        keys.push(`recipe_${recipeId}`);
      }
      
      await Promise.all(keys.map(key => redisClient.del(key)));
    } catch (error) {
      console.error('Error clearing caches:', error);
    }
  }

  // Bulk update recipe status (admin)
  static async bulkUpdateStatus(recipeIds, status) {
    try {
      await Recipe.updateMany(
        { _id: { $in: recipeIds } },
        { status }
      );
      
      // Clear caches
      await this.clearRecipeCaches();
      
      return { success: true, count: recipeIds.length };
    } catch (error) {
      throw error;
    }
  }

  // Get recipe statistics for admin dashboard
  static async getRecipeStatistics() {
    try {
      const [
        totalRecipes,
        publishedRecipes,
        draftRecipes,
        totalViews,
        totalLikes
      ] = await Promise.all([
        Recipe.countDocuments(),
        Recipe.countDocuments({ status: 'published' }),
        Recipe.countDocuments({ status: 'draft' }),
        Recipe.aggregate([
          { $group: { _id: null, total: { $sum: '$stats.views' } } }
        ]),
        Recipe.aggregate([
          { $group: { _id: null, total: { $sum: '$stats.likes' } } }
        ])
      ]);

      return {
        totalRecipes,
        publishedRecipes,
        draftRecipes,
        totalViews: totalViews[0]?.total || 0,
        totalLikes: totalLikes[0]?.total || 0
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = RecipeService;
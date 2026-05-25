const Recipe = require('../models/Recipe');
const Like = require('../models/Like');
const Bookmark = require('../models/Bookmark');
const Comment = require('../models/Comment');
const Category = require('../models/Category');
const AppError = require('../utils/AppError');
const { redisClient } = require('../config/redis');
const cloudinary = require('../config/cloudinary');
const { createNotification } = require('../services/notificationService');

const createRecipe = async (req, res, next) => {
  try {
    const recipeData = {
      ...req.body,
      author: req.user._id,
    };

    // Process images
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(file => 
        cloudinary.uploader.upload(file.path, {
          folder: 'recipes',
          transformation: [{ width: 800, height: 600, crop: 'limit' }]
        })
      );
      const uploadedImages = await Promise.all(uploadPromises);
      recipeData.images = uploadedImages.map(img => img.secure_url);
    }

    // Generate SEO slug
    recipeData.seo = {
      slug: req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      metaTitle: req.body.title,
      metaDescription: req.body.description.substring(0, 160),
    };

    const recipe = await Recipe.create(recipeData);

    // Update category recipe count
    await Category.findByIdAndUpdate(recipe.category, {
      $inc: { recipeCount: 1 }
    });

    // Clear cache
    // await redisClient.del('homepage_recipes');
    // await redisClient.del('trending_recipes');

    res.status(201).json({
      success: true,
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
};

const getAllRecipes = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      difficulty,
      cookingTime,
      sort = '-createdAt',
      search,
      tags,
    } = req.query;

    const query = { status: 'published' };

    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (tags) query.tags = { $in: tags.split(',') };
    
    if (cookingTime) {
      const [min, max] = cookingTime.split('-');
      query['cookingTime.total'] = {
        ...(min && { $gte: parseInt(min) }),
        ...(max && { $lte: parseInt(max) }),
      };
    }

    if (search) {
      query.$text = { $search: search };
    }

    const skip = (page - 1) * limit;

    const recipes = await Recipe.find(query)
      .populate('author', 'name avatar')
      .populate('category', 'name')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Recipe.countDocuments(query);

    // Check if user has liked/bookmarked recipes
    if (req.user) {
      const recipeIds = recipes.map(r => r._id);
      const [likes, bookmarks] = await Promise.all([
        Like.find({ user: req.user._id, recipe: { $in: recipeIds } }),
        Bookmark.find({ user: req.user._id, recipe: { $in: recipeIds } }),
      ]);

      const likedSet = new Set(likes.map(l => l.recipe.toString()));
      const bookmarkedSet = new Set(bookmarks.map(b => b.recipe.toString()));

      recipes.forEach(recipe => {
        recipe.isLiked = likedSet.has(recipe._id.toString());
        recipe.isBookmarked = bookmarkedSet.has(recipe._id.toString());
      });
    }

    res.json({
      success: true,
      data: recipes,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

const getRecipeById = async (req, res, next) => {
  try {
    // Fetch recipe with basic population
    const recipe = await Recipe.findById(req.params.id)
      .populate('author', 'name avatar bio stats')
      .populate('category', 'name slug description');

    if (!recipe) {
      return next(new AppError('Recipe not found', 404));
    }

    // Fetch comments separately (without virtual populate)
    const comments = await Comment.find({ 
      recipe: recipe._id, 
      parentComment: null, 
      isDeleted: false 
    })
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 });

    // Fetch replies for comments
    const commentsWithReplies = await Promise.all(
      comments.map(async (comment) => {
        const replies = await Comment.find({ 
          parentComment: comment._id, 
          isDeleted: false 
        })
          .populate('user', 'name avatar')
          .sort({ createdAt: 1 });
        
        return {
          ...comment.toObject(),
          replies
        };
      })
    );

    // Increment view count (don't await to not block response)
    Recipe.findByIdAndUpdate(req.params.id, {
      $inc: { 'stats.views': 1 }
    }).catch(err => console.error('View increment error:', err));

    // Check if user has liked/bookmarked
    if (req.user) {
      const [isLiked, isBookmarked] = await Promise.all([
        Like.exists({ user: req.user._id, recipe: recipe._id }),
        Bookmark.exists({ user: req.user._id, recipe: recipe._id }),
      ]);
      recipe._doc.isLiked = !!isLiked;
      recipe._doc.isBookmarked = !!isBookmarked;
    }

    // Get similar recipes
    const similarRecipes = await Recipe.find({
      category: recipe.category,
      _id: { $ne: recipe._id },
      status: 'published',
    })
      .limit(5)
      .select('title images cookingTime difficulty stats')
      .populate('author', 'name avatar');

    res.json({
      success: true,
      data: recipe,
      comments: commentsWithReplies,
      similar: similarRecipes,
    });
  } catch (error) {
    console.error('Get recipe error:', error);
    next(error);
  }
};

const updateRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return next(new AppError('Recipe not found', 404));
    }

    // Check authorization
    if (recipe.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return next(new AppError('You can only update your own recipes', 403));
    }

    // Process new images
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(file =>
        cloudinary.uploader.upload(file.path, {
          folder: 'recipes',
          transformation: [{ width: 800, height: 600, crop: 'limit' }]
        })
      );
      const uploadedImages = await Promise.all(uploadPromises);
      req.body.images = [...recipe.images, ...uploadedImages.map(img => img.secure_url)];
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    // Clear cache
    // await redisClient.del(`recipe_${req.params.id}`);
    // await redisClient.del('homepage_recipes');
    // await redisClient.del('trending_recipes');

    res.json({
      success: true,
      data: updatedRecipe,
    });
  } catch (error) {
    next(error);
  }
};

const deleteRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return next(new AppError('Recipe not found', 404));
    }

    // Check authorization
    if (recipe.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return next(new AppError('You can only delete your own recipes', 403));
    }

    // Delete images from Cloudinary
    if (recipe.images && recipe.images.length > 0) {
      const publicIds = recipe.images.map(img => {
        const urlParts = img.split('/');
        const filename = urlParts[urlParts.length - 1].split('.')[0];
        return `recipes/${filename}`;
      });
      await Promise.all(publicIds.map(id => cloudinary.uploader.destroy(id)));
    }

    await recipe.deleteOne();

    // Update category count
    await Category.findByIdAndUpdate(recipe.category, {
      $inc: { recipeCount: -1 }
    });

    // Delete associated data
    await Promise.all([
      Like.deleteMany({ recipe: recipe._id }),
      Bookmark.deleteMany({ recipe: recipe._id }),
      Comment.deleteMany({ recipe: recipe._id }),
    ]);

    // Clear cache
    // await redisClient.del(`recipe_${req.params.id}`);
    // await redisClient.del('homepage_recipes');
    // await redisClient.del('trending_recipes');

    res.json({
      success: true,
      message: 'Recipe deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

const likeRecipe = async (req, res, next) => {
  try {
    const recipeId = req.params.id;
    const userId = req.user._id;

    const existingLike = await Like.findOne({ user: userId, recipe: recipeId });

    if (existingLike) {
      await existingLike.deleteOne();
      await Recipe.findByIdAndUpdate(recipeId, { $inc: { 'stats.likes': -1 } });
      res.json({ success: true, liked: false });
    } else {
      await Like.create({ user: userId, recipe: recipeId });
      await Recipe.findByIdAndUpdate(recipeId, { $inc: { 'stats.likes': 1 } });

      // Create notification
      const recipe = await Recipe.findById(recipeId);
      if (recipe.author.toString() !== userId.toString()) {
        await createNotification({
          recipient: recipe.author,
          sender: userId,
          type: 'like',
          message: `${req.user.name} liked your recipe "${recipe.title}"`,
          data: { recipeId: recipe._id },
        });
      }

      res.json({ success: true, liked: true });
    }
  } catch (error) {
    next(error);
  }
};

const bookmarkRecipe = async (req, res, next) => {
  try {
    const recipeId = req.params.id;
    const userId = req.user._id;

    const existingBookmark = await Bookmark.findOne({ user: userId, recipe: recipeId });

    if (existingBookmark) {
      await existingBookmark.deleteOne();
      await Recipe.findByIdAndUpdate(recipeId, { $inc: { 'stats.saves': -1 } });
      res.json({ success: true, bookmarked: false });
    } else {
      await Bookmark.create({ user: userId, recipe: recipeId });
      await Recipe.findByIdAndUpdate(recipeId, { $inc: { 'stats.saves': 1 } });
      res.json({ success: true, bookmarked: true });
    }
  } catch (error) {
    next(error);
  }
};

const addComment = async (req, res, next) => {
  try {
    const comment = await Comment.create({
      content: req.body.content,
      user: req.user._id,
      recipe: req.params.id,
      parentComment: req.body.parentComment || null,
    });

    const populatedComment = await Comment.findById(comment._id)
      .populate('user', 'name avatar');

    // Create notification
    const recipe = await Recipe.findById(req.params.id);
    if (recipe.author.toString() !== req.user._id.toString()) {
      await createNotification({
        recipient: recipe.author,
        sender: req.user._id,
        type: 'comment',
        message: `${req.user.name} commented on your recipe "${recipe.title}"`,
        data: { recipeId: recipe._id, commentId: comment._id },
      });
    }

    res.status(201).json({
      success: true,
      data: populatedComment,
    });
  } catch (error) {
    next(error);
  }
};

const getComments = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get top-level comments (no parent)
    const comments = await Comment.find({
      recipe: req.params.id,
      parentComment: null,
      isDeleted: false
    })
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Get replies for each comment separately (not using populate)
    const commentsWithReplies = await Promise.all(
      comments.map(async (comment) => {
        const replies = await Comment.find({
          parentComment: comment._id,
          isDeleted: false
        })
          .populate('user', 'name avatar')
          .sort({ createdAt: 1 });
        
        const replyCount = replies.length;
        
        return {
          ...comment.toObject(),
          replies,
          replyCount
        };
      })
    );

    const total = await Comment.countDocuments({
      recipe: req.params.id,
      parentComment: null,
      isDeleted: false
    });

    res.json({
      success: true,
      data: commentsWithReplies,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get comments error:', error);
    next(error);
  }
};

const getTrendingRecipes = async (req, res, next) => {
  try {
    // Check cache first
    // const cached = await redisClient.get('trending_recipes');
    // if (cached) {
    //   return res.json({
    //     success: true,
    //     data: JSON.parse(cached),
    //   });
    // }

    const recipes = await Recipe.find({ status: 'published' })
      .sort({ 'stats.views': -1, 'stats.likes': -1, createdAt: -1 })
      .limit(10)
      .populate('author', 'name avatar')
      .populate('category', 'name');

    // Cache for 1 hour
    // await redisClient.set('trending_recipes', 3600, JSON.stringify(recipes));

    res.json({
      success: true,
      data: recipes,
    });
  } catch (error) {
    next(error);
  }
};

const getFeaturedRecipes = async (req, res, next) => {
  try {
    // Check cache
    // const cached = await redisClient.get('featured_recipes');
    // if (cached) {
    //   return res.json({
    //     success: true,
    //     data: JSON.parse(cached),
    //   });
    // }

    const recipes = await Recipe.find({ status: 'published' })
      .sort({ 'stats.likes': -1, createdAt: -1 })
      .limit(6)
      .populate('author', 'name avatar')
      .populate('category', 'name');

    // await redisClient.set('featured_recipes', 3600, JSON.stringify(recipes));

    res.json({
      success: true,
      data: recipes,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  likeRecipe,
  bookmarkRecipe,
  addComment,
  getComments,
  getTrendingRecipes,
  getFeaturedRecipes,
};
const Recipe = require('../models/Recipe');
const Like = require('../models/Like');
const Bookmark = require('../models/Bookmark');
const Comment = require('../models/Comment');
const Category = require('../models/Category');
const AppError = require('../utils/AppError');
const { redisClient } = require('../config/redis');
const cloudinary = require('../config/cloudinary');
const { createNotification } = require('../services/notificationService');
const stream = require('stream');

// Helper function to upload buffer to Cloudinary
const uploadToCloudinary = (buffer, folder = 'reactiveRecipes') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder+'/recipes',
        transformation: [{ width: 800, height: 600, crop: 'limit' }],
        quality: 'auto',
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    // Create a readable stream from buffer and pipe to Cloudinary
    const readableStream = new stream.Readable();
    readableStream.push(buffer);
    readableStream.push(null);
    readableStream.pipe(uploadStream);
  });
};

const createRecipe = async (req, res, next) => {
  try {
    // console.log('Request body:', req.body);
    // console.log('Request files:', req.files);

    // Parse JSON fields
    let ingredients = [];
    let steps = [];
    let tags = [];

    try {
      ingredients = req.body.ingredients ? JSON.parse(req.body.ingredients) : [];
      steps = req.body.steps ? JSON.parse(req.body.steps) : [];
      tags = req.body.tags ? JSON.parse(req.body.tags) : [];
    } catch (e) {
      console.error('Parse error:', e);
    }

    // Prepare recipe data
    const recipeData = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      difficulty: req.body.difficulty || 'medium',
      servings: parseInt(req.body.servings) || 4,
      author: req.user._id,
      ingredients: ingredients,
      steps: steps,
      tags: tags,
      status: req.body.status || 'published',
      cookingTime: {
        prep: parseInt(req.body['cookingTime[prep]']) || 0,
        cook: parseInt(req.body['cookingTime[cook]']) || 0,
        total: parseInt(req.body['cookingTime[total]']) || 0,
      },
      seo: {
        slug: req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        metaTitle: req.body.title,
        metaDescription: req.body.description?.substring(0, 160),
      },
    };

    // Upload images to Cloudinary
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(file => uploadToCloudinary(file.buffer));
      const uploadedImages = await Promise.all(uploadPromises);
      recipeData.images = uploadedImages.map(img => img.secure_url);
      console.log(`Uploaded ${uploadedImages.length} images`);
    }

    // Create recipe
    const recipe = await Recipe.create(recipeData);

    res.status(201).json({
      success: true,
      data: recipe,
    });
  } catch (error) {
    console.error('Create recipe error:', error);
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

    // Prepare update data
    const updateData = {};

    // Basic fields
    if (req.body.title) updateData.title = req.body.title;
    if (req.body.description) updateData.description = req.body.description;
    if (req.body.category) updateData.category = req.body.category;
    if (req.body.difficulty) updateData.difficulty = req.body.difficulty;
    if (req.body.servings) updateData.servings = parseInt(req.body.servings);
    if (req.body.status) updateData.status = req.body.status;

    // Parse JSON fields
    if (req.body.ingredients) {
      try {
        updateData.ingredients = JSON.parse(req.body.ingredients);
      } catch (e) {}
    }
    if (req.body.steps) {
      try {
        updateData.steps = JSON.parse(req.body.steps);
      } catch (e) {}
    }
    if (req.body.tags) {
      try {
        updateData.tags = JSON.parse(req.body.tags);
      } catch (e) {}
    }

    // Cooking time
    if (req.body['cookingTime[prep]'] || req.body['cookingTime[cook]']) {
      updateData.cookingTime = {
        prep: parseInt(req.body['cookingTime[prep]']) || recipe.cookingTime?.prep || 0,
        cook: parseInt(req.body['cookingTime[cook]']) || recipe.cookingTime?.cook || 0,
        total: (parseInt(req.body['cookingTime[prep]']) || 0) + (parseInt(req.body['cookingTime[cook]']) || 0),
      };
    }

    // Upload new images
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(file => uploadToCloudinary(file.buffer));
      const uploadedImages = await Promise.all(uploadPromises);
      const newImages = uploadedImages.map(img => img.secure_url);
      updateData.images = [...(recipe.images || []), ...newImages];
    }

    // Handle image deletion
    if (req.body.imagesToDelete) {
      let imagesToDelete;
      try {
        imagesToDelete = JSON.parse(req.body.imagesToDelete);
      } catch (e) {
        imagesToDelete = [];
      }
      updateData.images = recipe.images.filter(img => !imagesToDelete.includes(img));
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: updatedRecipe,
    });
  } catch (error) {
    console.error('Update recipe error:', error);
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

const recommendRecipe = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId)
      .populate("likedRecipes", "tags category")
      .populate("recentlyViewed", "tags category");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Collect categories
    const categoryIds = new Set();

    user.likedRecipes?.forEach(recipe => {
      if (recipe.category) {
        categoryIds.add(recipe.category.toString());
      }
    });

    user.recentlyViewed?.forEach(recipe => {
      if (recipe.category) {
        categoryIds.add(recipe.category.toString());
      }
    });

    // Collect tags
    const tags = [];

    user.likedRecipes?.forEach(recipe => {
      if (recipe.tags?.length) {
        tags.push(...recipe.tags);
      }
    });

    user.recentlyViewed?.forEach(recipe => {
      if (recipe.tags?.length) {
        tags.push(...recipe.tags);
      }
    });

    // Remove duplicates
    const uniqueTags = [...new Set(tags)];

    const recommendations = await Recipe.find({
      status: "published",
      $or: [
        {
          category: {
            $in: [...categoryIds]
          }
        },
        {
          tags: {
            $in: uniqueTags
          }
        }
      ]
    })
      .populate("author", "name")
      .populate("category", "name")
      .sort({
        "stats.views": -1
      })
      .limit(10);

    return res.status(200).json({
      success: true,
      count: recommendations.length,
      recommendations
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

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
  recommendRecipe
};
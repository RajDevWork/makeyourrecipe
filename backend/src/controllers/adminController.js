const User = require('../models/User');
const Recipe = require('../models/Recipe');
const Category = require('../models/Category');
const Report = require('../models/Report');
const AppError = require('../utils/AppError');
const { redisClient } = require('../config/redis');

const getAllUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, search, role, isActive } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }
    if (role) query.role = role;
    if (isActive !== undefined) query.isActive = isActive === 'true';

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      data: users,
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

const updateUserStatus = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { isActive, role } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { isActive, role },
      { new: true }
    ).select('-password');

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    // Invalidate user sessions if deactivated
    if (!isActive) {
      await redisClient.del(`refresh_${userId}`);
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const getAllRecipes = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status, search, author } = req.query;
    const query = {};

    if (status) query.status = status;
    if (search) {
      query.$text = { $search: search };
    }
    if (author) query.author = author;

    const recipes = await Recipe.find(query)
      .populate('author', 'name email')
      .populate('category', 'name')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Recipe.countDocuments(query);

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

const moderateRecipe = async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    const { status, moderationNote } = req.body;

    const recipe = await Recipe.findByIdAndUpdate(
      recipeId,
      { status, moderationNote },
      { new: true }
    );

    if (!recipe) {
      return next(new AppError('Recipe not found', 404));
    }

    // Create notification for author
    const Notification = require('../models/Notification');
    await Notification.create({
      recipient: recipe.author,
      type: status === 'published' ? 'recipe_approved' : 'recipe_rejected',
      title: `Recipe ${status === 'published' ? 'Approved' : 'Rejected'}`,
      message: `Your recipe "${recipe.title}" has been ${status === 'published' ? 'approved and published' : 'rejected'}. ${moderationNote ? `Reason: ${moderationNote}` : ''}`,
      data: { recipeId: recipe._id },
    });

    // Clear cache
    await redisClient.del('homepage_recipes');
    await redisClient.del('trending_recipes');

    res.json({
      success: true,
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
};

const getDashboardAnalytics = async (req, res, next) => {
  try {
    const [totalUsers, activeUsers, totalRecipes, publishedRecipes, totalReports, userGrowth, recipeGrowth] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ isActive: true }),
      Recipe.countDocuments(),
      Recipe.countDocuments({ status: 'published' }),
      Report.countDocuments({ status: 'pending' }),
      User.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: -1 } },
        { $limit: 30 },
      ]),
      Recipe.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: -1 } },
        { $limit: 30 },
      ]),
    ]);

    const topRecipes = await Recipe.find({ status: 'published' })
      .sort({ 'stats.views': -1 })
      .limit(10)
      .populate('author', 'name')
      .select('title stats.views stats.likes');

    const topUsers = await User.find()
      .sort({ 'stats.totalRecipes': -1 })
      .limit(10)
      .select('name email stats.totalRecipes');

    res.json({
      success: true,
      data: {
        overview: {
          totalUsers,
          activeUsers,
          totalRecipes,
          publishedRecipes,
          totalReports,
        },
        charts: {
          userGrowth: userGrowth.reverse(),
          recipeGrowth: recipeGrowth.reverse(),
        },
        topRecipes,
        topUsers,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAllReports = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const query = {};
    if (status) query.status = status;

    const reports = await Report.find(query)
      .populate('reporter', 'name email')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Report.countDocuments(query);

    res.json({
      success: true,
      data: reports,
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

const resolveReport = async (req, res, next) => {
  try {
    const { reportId } = req.params;
    const { status, adminNote } = req.body;

    const report = await Report.findByIdAndUpdate(
      reportId,
      { status, adminNote, resolvedAt: new Date() },
      { new: true }
    );

    if (!report) {
      return next(new AppError('Report not found', 404));
    }

    res.json({
      success: true,
      data: report,
    });
  } catch (error) {
    next(error);
  }
};

const manageCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ recipeCount: -1 });
    
    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const { name, description, icon, image } = req.body;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const category = await Category.create({
      name,
      slug,
      description,
      icon,
      image,
    });

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  updateUserStatus,
  getAllRecipes,
  moderateRecipe,
  getDashboardAnalytics,
  getAllReports,
  resolveReport,
  manageCategories,
  createCategory,
};
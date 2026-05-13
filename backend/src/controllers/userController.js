const User = require('../models/User');
const Recipe = require('../models/Recipe');
const Like = require('../models/Like');
const Bookmark = require('../models/Bookmark');
const Notification = require('../models/Notification');
const AppError = require('../utils/AppError');
const cloudinary = require('../config/cloudinary');
const { redisClient } = require('../config/redis');

const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    const [recipes, likes, bookmarks, notifications] = await Promise.all([
      Recipe.find({ author: user._id, status: 'published' }).countDocuments(),
      Like.countDocuments({ user: user._id }),
      Bookmark.countDocuments({ user: user._id }),
      Notification.countDocuments({ recipient: user._id, isRead: false }),
    ]);

    res.json({
      success: true,
      data: {
        ...user.toObject(),
        stats: {
          recipes,
          likes,
          bookmarks,
          notifications,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const updates = {
      name: req.body.name,
      bio: req.body.bio,
      preferences: req.body.preferences,
    };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'avatars',
        transformation: [{ width: 200, height: 200, crop: 'fill' }],
      });
      updates.avatar = result.secure_url;
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    const user = await User.findById(req.user._id).select('+password');
    
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return next(new AppError('Current password is incorrect', 401));
    }

    user.password = newPassword;
    await user.save();

    // Invalidate all sessions
    await redisClient.del(`refresh_${user._id}`);

    res.json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    next(error);
  }
};

const getUserRecipes = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status = 'published' } = req.query;
    const userId = req.params.id || req.user._id;

    const recipes = await Recipe.find({ author: userId, status })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('category', 'name');

    const total = await Recipe.countDocuments({ author: userId, status });

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

const getFavorites = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const bookmarks = await Bookmark.find({ user: req.user._id })
      .populate({
        path: 'recipe',
        populate: [
          { path: 'author', select: 'name avatar' },
          { path: 'category', select: 'name' },
        ],
      })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const recipes = bookmarks.map(b => b.recipe);
    const total = await Bookmark.countDocuments({ user: req.user._id });

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

const getNotifications = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const notifications = await Notification.find({ recipient: req.user._id, isDeleted: false })
      .populate('sender', 'name avatar')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Notification.countDocuments({ recipient: req.user._id, isDeleted: false });
    const unreadCount = await Notification.countDocuments({ recipient: req.user._id, isRead: false });

    res.json({
      success: true,
      data: notifications,
      unreadCount,
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

const markNotificationRead = async (req, res, next) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
    
    res.json({
      success: true,
      message: 'Notification marked as read',
    });
  } catch (error) {
    next(error);
  }
};

const getDashboardStats = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const [totalRecipes, totalLikes, totalViews, recentRecipes, recipeStats] = await Promise.all([
      Recipe.countDocuments({ author: userId }),
      Recipe.aggregate([
        { $match: { author: userId } },
        { $group: { _id: null, total: { $sum: '$stats.likes' } } },
      ]),
      Recipe.aggregate([
        { $match: { author: userId } },
        { $group: { _id: null, total: { $sum: '$stats.views' } } },
      ]),
      Recipe.find({ author: userId })
        .sort({ createdAt: -1 })
        .limit(5)
        .select('title stats.views stats.likes createdAt'),
      Recipe.aggregate([
        { $match: { author: userId } },
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

    res.json({
      success: true,
      data: {
        totalRecipes,
        totalLikes: totalLikes[0]?.total || 0,
        totalViews: totalViews[0]?.total || 0,
        recentRecipes,
        chartData: recipeStats.reverse(),
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
  getUserRecipes,
  getFavorites,
  getNotifications,
  markNotificationRead,
  getDashboardStats,
};
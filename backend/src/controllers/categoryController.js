const Category = require('../models/Category');
const Recipe = require('../models/Recipe');
const AppError = require('../utils/AppError');
const { redisClient } = require('../config/redis');

const getAllCategories = async (req, res, next) => {
  try {
    // const cached = await redisClient.get('all_categories');
    // if (cached) {
    //   return res.json({
    //     success: true,
    //     data: JSON.parse(cached),
    //   });
    // }

    const categories = await Category.find({ isActive: true })
      .sort({ recipeCount: -1 });

    // await redisClient.set('all_categories', 3600, JSON.stringify(categories));

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return next(new AppError('Category not found', 404));
    }

    const recipes = await Recipe.find({ category: category._id, status: 'published' })
      .limit(20)
      .populate('author', 'name avatar');

    res.json({
      success: true,
      data: category,
      recipes,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
};
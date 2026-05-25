const Recipe = require('../models/Recipe');
const User = require('../models/User');
const { redisClient } = require('../config/redis');

const trackRecipeView = async (recipeId, userId = null) => {
  await Recipe.findByIdAndUpdate(recipeId, {
    $inc: { 'stats.views': 1 }
  });

  if (userId) {
    await redisClient.zincrby('user_views', 1, userId.toString());
  }
};

const getPopularRecipes = async (limit = 10) => {
  const cached = await redisClient.get('popular_recipes');
  if (cached) {
    return JSON.parse(cached);
  }

  const recipes = await Recipe.find({ status: 'published' })
    .sort({ 'stats.views': -1, 'stats.likes': -1 })
    .limit(limit)
    .populate('author', 'name avatar');

  await redisClient.set('popular_recipes', 3600, JSON.stringify(recipes));
  return recipes;
};

module.exports = {
  trackRecipeView,
  getPopularRecipes,
};
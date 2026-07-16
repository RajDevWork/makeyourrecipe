const Recipe = require('../models/Recipe');
const User = require('../models/User');
const { redisClient } = require('../config/redis');


/**
 * Tracks a recipe view by:
 * 1. Incrementing the recipe's view count in MongoDB.
 * 2. Recording the user's viewing activity in Redis (if a user ID is provided).
 *
 * @async
 * @function trackRecipeView
 * @param {string|ObjectId} recipeId - The ID of the recipe being viewed.
 * @param {string|ObjectId|null} [userId=null] - The ID of the user viewing the recipe.
 *                                              If provided, their view count is updated in Redis.
 * @returns {Promise<void>} Resolves when the view has been successfully recorded.
 */
const trackRecipeView = async (recipeId, userId = null) => {
  await Recipe.findByIdAndUpdate(recipeId, {
    $inc: { 'stats.views': 1 }
  });

  if (userId) {
    await redisClient.zincrby('user_views', 1, userId.toString());
  }
};


/**
 * Retrieves the most popular published recipes.
 *
 * Workflow:
 * 1. Checks Redis cache for the popular recipes list.
 * 2. If cached, returns the cached data.
 * 3. Otherwise, fetches published recipes from MongoDB,
 *    sorted by views and likes in descending order.
 * 4. Populates the author details.
 * 5. Stores the result in Redis with a 1-hour expiration.
 *
 * @async
 * @function getPopularRecipes
 * @param {number} [limit=10] - Maximum number of recipes to return.
 * @returns {Promise<Array>} A list of popular published recipes.
 */
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
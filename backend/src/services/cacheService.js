const { redisClient } = require('../config/redis');

/**
 * Retrieves data from Redis cache if available; otherwise,
 * executes the provided callback to fetch fresh data,
 * stores it in Redis with the specified TTL, and returns it.
 *
 * @async
 * @function getOrSetCache
 * @param {string} key - The Redis cache key.
 * @param {Function} callback - Async function that fetches fresh data on a cache miss.
 * @param {number} [ttl=3600] - Cache expiration time in seconds (default: 1 hour).
 * @returns {Promise<*>} The cached or freshly fetched data.
 */
const getOrSetCache = async (key, callback, ttl = 3600) => {
  const cached = await redisClient.get(key);
  
  if (cached) {
    return JSON.parse(cached);
  }
  
  const freshData = await callback();
  await redisClient.set(key, ttl, JSON.stringify(freshData));
  
  return freshData;
};

/**
 * Invalidates Redis cache entries that match the given pattern.
 *
 * This function searches for all keys matching the supplied pattern
 * and deletes them if any are found.
 *
 * @async
 * @function invalidateCache
 * @param {string} patterns - Redis key pattern used to identify cache entries
 *                            (e.g., "recipes:*" or "popular_*").
 * @returns {Promise<void>} Resolves when the matching cache entries have been removed.
 */

const invalidateCache = async (patterns) => {
  const keys = await redisClient.keys(patterns);
  if (keys.length > 0) {
    await redisClient.del(keys);
  }
};

module.exports = {
  getOrSetCache,
  invalidateCache,
};
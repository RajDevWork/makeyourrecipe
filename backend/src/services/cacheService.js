const { redisClient } = require('../config/redis');

const getOrSetCache = async (key, callback, ttl = 3600) => {
  const cached = await redisClient.get(key);
  
  if (cached) {
    return JSON.parse(cached);
  }
  
  const freshData = await callback();
  await redisClient.set(key, ttl, JSON.stringify(freshData));
  
  return freshData;
};

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
const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const { redisClient } = require('../config/redis');

const createRateLimiter = (windowMs, max, keyPrefix) => {
  return rateLimit({
    store: new RedisStore({
      sendCommand: (...args) => redisClient.sendCommand(args),
    }),
    windowMs,
    max,
    keyPrefix,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests, please try again later.'
  });
};

const authLimiter = createRateLimiter(15 * 60 * 1000, 5, 'auth');
const apiLimiter = createRateLimiter(60 * 60 * 1000, 100, 'api');
const recipeLimiter = createRateLimiter(60 * 60 * 1000, 50, 'recipe');

module.exports = { authLimiter, apiLimiter, recipeLimiter };
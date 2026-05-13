const rateLimit = require('express-rate-limit');
const { redisClient } = require('../config/redis');

// Custom Redis store for rate-limit with ioredis
class RedisStore {
  constructor(client) {
    this.client = client;
    this.prefix = 'rl:';
  }

  async increment(key) {
    const prefixedKey = this.prefix + key;
    const now = Date.now();
    const windowStart = now - (60 * 1000);
    
    const script = `
      local key = KEYS[1]
      local now = tonumber(ARGV[1])
      local windowStart = tonumber(ARGV[2])
      
      redis.call('ZREMRANGEBYSCORE', key, 0, windowStart)
      
      local count = redis.call('ZCARD', key)
      local resetTime = now + 60000
      
      if count == 0 then
        redis.call('ZADD', key, now, now .. ':' .. math.random())
        redis.call('PEXPIRE', key, 60000)
        return {1, resetTime}
      else
        redis.call('ZADD', key, now, now .. ':' .. math.random())
        local newCount = redis.call('ZCARD', key)
        return {newCount, resetTime}
      end
    `;
    
    const result = await this.client.eval(script, 1, prefixedKey, now, windowStart);
    return {
      totalHits: result[0],
      resetTime: new Date(result[1])
    };
  }

  async decrement(key) {
    const prefixedKey = this.prefix + key;
    await this.client.zpopmin(prefixedKey);
  }

  async resetKey(key) {
    const prefixedKey = this.prefix + key;
    await this.client.del(prefixedKey);
  }
}

// Import ipKeyGenerator from express-rate-limit
const { ipKeyGenerator } = require('express-rate-limit');

const createRateLimiter = (windowMs, max, messageKey) => {
  const options = {
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      message: `Too many ${messageKey} requests, please try again later.`,
    },
    // Fixed: Use ipKeyGenerator helper for IPv6 support
    keyGenerator: (req) => {
      // Use user ID if authenticated
      if (req.user?._id || req.user?.id) {
        return `user:${req.user._id || req.user.id}`;
      }
      // Use ipKeyGenerator for proper IPv6 subnet handling
      return ipKeyGenerator(req.ip);
    },
    handler: (req, res, next, options) => {
      res.status(options.statusCode).json({
        success: false,
        message: options.message.message,
        retryAfter: Math.ceil(options.windowMs / 1000),
      });
    },
    // Disable the specific validation check if needed (optional)
    validate: {
      keyGeneratorIpFallback: false, // Since we're using ipKeyGenerator correctly
    },
  };

  // Add Redis store if available
  if (redisClient) {
    try {
      options.store = new RedisStore(redisClient);
      console.log(`✅ Using Redis store for ${messageKey} rate limiter`);
    } catch (error) {
      console.warn(`Failed to use Redis store for ${messageKey}:`, error.message);
    }
  }

  return rateLimit(options);
};

const authLimiter = createRateLimiter(15 * 60 * 1000, 5, 'authentication');
const apiLimiter = createRateLimiter(60 * 60 * 1000, 100, 'API');
const recipeLimiter = createRateLimiter(60 * 60 * 1000, 50, 'recipe');
const strictLimiter = createRateLimiter(60 * 60 * 1000, 10, 'strict');

module.exports = { authLimiter, apiLimiter, recipeLimiter, strictLimiter };
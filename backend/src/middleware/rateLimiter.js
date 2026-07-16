const rateLimit = require('express-rate-limit');
const { redisClient } = require('../config/redis');

// Custom Redis store for rate-limit with ioredis
/**
 * Custom Redis store implementation for express-rate-limit using ioredis.
 *
 * This store tracks request timestamps in Redis using sorted sets (ZSETs),
 * allowing rate limits to be enforced across multiple application instances.
 */
class RedisStore {
   /**
   * Creates a new RedisStore instance.
   *
   * @param {Object} client - An initialized ioredis client.
   */
  constructor(client) {
    this.client = client;
    this.prefix = 'rl:';
  }

  /**
   * Records a request for the specified key and returns the current
   * number of requests within the active rate limit window.
   *
   * Internally, this method:
   * - Removes expired request timestamps.
   * - Counts active requests.
   * - Stores the current request timestamp.
   * - Sets the Redis key expiration.
   *
   * @async
   * @param {string} key - Unique identifier for the client (user ID or IP).
   * @returns {Promise<Object>} Rate limit information.
   * @returns {number} returns.totalHits - Current number of requests in the window.
   * @returns {Date} returns.resetTime - Time when the rate limit window resets.
   */
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

  /**
   * Removes the oldest recorded request for the specified key.
   *
   * This is primarily used when a request should not count toward
   * the rate limit.
   *
   * @async
   * @param {string} key - Unique identifier for the client.
   * @returns {Promise<void>}
   */
  async decrement(key) {
    const prefixedKey = this.prefix + key;
    await this.client.zpopmin(prefixedKey);
  }

  /**
   * Clears all rate limit data associated with the specified key.
   *
   * @async
   * @param {string} key - Unique identifier for the client.
   * @returns {Promise<void>}
   */
  async resetKey(key) {
    const prefixedKey = this.prefix + key;
    await this.client.del(prefixedKey);
  }
}


// Import ipKeyGenerator from express-rate-limit
const { ipKeyGenerator } = require('express-rate-limit');

/**
 * Creates a configurable Express rate limiter.
 *
 * The limiter:
 * - Restricts requests within a configurable time window.
 * - Identifies clients using authenticated user IDs when available,
 *   otherwise falls back to the client's IP address.
 * - Uses Redis for distributed rate limiting if a Redis client exists.
 * - Returns a standardized JSON error response when limits are exceeded.
 *
 * @param {number} windowMs - Time window in milliseconds.
 * @param {number} max - Maximum number of requests allowed during the window.
 * @param {string} messageKey - Resource name used in the rate limit message.
 * @returns {import('express').RequestHandler} Configured Express rate-limiting middleware.
 */

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
/**
 * Rate limiter for authentication endpoints.
 *
 * Limits authentication attempts to help prevent brute-force attacks.
 *
 * Window: 15 minutes
 * Max Requests: 5
 */
const authLimiter = createRateLimiter(15 * 60 * 1000, 5, 'authentication');

/**
 * General API rate limiter.
 *
 * Limits the number of API requests per client.
 *
 * Window: 1 hour
 * Max Requests: 100
 */
const apiLimiter = createRateLimiter(60 * 60 * 1000, 100, 'API');

/**
 * Rate limiter for recipe-related endpoints.
 *
 * Helps prevent excessive recipe creation or modification requests.
 *
 * Window: 1 hour
 * Max Requests: 50
 */
const recipeLimiter = createRateLimiter(60 * 60 * 1000, 50, 'recipe');

/**
 * Strict rate limiter for highly sensitive endpoints.
 *
 * Intended for operations requiring tighter request restrictions.
 *
 * Window: 1 hour
 * Max Requests: 10
 */
const strictLimiter = createRateLimiter(60 * 60 * 1000, 10, 'strict');

module.exports = { authLimiter, apiLimiter, recipeLimiter, strictLimiter };
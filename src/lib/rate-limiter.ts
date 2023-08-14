import { redis } from '@/lib/redis'
import { Ratelimit } from '@upstash/ratelimit'

// Create a new ratelimiter, that allows 4 requests per 10 seconds
export const rateLimiter = new Ratelimit({
  // The redis instance is used for storing and retrieving the rate data
  redis,
  limiter: Ratelimit.slidingWindow(3, '86400 s'),
  /**
   * Optional prefix for the keys used in redis. This is useful if you want to share a redis
   * instance with other applications and want to avoid key collisions. The default prefix is
   * "@upstash/ratelimit"
   */
  prefix: '@upstash/ratelimit',
})

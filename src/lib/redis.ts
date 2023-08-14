import { Redis } from '@upstash/redis'
export const redis = new Redis({
  // The exlamation mark (!) asserts that the enviornment variable is non-null and non-undefined
  url: process.env.REDIS_URL!,
  token: process.env.REDIS_SECRET!
})

// The purpose of the above code is to establish a connection to a redis server, using the specified url and authentication token. so that the instance can be used throughout the application to add and retrieve data. 
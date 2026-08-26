import dotenv from "./dotenv"
const config =  {
      
      defaulProfileUrl:"https://api.dicebear.com/9.x/avataaars/svg?seed=Christopher",
      cache_time: 7200, // 2 hrs in secods
      quizCacheTime:36000, 
      notification_cache_clear:60, 
      defaultPass: "$2a$10$PUcRF6VdSBEPYSl0jDiuzeeqK.4XRqvUrl9VVN39RvIyIX7tm21W6",
      devEnv:"./.env.development",
      prodEnv:"./.env.production",
      qaEnv:"./.env.qa",
      s3Config:{
      
      }, 
      
      redisConn :{
      redisConnection1: { // be default 
        host: process.env.REDIS_HOST || "127.0.0.1",
        port: Number(dotenv.REDIS_PORT) || 6379 ,
        db:0 ,
        ...(dotenv.REDIS_PASSWORD ? { password: dotenv.REDIS_PASSWORD } : {}),
      },

      redisConnection2: { // be default 
        host: process.env.REDIS_HOST || "127.0.0.1",
        port: Number(dotenv.REDIS_PORT) || 6379 ,
        db:1 ,
        ...(dotenv.REDIS_PASSWORD ? { password: dotenv.REDIS_PASSWORD } : {}),
      },

      queueConfig:{
        redisConnection1Config: {
          delay: 0, // No delay
          removeOnComplete: true, // Automatically remove completed jobs
          removeOnFail: false, // Keep failed jobs for debugging
          attempts: 3, // Number of retry attempts
          backoff: { type: "fixed", delay: 5000 }, // 5s retry interval
          // jobId: key, // Ensure job uniqueness
          timestamp: Date.now(), // Job creation timestamp
        }
      } , 
      backoffStrategy: {
        removeOnComplete: true, removeOnFail: true
      }, 

    }
}


export default Object.freeze(config)

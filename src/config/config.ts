import dotenv from "./dotenv"
const config =  {

      cache_time: 7200, // 2 hrs in secods
      quizCacheTime:36000, 
      notification_cache_clear:60, 

    devEnv:"./.env.development",
    prodEnv:"./.env.production",
    qaEnv:"./.env.qa",
    redisConn :{
    redisConnection: { // be default 
        host: "localhost",
        port: Number(dotenv.REDIS_PORT) ,
        db:0 
      },
      backoffStrategy: {
        removeOnComplete: true, removeOnFail: true
      }, 
    }
}


export default Object.freeze(config)

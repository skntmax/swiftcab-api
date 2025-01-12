import dotenv from "./dotenv"
const config =  {
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

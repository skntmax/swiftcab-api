

 console.log( {
   NODE_ENV: process.env.NODE_ENV , 
   PORT:process.env.PORT,
   VERSION:process.env.VERSION,
   DATABASE_URL:process.env.DATABASE_URL,
   REDIS_PORT: Number(process.env.REDIS_PORT) 
 })

 export default {
    NODE_ENV: process.env.NODE_ENV , 
    PORT:process.env.PORT,
    VERSION:process.env.VERSION,
    DATABASE_URL:process.env.DATABASE_URL,
    REDIS_PORT: Number(process.env.REDIS_PORT) 
 }
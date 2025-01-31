


const  all_env =  {
   NODE_ENV: process.env.NODE_ENV , 
   PORT:process.env.PORT,
   VERSION:process.env.VERSION,
   DATABASE_URL:process.env.DATABASE_URL,
   REDIS_PORT: Number(process.env.REDIS_PORT) ,
   SECRET_KEY:process.env.SECRET_KEY as string
}

console.log(all_env)

export default all_env
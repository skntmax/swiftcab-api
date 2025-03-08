


const  all_env =  {
   NODE_ENV: process.env.NODE_ENV , 
   PORT:process.env.PORT,
   VERSION:process.env.VERSION,
   DATABASE_URL:process.env.DATABASE_URL,
   REDIS_PORT: Number(process.env.REDIS_PORT) ,
   SECRET_KEY:process.env.SECRET_KEY as string,
   CLOUDINARY_CLOUD_NAME:process.env.CLOUDINARY_CLOUD_NAME as string,
   CLOUDINARY_API_KEY:process.env.CLOUDINARY_API_KEY as string,
   CLOUDINARY_API_SECRET:process.env.CLOUDINARY_API_SECRET as string,
   NEXT_PUBLIC_GOOGLE_CLIENT_SECRET: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string 
}

console.log(all_env)

export default all_env
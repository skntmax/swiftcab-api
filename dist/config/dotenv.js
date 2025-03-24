"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const all_env = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    VERSION: process.env.VERSION,
    DATABASE_URL: process.env.DATABASE_URL,
    REDIS_PORT: Number(process.env.REDIS_PORT),
    SECRET_KEY: process.env.SECRET_KEY,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    NEXT_PUBLIC_GOOGLE_CLIENT_SECRET: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
};
console.log(all_env);
exports.default = all_env;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log({
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    VERSION: process.env.VERSION,
    DATABASE_URL: process.env.DATABASE_URL,
    REDIS_PORT: Number(process.env.REDIS_PORT),
    SECRET_KEY: process.env.SECRET_KEY
});
exports.default = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    VERSION: process.env.VERSION,
    DATABASE_URL: process.env.DATABASE_URL,
    REDIS_PORT: Number(process.env.REDIS_PORT),
    SECRET_KEY: process.env.SECRET_KEY
};

import dotenv from 'dotenv'
dotenv.config({
    path: process.env.NODE_ENV=="DEV"? './.env.development' :
    process.env.NODE_ENV=="PROD"? './.env.production':'./.env.qa'
 })
import dotenv from 'dotenv'
import config from './config'
dotenv.config({
    path: process.env.NODE_ENV=="DEV"? config.devEnv :
    process.env.NODE_ENV=="PROD"? config.prodEnv:config.qaEnv
 })
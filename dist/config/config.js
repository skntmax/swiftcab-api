"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("./dotenv"));
const config = {
    devEnv: "./.env.development",
    prodEnv: "./.env.production",
    qaEnv: "./.env.qa",
    redisConn: {
        redisConnection: {
            host: "localhost",
            port: Number(dotenv_1.default.REDIS_PORT),
            db: 0
        },
        backoffStrategy: {
            removeOnComplete: true, removeOnFail: true
        },
    }
};
exports.default = Object.freeze(config);

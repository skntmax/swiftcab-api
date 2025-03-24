"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient2 = exports.redisClient1 = void 0;
const config_1 = __importDefault(require("../../config/config"));
const constant_1 = __importDefault(require("../../config/constant"));
const ioredis_1 = __importDefault(require("ioredis"));
class RedisConn {
    constructor(configuration = config_1.default.redisConn.redisConnection1) {
        this.redisClient = new ioredis_1.default(configuration);
        console.log('redis connected at ', configuration.port, "database:", configuration.db);
    }
    get(key) {
        return this.redisClient.get(key);
    }
    set(key, value) {
        return this.redisClient.set(key, JSON.stringify(value));
    }
    expire(key, expireTime = constant_1.default.cache_time) {
        return this.redisClient.expire(key, expireTime);
    }
    del(key) {
        return this.redisClient.del(key);
    }
}
const redisClient1 = (new RedisConn()).redisClient; // for common use with databse 0 
exports.redisClient1 = redisClient1;
const redisClient2 = (new RedisConn(config_1.default.redisConn.redisConnection2)).redisClient; // for common use with databse 0 
exports.redisClient2 = redisClient2;

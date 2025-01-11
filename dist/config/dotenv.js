"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("./config"));
dotenv_1.default.config({
    path: process.env.NODE_ENV == "DEV" ? config_1.default.devEnv :
        process.env.NODE_ENV == "PROD" ? config_1.default.prodEnv : config_1.default.qaEnv
});

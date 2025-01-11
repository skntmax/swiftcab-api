"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_index_1 = __importDefault(require("../../controller/auth/auth.index"));
let authRouter = (0, express_1.Router)();
authRouter.get('/login', auth_index_1.default.getUser);
authRouter.get('/signup', auth_index_1.default.signUp);
authRouter.get('/send-otp', auth_index_1.default.sendOtp);
exports.default = authRouter;

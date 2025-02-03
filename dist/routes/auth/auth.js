"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_index_1 = __importDefault(require("../../controller/auth/auth.index"));
const auth_celebrate_1 = require("../../celebrate/auth.celebrate");
let authRouter = (0, express_1.Router)();
authRouter.post('/login', auth_celebrate_1.authCelebrate.login, auth_index_1.default.signin);
authRouter.post('/signup', auth_celebrate_1.authCelebrate.signup, auth_index_1.default.signUp);
authRouter.get('/send-otp', auth_index_1.default.sendOtp);
authRouter.post('/check-valid-user', auth_index_1.default.checkValidUser);
exports.default = authRouter;

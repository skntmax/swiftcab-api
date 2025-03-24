"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_index_1 = __importDefault(require("../../controller/auth/auth.index"));
const auth_celebrate_1 = require("../../celebrate/auth.celebrate");
const middleware_index_1 = __importDefault(require("../../middlewares/middleware.index"));
const constant_1 = require("../../config/constant");
let authRouter = (0, express_1.Router)();
authRouter.post('/login', auth_celebrate_1.authCelebrate.login, auth_index_1.default.signin);
authRouter.post('/signup', auth_celebrate_1.authCelebrate.signup, auth_index_1.default.signUp);
authRouter.get('/verify-mail-link', middleware_index_1.default.validateValidAccount, auth_index_1.default.verifyMailLink);
authRouter.post('/verify-otp', auth_celebrate_1.authCelebrate.otpVerify, auth_index_1.default.verifyOtp);
authRouter.post('/login-by-oauth', auth_index_1.default.loginByAuth);
authRouter.get('/send-otp', middleware_index_1.default.checkUserRoles('Customer'), auth_index_1.default.sendOtp);
authRouter.post('/is-valid-user-with-role', middleware_index_1.default.validateUser, auth_index_1.default.checkValidUser);
authRouter.get('/get-all-roles', middleware_index_1.default.inCache(constant_1.REDIS_KEYS.ALL_ROLES), auth_index_1.default.getAllRoles);
exports.default = authRouter;

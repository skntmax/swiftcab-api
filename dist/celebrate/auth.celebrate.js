"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authCelebrate = void 0;
const celebrate_1 = require("celebrate");
exports.authCelebrate = {
    signup: (0, celebrate_1.celebrate)({
        [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
            email: celebrate_1.Joi.string().required(),
            password: celebrate_1.Joi.string().required(),
            username: celebrate_1.Joi.string().required(),
            userType: celebrate_1.Joi.number().required(),
            trafficBy: celebrate_1.Joi.string().optional()
        }),
    }),
    login: (0, celebrate_1.celebrate)({
        [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
            emailOrUsername: celebrate_1.Joi.string().optional(),
            password: celebrate_1.Joi.string().optional(),
            userType: celebrate_1.Joi.number().required(),
            phone: celebrate_1.Joi.string().optional()
        }),
    }),
    otpVerify: (0, celebrate_1.celebrate)({
        [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
            otp: celebrate_1.Joi.string().required(),
            phone: celebrate_1.Joi.string().required()
        }),
    }),
};

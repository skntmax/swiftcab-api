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
            userType: celebrate_1.Joi.number().required()
        }),
    }),
    login: (0, celebrate_1.celebrate)({
        [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
            emailOrUsername: celebrate_1.Joi.string().required(),
            password: celebrate_1.Joi.string().required(),
            userType: celebrate_1.Joi.number().required()
        }),
    })
};

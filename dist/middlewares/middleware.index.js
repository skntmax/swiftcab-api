"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewares = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
exports.middlewares = {
    corsOptions: {
        origin: '*',
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    },
    globalMiddlewares: function (app) {
        app.use((0, cors_1.default)(this.corsOptions));
        app.use(body_parser_1.default.urlencoded({ extended: false }));
        app.use(express_1.default.json());
    }
};
exports.default = exports.middlewares;

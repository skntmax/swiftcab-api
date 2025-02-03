"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewares = void 0;
const celebrate_1 = require("celebrate"); // Import celebrate's error handler
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("./../config/dotenv"));
const db_1 = __importDefault(require("./../db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../config/utils");
exports.middlewares = {
    corsOptions: {
        origin: '*',
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    },
    globalMiddlewares: function (app) {
        app.use((0, cors_1.default)(this.corsOptions));
        app.use(body_parser_1.default.urlencoded({ extended: false }));
        app.use(express_1.default.json());
        app.use((0, celebrate_1.errors)());
        app.use((err, req, res, next) => {
            if (err.joi) {
                return res.status(400).json({
                    status: "error",
                    message: "Validation failed",
                    details: err.joi.details.map((detail) => detail.message), // Extracts Joi validation errors
                });
            }
            // If it's not a Celebrate error, pass it to the default handler
            next(err);
        });
    },
    checkRoles: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers['authorization'];
                if (!token)
                    return 'Unauthorize user';
                const bearer_token = token.split(' ')[1];
                let decoded = jsonwebtoken_1.default.verify(bearer_token, dotenv_1.default.SECRET_KEY);
                const user_has_roles = yield db_1.default.user_has_roles.findMany({
                    where: {
                        user_id: decoded === null || decoded === void 0 ? void 0 : decoded.id
                    },
                    select: {
                        role_id: true
                    }
                });
                //  if(!user_has_roles){
                //    return succesResponse({data:"no roles"} , res );
                //  } 
                console.log("user_type>>", user_has_roles);
                //  req.user_has_roles =   user_has_roles
                next();
            }
            catch (err) {
                // console.log("error message", err);
                (0, utils_1.failureResponse)({ data: "un autherised user " }, res);
            }
        });
    }
};
exports.default = exports.middlewares;

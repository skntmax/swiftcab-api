"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const db_1 = __importStar(require("./../db"));
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
                        role_id: true,
                        user_id: true,
                    }
                });
                req.user_has_roles = user_has_roles.map(ele => ele.role_id);
                next();
            }
            catch (err) {
                // console.log("error message", err);
                (0, utils_1.failureResponse)({ data: "un autherised user " }, res);
            }
        });
    },
    roleWisePermission: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers['authorization'];
                if (!token)
                    return 'Unauthorize user';
                const bearer_token = token.split(' ')[1];
                let decoded = jsonwebtoken_1.default.verify(bearer_token, dotenv_1.default.SECRET_KEY);
                let permissions = yield (0, db_1.executeStoredProcedure)('role_has_permission', req.user_has_roles);
                req.role_has_permissions = permissions;
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

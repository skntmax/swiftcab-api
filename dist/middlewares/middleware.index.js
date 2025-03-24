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
exports.middlewares = exports.vhicleDocUpload = exports.upload = void 0;
exports.deleteFiles = deleteFiles;
const celebrate_1 = require("celebrate"); // Import celebrate's error handler
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("./../config/dotenv"));
const db_1 = __importStar(require("./../db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../config/utils");
const auth_service_1 = __importDefault(require("../services/auth/auth.service"));
const redis_index_1 = require("../services/redis/redis.index");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const user_signup_worker_1 = require("../services/queues/user_signup_worker");
const user_otp_worker_1 = require("../services/queues/user_otp_worker");
// Define allowed file types
const allowedFileTypes = /jpeg|jpg|png|gif|pdf/;
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path_1.default.join(__dirname, '../assets/uploads');
        console.log("uploadPath>>", uploadPath);
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        let ext = file.originalname.split('.')[1];
        const uniqueSuffix = `${Date.now() + '-' + Math.round(Math.random() * 1E9)}.${ext}`;
        cb(null, file.fieldname + '-' + uniqueSuffix);
    },
});
// File Type Validation
const fileFilter = (req, file, cb) => {
    const extname = allowedFileTypes.test(path_1.default.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true); // Accept the file
    }
    else {
        return cb(new Error('Invalid file type! Only images are allowed.'), false); // Reject the file
    }
};
exports.upload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: fileFilter
});
exports.vhicleDocUpload = exports.upload.fields([{ name: 'ss_one', maxCount: 1 }, { name: 'ss_two', maxCount: 1 }, { name: 'rc_doc', maxCount: 1 }]);
function deleteFiles(files) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            for (const file of files) {
                if (file === null || file === void 0 ? void 0 : file.path) {
                    yield fs_1.default.unlink(file.path, ((file) => {
                        console.log(file, "deleted");
                    })); // Delete file from local storage
                }
            }
        }
        catch (error) {
            console.error("Error deleting files:", error);
        }
    });
}
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
        (0, user_signup_worker_1.initSignupmailWorker)();
        (0, user_otp_worker_1.initOtpGenerationWorker)();
    },
    validateUser: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.userObj = { userId: "", username: "" };
                const token = req.headers['authorization'];
                if (!token)
                    return (0, utils_1.failureResponse)({ data: "un autherised user " }, res);
                const bearer_token = token.split(' ')[1];
                let decoded = jsonwebtoken_1.default.verify(bearer_token, dotenv_1.default.SECRET_KEY);
                const { id: userId, username } = decoded;
                if (!userId || !username)
                    return (0, utils_1.failureResponse)({ data: ` expired token or not a valid user ` }, res);
                req.userObj.userId = userId;
                req.userObj.username = username;
                next();
            }
            catch (err) {
                console.log("error message", err);
                (0, utils_1.failureResponse)({ data: "un autherised user " }, res);
            }
        });
    },
    validateValidAccount: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.userObj = { userId: "", username: "" };
                const { token: bearer_token, role } = req.query;
                if (!bearer_token)
                    return (0, utils_1.failureResponse)({ data: "un autherised user " }, res);
                let decoded = jsonwebtoken_1.default.verify(bearer_token, dotenv_1.default.SECRET_KEY);
                const { id: userId, username } = decoded;
                if (!userId || !username)
                    return (0, utils_1.failureResponse)({ data: ` expired token or not a valid user ` }, res);
                req.userObj.userId = userId;
                req.userObj.username = username;
                next();
            }
            catch (err) {
                console.log("error message", err);
                (0, utils_1.failureResponse)({ data: "un autherised user " }, res);
            }
        });
    },
    checkRoles: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.userObj = { userId: "", username: "" };
                const token = req.headers['authorization'];
                if (!token)
                    return (0, utils_1.failureResponse)({ data: "un autherised user " }, res);
                const bearer_token = token.split(' ')[1];
                let decoded = jsonwebtoken_1.default.verify(bearer_token, dotenv_1.default.SECRET_KEY);
                const { id: userId, username } = decoded;
                const user_has_roles = yield db_1.default.user_has_roles.findMany({
                    where: {
                        user_id: decoded === null || decoded === void 0 ? void 0 : decoded.id
                    },
                    select: {
                        role_id: true,
                        user_id: true,
                    }
                });
                req.userObj.userId = userId;
                req.userObj.username = username;
                req.user_has_roles = user_has_roles.map(ele => ele.role_id);
                next();
            }
            catch (err) {
                console.log("error message", err);
                (0, utils_1.failureResponse)({ data: "un autherised user " }, res);
            }
        });
    },
    roleWisePermission: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.userObj = { userId: "", username: "" };
                const token = req.headers['authorization'];
                if (!token)
                    return (0, utils_1.failureResponse)({ data: "un autherised user " }, res);
                const bearer_token = token.split(' ')[1];
                let decoded = jsonwebtoken_1.default.verify(bearer_token, dotenv_1.default.SECRET_KEY);
                const { id: userId, username } = decoded;
                let permissions = yield (0, db_1.executeStoredProcedure)('role_has_permission', req.user_has_roles);
                req.role_has_permissions = permissions;
                req.userObj.userId = userId;
                req.userObj.username = username;
                next();
            }
            catch (err) {
                console.log("error message", err);
                (0, utils_1.failureResponse)({ data: "un autherised user " }, res);
            }
        });
    },
    checkUserRoles: function (roleName) {
        return function (req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    req.userObj = { userId: "", username: "" };
                    const token = req.headers['authorization'];
                    if (!token)
                        return (0, utils_1.failureResponse)({ data: "un autherised user " }, res);
                    const bearer_token = token.split(' ')[1];
                    let decoded = jsonwebtoken_1.default.verify(bearer_token, dotenv_1.default.SECRET_KEY);
                    let { id: userId, username } = decoded;
                    console.log(userId, username);
                    if (!userId || !username)
                        return (0, utils_1.failureResponse)({ data: `Token expired or user not found` }, res);
                    let doesRoleExist = yield auth_service_1.default.userHasRolesOrNot({ roleName: roleName, userId: userId });
                    console.log("doesRoleExist", doesRoleExist);
                    if (!(doesRoleExist === null || doesRoleExist === void 0 ? void 0 : doesRoleExist.status))
                        return (0, utils_1.failureResponse)({ data: `you don't have accessed role : ${roleName} ` }, res);
                    req.userObj.userId = decoded.id;
                    req.userObj.username = decoded.username;
                    req.user_has_roles = doesRoleExist.data.role_id;
                    next();
                }
                catch (err) {
                    console.log("error message", err);
                    (0, utils_1.failureResponse)({ data: "un autherised user " }, res);
                }
            });
        };
    },
    inCache: function (key) {
        return function (req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    if (req.params || req.query) {
                        req.cacheKey = `${key}:${Object.values(req.params || req.query).join(':')}`;
                    }
                    else {
                        req.cacheKey = key;
                    }
                    let data = yield redis_index_1.redisClient1.get(req.cacheKey);
                    if (data)
                        return (0, utils_1.failureResponse)({ data: JSON.parse(data) }, res);
                    next();
                }
                catch (err) {
                    console.log("error message", err);
                    (0, utils_1.failureResponse)({ data: "un autherised user " }, res);
                }
            });
        };
    },
    uploadFile: function (fileKey) {
        return function (req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    exports.upload.single(fileKey);
                    next();
                }
                catch (err) {
                    console.log("error message", err);
                    (0, utils_1.failureResponse)({ data: "un autherised user " }, res);
                }
            });
        };
    },
    getLoggedinuserRoleId: function () {
        return function (req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    let { userType } = req.params;
                    req.userObj = { userId: "", username: "" };
                    const token = req.headers['authorization'];
                    if (!token)
                        return (0, utils_1.failureResponse)({ data: "un autherised user " }, res);
                    const bearer_token = token.split(' ')[1];
                    let decoded = jsonwebtoken_1.default.verify(bearer_token, dotenv_1.default.SECRET_KEY);
                    let { id: userId, username } = decoded;
                    // is token valid or not 
                    if (!userId || !username)
                        return (0, utils_1.failureResponse)({ data: [], message: `Token expired or user not found` }, res);
                    //  does this user has this role or userType or not ?
                    let doesRoleExist = yield auth_service_1.default.userHasRolesOrNot({ roleName: userType, userId: userId });
                    if (!(doesRoleExist === null || doesRoleExist === void 0 ? void 0 : doesRoleExist.status))
                        return (0, utils_1.failureResponse)({ data: [], message: `you don't have accessed role : ${userType} ` }, res);
                    let role = yield db_1.default.roles.findFirst({
                        where: {
                            name: userType
                        },
                        select: {
                            id: true, name: true
                        }
                    });
                    // does this role exist in master record or not ?
                    if (!(role === null || role === void 0 ? void 0 : role.id))
                        return (0, utils_1.failureResponse)({ data: `Role does not exist` }, res);
                    if (role === null || role === void 0 ? void 0 : role.id) {
                        req.user_has_roles = role === null || role === void 0 ? void 0 : role.id;
                    }
                    req.userObj.userId = decoded.id;
                    req.userObj.username = decoded.username;
                    next();
                }
                catch (err) {
                    console.log("error message", err);
                    (0, utils_1.failureResponse)({ data: "un autherised user " }, res);
                }
            });
        };
    },
};
exports.default = exports.middlewares;

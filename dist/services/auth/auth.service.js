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
const dotenv_1 = __importDefault(require("../../config/dotenv"));
const utils_1 = require("../../config/utils");
const db_1 = __importStar(require("../../db"));
const auth_package_1 = require("../../packages/auth.package");
const authService = {
    loginUser: function (userPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { emailOrUsername, password, userType } = userPayload; // default as client or customer , 1- customer , 2- owner 
                let newUser = yield (0, db_1.executeStoredProcedure)('get_user_roles', [emailOrUsername, emailOrUsername, userType]);
                newUser = newUser[0];
                console.log("newUser", newUser);
                if (!newUser)
                    return (0, utils_1.failureReturn)('Please register first ');
                let isPass = yield auth_package_1.bcrypt.compare(password, newUser === null || newUser === void 0 ? void 0 : newUser.password);
                if (!isPass)
                    return (0, utils_1.failureReturn)('Invalid credential');
                let payload = { id: newUser.id, username: newUser.username };
                let token = auth_package_1.jwt.sign(payload, dotenv_1.default.SECRET_KEY, { expiresIn: "2h" });
                return (0, utils_1.successReturn)({ token, usersObj: { username: newUser.username, firstName: newUser.first_name, lastName: newUser.last_name } });
            }
            catch (err) {
                console.log(err);
                return (0, utils_1.failureReturn)(err);
            }
        });
    },
    createUser: function (userPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, userType, username } = userPayload;
                let userExist = yield db_1.default.users.findFirst({
                    where: {
                        OR: [
                            {
                                email: email
                            },
                            {
                                username: username
                            }
                        ]
                    }
                });
                if (userExist)
                    return (0, utils_1.failureReturn)('user already exist');
                let hashPass = yield auth_package_1.bcrypt.hash(password, 10);
                let newUser = yield db_1.default.users.create({
                    data: {
                        username: username,
                        password: hashPass,
                        email: email,
                        is_active: true,
                        created_on: new Date(),
                        updated_on: new Date(),
                    }
                });
                let userRoles = yield db_1.default.user_has_roles.create({
                    data: {
                        user_id: newUser.id,
                        role_id: userType,
                        created_on: new Date(),
                        updated_on: new Date(),
                    }
                });
                let payload = { id: newUser.id, username: newUser.username };
                let token = auth_package_1.jwt.sign(payload, dotenv_1.default.SECRET_KEY, {
                    expiresIn: "2h",
                });
                return (0, utils_1.successReturn)({ token, usersObj: { username: newUser.username, firstName: newUser.first_name, lastName: newUser.last_name } });
            }
            catch (err) {
                console.log(err);
                return (0, utils_1.failureReturn)(err);
            }
        });
    },
    checkValidUser: function (payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userExistOrNot = yield db_1.default.users.findFirst({ where: { username: payload.username } });
                if (!userExistOrNot)
                    return (0, utils_1.failureReturn)(false);
                return (0, utils_1.successReturn)(true);
            }
            catch (err) {
                console.log(err);
                return (0, utils_1.failureReturn)(err);
            }
        });
    },
    getAllRoles: function () {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let roles = yield db_1.default.roles.findMany({
                    select: { id: true, name: true }
                });
                return (0, utils_1.successReturn)(roles);
            }
            catch (err) {
                return (0, utils_1.failureReturn)(err);
            }
        });
    },
};
exports.default = authService;

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
const dotenv_1 = __importDefault(require("../../../config/dotenv"));
const utils_1 = require("../../../config/utils");
const db_1 = __importDefault(require("../../../db"));
const auth_package_1 = require("./../../../packages/auth.package");
const authService = {
    loginUser: function (userPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, userType = 1, username } = userPayload; // default as client or customer , 1- customer , 2- owner 
            let newUser = yield db_1.default.users.findFirst({
                where: {
                    OR: [
                        { email: email },
                        { username: username }
                    ],
                    user_type: userType
                }
            });
            if (!newUser)
                return (0, utils_1.failureReturn)('Please register first ');
            let isPass = yield auth_package_1.bcrypt.compare(password, newUser === null || newUser === void 0 ? void 0 : newUser.password);
            if (!isPass)
                return (0, utils_1.failureReturn)('Invalid credential');
            let payload = { id: newUser.id, username: newUser.username };
            let token = auth_package_1.jwt.sign(payload, dotenv_1.default.SECRET_KEY || "something", { expiresIn: "2h" });
            return (0, utils_1.successReturn)({ token, usersObj: { username: newUser.username, firstName: newUser.first_name, lastName: newUser.last_name } });
        });
    },
    createUser: function (userPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, userType, username } = userPayload;
                let userExist = yield db_1.default.users.findFirst({ where: { email }
                });
                if (userExist)
                    return (0, utils_1.failureReturn)('user already exist');
                let hashPass = yield auth_package_1.bcrypt.hash(password, 10);
                let newUser = yield db_1.default.users.create({
                    data: {
                        username: username,
                        password: hashPass,
                        email: email,
                        user_type: userType,
                        is_active: true,
                        created_on: new Date(),
                        updated_on: new Date(),
                    }
                });
                let payload = { id: newUser.id, username: newUser.username };
                let token = auth_package_1.jwt.sign(payload, dotenv_1.default.SECRET_KEY || "something", {
                    expiresIn: "2h",
                });
                return (0, utils_1.successReturn)({ token, usersObj: { username: newUser.username, firstName: newUser.first_name, lastName: newUser.last_name } });
            }
            catch (err) {
                console.log(err);
                return (0, utils_1.failureReturn)(err);
            }
        });
    }
};
exports.default = authService;

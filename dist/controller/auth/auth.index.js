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
const auth_service_1 = __importDefault(require("../../services/auth/auth.service"));
const utils_1 = require("../../config/utils");
const authController = {
    signin: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield auth_service_1.default.loginUser({ emailOrUsername: req.body.emailOrUsername, password: req.body.password, userType: req.body.userType });
                if (!user.status)
                    return (0, utils_1.succesResponse)({ data: user.data, message: "" }, res);
                return (0, utils_1.succesResponse)({ data: user.data, message: "logged in " }, res);
            }
            catch (err) {
                return (0, utils_1.failureResponse)({ data: err }, res);
            }
        });
    },
    signUp: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield auth_service_1.default.createUser({ email: req.body.email, password: req.body.password, username: req.body.username, userType: req.body.userType });
                if (!user.status)
                    return (0, utils_1.succesResponse)({ data: user.data, message: "User already exist" }, res);
                return (0, utils_1.succesResponse)({ data: user.data, message: "User created" }, res);
            }
            catch (err) {
                return (0, utils_1.failureResponse)({ data: err }, res);
            }
        });
    },
    sendOtp: function (req, res) {
        res.send({ message: "ok" });
    },
    checkValidUser: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let validUser = yield auth_service_1.default.checkValidUser({ username: req.body.username });
                if (!validUser.status)
                    return (0, utils_1.succesResponse)({ data: validUser.data, message: "Not a valid user " }, res);
                return (0, utils_1.succesResponse)({ data: validUser.data, message: "valid user" }, res);
            }
            catch (err) {
                return (0, utils_1.failureResponse)({ data: err }, res);
            }
        });
    },
    getAllRoles: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let allRoles = yield auth_service_1.default.getAllRoles();
                if (!allRoles.status)
                    return (0, utils_1.succesResponse)({ data: allRoles.data, message: "all roles " }, res);
                return (0, utils_1.succesResponse)({ data: allRoles.data, message: "" }, res);
            }
            catch (err) {
                return (0, utils_1.failureResponse)({ data: err }, res);
            }
        });
    },
};
exports.default = authController;

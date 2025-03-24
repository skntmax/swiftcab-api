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
const client_1 = require("@prisma/client");
const config_1 = __importDefault(require("../../config/config"));
const authController = {
    signin: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            try {
                let user = yield auth_service_1.default.loginUser({
                    emailOrUsername: (_a = req.body.emailOrUsername) !== null && _a !== void 0 ? _a : "",
                    password: (_b = req.body.password) !== null && _b !== void 0 ? _b : config_1.default.defaultPass,
                    userType: (_c = req.body.userType) !== null && _c !== void 0 ? _c : null,
                    phone: (_d = req.body.phone) !== null && _d !== void 0 ? _d : null
                });
                if (!user.status)
                    return (0, utils_1.succesResponse)({ data: user.data, message: "" }, res);
                return (0, utils_1.succesResponse)({ data: user.data, message: "logged in " }, res);
            }
            catch (err) {
                return (0, utils_1.failureResponse)({ data: err }, res);
            }
        });
    },
    loginByAuth: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { trafficBy = client_1.LoginBy.SWIFTCAB, userType, token } = req.body; //  default swiftcab  
                let user = yield auth_service_1.default.loginByAuth({ token, trafficBy, userType });
                if (!user.status)
                    return (0, utils_1.succesResponse)({ data: user.data, message: "" }, res);
                return (0, utils_1.succesResponse)({ data: user.data, message: "logged in " }, res);
            }
            catch (err) {
                return (0, utils_1.failureResponse)({ data: err }, res);
            }
        });
    },
    verifyMailLink: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
            try {
                const { userId, username } = req.userObj;
                let userVarify = yield auth_service_1.default.verifyMailLink({ userId: Number(userId), username, role: Number((_a = req.query) === null || _a === void 0 ? void 0 : _a.role) });
                if (!userVarify.status) {
                    return (0, utils_1.succesResponse)({ data: userVarify.data, message: "Not verified" }, res);
                }
                if (Number((_b = req.query) === null || _b === void 0 ? void 0 : _b.role) == 20) // client 
                    return res.redirect(`${process.env.NEXT_PUBLIC_CLIENT_PORTAL}?token=${(_c = userVarify === null || userVarify === void 0 ? void 0 : userVarify.data) === null || _c === void 0 ? void 0 : _c.token}&username=${(_e = (_d = userVarify === null || userVarify === void 0 ? void 0 : userVarify.data) === null || _d === void 0 ? void 0 : _d.usersObj) === null || _e === void 0 ? void 0 : _e.username}&firstName=${(_g = (_f = userVarify === null || userVarify === void 0 ? void 0 : userVarify.data) === null || _f === void 0 ? void 0 : _f.usersObj) === null || _g === void 0 ? void 0 : _g.firstName}&lastName=${(_j = (_h = userVarify === null || userVarify === void 0 ? void 0 : userVarify.data) === null || _h === void 0 ? void 0 : _h.usersObj) === null || _j === void 0 ? void 0 : _j.lastName}`);
                if (Number((_k = req.query) === null || _k === void 0 ? void 0 : _k.role) != 21) // client 
                    return res.redirect(`${process.env.NEXT_PUBLIC_ADMIN_PORTAL}?token=${(_l = userVarify === null || userVarify === void 0 ? void 0 : userVarify.data) === null || _l === void 0 ? void 0 : _l.token}&username=${(_o = (_m = userVarify === null || userVarify === void 0 ? void 0 : userVarify.data) === null || _m === void 0 ? void 0 : _m.usersObj) === null || _o === void 0 ? void 0 : _o.username}&firstName=${(_q = (_p = userVarify === null || userVarify === void 0 ? void 0 : userVarify.data) === null || _p === void 0 ? void 0 : _p.usersObj) === null || _q === void 0 ? void 0 : _q.firstName}&lastName=${(_s = (_r = userVarify === null || userVarify === void 0 ? void 0 : userVarify.data) === null || _r === void 0 ? void 0 : _r.usersObj) === null || _s === void 0 ? void 0 : _s.lastName}`);
            }
            catch (err) {
                return (0, utils_1.failureResponse)({ data: err }, res);
            }
        });
    },
    verifyOtp: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let otpVerify = yield auth_service_1.default.verifyOtp({ otp: req.body.otp, phone: req.body.phone });
                if (!otpVerify.status)
                    return (0, utils_1.failureResponse)({ data: otpVerify.data, message: "Otp not verified" }, res);
                return (0, utils_1.succesResponse)({ data: otpVerify.data, message: "Otp varified" }, res);
            }
            catch (err) {
                return (0, utils_1.failureResponse)({ data: err }, res);
            }
        });
    },
    signUp: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { trafficBy = client_1.LoginBy.SWIFTCAB } = req.body; // Default value applied here
                let user = yield auth_service_1.default.createUser({ email: req.body.email, password: req.body.password, username: req.body.username, userType: req.body.userType, trafficBy });
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
                const { userId, username } = req.userObj;
                let validUser = yield auth_service_1.default.checkValidUser({ id: Number(userId), userType: req.body.userType });
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
                const { cacheKey } = req;
                let allRoles = yield auth_service_1.default.getAllRoles(cacheKey);
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

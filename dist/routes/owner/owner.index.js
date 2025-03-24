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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const owner_controller_1 = __importDefault(require("../../controller/owner/owner.controller"));
const middleware_index_1 = __importStar(require("../../middlewares/middleware.index"));
const constant_1 = require("../../config/constant");
let ownerRouter = (0, express_1.Router)();
ownerRouter.post('/insert-owner-vhicles', middleware_index_1.default.checkUserRoles(constant_1.userRoles.owner), owner_controller_1.default.createOwnerHasVhicles);
ownerRouter.get('/owner-ownes-vhicle', middleware_index_1.default.checkUserRoles(constant_1.userRoles.owner), owner_controller_1.default.ownerOwnesVhicles);
ownerRouter.post('/create-vhicle-provide-services', middleware_index_1.default.checkUserRoles(constant_1.userRoles.owner), owner_controller_1.default.vhicleProvidesServices);
ownerRouter.get('/owner-active-vhicle-list', middleware_index_1.default.checkUserRoles(constant_1.userRoles.owner), owner_controller_1.default.ownerActiveVhicleList);
ownerRouter.get('/get-vhicle-services-list', middleware_index_1.default.checkUserRoles(constant_1.userRoles.owner), owner_controller_1.default.getVhicleServicesList);
ownerRouter.get('/get-roles', middleware_index_1.default.inCache(constant_1.REDIS_KEYS.USER_ROLE), owner_controller_1.default.getUserTypes);
ownerRouter.post('/kyc-request', middleware_index_1.default.checkUserRoles(constant_1.userRoles.owner), middleware_index_1.vhicleDocUpload, owner_controller_1.default.kycRequest);
ownerRouter.get('/get-nav', middleware_index_1.default.checkUserRoles(constant_1.userRoles.owner), owner_controller_1.default.getNavbar);
exports.default = ownerRouter;

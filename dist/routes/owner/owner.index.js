"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const owner_controller_1 = __importDefault(require("../../controller/owner/owner.controller"));
let ownerRouter = (0, express_1.Router)();
ownerRouter.post('/insert-owner-vhicles', owner_controller_1.default.ownerHasVhicles);
ownerRouter.get('/get-user-types', owner_controller_1.default.getUserTypes);
exports.default = ownerRouter;

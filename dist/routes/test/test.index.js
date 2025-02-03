"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const testController_index_1 = __importDefault(require("../../controller/test/testController.index"));
let testRouter = (0, express_1.Router)();
testRouter.get('/status', 
//   middlewares.checkRoles,
testController_index_1.default.checkStatus);
testRouter.get('/insert-vhicle', testController_index_1.default.insertVhicle);
testRouter.get('/add-services', testController_index_1.default.addVhicleServices);
testRouter.get('/add-servies-utils', testController_index_1.default.addServicesUtils);
testRouter.get('/get-random-name', testController_index_1.default.getRandomName);
testRouter.get('/insert-vhicle-types', testController_index_1.default.insertVhicleTypes);
testRouter.get('/type-of-user', testController_index_1.default.insertTypeOfUser);
testRouter.get('/insert-roles', testController_index_1.default.insertRoles);
testRouter.get('/insert-perm', testController_index_1.default.insertPermissions);
exports.default = testRouter;

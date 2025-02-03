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
const utils_1 = require("../../config/utils");
const owner_service_1 = __importDefault(require("../../services/owner/owner.service"));
const ownerController = {
    ownerHasVhicles: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let ownerVhicle = yield owner_service_1.default.createOwnerHasVhicles({ ownerId: req.body.ownerId, vhicleId: req.body.vhicleId });
                if (!ownerVhicle.status)
                    return (0, utils_1.succesResponse)({ data: ownerVhicle.data, message: "" }, res);
                return (0, utils_1.succesResponse)({ data: ownerVhicle.data, message: "Inserted " }, res);
            }
            catch (err) {
                return (0, utils_1.failureResponse)({ data: err }, res);
            }
        });
    },
    getUserTypes: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userTypes = yield owner_service_1.default.getUseTypes();
                return (0, utils_1.succesResponse)({ data: userTypes.data, message: "Inserted " }, res);
            }
            catch (err) {
                return (0, utils_1.failureResponse)({ data: err }, res);
            }
        });
    },
};
exports.default = ownerController;

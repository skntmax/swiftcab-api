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
const db_1 = __importDefault(require("../../db"));
const ownerService = {
    createOwnerHasVhicles: function (ownerPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let vhicleTypeInsert = yield db_1.default.owner_has_vhicles.create({
                    data: {
                        owner: ownerPayload.ownerId,
                        v_type: ownerPayload.vhicleId,
                        created_on: new Date(),
                        updated_on: new Date(),
                    }
                });
                return (0, utils_1.successReturn)(vhicleTypeInsert);
            }
            catch (err) {
                console.log(err);
                return (0, utils_1.failureReturn)(err);
            }
        });
    },
    getUseTypes: function () {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userTyes = yield db_1.default.type_of_user.findMany({
                    select: { id: true, user_type: true }
                });
                return (0, utils_1.successReturn)(userTyes);
            }
            catch (err) {
                return (0, utils_1.failureReturn)(err);
            }
        });
    },
};
exports.default = ownerService;
// try {
//     return successReturn("")
//      }catch(err) {
//            return failureReturn(err)
//      }

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
const db_1 = __importDefault(require("../../db"));
// import redisClient from "../../services/redis/redis.index"
const testController = {
    insertVhicle: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // let vh = await primsaClient.vhicle.create({
            //     data: {
            //         username: "skntmax", // Updated to lowercase
            //         name: "name1",
            //         rc: "rc",
            //         type: "car",
            //         created_on: new Date(),
            //         updated_on: new Date(),
            //       },
            // })
            // console.log(vh)
            res.send({ message: "insert vchile" });
        });
    },
    addVhicleServices: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let services = ['Commercial', 'Full Day Book', 'Tourist plan ', 'Emergency/Night', "ßCommercial/cross-ite/outer city"];
            for (let val of services) {
                let service = yield db_1.default.vhicle_services.create({
                    data: {
                        service_name: val,
                        created_on: new Date(),
                        updated_on: new Date(),
                    },
                });
                console.log(service);
            }
            res.send({ message: "added services" });
        });
    },
    addServicesUtils: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let services = [
                { id: 1, food: false, water: false, guide: false },
                { id: 2, food: true, water: true, guide: true },
                { id: 3, food: true, water: true, guide: true },
                { id: 4, food: false, water: true, guide: false },
            ];
            //    for(let obj of  services) {
            //     await  primsaClient.services_have_utils.create()
            //   }
            res.send({ message: "added services utils" });
        });
    },
    getRandomName: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.send({ message: `${Math.ceil(Math.random() * 100)}_random` });
        });
    },
    insertVhicleTypes: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let arr = [
                { vhicle_type: "2 Wheeler", disc: "2 wheeler  vhicle" },
                { vhicle_type: "3 Wheeler", disc: "3 wheeler  vhicle" },
                { vhicle_type: "4 Wheeler", disc: "3 wheeler  vhicle" },
            ];
            let current_date = new Date();
            for (let obj of arr) {
                let type_of_vhicle = yield db_1.default.type_of_vhicle.create({
                    data: {
                        vhicle_type: obj.vhicle_type,
                        disc: obj.disc,
                        created_on: current_date,
                        updated_on: current_date,
                    }
                });
                console.log(type_of_vhicle);
            }
            res.send({ message: `inserted  vhile types ` });
        });
    },
    insertTypeOfUser: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let arr = ["client", "Owner"];
            for (let uerType of arr) {
                let type_of_user = yield db_1.default.type_of_user.create({
                    data: {
                        user_type: uerType,
                        created_on: new Date(),
                        updated_on: new Date(),
                    }
                });
            }
            res.send({ message: `type of user inserted ` });
        });
    },
};
exports.default = testController;

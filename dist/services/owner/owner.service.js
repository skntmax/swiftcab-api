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
const constant_1 = require("../../config/constant");
const db_2 = __importDefault(require("../../db"));
const redis_index_1 = require("../redis/redis.index");
const uuid_1 = require("uuid");
const cloudinary_1 = require("../cloudinary");
const middleware_index_1 = require("../../middlewares/middleware.index");
const client_1 = require("@prisma/client");
const ownerService = {
    genUsername: () => {
        return `SWC-${(0, uuid_1.v4)()}`;
    },
    genRc: (number) => {
        return `SWC-RC-${(0, uuid_1.v4)()}${number}`;
    },
    genNickname: () => {
        return `SWC-NCN-${(0, uuid_1.v4)()}`;
    },
    createOwnerHasVhicles: function (ownerPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let vhicleTypeInsert = yield db_1.default.vhicle.create({
                    data: {
                        username: this.genUsername(),
                        name: this.genNickname(),
                        rc: this.genRc(Math.random() * 1000),
                        vhicle_type_id: ownerPayload.vhicleId,
                        vhicle_owner_id: ownerPayload.ownerId,
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
    ownerVhicles: function (ownerPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let ownerOwnsVhicles = yield db_1.default.$queryRawUnsafe(`
                select vh.id as vhicle_id  , vh.username  , vh.is_kyc , vh.username as vhicle_username , vh.kyc_varification ,
               vh.name , vh.rc, vh.is_kyc, vh.vin , vh.license_plate , vh.manufacturer , vh.model , vh.year , vh.color , vh.engine_number , vh.chassis_number,
               vh.fuel_type , vh.ss_one , vh.ss_two , vh.rc_doc ,
                  tov.vhicle_type as vhicle , tov.disc  from users u 
                inner join user_has_roles uhr on uhr.user_id = u.id 
                inner join vhicle vh on vh.vhicle_owner_id   = u.id 
                inner join type_of_vhicle tov ON tov.id = vh.vhicle_type_id 
                where uhr.role_id in(select id as owenrId from  roles r where r."name" ='${constant_1.userRoles.owner}' )
                and u.id = ${ownerPayload === null || ownerPayload === void 0 ? void 0 : ownerPayload.ownerId} and vh.is_active = true  
              `);
                return (0, utils_1.successReturn)(ownerOwnsVhicles);
            }
            catch (err) {
                console.log(err);
                return (0, utils_1.failureReturn)(err);
            }
        });
    },
    getUserTypes: function (cacheKey) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userTyes = yield db_1.default.roles.findMany({
                    select: { id: true, name: true }
                });
                let limitedUserTypesToProvideLogin = userTyes.filter(ele => [constant_1.userRoles.customer, constant_1.userRoles.owner].includes(ele.name));
                if (cacheKey)
                    yield redis_index_1.redisClient1.set(cacheKey, JSON.stringify(limitedUserTypesToProvideLogin));
                return (0, utils_1.successReturn)(limitedUserTypesToProvideLogin);
            }
            catch (err) {
                console.log("err>>", err);
                return (0, utils_1.failureReturn)(err);
            }
        });
    },
    vhicleProvidesServices: function (payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let addVhServices = yield db_2.default.vhicle_provides_services.create({
                    data: {
                        vhicle_id: payload.vhicleId,
                        service_id: payload.serviceId,
                        created_on: new Date(),
                        updated_on: new Date(),
                    }
                });
                return (0, utils_1.successReturn)(addVhServices);
            }
            catch (err) {
                console.log("err>>", err);
                return (0, utils_1.failureReturn)(err);
            }
        });
    },
    getVhicleServicesList: function (payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let vhicleProvidesServiesList = yield db_2.default.$queryRawUnsafe(` 
            select   v.username vhicle_username, tov.vhicle_type as vhicle_type , vs.service_name  from users u 
            inner join  vhicle v on v.vhicle_owner_id = u.id 
            inner join  vhicle_provides_services vps on  vps.vhicle_id = v.id 
            inner join  type_of_vhicle tov on tov.id = v.vhicle_type_id 
            inner join  vhicle_services vs on vs.id = vps.service_id 
            where u.id = ${payload.ownerId}
            `);
                return (0, utils_1.successReturn)(vhicleProvidesServiesList);
            }
            catch (err) {
                console.log("err>>", err);
                return (0, utils_1.failureReturn)(err);
            }
        });
    },
    ownerActiveVhicleList: function (payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let ownerVhicleList = yield db_2.default.$queryRawUnsafe(` 
              select v.id ,v.is_kyc , v.username as vhicle_username , tov.vhicle_type as name  from vhicle v 
              inner join type_of_vhicle tov ON tov.id = v.vhicle_type_id 
              where  v.vhicle_owner_id =${payload.ownerId} and v.is_active =true 
              `);
                return (0, utils_1.successReturn)(ownerVhicleList);
            }
            catch (err) {
                console.log("err>>", err);
                return (0, utils_1.failureReturn)(err);
            }
        });
    },
    kycRequest: function (payload, docs) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                let ownerVhicle = yield ownerService.ownerVhicles({ ownerId: Number(payload === null || payload === void 0 ? void 0 : payload.userId) });
                if (!ownerVhicle.status)
                    return (0, utils_1.failureReturn)("you don't own any vhicle");
                if (ownerVhicle.data) {
                    let doesOwnerOwnVhicle = (_a = ownerVhicle.data) === null || _a === void 0 ? void 0 : _a.some((ele) => ele.vhicle_id == payload.id);
                    if (!doesOwnerOwnVhicle)
                        return (0, utils_1.failureReturn)("you don't own this vhicle");
                }
                const { ss_one, ss_two, rc_doc } = docs;
                if (ss_one.lenth == 0 || ss_two.length == 0 || rc_doc.length == 0)
                    return (0, utils_1.failureReturn)(" Documents if mendatory");
                let ssOnePath = yield cloudinary_1.cld1.upload(ss_one[0].path, `${payload.userId}-${(0, uuid_1.v4)()}`);
                let ssTwoPath = yield cloudinary_1.cld1.upload(ss_two[0].path, `${payload.userId}-${(0, uuid_1.v4)()}`);
                let rcDocPath = yield cloudinary_1.cld1.upload(rc_doc[0].path, `${payload.userId}-${(0, uuid_1.v4)()}`);
                if (!ssOnePath || !ssTwoPath || !rcDocPath) {
                    yield (0, middleware_index_1.deleteFiles)([ss_one[0], ss_two[0], rc_doc[0]]);
                    return (0, utils_1.failureReturn)({ erroMessage: "Not uploaded on cloudinary ", error: { ssOnePath, ssTwoPath, rcDocPath } });
                }
                let { url: ss_one_url } = ssOnePath;
                let { url: ss_two_url } = ssTwoPath;
                let { url: rc_doc_url } = rcDocPath;
                let fileForKyc = yield db_2.default.vhicle.update({
                    data: {
                        vin: payload.vin,
                        license_plate: payload.license_plate,
                        manufacturer: payload.manufacturer,
                        model: payload.model,
                        year: payload.year, // DateTime in TypeScript
                        color: payload.color,
                        engine_number: payload.engine_number,
                        chassis_number: payload.chassis_number,
                        fuel_type: payload.fuel_type,
                        transmission: payload.transmission, // Restrict to known values
                        ss_one: ss_one_url,
                        ss_two: ss_two_url,
                        rc_doc: rc_doc_url,
                        is_active: true,
                        is_kyc: false,
                        kyc_varification: "INITIATED"
                    },
                    where: {
                        id: Number(payload.id),
                        vhicle_owner_id: payload.userId
                    }
                });
                // deleting files
                setTimeout(() => __awaiter(this, void 0, void 0, function* () { return yield (0, middleware_index_1.deleteFiles)([ss_one[0], ss_two[0], rc_doc[0]]); }), 4000); // files getting deleted after 4000 ms 
                return (0, utils_1.successReturn)(fileForKyc);
            }
            catch (err) {
                console.log("err>>", err);
                (0, middleware_index_1.deleteFiles)(docs);
                return (0, utils_1.failureReturn)(err);
            }
        });
    },
    getNavbar: function (payload) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                let navbarByRole = yield db_2.default.$queryRawUnsafe(` 
              select r."name" as role , ni.nav_item , ni.sub_menu , ni.href, sni.sub_nav_item , sni.href  as sub_href  , sni.icon  as sub_icon    from nav_items ni 
              inner join nav_has_permission_by_role nhpbr ON nhpbr.nav_item_id = ni.id 
              inner join roles r ON r.id = nhpbr.role_id 
              inner join  sub_nav_items sni on  ni.id  = sni.nav_item_id
              where nhpbr.role_id = ${payload.role}
              `);
                if ((navbarByRole === null || navbarByRole === void 0 ? void 0 : navbarByRole.length) == 0)
                    return (0, utils_1.successReturn)(navbarByRole);
                let nav = (0, utils_1.transformNavItems)(navbarByRole, payload.username, (_a = navbarByRole[0].role) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase());
                return (0, utils_1.successReturn)(nav);
            }
            catch (err) {
                console.log("err>>", err);
                return (0, utils_1.failureReturn)(err);
            }
            ``;
        });
    },
    getActiveUsers: function (payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { limit, page } = payload;
                let skip = (page - 1) * limit;
                // with manual search by usernameOrEmail , with registered vhicles 
                if (payload.usernameOrEmail || payload.searchByManual) {
                    // if searched by username or email 
                    let where = `WHERE (u.email like '%${payload.usernameOrEmail}%'  OR u.username like '%${payload.usernameOrEmail}%') AND r."name"='${constant_1.userRoles.owner}'`;
                    let query = ` 
                      SELECT u.id ,  u.username username,  u.email email, uhr.role_id AS role_id  , r."name"  as role ,
                      v.id as vhicle_id , v.username as vhicle_username
                      FROM users u
                      INNER JOIN user_has_roles uhr ON uhr.user_id = u.id
                      inner join roles r ON r.id  = uhr.role_id 
                      inner join  vhicle v on v.vhicle_owner_id = u.id   
                  `;
                    if (payload.usernameOrEmail)
                        query = query + where;
                    let totalQuery = `
                  select count(dt.id) as total from (${query}) as dt `;
                    query = query + `offset  ${skip} limit ${limit}`;
                    console.log(query);
                    let totalUsersWithVhicles = yield db_2.default.$queryRawUnsafe(totalQuery);
                    let searchByuser = yield db_2.default.$queryRawUnsafe(query);
                    let finalResult = searchByuser.reduce((acc, ele) => {
                        if (acc.filter((_) => (_ === null || _ === void 0 ? void 0 : _.id) == ele.id).length == 0) {
                            acc.push({
                                "id": ele.id,
                                "username": ele.username,
                                "email": ele.email,
                                "role_id": ele.role_id,
                                "role": ele.role,
                                vhicles: [{ vhicle_id: ele.vhicle_id, vhicle_username: ele.vhicle_username }]
                            });
                        }
                        else {
                            acc.forEach((_) => {
                                if (_.id == ele.id) {
                                    _.vhicles = [..._.vhicles, { vhicle_id: ele.vhicle_id, vhicle_username: ele.vhicle_username }];
                                }
                            });
                        }
                        return acc;
                    }, []);
                    return (0, utils_1.successReturn)({ users: finalResult, metadata: { page, limit, total: Number(totalUsersWithVhicles[0].total || 0) } });
                }
                // without any search filter 
                let query = ` select  u.id ,  u.username , u.email,  uhr.role_id ,  r."name" as role  from  users u
              inner join user_has_roles uhr on uhr.user_id = u.id 
              inner join  roles r on r.id  = uhr.role_id `;
                if (Array.isArray(payload.role) && payload.role.length > 0) {
                    query = query + `where r.id in(${payload.role.join(',')})`;
                }
                let totalQuery = `
               select count(dt.id) as total from (${query}) as dt `;
                query = query + ` offset  ${skip} limit ${limit} `;
                let users = yield db_2.default.$queryRawUnsafe(query);
                let totalUsers = yield db_2.default.$queryRawUnsafe(totalQuery);
                return (0, utils_1.successReturn)({ users, metadata: { page, limit, total: Number(totalUsers[0].total) } });
            }
            catch (err) {
                console.log("err>>", err);
                return (0, utils_1.failureReturn)(err);
            }
        });
    },
    getVhicleDetailsById: function (payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let vhicleDetail = yield db_2.default.vhicle.findMany({
                    where: {
                        id: {
                            in: payload.vhicleIds,
                        },
                        // kyc_varification:"INITIATED",
                        vhicle_owner_id: payload.ownerId
                    },
                });
                return (0, utils_1.successReturn)(vhicleDetail);
            }
            catch (err) {
                console.log("err>>", err);
                return (0, utils_1.failureReturn)(err);
            }
            ``;
        });
    },
    approveVhicleKyc: function (payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let updatedVhicleKycStatus = yield db_2.default.vhicle.update({
                    where: {
                        id: payload.vhicleId,
                        vhicle_owner_id: payload.ownerId
                    },
                    data: {
                        kyc_varification: payload.kycStatus,
                        is_kyc: (payload.kycStatus == client_1.KycStatus.COMPLETED || payload.kycStatus == client_1.KycStatus.VERIFIED) ? true : false
                    }
                });
                return (0, utils_1.successReturn)(updatedVhicleKycStatus);
            }
            catch (err) {
                console.log("err>>", err);
                return (0, utils_1.failureReturn)(err);
            }
            ``;
        });
    },
};
exports.default = ownerService;
// try {
//     return successReturn("")
//      }catch(err) {
//            return failureReturn(err)
//      }

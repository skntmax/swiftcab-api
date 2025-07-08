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
const client_1 = require("@prisma/client");
const ownerController = {
    createOwnerHasVhicles: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, username } = req.userObj;
                let ownerVhicle = yield owner_service_1.default.createOwnerHasVhicles({ ownerId: Number(userId), vhicleId: req.body.vhicleId });
                if (!ownerVhicle.status)
                    return (0, utils_1.succesResponse)({ data: ownerVhicle.data, message: "" }, res);
                return (0, utils_1.succesResponse)({ data: ownerVhicle.data, message: "Inserted " }, res);
            }
            catch (err) {
                console.log(err);
                return (0, utils_1.failureResponse)({ data: err }, res);
            }
        });
    },
    ownerOwnesVhicles: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, username } = req.userObj;
                let ownerVhicles = yield owner_service_1.default.ownerVhicles({ ownerId: Number(userId) });
                if (!ownerVhicles.status)
                    return (0, utils_1.succesResponse)({ data: ownerVhicles.data, message: "" }, res);
                return (0, utils_1.succesResponse)({ data: ownerVhicles.data, message: "got results" }, res);
            }
            catch (err) {
                console.log(err);
                return (0, utils_1.failureResponse)({ data: err }, res);
            }
        });
    },
    getUserTypes: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cacheKey } = req;
                let userTypes = yield owner_service_1.default.getUserTypes(cacheKey);
                return (0, utils_1.succesResponse)({ data: userTypes.data, message: "user roles" }, res);
            }
            catch (err) {
                console.log(err);
                return (0, utils_1.failureResponse)({ data: err }, res);
            }
        });
    },
    kycRequest: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let docs = req.files;
                const { userId, username } = req.userObj;
                let kycRequest = yield owner_service_1.default.kycRequest(Object.assign({ userId: Number(userId) }, req.body), docs);
                return (0, utils_1.succesResponse)({ data: kycRequest.data, message: "user roles" }, res);
            }
            catch (err) {
                console.log(err);
                return (0, utils_1.failureResponse)({ data: err }, res);
            }
        });
    },
    vhicleProvidesServices: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, username } = req.userObj;
                let vhProvidesServices = yield owner_service_1.default.vhicleProvidesServices({ vhicleId: req.body.vhicleId, serviceId: req.body.serviceId });
                if (!vhProvidesServices.status)
                    return (0, utils_1.succesResponse)({ data: "null", message: vhProvidesServices === null || vhProvidesServices === void 0 ? void 0 : vhProvidesServices.data }, res);
                return (0, utils_1.succesResponse)({ data: vhProvidesServices.data, message: "vhicle serviced added" }, res);
            }
            catch (err) {
                console.log(err);
                return (0, utils_1.failureResponse)({ data: err }, res);
            }
        });
    },
    ownerActiveVhicleList: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, username } = req.userObj;
                let ownerActiveVhicleList = yield owner_service_1.default.ownerActiveVhicleList({ ownerId: Number(userId) });
                if (!ownerActiveVhicleList.status)
                    return (0, utils_1.succesResponse)({ data: "null", message: ownerActiveVhicleList === null || ownerActiveVhicleList === void 0 ? void 0 : ownerActiveVhicleList.data }, res);
                return (0, utils_1.succesResponse)({ data: ownerActiveVhicleList.data, message: "vhicle serviced added" }, res);
            }
            catch (err) {
                console.log(err);
                return (0, utils_1.failureResponse)({ data: err }, res);
            }
        });
    },
    getVhicleServicesList: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, username } = req.userObj;
                let vhProvidesServices = yield owner_service_1.default.getVhicleServicesList({ ownerId: Number(userId) });
                if (!vhProvidesServices.status)
                    return (0, utils_1.succesResponse)({ data: "null", message: vhProvidesServices === null || vhProvidesServices === void 0 ? void 0 : vhProvidesServices.data }, res);
                return (0, utils_1.succesResponse)({ data: vhProvidesServices.data, message: "vhicle serviced added" }, res);
            }
            catch (err) {
                console.log(err);
                return (0, utils_1.failureResponse)({ data: err }, res);
            }
        });
    },
    getNavbar: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, username } = req.userObj;
                const { user_has_roles } = req;
                let navbar = yield owner_service_1.default.getNavbar({ ownerId: Number(userId), role: user_has_roles, username: username });
                if (!navbar.status)
                    return (0, utils_1.succesResponse)({ data: "null", message: navbar === null || navbar === void 0 ? void 0 : navbar.data }, res);
                return (0, utils_1.succesResponse)({ data: navbar.data, message: "nav bar " }, res);
            }
            catch (err) {
                console.log(err);
                return (0, utils_1.failureResponse)({ data: err }, res);
            }
        });
    },
    getActiveUsers: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, username } = req.userObj;
                const { user_has_roles } = req;
                const { roles, page = 1, limit = 20, usernameOrEmail = undefined, searchByManual = false } = req.body;
                let activeUsers = yield owner_service_1.default.getActiveUsers({ ownerId: Number(userId), role: roles, page, limit, usernameOrEmail, searchByManual });
                if (!activeUsers.status)
                    return (0, utils_1.succesResponse)({ data: "null", message: activeUsers === null || activeUsers === void 0 ? void 0 : activeUsers.data }, res);
                return (0, utils_1.succesResponse)({ data: activeUsers.data, message: " Users with roles and vhicles " }, res);
            }
            catch (err) {
                console.log(err);
                return (0, utils_1.failureResponse)({ data: err }, res);
            }
        });
    },
    getVhicleDetailsById: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { vhicleIds, ownerId } = req.body;
                const { user_has_roles } = req;
                let vhicleDetail = yield owner_service_1.default.getVhicleDetailsById({ vhicleIds: vhicleIds, ownerId: Number(ownerId) });
                if (!vhicleDetail.status)
                    return (0, utils_1.succesResponse)({ data: "null", message: vhicleDetail === null || vhicleDetail === void 0 ? void 0 : vhicleDetail.data }, res);
                return (0, utils_1.succesResponse)({ data: vhicleDetail.data, message: " Users with roles and vhicles " }, res);
            }
            catch (err) {
                console.log(err);
                return (0, utils_1.failureResponse)({ data: err }, res);
            }
        });
    },
    approveKycRequest: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { vhicleId, ownerId, kycStatus = client_1.KycStatus.INITIATED } = req.body;
                const { user_has_roles } = req;
                let kycApprovedOrRejected = yield owner_service_1.default.approveVhicleKyc({ vhicleId, ownerId: Number(ownerId), kycStatus });
                if (!kycApprovedOrRejected.status)
                    return (0, utils_1.succesResponse)({ data: "null", message: kycApprovedOrRejected === null || kycApprovedOrRejected === void 0 ? void 0 : kycApprovedOrRejected.data }, res);
                return (0, utils_1.succesResponse)({ data: kycApprovedOrRejected.data, message: " Kyc approve or rejected status " }, res);
            }
            catch (err) {
                console.log(err);
                return (0, utils_1.failureResponse)({ data: err }, res);
            }
        });
    },
    removeUserByUsername: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username } = req.body;
                const { user_has_roles } = req;
                let userRemoved = yield owner_service_1.default.removeUserByUsername({ username });
                if (!userRemoved.status)
                    return (0, utils_1.succesResponse)({ data: "null", message: userRemoved === null || userRemoved === void 0 ? void 0 : userRemoved.data }, res);
                return (0, utils_1.succesResponse)({ data: userRemoved.data, message: " User removed" }, res);
            }
            catch (err) {
                console.log(err);
                return (0, utils_1.failureResponse)({ data: err }, res);
            }
        });
    },
    blockUnblockuser: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, isActive = false } = req.body;
                const { user_has_roles } = req;
                let userRemoved = yield owner_service_1.default.blockUnblockuser({ isActive, username });
                if (!userRemoved.status)
                    return (0, utils_1.succesResponse)({ data: "null", message: userRemoved === null || userRemoved === void 0 ? void 0 : userRemoved.data }, res);
                return (0, utils_1.succesResponse)({ data: userRemoved.data, message: " User removed" }, res);
            }
            catch (err) {
                console.log(err);
                return (0, utils_1.failureResponse)({ data: err }, res);
            }
        });
    },
    updateVhicleAvatar: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let docs = req.files;
                let updateVhicleAvatar = yield owner_service_1.default.updateVhicleAvatar({ docs });
                if (!updateVhicleAvatar.status)
                    return (0, utils_1.succesResponse)({ data: updateVhicleAvatar === null || updateVhicleAvatar === void 0 ? void 0 : updateVhicleAvatar.data, message: updateVhicleAvatar === null || updateVhicleAvatar === void 0 ? void 0 : updateVhicleAvatar.data }, res);
                return (0, utils_1.succesResponse)({ data: updateVhicleAvatar.data, message: " User removed" }, res);
            }
            catch (err) {
                console.log(err);
                return (0, utils_1.failureResponse)({ data: err }, res);
            }
        });
    },
    uploadMasterDoc: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let docs = req.files;
                let masterUploadDoc = yield owner_service_1.default.uploadMasterDoc({ docs });
                if (!masterUploadDoc.status)
                    return (0, utils_1.failureResponse)({ data: masterUploadDoc === null || masterUploadDoc === void 0 ? void 0 : masterUploadDoc.data, message: masterUploadDoc === null || masterUploadDoc === void 0 ? void 0 : masterUploadDoc.data }, res);
                return (0, utils_1.succesResponse)({ data: masterUploadDoc.data, message: " Doc Uploaded" }, res);
            }
            catch (err) {
                console.log(err);
                return (0, utils_1.failureResponse)({ data: err }, res);
            }
        });
    },
};
exports.default = ownerController;

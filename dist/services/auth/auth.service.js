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
const dotenv_1 = __importDefault(require("../../config/dotenv"));
const utils_1 = require("../../config/utils");
const auth_package_1 = require("../../packages/auth.package");
const index_1 = __importDefault(require("./../../db/index"));
const redis_index_1 = require("../redis/redis.index");
const config_1 = __importDefault(require("../../config/config"));
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const queues_1 = require("../queues");
const server_1 = require("../../server");
const mailConfig_1 = require("../../config/mailConfig");
const mailer_1 = require("../../types/mailer");
const VerifyUser_1 = require("../../config/MailerTemplates/VerifyUser");
const moment_1 = __importDefault(require("moment"));
const authService = {
    loginUser: function (userPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const { emailOrUsername, password, userType, phone } = userPayload; // default as client or customer , 1- customer , 2- owner 
                // let newUser =await executeStoredProcedure('get_user_roles', [emailOrUsername, emailOrUsername, userType as number])
                // newUser= newUser[0]
                let newUserArray = yield index_1.default.$queryRawUnsafe(` 
                 SELECT x.*
                FROM (
                  SELECT u.id ,  u.username username, 
              u.email email,
              uhr.role_id AS role_id, u.is_active , u.phone_no,
                COALESCE(u.first_name::text, '') as first_name  , COALESCE (u.last_name::text, '') as last_name , u.password user_password 
                  FROM users u
                  INNER JOIN user_has_roles uhr ON uhr.user_id = u.id
                  WHERE (u.email = $1  OR u.username = $1 OR  u.phone_no=$3  )
                ) x
                WHERE x.role_id = $2 AND x.is_active = true  `, emailOrUsername, userType, phone);
                // Fix: Assign the first object to a new variable
                let newUser = newUserArray.length > 0 ? newUserArray[0] : undefined;
                console.log(newUser, "newUser");
                // if logged in by phone m then added in the queue 
                if (phone) {
                    if (!newUser) { // if phone exist and  newuser does not . then create a new user and send otp on the number   
                        let userByPhone = yield index_1.default.users.findFirst({
                            where: {
                                phone_no: phone.toString()
                            }
                        });
                        //  accountStatus:false  -- used for mail  varification 
                        if (!userByPhone) { // user does not exist , then register first and then send otp 
                            let newUserObj = { email: "", password: config_1.default.defaultPass, phone: phone.toString(), username: (0, utils_1.generateUsername)(''), userType: Number(userType), trafficBy: client_1.LoginBy.SWIFTCAB, accountStatus: false };
                            let userCreated = yield this.createNewPhoneUser(newUserObj);
                            if (!userCreated.status)
                                return (0, utils_1.failureReturn)({ data: userCreated.data, message: "User already exist" });
                            queues_1.login_user_otp.enqueue('user_otp', { phone, id: (_a = userCreated === null || userCreated === void 0 ? void 0 : userCreated.data) === null || _a === void 0 ? void 0 : _a.id, username: (_b = userCreated === null || userCreated === void 0 ? void 0 : userCreated.data) === null || _b === void 0 ? void 0 : _b.username });
                        }
                    }
                    else { // if phone payload exist and  user also  exist relaetd to  this  phone , then simply  send login otp    
                        queues_1.login_user_otp.enqueue('user_otp', { phone, id: newUser.id, username: newUser.username });
                    }
                    return (0, utils_1.successReturn)("OTP has been sent on your Mobile" + phone);
                }
                if (!newUser)
                    return (0, utils_1.failureReturn)('Please register first');
                let isPass = yield auth_package_1.bcrypt.compare(password, newUser === null || newUser === void 0 ? void 0 : newUser.user_password);
                if (!isPass)
                    return (0, utils_1.failureReturn)('Invalid credential');
                let payload = { id: newUser.id, username: newUser.username };
                let token = jsonwebtoken_1.default.sign(payload, dotenv_1.default.SECRET_KEY, { expiresIn: "2h" });
                return (0, utils_1.successReturn)({ token, usersObj: { username: newUser.username, firstName: newUser.first_name, lastName: newUser.last_name } });
            }
            catch (err) {
                console.log(err);
                return (0, utils_1.failureReturn)(err);
            }
        });
    },
    loginByAuth: function (userPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token, trafficBy, userType } = userPayload; // default as client or customer , 1- customer , 2- owner 
                let newUser;
                if (userPayload.trafficBy == client_1.LoginBy.GOOGLE) {
                    newUser = jsonwebtoken_1.default.decode(token);
                    if (!newUser)
                        (0, utils_1.failureReturn)({ data: "user not found or invalid token " });
                    let objPrototype = {
                        username: newUser === null || newUser === void 0 ? void 0 : newUser.name,
                        email: newUser === null || newUser === void 0 ? void 0 : newUser.email,
                        trafficBy: trafficBy,
                        profile_pic: newUser === null || newUser === void 0 ? void 0 : newUser.picture,
                    };
                    let userExist = yield index_1.default.users.findFirst({
                        where: {
                            OR: [
                                { username: objPrototype === null || objPrototype === void 0 ? void 0 : objPrototype.username },
                                { email: objPrototype === null || objPrototype === void 0 ? void 0 : objPrototype.email }
                            ]
                        }
                    });
                    if (!userExist) {
                        // user does not  exist , then create a new record
                        let newUserObj = { email: newUser.email, password: config_1.default.defaultPass, username: (0, utils_1.generateUsername)(newUser.name), userType: userPayload.userType, trafficBy: userPayload.trafficBy, accountStatus: true };
                        let userCreated = yield this.createUser(newUserObj);
                        if (!userCreated.status)
                            return (0, utils_1.failureReturn)({ data: userCreated.data, message: "User already exist" });
                        return (0, utils_1.successReturn)(userCreated === null || userCreated === void 0 ? void 0 : userCreated.data);
                    }
                    else {
                        // if user already exist 
                        console.log("user already exist");
                        let payload = { id: userExist.id, username: userExist.username };
                        let token = jsonwebtoken_1.default.sign(payload, dotenv_1.default.SECRET_KEY, { expiresIn: "2h" });
                        // Fix: Assign the first object to a new variable
                        return (0, utils_1.successReturn)({ token, usersObj: { username: userExist.username, firstName: userExist.first_name, lastName: userExist.last_name } });
                    }
                }
                // return successReturn({token ,  usersObj :{  username: newUser.username , firstName :newUser.first_name , lastName : newUser.last_name}}  )  
                return (0, utils_1.successReturn)({ token, newUser });
            }
            catch (err) {
                console.log(err);
                return (0, utils_1.failureReturn)(err);
            }
        });
    },
    createNewPhoneUser: function (userPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                if (!userPayload.accountStatus) {
                    userPayload.accountStatus = false; // by default 
                }
                const { email, password, userType, username, phone } = userPayload;
                let userExist = yield index_1.default.users.findFirst({
                    where: {
                        phone_no: phone === null || phone === void 0 ? void 0 : phone.toString()
                    }
                });
                if (userExist) {
                    if (userExist.is_active) {
                        return (0, utils_1.failureReturn)("User already exists");
                    }
                    else if (!userExist.is_active) {
                        return (0, utils_1.failureReturn)(`Please verify your account by clicking on the link sent on mail: ${email}`);
                    }
                }
                let hashPass = yield auth_package_1.bcrypt.hash(password !== null && password !== void 0 ? password : config_1.default.defaultPass, 10);
                // generating user in user table 
                let newUser = yield index_1.default.users.create({
                    data: {
                        username: username !== null && username !== void 0 ? username : (0, utils_1.generateUsername)('SWC' + Math.random() * 100),
                        password: hashPass,
                        email: email ? email : (0, utils_1.generateEmail)(""),
                        phone_no: (_a = userPayload.phone) !== null && _a !== void 0 ? _a : null,
                        is_active: userPayload.accountStatus,
                        traffic_from: (_b = userPayload.trafficBy) !== null && _b !== void 0 ? _b : client_1.LoginBy.SWIFTCAB,
                        created_on: new Date(),
                        updated_on: new Date(),
                    }
                });
                // then after to role table 
                let userRoles = yield index_1.default.user_has_roles.create({
                    data: {
                        user_id: newUser.id,
                        role_id: userType,
                        created_on: new Date(),
                        updated_on: new Date(),
                    }
                });
                let payload = { id: newUser.id, username: newUser.username };
                let token = jsonwebtoken_1.default.sign(payload, dotenv_1.default.SECRET_KEY, {
                    expiresIn: "2h",
                });
                return (0, utils_1.successReturn)(payload);
                return (0, utils_1.successReturn)({ token, is_active: newUser === null || newUser === void 0 ? void 0 : newUser.is_active, usersObj: { username: newUser.username, firstName: newUser.first_name, lastName: newUser.last_name } });
            }
            catch (err) {
                console.log(err);
                return (0, utils_1.failureReturn)(err);
            }
        });
    },
    createUser: function (userPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                if (!userPayload.accountStatus) {
                    userPayload.accountStatus = false; // by default 
                }
                const { email, password, userType, username } = userPayload;
                let userExist = yield index_1.default.users.findFirst({
                    where: {
                        OR: [
                            {
                                email: email
                            },
                            {
                                username: username
                            }
                        ],
                    }
                });
                if (userExist) {
                    if (userExist.is_active) {
                        return (0, utils_1.failureReturn)("User already exists");
                    }
                    else if (!userExist.is_active) {
                        return (0, utils_1.failureReturn)(`Please verify your account by clicking on the link sent on mail: ${email}`);
                    }
                }
                let hashPass = yield auth_package_1.bcrypt.hash(password, 10);
                // generating user in user table 
                let newUser = yield index_1.default.users.create({
                    data: {
                        username: username !== null && username !== void 0 ? username : (0, utils_1.generateUsername)('SWC' + Math.random() * 100),
                        password: hashPass,
                        email: email !== null && email !== void 0 ? email : "",
                        phone_no: (_a = userPayload.phone) !== null && _a !== void 0 ? _a : null,
                        is_active: userPayload.accountStatus,
                        traffic_from: (_b = userPayload.trafficBy) !== null && _b !== void 0 ? _b : client_1.LoginBy.SWIFTCAB,
                        created_on: new Date(),
                        updated_on: new Date(),
                    }
                });
                // then after to role table 
                let userRoles = yield index_1.default.user_has_roles.create({
                    data: {
                        user_id: newUser.id,
                        role_id: userType,
                        created_on: new Date(),
                        updated_on: new Date(),
                    }
                });
                let payload = { id: newUser.id, username: newUser.username };
                let token = jsonwebtoken_1.default.sign(payload, dotenv_1.default.SECRET_KEY, {
                    expiresIn: "2h",
                });
                // queuing part 
                const authToken = jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: "5m", // Correct format
                });
                //  adding to  queue 
                let authUrl = `${process.env.NEXT_PUBLIC_API_URL}/${server_1.version}/auth/verify-mail-link?token=${authToken}&role=${userType}`;
                queues_1.signup_user_queue.enqueue('user', { authenticateUri: authUrl, userId: payload === null || payload === void 0 ? void 0 : payload.id, email });
                return (0, utils_1.successReturn)({ token, is_active: newUser === null || newUser === void 0 ? void 0 : newUser.is_active, usersObj: { username: newUser.username, firstName: newUser.first_name, lastName: newUser.last_name } });
            }
            catch (err) {
                console.log(err);
                return (0, utils_1.failureReturn)(err);
            }
        });
    },
    verifyMailLink: function (payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // let userExistOrNot =await prismaClient.users.findFirst({ where:{ username:payload.username  }})
                const { role, userId, username } = payload;
                let updateStatus = yield index_1.default.users.update({
                    where: {
                        id: userId
                    },
                    data: {
                        is_active: true
                    }
                });
                let userExist = yield index_1.default.users.findFirst({
                    where: { id: userId }
                });
                let userPayload = { id: userExist.id, username: userExist.username, first_name: userExist.first_name, last_name: userExist.last_name };
                let token = jsonwebtoken_1.default.sign(payload, dotenv_1.default.SECRET_KEY, {
                    expiresIn: "2h",
                });
                return (0, utils_1.successReturn)({ token, usersObj: { username: userPayload.username, firstName: userPayload.first_name, lastName: userPayload.last_name } });
            }
            catch (err) {
                console.log(err);
                return (0, utils_1.failureReturn)(err);
            }
        });
    },
    checkValidUser: function (payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // let userExistOrNot =await prismaClient.users.findFirst({ where:{ username:payload.username  }})
                let isUserOwnerOrNot = yield index_1.default.$queryRawUnsafe(`
             select u.id ,u.email ,  r."name" as role ,  r.id as  role_id   from users u 
             inner join user_has_roles uhr ON uhr.user_id = u.id
             inner join  roles r on r.id =  uhr.role_id 
             where u.id = '${payload.id}' and  r."name" ='${payload.userType}' 
          `);
                if (isUserOwnerOrNot && Array.isArray(isUserOwnerOrNot) && isUserOwnerOrNot.length == 0)
                    return (0, utils_1.failureReturn)(false);
                return (0, utils_1.successReturn)(true);
            }
            catch (err) {
                console.log(err);
                return (0, utils_1.failureReturn)(err);
            }
        });
    },
    verifyOtp: function (payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { otp, phone } = payload;
                // let userExistOrNot =await prismaClient.users.findFirst({ where:{ username:payload.username  }})
                let user = yield index_1.default.users.findFirst({
                    where: {
                        phone_no: payload.phone,
                        otp: payload.otp,
                        expiresIn: {
                            gte: new Date(), // Check if expiresIn is greater than or equal to the current time
                        },
                    },
                });
                if (!user) {
                    return (0, utils_1.failureReturn)("Invalid or expired OTP");
                }
                // OTP is valid, now reset it
                yield index_1.default.users.update({
                    where: { id: user.id },
                    data: { otp: null, expiresIn: null },
                });
                let userPayload = { id: user.id, username: user.username };
                let token = jsonwebtoken_1.default.sign(userPayload, dotenv_1.default.SECRET_KEY, { expiresIn: "2h" });
                return (0, utils_1.successReturn)({ token, usersObj: { username: user.username, firstName: user.first_name, lastName: user.last_name } });
            }
            catch (err) {
                console.log(err);
                return (0, utils_1.failureReturn)(err);
            }
        });
    },
    sendAuthMail: function (payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { authenticateUri, email: to, userId } = payload;
                const userMailPayload = (0, mailer_1.createMailOptions)({
                    to,
                    subject: VerifyUser_1.mailerTemplate.subject,
                    html: VerifyUser_1.mailerTemplate.newSignup(authenticateUri),
                });
                let sendMailToVerify = (0, mailConfig_1.sendMail)(userMailPayload);
                if (sendMailToVerify)
                    return (0, utils_1.successReturn)(sendMailToVerify);
                return (0, utils_1.successReturn)(false);
            }
            catch (err) {
                console.log(err);
                return (0, utils_1.failureReturn)(err);
            }
        });
    },
    generateAndSendOtpForLogin: function (payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { phone, id, username } = payload;
                let updates = yield index_1.default.users.update({
                    where: {
                        id
                    },
                    data: {
                        is_active: true,
                        otp: '1111',
                        expiresIn: (0, moment_1.default)().add(2, "minutes").toDate() //  valid for  2 minuted from current 
                    }
                });
                return (0, utils_1.successReturn)(updates);
                return (0, utils_1.successReturn)(false);
            }
            catch (err) {
                console.log(err);
                return (0, utils_1.failureReturn)(err);
            }
        });
    },
    getAllRoles: function (cacheKey) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let roles = yield index_1.default.roles.findMany({
                    select: { id: true, name: true }
                });
                if (cacheKey && roles) {
                    yield redis_index_1.redisClient1.set(cacheKey, JSON.stringify(roles));
                    yield redis_index_1.redisClient1.expire(cacheKey, config_1.default.cache_time);
                }
                return (0, utils_1.successReturn)(roles);
            }
            catch (err) {
                return (0, utils_1.failureReturn)(err);
            }
        });
    },
    userHasRolesOrNot: function (param) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userrHasrole = yield index_1.default.$queryRawUnsafe(` 
                  select uhr.role_id ,r."name" from users u 
                  inner join user_has_roles uhr on uhr.user_id = u.id 
                  inner join roles r on r.id = uhr.role_id 
                  where u.id  =${param.userId} and  r."name" = '${param.roleName}'
            `);
                if (userrHasrole && Array.isArray(userrHasrole) && userrHasrole.length == 0)
                    return (0, utils_1.failureReturn)({ role_id: null });
                return (0, utils_1.successReturn)({ role_id: userrHasrole[0].role_id });
            }
            catch (err) {
                return (0, utils_1.failureReturn)(err);
            }
        });
    },
};
exports.default = authService;

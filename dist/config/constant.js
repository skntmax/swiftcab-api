"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REDIS_QUEUES = exports.REDIS_KEYS = exports.userRoles = void 0;
const constants = {
    cache_time: 7200, // 2 hrs in secods
    quizCacheTime: 36000,
    notification_cache_clear: 60
};
exports.userRoles = {
    superAdmin: "super-admin",
    admin: "admin",
    salesManager: "sales-manager",
    salesExecutive: "sales-executive",
    salesRepresentative: "sales-representative",
    accountManager: "account-manager",
    marketingManager: "marketing-manager",
    marketingExecutive: "marketing-executive",
    marketingSpecialist: "marketing-specialist",
    customerSupportManager: "customer support-manager",
    supportAgent: "support-agent",
    helpdeskAgent: "helpdesk-agent",
    technicalSupportEngineer: "technical support-engineer",
    operationsManager: "operations-manager",
    financeManager: "finance-manager",
    crmDeveloper: "crm-developer",
    crmAnalyst: "crm-analyst",
    partnerManager: "partner-manager",
    vendorCoordinator: "vendor-coordinator",
    customer: "customer",
    owner: "owner"
};
exports.REDIS_KEYS = {
    USER_ROLE: "USER_ROLE",
    GET_COUNTRIES: "GET_COUNTRIES",
    GET_STATES: "GET_STATES",
    GET_CITY: "GET_CITY",
    GET_LOCALITY: "GET_LOCALITY",
    ALL_ROLES: "ALL_ROLES"
};
exports.REDIS_QUEUES = {
    USER_SIGNUP: "USER_SIGNUP",
    USERS_OTP: "USERS_OTP",
};
exports.default = Object.freeze(constants);

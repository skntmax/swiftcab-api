const constants = {
    cache_time: 7200, // 2 hrs in secods
    quizCacheTime:36000, 
    notification_cache_clear:60 
     
}

export const userRoles = {
    superAdmin: "Super Admin",
    admin: "Admin",
    salesManager: "Sales Manager",
    salesExecutive: "Sales Executive",
    salesRepresentative: "Sales Representative",
    accountManager: "Account Manager",
    marketingManager: "Marketing Manager",
    marketingExecutive: "Marketing Executive",
    marketingSpecialist: "Marketing Specialist",
    customerSupportManager: "Customer Support Manager",
    supportAgent: "Support Agent",
    helpdeskAgent: "Helpdesk Agent",
    technicalSupportEngineer: "Technical Support Engineer",
    operationsManager: "Operations Manager",
    financeManager: "Finance Manager",
    crmDeveloper: "CRM Developer",
    crmAnalyst: "CRM Analyst",
    partnerManager: "Partner Manager",
    vendorCoordinator: "Vendor Coordinator",
    customer: "Customer",
    owner: "Owner"

}


export default Object.freeze(constants)  
import { Router } from "express";
import middlewares, { upload, vhicleDocUpload } from "../../middlewares/middleware.index";
import { REDIS_KEYS, userRoles } from "../../config/constant";
import customerController from "../../controller/customer/customer.controller";

let customerRouter   =   Router()

customerRouter.get('/get-customer-details',
    middlewares.checkUserRoles(userRoles.customer) ,
    customerController.getCustomerDetails )


    
customerRouter.post('/update-customer-details',
    middlewares.checkUserRoles(userRoles.customer) ,
    customerController.updateCustomerDetails )

    
    

export default customerRouter 




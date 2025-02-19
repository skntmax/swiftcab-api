import { Router } from "express";
import adminController from "../../controller/admin/admin.cotroller";
import middlewares from "../../middlewares/middleware.index";
import { userRoles } from "../../config/constant";
import ownerController from "../../controller/owner/owner.controller";
let adminRouter  =   Router()


adminRouter.get('/get-all-vhicles', 
     // middlewares.checkUserRoles(userRoles.owner),
     adminController.getAllVhicles )


     
adminRouter.get('/service-list', 
     adminController.serviceList )


adminRouter.post('/approve-kyc', 
     middlewares.validateUser,
     // middlewares.checkUserRoles(userRoles.admin),
     adminController.approveKyc )


     

     
adminRouter.post('/add-menu', 
     // middlewares.validateUser,
     // middlewares.checkUserRoles(userRoles.admin),
     adminController.addMenu )

          
adminRouter.get('/get-nav',
     middlewares.checkUserRoles(userRoles.admin),
     ownerController.getNavbar )
 
    
     
     

export default adminRouter 




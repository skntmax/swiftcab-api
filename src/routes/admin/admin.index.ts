import { Router } from "express";
import adminController from "../../controller/admin/admin.cotroller";
import middlewares from "../../middlewares/middleware.index";
import { userRoles } from "../../config/constant";
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

export default adminRouter 




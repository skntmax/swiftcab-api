import { Router } from "express";
import adminController from "../../controller/admin/admin.cotroller";
import middlewares from "../../middlewares/middleware.index";
import { userRoles } from "../../config/constant";
let adminRouter  =   Router()


adminRouter.get('/get-all-vhicles', 
     // middlewares.checkUserRoles(userRoles.owner),
     adminController.getAllVhicles )

export default adminRouter 




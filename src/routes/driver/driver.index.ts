import { Router } from "express";
import driverController from "../../controller/driver/driver.controller";
import middlewares, { driverProfileUpload, vhicleAvatarUpload } from "../../middlewares/middleware.index";
import { userRoles } from "../../config/constant";
import ownerController from "../../controller/owner/owner.controller";
import { adminCelebrate } from "../../celebrate/admin.celebrate";
let driverRouter  =   Router()


driverRouter.post('/update-driver-profile', 
     // middlewares.validateUser,
     middlewares.checkUserRoles(userRoles.driverPartner),
     driverProfileUpload,
     driverController.updateDriverProfile )
     

driverRouter.get('/get-driver-details', 
     // middlewares.validateUser,
     middlewares.checkUserRoles(userRoles.driverPartner),
     driverController.getDriverDetails )


driverRouter.get('/associate-driver-to-owner', 
     // middlewares.validateUser,
     middlewares.checkUserRoles(userRoles.driverPartner),
     driverController.getDriverDetails )


export default driverRouter 




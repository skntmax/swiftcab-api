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
     
driverRouter.post('/update-driver-profile2', 
     // middlewares.validateUser,
     middlewares.checkUserRoles(userRoles.driverPartner),
     driverController.updateDriverProfile2 )
     

driverRouter.get('/get-driver-details', 
     // middlewares.validateUser,
     middlewares.checkUserRoles([userRoles.driverPartner,  userRoles.admin ]),
     driverController.getDriverDetails )


driverRouter.get('/associate-driver-to-owner', 
     // middlewares.validateUser,
     middlewares.checkUserRoles(userRoles.driverPartner),
     driverController.getDriverDetails )

driverRouter.get('/get-driver-live-location', 
     middlewares.validateUser,
     // middlewares.checkUserRoles(userRoles.driverPartner),
     driverController.getDriverLiveLocation )




export default driverRouter 




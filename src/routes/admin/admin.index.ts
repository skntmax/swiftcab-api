import { Router } from "express";
import adminController from "../../controller/admin/admin.cotroller";
import middlewares, { vhicleAvatarUpload } from "../../middlewares/middleware.index";
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
     

adminRouter.post('/add-menu-items', 
     // middlewares.validateUser,
     // middlewares.checkUserRoles(userRoles.admin),
     adminController.addMenuItems )

          
adminRouter.get('/get-nav',
     middlewares.checkUserRoles(userRoles.admin),
     ownerController.getNavbar )
 

     
adminRouter.post('/get-active-users',
     middlewares.checkUserRoles(userRoles.admin),
     ownerController.getActiveUsers )

     
     
adminRouter.post('/get-vhicle-details',
     middlewares.checkUserRoles(userRoles.admin),
     ownerController.getVhicleDetailsById )
 

          
adminRouter.post('/approve-kyc-request',
     middlewares.checkUserRoles(userRoles.admin),
     ownerController.approveKycRequest )
 

     
               
adminRouter.post('/remove-user-by-username',
     middlewares.checkUserRoles(userRoles.admin),
     ownerController.removeUserByUsername )


              
adminRouter.post('/block-unblock-user', 
     middlewares.checkUserRoles(userRoles.admin),
     ownerController.blockUnblockuser )

           
adminRouter.post('/update-vhicle-avatar', 
     // middlewares.checkUserRoles(userRoles.admin),
     vhicleAvatarUpload,
     ownerController.updateVhicleAvatar )





export default adminRouter 




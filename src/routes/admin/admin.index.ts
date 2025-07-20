import { Router } from "express";
import adminController from "../../controller/admin/admin.cotroller";
import middlewares, { vhicleAvatarUpload } from "../../middlewares/middleware.index";
import { userRoles } from "../../config/constant";
import ownerController from "../../controller/owner/owner.controller";
import { adminCelebrate } from "../../celebrate/admin.celebrate";
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
     middlewares.checkUserRoles(userRoles.admin),
     adminController.addMenu )
     

adminRouter.post('/add-menu-items', 
     // middlewares.validateUser,
     middlewares.checkUserRoles(userRoles.admin),
     adminController.addMenuItems )

          
adminRouter.get('/get-nav',
     middlewares.checkUserRoles(userRoles.admin),
     ownerController.getNavbar )
 

     
adminRouter.post('/get-active-users',
     middlewares.checkUserRoles(userRoles.admin),
     ownerController.getActiveUsers )

     
     
adminRouter.post('/get-active-by-role',
     middlewares.checkUserRoles(userRoles.admin),
     ownerController.getActiveUsersByRole )

          
adminRouter.post('/get-driver-detail-by-userid',
     middlewares.checkUserRoles(userRoles.admin),
     ownerController.getDriverDetailsById )

     
     
     
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

adminRouter.post('/get-user-by-role',
     // adminCelebrate.roleBasedUser, 
     middlewares.checkUserRoles(userRoles.admin),
     adminController.getUsersByRole )



adminRouter.post('/add-role-to-users',
     middlewares.checkUserRoles(userRoles.admin),
     adminController.addRoleToUsers )

     
adminRouter.post('/get-navbar-list',
     middlewares.checkUserRoles(userRoles.admin),
     adminController.getNavbarItem )

     
adminRouter.post('/add-navbar',
     middlewares.checkUserRoles(userRoles.admin),
     adminController.addNavbar )


adminRouter.post('/add-subnavbar',
     middlewares.checkUserRoles(userRoles.admin),
     adminController.addSubNavbar )


adminRouter.post('/varunvarified-drivers',
     middlewares.checkUserRoles(userRoles.admin),
     adminController.varifiedUnvarifiedDrivers )

     
adminRouter.post('/ams-drivers',
     middlewares.checkUserRoles(userRoles.admin),
     adminController.driverAms )


          
          
          





export default adminRouter 




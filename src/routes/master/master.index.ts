import { Router } from "express";
import masterController from "../../controller/master/master.controller";
import { authCelebrate } from "../../celebrate/auth.celebrate";
import middlewares, { commmonDocUpload } from "../../middlewares/middleware.index";
import { REDIS_KEYS } from "../../config/constant";
import ownerController from "../../controller/owner/owner.controller";

let masterRouter  =   Router()

masterRouter.get('/get-countries',
    middlewares.inCache(REDIS_KEYS.GET_COUNTRIES),
      masterController.getCountries )


masterRouter.get('/get-states/:country_id',
    middlewares.inCache(REDIS_KEYS.GET_STATES),
    masterController.getStates )


masterRouter.get('/get-city/:state_id',
    middlewares.inCache(REDIS_KEYS.GET_CITY),
    masterController.getCity )
    
            
masterRouter.get('/get-city-locality/:city_id',
    middlewares.inCache(REDIS_KEYS.GET_LOCALITY),
    masterController.getLocality )


        
masterRouter.get('/get-vhicle-type/',
    middlewares.inCache(REDIS_KEYS.VHICLE_TYPE),
    masterController.getVhicleType )

            
masterRouter.get('/get-banks/',
    middlewares.inCache(REDIS_KEYS.BANKS),
    masterController.getbanks )


                
masterRouter.get('/get-bank-branches/',
    middlewares.inCache(REDIS_KEYS.BANK_BRANCHES),
    masterController.getBankBranch )


             
masterRouter.get('/get-navbar/:userType',
    middlewares.getLoggedinuserRoleId(),
     ownerController.getNavbar )


masterRouter.post('/upload/doc',
    // middlewares.getLoggedinuserRoleId(),
    commmonDocUpload,
     ownerController.uploadMasterDoc )

     
                 
masterRouter.get('/get-driver-list',
     middlewares.inCache(REDIS_KEYS.DRIVER_LIST),
     masterController.getDriverList )

     
                 
// put url will return, fire a put requets along with the file to that url        
masterRouter.post('/upload-to-s3',
     masterController.uploadToS3 )
                 
// extract the  file using used key      
masterRouter.get('/get-uploaded-file/:key',
     masterController.getUploadedFile )

masterRouter.get('/get-menu-permissions/',
middlewares.inCache(REDIS_KEYS.MENU_PERMISSIONS),
masterController.getPermissions )
     
masterRouter.get('/get-menu-permissions/:pn/:rowPerPage',
     middlewares.inCache(REDIS_KEYS.MENU_PERMISSIONS),
     masterController.getPermissions )

// role has capabilities      
masterRouter.get('/get-role-has-capabilities/:userType',
    middlewares.getLoggedinuserRoleId(),
     masterController.roleHasCapabilites )

// capanilities has permissions      
masterRouter.get('/get-cap-has-permissions/:userType',
    middlewares.getLoggedinuserRoleId(),
     masterController.capHasPermsissions )


masterRouter.get('/get-perm-by-cap-id/:capId',
    middlewares.validateUser,
        masterController.permissionByCapId )



masterRouter.get('/get-navbar-list',
    //    middlewares.getLoggedinuserRoleId(),
        masterController.getNavbarList )





export default masterRouter 




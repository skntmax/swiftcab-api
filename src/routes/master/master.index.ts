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


             
masterRouter.get('/get-navbar/:userType',
    middlewares.getLoggedinuserRoleId(),
     ownerController.getNavbar )

    

masterRouter.post('/upload/doc',
    // middlewares.getLoggedinuserRoleId(),
    commmonDocUpload,
     ownerController.uploadMasterDoc )


export default masterRouter 




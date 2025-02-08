import { Router } from "express";
import masterController from "../../controller/master/master.controller";
import { authCelebrate } from "../../celebrate/auth.celebrate";
import middlewares from "../../middlewares/middleware.index";
import { REDIS_KEYS } from "../../config/constant";

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


export default masterRouter 




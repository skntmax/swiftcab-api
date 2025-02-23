import { Router } from "express";
import ownerController from "../../controller/owner/owner.controller";
import middlewares from "../../middlewares/middleware.index";
import { REDIS_KEYS, userRoles } from "../../config/constant";

let ownerRouter   =   Router()

ownerRouter.post('/insert-owner-vhicles',
    middlewares.checkUserRoles(userRoles.owner) ,
    ownerController.createOwnerHasVhicles )

ownerRouter.get('/owner-ownes-vhicle', 
    middlewares.checkUserRoles(userRoles.owner) ,
      ownerController.ownerOwnesVhicles )

ownerRouter.post('/create-vhicle-provide-services',
      middlewares.checkUserRoles(userRoles.owner) ,
     ownerController.vhicleProvidesServices )


    ownerRouter.get('/owner-active-vhicle-list',
    middlewares.checkUserRoles(userRoles.owner) ,
    ownerController.ownerActiveVhicleList )


        
    ownerRouter.get('/get-vhicle-services-list',
    middlewares.checkUserRoles(userRoles.owner) ,
    ownerController.getVhicleServicesList )


ownerRouter.get('/get-roles',
    middlewares.inCache(REDIS_KEYS.USER_ROLE), 
    ownerController.getUserTypes )


    
ownerRouter.post('/kyc-request',
    middlewares.checkUserRoles(userRoles.owner) ,
    ownerController.kycRequest )

        
ownerRouter.get('/get-nav',
    middlewares.checkUserRoles(userRoles.owner),
    ownerController.getNavbar)

    


    

export default ownerRouter 




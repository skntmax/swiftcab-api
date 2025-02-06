import { Router } from "express";
import ownerController from "../../controller/owner/owner.controller";
import middlewares from "../../middlewares/middleware.index";
import { userRoles } from "../../config/constant";

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



    ownerRouter.get('/get-vhicle-services-list',
    middlewares.checkUserRoles(userRoles.owner) ,
    ownerController.getVhicleServicesList )


ownerRouter.get('/get-roles', ownerController.getUserTypes )



export default ownerRouter 




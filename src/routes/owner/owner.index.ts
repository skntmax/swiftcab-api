import { Router } from "express";
import ownerController from "../../controller/owner/owner.controller";
import middlewares from "../../middlewares/middleware.index";

let ownerRouter   =   Router()

ownerRouter.post('/insert-owner-vhicles', ownerController.ownerHasVhicles )
ownerRouter.get('/owner-ownes-vhicle', middlewares.checkUserRoles('Owner') ,  ownerController.ownerOwnesVhicles )
ownerRouter.get('/get-roles', ownerController.getUserTypes )


export default ownerRouter 




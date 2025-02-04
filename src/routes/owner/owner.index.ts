import { Router } from "express";
import ownerController from "../../controller/owner/owner.controller";

let ownerRouter   =   Router()

ownerRouter.post('/insert-owner-vhicles', ownerController.ownerHasVhicles )
ownerRouter.get('/get-roles', ownerController.getUserTypes )


export default ownerRouter 




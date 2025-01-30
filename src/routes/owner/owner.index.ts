import { Router } from "express";
import ownerController from "../../controller/owner/owner.controller";

let ownerRouter   =   Router()

ownerRouter.post('/insert-owner-vhicles', ownerController.ownerHasVhicles )


export default ownerRouter 




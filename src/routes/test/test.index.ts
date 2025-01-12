import { Router } from "express";
import testController from "../../controller/test/testController.index";
let testRouter  =   Router()

testRouter.get('/insert-vhicle', testController.insertVhicle )

export default testRouter 




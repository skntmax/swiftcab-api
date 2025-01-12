import { Router } from "express";
import testController from "../../controller/test/testController.index";
let testRouter  =   Router()

testRouter.get('/insert-vhicle', testController.insertVhicle )
testRouter.get('/add-services', testController.addVhicleServices )
testRouter.get('/add-servies-utils', testController.addServicesUtils )


export default testRouter 




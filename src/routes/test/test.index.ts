import { Router } from "express";
import testController from "../../controller/test/testController.index";
let testRouter  =   Router()


testRouter.get('/status', testController.checkStatus )
testRouter.get('/insert-vhicle', testController.insertVhicle )
testRouter.get('/add-services', testController.addVhicleServices )
testRouter.get('/add-servies-utils', testController.addServicesUtils )
testRouter.get('/get-random-name', testController.getRandomName )
testRouter.get('/insert-vhicle-types', testController.insertVhicleTypes )
testRouter.get('/type-of-user', testController.insertTypeOfUser )


export default testRouter 




import { Router } from "express";
import testController from "../../controller/test/testController.index";
import middlewares from "../../middlewares/middleware.index";
let testRouter  =   Router()

testRouter.get('/status',
      middlewares.checkRoles,
      middlewares.roleWisePermission,
       testController.checkStatus )

testRouter.get('/insert-vhicle', testController.insertVhicle )
testRouter.get('/add-services', testController.addVhicleServices )
testRouter.get('/add-servies-utils', testController.addServicesUtils )
testRouter.get('/get-random-name', testController.getRandomName )
testRouter.get('/insert-vhicle-types', testController.insertVhicleTypes )
testRouter.get('/type-of-user', testController.insertTypeOfUser )
testRouter.get('/insert-roles', testController.insertRoles )
testRouter.get('/insert-perm', testController.insertPermissions )

export default testRouter 




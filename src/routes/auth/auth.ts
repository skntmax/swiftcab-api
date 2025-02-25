import { Router } from "express";
import authController from "../../controller/auth/auth.index";
import { authCelebrate } from "../../celebrate/auth.celebrate";
import middlewares from "../../middlewares/middleware.index";
import { REDIS_KEYS } from "../../config/constant";

let authRouter  =   Router()

authRouter.post('/login',authCelebrate.login,  authController.signin )
authRouter.post('/signup', authCelebrate.signup, authController.signUp )
authRouter.get('/send-otp',middlewares.checkUserRoles('Customer') , authController.sendOtp )
authRouter.post('/is-valid-user-with-role', 
    middlewares.validateUser,
      authController.checkValidUser )
      
authRouter.get('/get-all-roles',
    middlewares.inCache(REDIS_KEYS.ALL_ROLES),
  authController.getAllRoles )


export default authRouter 




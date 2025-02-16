import { Router } from "express";
import authController from "../../controller/auth/auth.index";
import { authCelebrate } from "../../celebrate/auth.celebrate";
import middlewares from "../../middlewares/middleware.index";

let authRouter  =   Router()

authRouter.post('/login',authCelebrate.login,  authController.signin )
authRouter.post('/signup', authCelebrate.signup, authController.signUp )
authRouter.get('/send-otp',middlewares.checkUserRoles('Customer') , authController.sendOtp )
authRouter.post('/is-owner', authController.checkValidUser )
authRouter.get('/get-all-roles', authController.getAllRoles )


export default authRouter 




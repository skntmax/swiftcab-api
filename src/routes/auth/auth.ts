import { Router } from "express";
import authController from "../../controller/auth/auth.index";
import { authCelebrate } from "../../celebrate/auth.celebrate";

let authRouter  =   Router()

authRouter.post('/login',authCelebrate.login,  authController.signin )
authRouter.post('/signup', authCelebrate.signup, authController.signUp )
authRouter.get('/send-otp', authController.sendOtp )
authRouter.post('/check-valid-user', authController.checkValidUser )
authRouter.get('/get-all-roles', authController.getAllRoles )


export default authRouter 




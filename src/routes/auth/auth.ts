import { Router } from "express";
import authController from "../../controller/auth/auth.index";

let authRouter  =   Router()

authRouter.get('/login', authController.getUser )
authRouter.get('/signup', authController.signUp )
authRouter.get('/send-otp', authController.sendOtp )


export default authRouter 




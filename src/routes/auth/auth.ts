import { Router } from "express";
import authController from "../../controller/auth/auth.index";

let authRouter  =   Router()

authRouter.post('/login', authController.signin )
authRouter.post('/signup', authController.signUp )
authRouter.get('/send-otp', authController.sendOtp )


export default authRouter 




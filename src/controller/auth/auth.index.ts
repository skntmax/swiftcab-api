import { Response , Request  } from "express"
import primsaClient from "../../db"
import authService from "../../services/auth/auth.service"
import { failureResponse, succesResponse } from "../../config/utils"
const authController  = {
    
      signin : async function (req:Request, res:Response):Promise<any> {
            
        try {
          let user =await authService.loginUser({email:req.body.email, password:req.body.password, username:req.body.username , userType:req.body.userType })
          if(!user.status)
             return succesResponse({data:user.data, message:"" } , res )  
        
          return succesResponse({data:user.data, message:"logged in " } , res )  
           

         }catch(err) {
          return  failureResponse({data:err}, res )
         }
      
       } ,

    signUp : async  function (req:Request, res:Response):Promise<any> {

         try {
          let user =await authService.createUser({email:req.body.email ,  password:req.body.password , username:req.body.username , userType:req.body.userType})
          if(!user.status)
             return succesResponse({data:user.data, message:"User already exist" } , res )  
        
          return succesResponse({data:user.data, message:"User created" } , res )  
           

         }catch(err) {
          return  failureResponse({data:err}, res )
         }
      
      },

    sendOtp : function (req:Request, res:Response){
      res.send({message:"ok"})      
    },
    
}


export default authController 
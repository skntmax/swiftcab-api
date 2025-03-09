import { Response , Request  } from "express"
import primsaClient from "../../db"
import authService from "../../services/auth/auth.service"
import { failureResponse, succesResponse } from "../../config/utils"
import { LoginBy } from "@prisma/client"

const authController  = {
      signin : async function (req:Request, res:Response):Promise<any> {
            
        try {
          let user =await authService.loginUser({emailOrUsername:req.body.emailOrUsername, password:req.body.password , userType:req.body.userType })
          if(!user.status)
             return succesResponse({data:user.data, message:"" } , res )  
        
          return succesResponse({data:user.data, message:"logged in " } , res )  
           
         }catch(err) {
          return  failureResponse({data:err}, res )
         }
      
       } ,


       loginByAuth : async function (req:Request, res:Response):Promise<any> {
            
         try {
             const { trafficBy = LoginBy.SWIFTCAB  , userType , token  }  = req.body //  default swiftcab  
           let user =await authService.loginByAuth({token  , trafficBy  , userType })
           if(!user.status)
              return succesResponse({data:user.data, message:"" } , res )  
         
           return succesResponse({data:user.data, message:"logged in " } , res )  
            
          }catch(err) {
           return  failureResponse({data:err}, res )
          }
       
        } ,

        
    signUp : async  function (req:Request, res:Response):Promise<any> {

         try {

         const { trafficBy = LoginBy.SWIFTCAB } = req.body; // Default value applied here
          let user =await authService.createUser({email:req.body.email ,  password:req.body.password , username:req.body.username , userType:req.body.userType , trafficBy })
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

    checkValidUser : async function (req:Request, res:Response):Promise<any>{
      try {
         const {userId , username} = req.userObj
        let validUser =await authService.checkValidUser({id:Number(userId)  , userType : req.body.userType })
        if(!validUser.status)
           return succesResponse({data:validUser.data, message:"Not a valid user " } , res )  
      
        return succesResponse({data:validUser.data, message:"valid user" } , res )  
         

       }catch(err) {
        return  failureResponse({data:err}, res )
       }   
    },

    
    getAllRoles : async function (req:Request, res:Response):Promise<any>{
      try {
         const { cacheKey }  = req
        let allRoles =await authService.getAllRoles(cacheKey)
        if(!allRoles.status)
           return succesResponse({data:allRoles.data, message:"all roles " } , res )  
      
        return succesResponse({data:allRoles.data, message:"" } , res )  
         

       }catch(err) {
        return  failureResponse({data:err}, res )
       }   
    },


    
}


export default authController 
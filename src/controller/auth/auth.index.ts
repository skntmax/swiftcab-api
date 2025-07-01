import { Response , Request  } from "express"
import primsaClient from "../../db"
import authService from "../../services/auth/auth.service"
import { failureResponse, succesResponse } from "../../config/utils"
import { LoginBy } from "@prisma/client"
import config from "../../config/config"

const authController  = {
      signin : async function (req:Request, res:Response):Promise<any> {
            
        try {
          let user =await authService.loginUser({
             emailOrUsername:req.body.emailOrUsername??"",
             password:req.body.password??config.defaultPass , 
             userType:req.body.userType??null,
             phone:req.body.phone?? null  
            })

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

        verifyMailLink : async  function (req:Request, res:Response):Promise<any> {

         try {
            const {userId , username, roleTypeName } = req.userObj
            let userVarify =await authService.verifyMailLink({userId : Number(userId) , username  ,role: Number(req.query?.role), roleTypeName  })
          
        
            if (!userVarify.status) {
               return succesResponse({data:userVarify.data, message:"Not verified" } , res);
            }

            if(Number(req.query?.role)==20)  // client 
            return res.redirect(`${process.env.NEXT_PUBLIC_CLIENT_PORTAL}?token=${userVarify?.data?.token}&username=${userVarify?.data?.usersObj?.username}&firstName=${userVarify?.data?.usersObj?.firstName}&lastName=${userVarify?.data?.usersObj?.lastName}&roleTypeName=${roleTypeName}`);

            if(Number(req.query?.role)!=21)  // client 
            return res.redirect(`${process.env.NEXT_PUBLIC_ADMIN_PORTAL}?token=${userVarify?.data?.token}&username=${userVarify?.data?.usersObj?.username}&firstName=${userVarify?.data?.usersObj?.firstName}&lastName=${userVarify?.data?.usersObj?.lastName}&roleTypeName=${roleTypeName}`);


         }catch(err) {
          return  failureResponse({data:err}, res )
         }
      
      },

      verifyOtp : async  function (req:Request, res:Response):Promise<any> {

         try {
            
          let otpVerify =await authService.verifyOtp({otp: req.body.otp , phone: req.body.phone})
          
          if(!otpVerify.status)
          return failureResponse({data:otpVerify.data, message:"Otp not verified" } , res )  
        
          return succesResponse({data:otpVerify.data, message:"Otp varified" } , res )  

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
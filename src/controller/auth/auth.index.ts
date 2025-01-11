import { Response , Request  } from "express"
const authController  = {
    
    getUser : function (req:Request, res:Response){
      res.send({message:"ok"})      
    } ,
    signUp : function (req:Request, res:Response){
      res.send({message:"ok"})      
    },
    sendOtp : function (req:Request, res:Response){
      res.send({message:"ok"})      
    },
    
    
}


export default authController 
import { Response , Request  } from "express"
import primsaClient from "../../db"
import authService from "../../services/auth/auth.service"
import { failureResponse, succesResponse } from "../../config/utils"
import ownerService from "../../services/owner/owner.service"
import { KycStatus } from "@prisma/client"
import driverService from "../../services/driver/driver.service"
import config from "../../config/config"

const customerController  = {
    
     updateDriverProfile : async function (req:Request, res:Response):Promise<any> {
        try {
         
            let docs =  req.files 
             const {userId , username} = req.userObj
             const {bank_account_branch,ifsc,bank_account} = req.body

            let driverDetails =await driverService.updateDriverProfile({
                                                         userId:Number(userId) ,
                                                         bank_account,
                                                         bank_account_branch,
                                                         ifsc,
                                                         docs
                                                         })
            if(!driverDetails.status)
               return failureResponse({data:driverDetails.data, message:""} , res )  
          
            return succesResponse({data:driverDetails.data, message:"updated " } , res )  
           
           }catch(err) {
            console.log(err)
            return  failureResponse({data:err}, res )
           }
       } ,
        updateDriverProfile2 : async function (req:Request, res:Response):Promise<any> {
        try {
         

             const {userId , username} = req.userObj
             const {bank_account_branch,ifsc,bank_account,bank_account_no} = req.body
            let driverDetails =await driverService.updateDriverProfile2({
                                                         userId:Number(userId) ,
                                                         bank_account,
                                                         bank_account_branch,
                                                         bank_account_no,
                                                         ifsc,
                                                         docs:req.body.docs
                                                         })
            if(!driverDetails.status)
               return failureResponse({data:driverDetails.data, message:""} , res )  
          
            return succesResponse({data:driverDetails.data, message:"Driver Details updated " } , res )  
           
           }catch(err) {
            console.log(err)
            return  failureResponse({data:err}, res )
           }
       } ,

        getDriverDetails : async function (req:Request, res:Response):Promise<any> {
        try {
             const {userId , username} = req.userObj
            let driverDetails =await driverService.getDriverDetails({userId:Number(userId) })
            if(!driverDetails.status)
               return failureResponse({data:driverDetails.data, message:""} , res )  
          
            return succesResponse({data:driverDetails.data, message:"driver details " } , res )  
           
           }catch(err) {
            console.log(err)
            return  failureResponse({data:err}, res )
           }
       } ,
}


export default customerController 
import { Response , Request  } from "express"
import primsaClient from "../../db"
import authService from "../../services/auth/auth.service"
import { failureResponse, succesResponse } from "../../config/utils"
import ownerService from "../../services/owner/owner.service"
import { KycStatus } from "@prisma/client"
import customerService from "../../services/customer/customer.service"
import config from "../../config/config"

const customerController  = {
    
   getCustomerDetails : async function (req:Request, res:Response):Promise<any> {
        try {
         
             const {userId , username} = req.userObj

            let customerDetails =await customerService.getCustomerDetails({userId:Number(userId) , username })
            if(!customerDetails.status)
               return succesResponse({data:customerDetails.data, message:"" } , res )  
          
            return succesResponse({data:customerDetails.data, message:"Inserted " } , res )  
           
           }catch(err) {
            console.log(err)
            return  failureResponse({data:err}, res )
           }
       } ,


       updateCustomerDetails : async function (req:Request, res:Response):Promise<any> {
         try {
          
              const {userId , username} = req.userObj
              const {first_name ,  last_name , avatar=config.defaulProfileUrl} = req.body
 
             let customerDetailsUpdate =await customerService.updateCustomerDetails({userId: Number(userId), params:{first_name:first_name??"random_first_name" , last_name: last_name??"random_last_name" , avatar  } })
             if(!customerDetailsUpdate.status)
                return succesResponse({data:customerDetailsUpdate.data, message:"" } , res )  
           
             return succesResponse({data:customerDetailsUpdate.data, message:"Inserted " } , res )  
            
            }catch(err) {
             console.log(err)
             return  failureResponse({data:err}, res )
            }
        } ,

}


export default customerController 
import dotenv from "../../config/dotenv"
import { assingedVhiclesToUser, failureReturn, NavItem, succesResponse, successReturn, totalCount, transformNavItems, userTypes } from "../../config/utils"
import primsaClient from "../../db"
import { loginPayload, userCreatePayload } from "../../types/users.types"
import {bcrypt , jwt } from '../../packages/auth.package'
import { activeUserType, approveKycStatus, kyc_request, navigation_bar, owner_vhicles, owner_vhicles_payload, vhicle_provides_services, vhicleDetail } from "../../types/owner.types"
import { userRoles } from "../../config/constant"
import prismaClient from "../../db"
import { redisClient1 } from "../redis/redis.index"
import { v4 as uuidv4 } from "uuid";
import { kyc_varify_details } from "../../types/admin.types"
import { cld1 } from "../cloudinary"
import { deleteFiles } from "../../middlewares/middleware.index"
import { KycStatus } from "@prisma/client"
import { customerDetails, updateCustomerDetails } from "../../types/customer"
  
  const  customerService = {
    
    genUsername:()=>{
      return `SWC-${uuidv4()}`
    },
  
    genRc:(number:number)=>{
      return `SWC-RC-${uuidv4()}${number}`
    },

    genNickname:()=>{
      return `SWC-NCN-${uuidv4()}`
    },

   
      getCustomerDetails : async function(payload:customerDetails) {

            try {

             let customer = await  prismaClient.users.findFirst({
               where:{
                OR:[
                  {
                  id:payload.userId
                  },
                 {
                  username:payload.username
                 }
               ],
               },
               select:{first_name:true , last_name:true , phone_no:true, email:true, avatar:true }
                })

              return successReturn(customer)
              }catch(err) {
                console.log("err>>",err)
                  return failureReturn(err)
              }``
          } ,

          updateCustomerDetails : async function(payload:updateCustomerDetails) {

            try {

             let customerUpdated = await  prismaClient.users.update({
              where:{
                id: payload.userId
              },
              data:{
                first_name: payload.params.first_name,
                last_name:payload.params.last_name,
                avatar:  payload.params.avatar
              }
             })


             if(!customerUpdated)
              return failureReturn("profile not updated")


             if(customerUpdated)
              return successReturn("profile updated")


          return failureReturn("profile not updated")
              
            }catch(err) {
                console.log("err>>",err)
                  return failureReturn(err)
              }``
          } ,


         
         
          




  }


export default  customerService





// try {

      
//     return successReturn("")
//      }catch(err) {
        
//            return failureReturn(err)
//      }
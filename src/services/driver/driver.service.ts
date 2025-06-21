import dotenv from "../../config/dotenv"
import { assingedVhiclesToUser, failureReturn, NavItem, succesResponse, successReturn, totalCount, transformNavItems, userTypes } from "../../config/utils"
import primsaClient from "../../db"
import { loginPayload, userCreatePayload } from "../../types/users.types"
import {bcrypt , jwt } from '../../packages/auth.package'
import { activeUserType, approveKycStatus, kyc_request, navigation_bar, owner_vhicles, owner_vhicles_payload, vhicle_provides_services, vhicleDetail } from "../../types/owner.types"
import { userRoles } from "../../config/constant"
import prismaClient from "../../db"
// import { redisClient1 } from "../redis/redis.index"
import { v4 as uuidv4 } from "uuid";
import { kyc_varify_details } from "../../types/admin.types"
import { cld1 } from "../cloudinary"
import { deleteFiles } from "../../middlewares/middleware.index"
import { KycStatus } from "@prisma/client"
import { customerDetails, updateCustomerDetails } from "../../types/customer"
import { driverDetails, getDriverDetails } from "../../types/driver.types"
  
  const  customerService = {
   
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

          updateDriverProfile : async function(payload:driverDetails) {

            try {

              
             const {dl , rc , adhaar_card , insurance ,  pan_card   }  = payload.docs
            
             if(dl.lenth==0 || rc.length==0 || insurance.length==0 || adhaar_card.length==0 || pan_card.length==0 )
                return failureReturn(" Documents if mendatory")  
               
             
             let dlPath =await cld1.upload(dl[0].path ,`${payload.userId}-${uuidv4()}` )
             let rcPath = await cld1.upload(rc[0].path ,`${payload.userId}-${uuidv4()}`)
             let insurancePath = await cld1.upload(insurance[0].path ,`${payload.userId}-${uuidv4()}`)
             let adhaarCardPath = await cld1.upload(adhaar_card[0].path ,`${payload.userId}-${uuidv4()}` )
             let panCardPath = await cld1.upload(pan_card[0].path ,`${payload.userId}-${uuidv4()}` )
           
            if(!dlPath || !rcPath || !insurancePath ||   !adhaarCardPath || !panCardPath)  {
              await deleteFiles([dlPath[0], rcPath[0], insurancePath[0], adhaarCardPath[0] , panCardPath[0]]);
              return failureReturn({ erroMessage:"Not uploaded on cloudinary " , error:{dlPath , rcPath ,insurancePath, adhaarCardPath , panCardPath }  } ) 
            }

              let {url:dlUrl}:{url:string}  = dlPath 
              let {url:rcUrl}:{url:string}  = rcPath 
              let {url:insuranceUrl}:{url:string}  = insurancePath 
              let {url:adhaarCardUrl}:{url:string}  = adhaarCardPath 
              let {url:panCardUrl}:{url:string}  = panCardPath 

              let updateDriverProfile =  await prismaClient.driver_profile.create({
                data:{
                  DL:dlUrl,
                  RC: rcUrl,
                  insurance: insuranceUrl,
                  adhar_card: adhaarCardUrl,
                  pan_card: panCardUrl,
                  driver:payload.userId,
                  is_varified: false ,
                  created_on: new Date(),
                  updated_on : new Date(),
                }
              })

              return successReturn(updateDriverProfile)
              }catch(err) {
                console.log("err>>",err)
                  return failureReturn(err)
              }``
          } ,

          getDriverDetails : async function(payload:getDriverDetails) {
             
            try {   
             
              let partnerDetails = await prismaClient.driver_profile.findFirst({
                where:{
                driver: payload.userId  
                }
              })
              return successReturn(partnerDetails)
              }catch(err) {
                console.log("err>>",err)
                  return failureReturn(err)
              }``
          }


  }


export default  customerService





// try {

      
//     return successReturn("")
//      }catch(err) {
        
//            return failureReturn(err)
//      }
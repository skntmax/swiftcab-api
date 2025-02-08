import dotenv from "../../config/dotenv"
import { failureReturn, succesResponse, successReturn } from "../../config/utils"
import prismaClient from "../../db"
import primsaClient, { executeStoredProcedure } from "../../db"
import { kyc_varify_details } from "../../types/admin.types"
import { checkValidUser, doesUserHaveRoleOrNot, loginPayload, userCreatePayload } from "../../types/users.types"
import ownerService from "../owner/owner.service"


const  adminService = {
    
    getAllVhicles : async function() {

      try {

        let  allVhicles =await prismaClient.type_of_vhicle.findMany({
            select:{
                id:true, vhicle_type:true
            }
        })
         
          return successReturn(allVhicles)  
      }catch(err) {
          console.log(err)
               return failureReturn(err)  
      }
      
    } , 



    serviceList : async function() {

      try {

        let  sellService =await prismaClient.vhicle_services.findMany({
            select:{
                id:true , service_name:true
            }
        })
          return successReturn(sellService)  
      }catch(err) {
          console.log(err)
               return failureReturn(err)  
      }
      
    } , 

    approveKyc : async function(payload:kyc_varify_details) {
      try { 

        let  approvedKyc =await prismaClient.vhicle.update({
          data:{
             vin:payload.vin,
             license_plate: payload.license_plate ,
             manufacturer: payload.manufacturer ,
             model: payload.model ,
             year: payload.year , // DateTime in TypeScript
             color: payload.color ,
             engine_number: payload.engine_number ,
             chassis_number: payload.chassis_number ,
             fuel_type: payload.fuel_type ,
             transmission: payload.transmission,  // Restrict to known values
             is_active:true , 
             is_kyc:true
            },
             
             where:{
              id:payload.id  ,
              vhicle_owner_id:payload.userId
             }
          })
         
          return successReturn(approvedKyc)  
      }catch(err) {
          console.log(err)
               return failureReturn(err)  
      }
      
    } , 

  }


export default  adminService


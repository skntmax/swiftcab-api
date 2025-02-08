import dotenv from "../../config/dotenv"
import { failureReturn, succesResponse, successReturn } from "../../config/utils"
import prismaClient from "../../db"
import primsaClient, { executeStoredProcedure } from "../../db"
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

  }


export default  adminService


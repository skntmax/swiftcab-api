import dotenv from "../../config/dotenv"
import { failureReturn, succesResponse, successReturn } from "../../config/utils"
import primsaClient from "../../db"
import { loginPayload, userCreatePayload } from "../../types/users.types"
import {bcrypt , jwt } from '../../packages/auth.package'
import { owner_vhicles_payload } from "../../types/owner.types"
  
  const  ownerService = {
    

    createOwnerHasVhicles : async function(ownerPayload:owner_vhicles_payload) {

            try {
              let vhicleTypeInsert =await primsaClient.owner_has_vhicles.create({
                data:{
                    owner:ownerPayload.ownerId,
                    v_type:ownerPayload.vhicleId,
                    created_on:new Date(),
                    updated_on:new Date() ,
                }
              })
                             
                return successReturn(vhicleTypeInsert)
                }catch(err) {   
                     console.log(err) 
                    return failureReturn(err)
                }    
        } , 
    


    getUseTypes : async function() {

          try {

            let userTyes  =await primsaClient.type_of_user.findMany({
              select:{id:true , user_type:true}
            })                
              return successReturn(userTyes)
              }catch(err) {
                    return failureReturn(err)
              }
    } , 


  }


export default  ownerService





// try {

      
//     return successReturn("")
//      }catch(err) {
        
//            return failureReturn(err)
//      }
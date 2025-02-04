import dotenv from "../../config/dotenv"
import { failureReturn, succesResponse, successReturn } from "../../config/utils"
import primsaClient from "../../db"
import { loginPayload, userCreatePayload } from "../../types/users.types"
import {bcrypt , jwt } from '../../packages/auth.package'
import { owner_vhicles, owner_vhicles_payload } from "../../types/owner.types"
  
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

        ownerVhicles : async function(ownerPayload:owner_vhicles) {

          try {
             
             let ownerOwnsVhicles  =  await primsaClient.$queryRawUnsafe(`
                select u.id,  u.username ,tov.vhicle_type as vhicle , tov.disc  from users u 
                inner join user_has_roles uhr on uhr.user_id = u.id 
                inner join owner_has_vhicles ohv on ohv."owner"  = u.id 
                inner join type_of_vhicle tov ON tov.id = ohv.v_type 
                where uhr.role_id in(select id as owenrId from  roles r where r."name" ='Owner' )
                and u.id = ${ownerPayload?.ownerId} 
              `)


              console.log("ownerPayload",ownerOwnsVhicles)

              return successReturn(ownerOwnsVhicles)
              }catch(err) {   
                   console.log(err) 
                  return failureReturn(err)
              }    
      } , 


        
    


    getUseTypes : async function() {

          try {

            let userTyes  =await primsaClient.roles.findMany({
              select:{id:true , name:true}
            })                

              let  limitedUserTypesToProvideLogin =  userTyes.filter(ele=> ['Customer' , 'Owner'].includes(ele.name))
              return successReturn(limitedUserTypesToProvideLogin)
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
import dotenv from "../../config/dotenv"
import { failureReturn, succesResponse, successReturn } from "../../config/utils"
import prismaClient from "../../db"
import primsaClient, { executeStoredProcedure } from "../../db"
import { add_roles_to_user, addMenuItemsParams, get_users_by_role_schema, kyc_varify_details, nav_has_permission_by_role_schema, nav_menu_item, roleTypeUserTypes } from "../../types/admin.types"
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

        let ownerVhicle  = await ownerService.ownerVhicles({ownerId:Number(payload?.userId)})
        if(!ownerVhicle.status)  
           return failureReturn("you don't own any vhicle")  

        if(ownerVhicle.data){
           let  doesOwnerOwnVhicle =ownerVhicle.data?.some((ele:any)=> ele.vhicle_id==payload.id) 
           if(!doesOwnerOwnVhicle)
            return failureReturn("you don't own this vhicle")  
        }
    

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
    
    addMenu : async function(payload:nav_menu_item) {

      try {
          
        let usersMenu  

         // if provided multiple roles
          if(Array.isArray(payload.roles)) {
            let arrObj = payload.roles.map((roleId:any) => {  
              return {  
                  role_id:roleId , 
                  nav_item_id:payload.nav_menu_id  ,
                  created_on:  new Date() ,
                  updated_on: new Date()
                }}) 

              usersMenu  = await prismaClient.nav_has_permission_by_role.createMany({
                      data:arrObj
                })          
            }

            // if provided single roles
            if(!Array.isArray(payload.roles)  ) {
                usersMenu  = await prismaClient.nav_has_permission_by_role.create({
                        data:{ 
                          role_id:payload.roles , 
                          nav_item_id:payload.nav_menu_id  ,
                          created_on:  new Date() ,
                          updated_on: new Date()
                        }
                  })         
            }

            
          return successReturn(usersMenu)  
      }catch(err) {
          console.log(err)
               return failureReturn(err)  
      }
      
    } ,
    
    addingMenuItems : async function(payload:addMenuItemsParams) {
      try { 
        const { nav_item,href,icon,sub_menu} = payload
          
         let menuAdded = prismaClient.nav_items.create({
            data:{
              nav_item:nav_item ,
              href ,
              icon ,
              sub_menu:true,
              created_on:  new Date() ,
              updated_on: new Date()
            }
          })
          
          if(!menuAdded)
             return failureReturn({menuAdded , message:"error in adding menu items"})
            
          return successReturn(menuAdded)  
      }catch(err) {
          console.log(err)
               return failureReturn(err)  
      }
      
    } , 

    getUsersByRole : async function(payload:get_users_by_role_schema) {
      try { 
        const roleIdString = Array.isArray(payload.role_id)
        ? payload.role_id.join(",")
        : payload.role_id;
      
      let offset = (Number(payload.pn) - 1) * Number(payload.limit);
      
      let userByRole: roleTypeUserTypes[] = await prismaClient.$queryRawUnsafe<roleTypeUserTypes[]>(` 
        SELECT u.username, u.id, u.email,
               CAST(COUNT(*) OVER() AS INTEGER) AS total
        FROM users u WHERE u.id IN (
          SELECT uhr.user_id FROM user_has_roles uhr 
          WHERE uhr.role_id IN (${roleIdString})
        )
        OFFSET $1 LIMIT $2
      `, offset, payload.limit);

          if(!userByRole)
             return failureReturn({userByRole , message:"error in getting role based user "})

          return successReturn(userByRole)  
      }catch(err) {
          console.log(err)
               return failureReturn(err)  
      }
      
    } , 


    addRolesToUsers : async function(payload:add_roles_to_user) {
      try { 

        let roleAdded = await prismaClient.user_has_roles.create({
           data:{
             role_id: payload.role_id,
             user_id: payload.userId,
             created_on:  new Date() ,
             updated_on: new Date()
           }
        }) 
         
          if(!roleAdded)
             return failureReturn({roleAdded , message:"error in adding roles "})

          return successReturn(roleAdded)  
      }catch(err) {
          console.log(err)
               return failureReturn(err)  
      }
      
    } , 



  }


export default  adminService


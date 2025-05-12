import dotenv from "../../config/dotenv"
import { failureReturn, succesResponse, successReturn } from "../../config/utils"
import prismaClient from "../../db"
import primsaClient, { executeStoredProcedure } from "../../db"
import { add_navigation, add_roles_to_user, addMenuItemsParams, get_users_by_role_schema, kyc_varify_details, nav_has_permission_by_role_schema, nav_menu_item, roleTypeUserTypes } from "../../types/admin.types"
import { checkValidUser, doesUserHaveRoleOrNot, loginPayload, userCreatePayload } from "../../types/users.types"
import ownerService from "../owner/owner.service"


type GroupedUser = {
  username: string;
  id: number;
  email: string;
  total: number;
  roleId: number[];
  role: string[];
};
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
        SELECT u.username, u.id, u.email , r.id as role_id , r.name  as role ,
               CAST(COUNT(*) OVER() AS INTEGER) AS total
        FROM users u 
        	INNER JOIN  user_has_roles uhr2 on uhr2.user_id =  u.id
					inner join roles r ON r.id = uhr2.role_id 
        WHERE u.id IN (
          SELECT uhr.user_id FROM user_has_roles uhr 
          WHERE uhr.role_id IN (${roleIdString})
        )
        OFFSET $1 LIMIT $2
      `, offset, payload.limit);


      // grouping by username 
      const groupedUsers: GroupedUser[] = userByRole.reduce((acc: GroupedUser[], ele) => {
        const existingUser = acc.find(item => item.username === ele.username);
        if (existingUser) {
          // If the user already exists, push new role data
          existingUser.roleId.push(ele.role_id);
          existingUser.role.push(ele.role);
        } else {
          // Else create a new entry
          acc.push({
            username: ele.username,
            id: ele.id,
            email: ele.email,
            total: ele.total,
            roleId: [ele.role_id],
            role: [ele.role]
          });
        }
      
        return acc;
      }, []);

      
      if(!groupedUsers)
             return failureReturn({users:null  , message:"error in getting role based user "})

          return successReturn({users:groupedUsers , metadata:{ page:payload.pn,limit:payload.limit , total: groupedUsers[0]?.total } })  
      }catch(err) {
          console.log(err)
               return failureReturn(err)  
      }
      
    } , 

    removeRolesByUserId : async function (userId:number) {
  
      let status = false
      
      let deletedRoles =await  primsaClient.$queryRawUnsafe(`
          DELETE FROM user_has_roles uhr
          USING users u
          WHERE u.id = uhr.user_id
            AND u.id = $1 ;
        `,userId)
       
       if(deletedRoles) 
           status= true

       console.log(status)
        return status 
      } ,

    addRolesToUsers : async function(payload:add_roles_to_user) {
      try { 

      // delete existing user 
        let existingRolesDeleted =await this.removeRolesByUserId(payload.userId)
      if(!existingRolesDeleted)
        return failureReturn({ message:"unable to delete user , due to existing user conflict"})


      // updategin roles for more than 1 role
      if(Array.isArray(payload.role_id) && payload.role_id.length>1 ) {
        for(let i=0; i<payload.role_id.length;i++) {
          await prismaClient.user_has_roles.create({
            data:{
              role_id: payload.role_id[i],
              user_id: payload.userId,
              created_on:  new Date() ,
              updated_on: new Date()
            }
         })    
        }
        return successReturn("roles updated")  
       }

      // updategin roles for roles equivalent to 1 
       if(Array.isArray(payload.role_id) && payload.role_id.length==1 ) {
        let roleAdded = await prismaClient.user_has_roles.create({
          data:{
            role_id: payload.role_id[0],
            user_id: payload.userId,
            created_on:  new Date() ,
            updated_on: new Date()
          }
       }) 
        
         if(!roleAdded)
            return failureReturn({roleAdded , message:"error in adding roles "})

         return successReturn(roleAdded)  
       }


       return failureReturn({undefined , message:"error in adding roles "})
       
      }catch(err) {
          console.log(err)
               return failureReturn(err)  
      }
      
    } , 

    addNavbar : async function (params:add_navigation) {
  
     let addedNavbar = await  primsaClient.nav_items.create({
       data:{
         nav_item:params.nav_item,
         sub_menu:params.sub_menu,
         href: params.href,
         icon:params.icon,
         created_on:  new Date() ,
         updated_on: new Date()
       }
     })
     

     if(!addedNavbar) 
        return failureReturn({data:"some failure occured"})
    
        return  successReturn(addedNavbar)   
      } ,



  }


export default  adminService


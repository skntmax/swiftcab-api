import dotenv from "../../config/dotenv"
import { failureReturn, succesResponse, successReturn } from "../../config/utils"
import primsaClient from "../../db"
import { loginPayload, userCreatePayload } from "../../types/users.types"
import {bcrypt , jwt } from '../../packages/auth.package'
import { kyc_request, owner_vhicles, owner_vhicles_payload, vhicle_provides_services } from "../../types/owner.types"
import { userRoles } from "../../config/constant"
import prismaClient from "../../db"
import { redisClient1 } from "../redis/redis.index"
import { v4 as uuidv4 } from "uuid";
import { kyc_varify_details } from "../../types/admin.types"
  
  const  ownerService = {
    
    genUsername:()=>{
      return `SWC-${uuidv4()}`
    },
  
    genRc:(number:number)=>{
      return `SWC-RC-${uuidv4()}${number}`
    },

    genNickname:()=>{
      return `SWC-NCN-${uuidv4()}`
    },

    createOwnerHasVhicles : async function(ownerPayload:owner_vhicles_payload) {
            try {
              let vhicleTypeInsert =await primsaClient.vhicle.create({
                data:{
                    username: this.genUsername() ,
                    name: this.genNickname(),
                    rc:this.genRc(Math.random()*1000),
                    vhicle_type_id:ownerPayload.vhicleId,
                    vhicle_owner_id:ownerPayload.ownerId,
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
                select vh.id as vhicle_id  , vh.username  , vh.is_kyc , vh.username as vhicle_username , vh.kyc_varification ,  tov.vhicle_type as vhicle , tov.disc  from users u 
                inner join user_has_roles uhr on uhr.user_id = u.id 
                inner join vhicle vh on vh.vhicle_owner_id   = u.id 
                inner join type_of_vhicle tov ON tov.id = vh.vhicle_type_id 
                where uhr.role_id in(select id as owenrId from  roles r where r."name" ='${userRoles.owner}' )
                and u.id = ${ownerPayload?.ownerId} and vh.is_active = true  
              `)


              return successReturn(ownerOwnsVhicles)
              }catch(err) {   
                   console.log(err) 
                  return failureReturn(err)
              }    
      } , 


        
    


    getUserTypes : async function(cacheKey?:string) {

          try {
 
            let userTyes  =await primsaClient.roles.findMany({
              select:{id:true , name:true}
            })                

              let  limitedUserTypesToProvideLogin =  userTyes.filter(ele=> [ userRoles.customer ,  userRoles.owner ].includes(ele.name))
              

              if(cacheKey)
                await redisClient1.set(cacheKey, JSON.stringify(limitedUserTypesToProvideLogin))
              
              return successReturn(limitedUserTypesToProvideLogin)
              }catch(err) {
                  console.log("err>>",err)
                    return failureReturn(err)
              }


    } , 


    vhicleProvidesServices : async function(payload:vhicle_provides_services) {

      try {

         let addVhServices =await  prismaClient.vhicle_provides_services.create({
              data:{
                vhicle_id:payload.vhicleId,
                service_id:payload.serviceId,
                created_on:new Date(),
                updated_on:new Date() ,
              }
            })
      
            return successReturn(addVhServices)
          }catch(err) {
            console.log("err>>",err)
              return failureReturn(err)
          }
      } , 


      getVhicleServicesList : async function(payload:owner_vhicles) {

        try {
  
           let vhicleProvidesServiesList =await  prismaClient.$queryRawUnsafe(` 
            select   v.username vhicle_username, tov.vhicle_type as vhicle_type , vs.service_name  from users u 
            inner join  vhicle v on v.vhicle_owner_id = u.id 
            inner join  vhicle_provides_services vps on  vps.vhicle_id = v.id 
            inner join  type_of_vhicle tov on tov.id = v.vhicle_type_id 
            inner join  vhicle_services vs on vs.id = vps.service_id 
            where u.id = ${payload.ownerId}
            `)
        
              return successReturn(vhicleProvidesServiesList)
            }catch(err) {
              console.log("err>>",err)
                return failureReturn(err)
            }
        } , 


        ownerActiveVhicleList : async function(payload:owner_vhicles) {

          try {
    
             let ownerVhicleList =await  prismaClient.$queryRawUnsafe(` 
              select v.id ,v.is_kyc , v.username as vhicle_username , tov.vhicle_type as name  from vhicle v 
              inner join type_of_vhicle tov ON tov.id = v.vhicle_type_id 
              where  v.vhicle_owner_id =${payload.ownerId} and v.is_active =true 
              `)
                return successReturn(ownerVhicleList)
              }catch(err) {
                console.log("err>>",err)
                  return failureReturn(err)
              }
          } , 
  

          kycRequest : async function(payload:kyc_varify_details ,  ) {

            try {
      
              let ownerVhicle  = await ownerService.ownerVhicles({ownerId:Number(payload?.userId)})
              if(!ownerVhicle.status)  
                 return failureReturn("you don't own any vhicle")  
      
              if(ownerVhicle.data){
                 let  doesOwnerOwnVhicle =ownerVhicle.data?.some((ele:any)=> ele.vhicle_id==payload.id) 
                 if(!doesOwnerOwnVhicle)
                  return failureReturn("you don't own this vhicle")  
              }
          
      
              let  fileForKyc =await prismaClient.vhicle.update({
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
                   is_kyc:false,
                   kyc_varification :"INITIATED"
                  },
                   where:{
                    id:payload.id  ,
                    vhicle_owner_id:payload.userId
                   }
                })
            

                  return successReturn(fileForKyc)
                }catch(err) {
                  console.log("err>>",err)
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
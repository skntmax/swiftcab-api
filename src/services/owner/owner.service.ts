import dotenv from "../../config/dotenv"
import { assingedVhiclesToUser, failureReturn, NavItem, succesResponse, successReturn, totalCount, transformNavItems, userTypes } from "../../config/utils"
import primsaClient from "../../db"
import { loginPayload, userCreatePayload } from "../../types/users.types"
import {bcrypt , jwt } from '../../packages/auth.package'
import { activeUserType, approveKycStatus, assingDriverToVhicle, blockUnblockPayload, kyc_request, navigation_bar, owner_vhicles, owner_vhicles_payload, removeUserByUsername, vhicle_provides_services, vhicleDetail } from "../../types/owner.types"
import { userRoles } from "../../config/constant"
import prismaClient from "../../db"
import { redisClient1 } from "../redis/redis.index"
import { v4 as uuidv4 } from "uuid";
import { kyc_varify_details } from "../../types/admin.types"
import { cld1 } from "../cloudinary"
import { deleteFiles } from "../../middlewares/middleware.index"
import { KycStatus } from "@prisma/client"
  
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
                select vh.id as vhicle_id  , vh.username  , vh.is_kyc , vh.username as vhicle_username , vh.kyc_varification ,
               vh.name , vh.rc, vh.is_kyc, vh.vin , vh.license_plate , vh.manufacturer , vh.model , vh.year , vh.color , vh.engine_number , vh.chassis_number,
               vh.fuel_type , vh.ss_one , vh.ss_two , vh.rc_doc ,
                  tov.vhicle_type as vhicle , tov.disc  from users u 
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
          
          ownerVarifiedVhicles : async function(payload:owner_vhicles) {
          try {
    
             let ownerVarifiedVhicle =await  prismaClient.$queryRawUnsafe(` 
              SELECT 
              v.id,
              v.is_kyc,
              v.username AS vhicle_username,
              tov.vhicle_type AS name
            FROM vhicle v
            INNER JOIN type_of_vhicle tov ON tov.id = v.vhicle_type_id
            LEFT JOIN driver_belongs_to_owner dbto 
              ON dbto.assigned_vhicle = v.id
            WHERE 
              v.vhicle_owner_id = $1
              AND v.is_active = true
              AND v.is_kyc = true
              AND dbto.assigned_vhicle IS NULL;
              `,payload.ownerId)
                return successReturn(ownerVarifiedVhicle)
              }catch(err) {
                console.log("err>>",err)
                  return failureReturn(err)
              }
          } , 
  

          kycRequest : async function(payload:kyc_varify_details , docs:any  ) {

            try {
      
              let ownerVhicle  = await ownerService.ownerVhicles({ownerId:Number(payload?.userId)})
              if(!ownerVhicle.status)  
                 return failureReturn("you don't own any vhicle")  
      
              if(ownerVhicle.data){
                 let  doesOwnerOwnVhicle =ownerVhicle.data?.some((ele:any)=> ele.vhicle_id==payload.id) 
                 if(!doesOwnerOwnVhicle)
                  return failureReturn("you don't own this vhicle")  
              }
          

             const {ss_one , ss_two , rc_doc}  = docs
            
             if(ss_one.lenth==0 || ss_two.length==0 ||rc_doc.length==0 )
                return failureReturn(" Documents if mendatory")  
               
             
             let ssOnePath =await cld1.upload(ss_one[0].path ,`${payload.userId}-${uuidv4()}` )
             let ssTwoPath = await cld1.upload(ss_two[0].path ,`${payload.userId}-${uuidv4()}`)
             let rcDocPath = await cld1.upload(rc_doc[0].path ,`${payload.userId}-${uuidv4()}` )
           
            if(!ssOnePath || !ssTwoPath ||  !rcDocPath)  {
              await deleteFiles([ss_one[0], ss_two[0], rc_doc[0]]);
              return failureReturn({ erroMessage:"Not uploaded on cloudinary " , error:{ssOnePath ,ssTwoPath ,rcDocPath }  } ) 
            }
            

              let {url:ss_one_url}  = ssOnePath 
              let {url:ss_two_url}  = ssTwoPath 
              let {url:rc_doc_url}  = rcDocPath 


             let  fileForKyc =await prismaClient.vhicle.update({
                data:{
                   vin:payload.vin,
                   license_plate: payload.license_plate ,
                   manufacturer: payload.manufacturer ,
                   model: payload.model ,
                   year:  payload.year , // DateTime in TypeScript
                   color: payload.color ,
                   engine_number: payload.engine_number ,
                   chassis_number: payload.chassis_number ,
                   fuel_type: payload.fuel_type ,
                   transmission: payload.transmission,  // Restrict to known values
                   ss_one:ss_one_url ,
                   ss_two:ss_two_url,
                   rc_doc:rc_doc_url,
                   is_active:true , 
                   is_kyc:false,
                   kyc_varification :"INITIATED"
                  },
                   where:{
                    id:Number(payload.id)   ,
                    vhicle_owner_id:payload.userId
                   }
                })
            

                  // deleting files
                  setTimeout(async ()=>  await deleteFiles([ss_one[0], ss_two[0], rc_doc[0]]) , 4000 ) // files getting deleted after 4000 ms 
                   
                  return successReturn(fileForKyc)
                }catch(err) {
                  console.log("err>>",err)
                  deleteFiles(docs)
                    return failureReturn(err)
                }
            } , 


            getNavbar : async function(payload:navigation_bar) {

            try {
    
             let navbarByRole:NavItem[] =await  prismaClient.$queryRawUnsafe(` 
              select r."name" as role , ni.nav_item , ni.sub_menu , ni.href, sni.sub_nav_item , sni.href  as sub_href  , ni.icon as icon, sni.icon  as sub_icon    from nav_items ni 
              inner join nav_has_permission_by_role nhpbr ON nhpbr.nav_item_id = ni.id 
              inner join roles r ON r.id = nhpbr.role_id 
              left join  sub_nav_items sni on  ni.id  = sni.nav_item_id
              where nhpbr.role_id = ${payload.role}
              `)

            
            if(navbarByRole?.length==0)
              return successReturn(navbarByRole)
              
              let nav = transformNavItems(navbarByRole , payload.username, navbarByRole[0].role?.toLocaleLowerCase())
             
              return successReturn(nav)
              }catch(err) {
                console.log("err>>",err)
                  return failureReturn(err)
              }``
          } ,

          assignDriver : async function(payload:assingDriverToVhicle) {

            try {
    
            let userInfo = await this.getUserInfoByUsername(payload.owner)
            console.log("userInfo",userInfo)
            if(!userInfo?.status)
               return failureReturn({message:"owner id not found" })
             
            let ownerId = userInfo?.data?.id 
            let driverAssigned =await  prismaClient.driver_belongs_to_owner.create({
              data:{
                owner: ownerId,
                driver: payload.self==true? ownerId: payload.driver,
                assigned_vhicle:payload.vhicle_assigned,
                updated_by:payload.userId,
                self: payload.self,
                created_on: new Date(),
                updated_on: new Date()
              }
             })

            
            if(!driverAssigned)
              return failureReturn(driverAssigned)
        
            return successReturn(driverAssigned)
              }catch(err) {
                console.log("err>>",err)
                  return failureReturn(err)
              }``
          } ,
          
          getActiveUsers : async function(payload:activeUserType) {
            try {
              const {limit , page }  = payload
              let skip =  (page-1)*limit 


              // with manual search by usernameOrEmail , with registered vhicles 
              if(payload.usernameOrEmail || payload.searchByManual) {
                // if searched by username or email 
                let where = `WHERE (u.email like '%${payload.usernameOrEmail}%'  OR u.username like '%${payload.usernameOrEmail}%') AND r."name"='${userRoles.owner}'`
                let query = ` 
                      SELECT u.id ,  u.username username,  u.email email, u.is_active as email_verification_pending ,  uhr.role_id AS role_id  , r."name"  as role ,
                      v.id as vhicle_id , v.username as vhicle_username
                      FROM users u
                      INNER JOIN user_has_roles uhr ON uhr.user_id = u.id
                      inner join roles r ON r.id  = uhr.role_id 
                      inner join  vhicle v on v.vhicle_owner_id = u.id   
                  `

                  if(payload.usernameOrEmail)
                        query=  query+where

                   let totalQuery =  `
                  select count(dt.id) as total from (${query}) as dt `
 
                    
                  query=  query+`offset  ${skip} limit ${limit}`

                  console.log(query)
                  let totalUsersWithVhicles:totalCount[] =await  prismaClient.$queryRawUnsafe(totalQuery)
                  let searchByuser:assingedVhiclesToUser[] =await prismaClient.$queryRawUnsafe(query)
                  
                  let finalResult =searchByuser.reduce((acc:any , ele:any )=>{
                  if(acc.filter((_:any)=> _?.id==ele.id).length==0) {
                       acc.push({
                          "id": ele.id,
                         "username": ele.username,
                         "email": ele.email,
                         "role_id": ele.role_id,
                         "role": ele.role,
                         vhicles:[{vhicle_id:ele.vhicle_id ,vhicle_username: ele.vhicle_username}]
                       })
                    }else{
                     acc.forEach((_:any)=>{
                        if(_.id==ele.id) {
                             _.vhicles =  [..._.vhicles ,{vhicle_id:ele.vhicle_id ,vhicle_username: ele.vhicle_username  }]
                        }
                     })    
                    }           
                    return acc  
                 } , [])

                return successReturn({users:finalResult , metadata:{page,limit , total: Number(totalUsersWithVhicles[0].total || 0) } })
               
              }
              




              // without any search filter 
              let query = ` select  u.id  , u.username , u.email,  uhr.role_id , u.is_active as email_verification_pending ,  r."name" as role  from  users u
              inner join user_has_roles uhr on uhr.user_id = u.id 
              inner join  roles r on r.id  = uhr.role_id `

            
              
              if (Array.isArray(payload.role)  && payload.role.length>0) {
                     query   = query+`where r.id in(${payload.role.join(',')})` 
                }
                  let totalQuery =  `
               select count(dt.id) as total from (${query}) as dt `

                query=  query+` offset  ${skip} limit ${limit} ` 
                  
                let users:userTypes[] =await  prismaClient.$queryRawUnsafe(query)
                let totalUsers:totalCount[] =await  prismaClient.$queryRawUnsafe(totalQuery)
              
                return successReturn({users , metadata:{page,limit , total: Number(totalUsers[0].total) } })
              }catch(err) {
                console.log("err>>",err)
                  return failureReturn(err)
              }
          } , 


          getVhicleDetailsById : async function(payload:vhicleDetail) {

            try {

             let vhicleDetail =await  prismaClient.vhicle.findMany({
              where:{
                id:{
                   in:payload.vhicleIds, 
                } ,
                // kyc_varification:"INITIATED",
                vhicle_owner_id:payload.ownerId
              },
              
             })

              return successReturn(vhicleDetail)
              }catch(err) {
                console.log("err>>",err)
                  return failureReturn(err)
              }``
          } ,


          approveVhicleKyc : async function(payload:approveKycStatus) {

            try {

             let updatedVhicleKycStatus =await  prismaClient.vhicle.update({
              where:{
                id:payload.vhicleId ,
                vhicle_owner_id:payload.ownerId
              } ,
              data:{
                 kyc_varification:payload.kycStatus,
                 is_kyc:(payload.kycStatus==KycStatus.COMPLETED || payload.kycStatus==KycStatus.VERIFIED)?true:false 
              }
             })
             
              return successReturn(updatedVhicleKycStatus)
              }catch(err) {
                console.log("err>>",err)
                  return failureReturn(err)
              }``
          } ,

          
          removeUserByUsername : async function(payload:removeUserByUsername) {
            try {
              let userRemoveQuery = ` 
                WITH deleted_roles AS (
                DELETE FROM user_has_roles 
                  USING users 
                  WHERE users.id = user_has_roles.user_id 
                  AND users.username  = '${payload.username}'
                  RETURNING user_has_roles.user_id
              )
              DELETE FROM users 
              WHERE id IN (SELECT user_id FROM deleted_roles);
              `
             let userRemoved = await  prismaClient.$queryRawUnsafe(userRemoveQuery) 

              return successReturn({user:payload.username })
              }catch(err) {
                console.log("err>>",err)
                  return failureReturn(err)
              }``
          } ,

          
          blockUnblockuser : async function(payload:blockUnblockPayload) {
            try {
              let blockUnblockQuery = ` 
                update  users u  
                set is_active= ${payload.isActive} 
                where u.username ='${payload.username}'
                `
              let userRemoved = await  prismaClient.$queryRawUnsafe(blockUnblockQuery) 
              return successReturn({user:payload.username })
              }catch(err) {
                console.log("err>>",err)
                  return failureReturn(err)
              }``
          } ,
          updateVhicleAvatar :  async function({docs}:any) {
            try {
              
              const {vh_avatar}  = docs
              if( vh_avatar && vh_avatar?.length==0 )
                 return failureReturn(" Documents if mendatory")  
                
              let vhicleAvatarPath =await cld1.upload(vh_avatar[0]?.path ,`${new Date()}-${uuidv4()}` )
              
              if(!vhicleAvatarPath )  {
                return failureReturn({ erroMessage:"Not uploaded on cloudinary " , error:{vhicleAvatarPath }  } ) 
              }

              let {url:avatar_url}  = vhicleAvatarPath 
              await deleteFiles([vh_avatar[0]]);
              return successReturn({avatar_url })
              }catch(err) {
                console.log("err>>",err)
                  return failureReturn(err)
              }``
          } ,

          uploadMasterDoc :   async function({docs}:any) {
            try {
              
              const {doc} = docs
              if( doc && doc?.length==0 )
                 return failureReturn(" Documents if mendatory")  
                
              let docPath =await cld1.upload(doc[0]?.path ,`${new Date()}-${uuidv4()}` )
              
              if(!docPath )  {
                return failureReturn({ erroMessage:"Not uploaded on cloudinary " , error:{docPath }  } ) 
              }

              let {url:doc_url}  = docPath 
              await deleteFiles([doc[0]]);
              return successReturn({doc_url })
              }catch(err) {
                console.log("err>>",err)
                  return failureReturn(err)
              }``
          } ,

            getUserInfoByUsername :   async function(username:string) {
            try {
              
              let usersInfo = await prismaClient.users.findFirst({
                where:{
                  username
                }
              })
              
              if(!usersInfo) 
                 return failureReturn(usersInfo)

              return successReturn(usersInfo)
              }catch(err) {
                console.log("err>>",err)
                  return failureReturn(err)
              }``
          } ,




  }


export default  ownerService





// try {

      
//     return successReturn("")
//      }catch(err) {
        
//            return failureReturn(err)
//      }
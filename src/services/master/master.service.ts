import { Prisma } from "@prisma/client"
import config from "../../config/config"
import { userRoles } from "../../config/constant"
import dotenv from "../../config/dotenv"
import { failureReturn, NavItem, succesResponse, successReturn, transformNavItems } from "../../config/utils"
import prismaClient from "../../db"
import primsaClient, { executeStoredProcedure } from "../../db"
import { checkValidUser, doesUserHaveRoleOrNot, loginPayload, userCreatePayload } from "../../types/users.types"
import { redisClient1 } from "../redis/redis.index"
import { s3Client1 } from "../s3Bucket/s3Bucket"
import { navigation_bar_list } from "../../types/master.types"

const  masterService = {
    
    getCountries : async function(cacheKey?:string) {

      try {
          let countries =await prismaClient.countries.findMany({
            select:{
              id:true,
              country:true
            },
          })

         if(cacheKey && countries ){
           await redisClient1.set(cacheKey , JSON.stringify(countries), )
           await redisClient1.expire(cacheKey ,config.cache_time  )
         }
           
        return successReturn(countries)  

      }catch(err) {
          console.log(err)
               return failureReturn(err)  
      }
      
    } , 

    getStates :  async function(country_code:string, cacheKey?:string) {

      try {
          let states =await prismaClient.states.findMany({
             where:{
              country_id:Number(country_code) 
             },
            select:{
              id:true,
              state:true
            }
          })

         if(cacheKey && states ){
          console.log("cacheKey",cacheKey)
           await redisClient1.set(cacheKey , JSON.stringify(states), )
           await redisClient1.expire(cacheKey ,config.cache_time  )
         }
           
        return successReturn(states)  

      }catch(err) {
          console.log(err)
               return failureReturn(err)  
      }
      
    } , 

    getCity : async function(state_id:string, cacheKey?:string) {

      try {

          let cities =await prismaClient.cities.findMany({
             where:{
              state_id:Number(state_id) ,
             },
            select:{
              id:true,
              city:true
            }
          })

         if(cacheKey && cities ){
          console.log("cacheKey",cacheKey)
           await redisClient1.set(cacheKey , JSON.stringify(cities), )
           await redisClient1.expire(cacheKey ,config.cache_time  )
         }
           
        return successReturn(cities)  

      }catch(err) {
          console.log(err)
               return failureReturn(err)  
      }
      
    } , 

    getLocality : async function(city_id :string,  cacheKey?:string) {

      try {

          let locality =await prismaClient.localities.findMany({
             where:{
              city_id:Number(city_id) ,
             },
            select:{
              id:true,
              locality:true
            }
          })

         if(cacheKey && locality ){
  
           await redisClient1.set(cacheKey , JSON.stringify(locality), )
           await redisClient1.expire(cacheKey ,config.cache_time  )
         }
           
        return successReturn(locality)  

      }catch(err) {
          console.log(err)
               return failureReturn(err)  
      }
      
    } , 

    getVhicleType : async function(cacheKey?:string) {

      try {

          let vhicleType =await prismaClient.type_of_vhicle.findMany({
             select:{
                id:true,
               vhicle_type:true,
               avatar:true,
             },
             where:{
               is_active:true
             }
          })

         if(cacheKey && vhicleType ){
           await redisClient1.set(cacheKey , JSON.stringify(vhicleType), )
           await redisClient1.expire(cacheKey ,config.cache_time  )
         }
           
        return successReturn(vhicleType)  

      }catch(err) {
          console.log(err)
               return failureReturn(err)  
      }
      
    } ,
    
    getbanks :  async function(cacheKey?:string) {

      try {

          let banks =await prismaClient.banks.findMany({
             select:{
                id:true,
                bank_name :true
             }
          })

         if(cacheKey && banks ){
           await redisClient1.set(cacheKey , JSON.stringify(banks), )
           await redisClient1.expire(cacheKey ,config.cache_time  )
         }
        return successReturn(banks)  

      }catch(err) {
          console.log(err)
               return failureReturn(err)  
      }
      
    } ,
    getBankBranch :  async function(params:{cacheKey:string, bankId:Number}) {

      try {

          const {cacheKey, bankId} = params
          let bankBranches= await prismaClient.$queryRawUnsafe<{id:number, branch_name :string}[]>(`
               select bb.id , bb.branch_name from banks b 
                right join  bank_branch bb on bb.bank_id = b.id 
                where bb.bank_id=$1
            `,bankId)
         
          if(cacheKey && bankBranches ){
           await redisClient1.set(cacheKey , JSON.stringify(bankBranches), )
           await redisClient1.expire(cacheKey ,config.cache_time  )
         }
        return successReturn(bankBranches)  

      }catch(err) {
          console.log(err)
               return failureReturn(err)  
      }
      
    } ,
     
    getDriverList :  async function(params:{cacheKey:string}) {

      try {

          const {cacheKey} = params
          let driverLists= await prismaClient.$queryRawUnsafe<{driver_id :number, driver_username:string}[]>(`
                select   u.id as driver_id , u.username as driver_username from users u 
                inner join  user_has_roles uhr  on uhr.user_id = u.id 
                inner join roles r on r.id  = uhr.role_id 
                where r."name" =$1 and u.is_active = true
                AND u.id   NOT IN  (  select  dbto.driver from driver_belongs_to_owner dbto  )
                
            `, userRoles.driverPartner)
         
          if(cacheKey && driverLists ){
           await redisClient1.set(cacheKey , JSON.stringify(driverLists), )
           await redisClient1.expire(cacheKey ,config.cache_time  )
         }
        return successReturn(driverLists)  

      }catch(err) {
          console.log(err)
               return failureReturn(err)  
      }
      
    } ,


    uploadToS3 : async function(payload:{fileName:string , contentType:string}) {
      try {
        let key = payload?.fileName
        let contentType = payload?.contentType
        let puturl = await s3Client1.getSignedPutUrl(key,contentType)
        return successReturn(puturl)  

      }catch(err) {
          console.log(err)
               return failureReturn(err)  
      }
      
    } ,

    getUploadedFile :  async function(key:string) {
      try {
        let puturl = await s3Client1.getPublicUrl(key)
        return successReturn(puturl)  

      }catch(err) {
          console.log(err)
               return failureReturn(err)  
      }
      
    } ,

    getPermissions : async function(pn:number , rowPerPage:number,cacheKey:string ,) {
    try {
          let permList;
          let totalCount;

          console.log("pn , rowPerPage", pn , rowPerPage)
          if (pn && rowPerPage) {
            // Paginated fetch
            const skip = (pn - 1) * rowPerPage;
            const limit = rowPerPage;

            [permList, totalCount] = await Promise.all([
              prismaClient.permissions.findMany({
                skip,
                take: limit,
                select: {
                  id: true,
                  permission_name: true,
                  permission_identifer: true,
                  active_role_perm: { select: { role_id: true } },
                },
                where:{
                  is_active:true
                }
              }),
              prismaClient.permissions.count(),
            ]);
          } else {
            // Fetch all (no pagination)
            [permList, totalCount] = await Promise.all([
              prismaClient.permissions.findMany({
                select: {
                  id: true,
                  permission_name: true,
                  permission_identifer: true,
                  active_role_perm: { select: { role_id: true } },
                },
                 where:{
                  is_active:true
                }
              }),
              prismaClient.permissions.count(),
            ]);
          }

          const result = {
            permissions: permList,
            totalCount,
            currentPage: pn ?? 1,
            totalPages: pn && rowPerPage ? Math.ceil(totalCount / rowPerPage) : 1,
          };

          if (cacheKey && permList) {
            await redisClient1.set(cacheKey, JSON.stringify(result));
            await redisClient1.expire(cacheKey, config.cache_time);
          }

          return successReturn(result);
        } catch (err) {
          console.log(err);
          return failureReturn(err);
        }

    } ,

     
     roleHasCapabilites: async function (user_has_roles: number[] | number) {
        try {
          // Normalize input to an array
          const roles = Array.isArray(user_has_roles) ? user_has_roles : [user_has_roles];

          if (roles.length === 0) {
            return failureReturn("No roles provided");
          }

          // Use parameterized query with ANY() for arrays
          const roleHasCapabilites = await prismaClient.$queryRaw<
            { id: number; capability_name: string; capability_identifier: string }[]
          >`
            SELECT c.id, c.capability_name, c.capability_identifier 
            FROM capabilities c
            JOIN roles r ON r.id = c.role_id 
            WHERE r.id = ANY(${roles}::int[])
          `;

          return successReturn(roleHasCapabilites);
        } catch (err) {
          console.error(err);
          return failureReturn(err);
        }
      },

        capHasPermsissions: async function getRoleHasCapabilities(user_has_roles: number[] | number) {
        try {
          // Normalize input to an array
          const roles = Array.isArray(user_has_roles) ? user_has_roles : [user_has_roles];

          if (roles.length === 0) {
            return failureReturn("No roles provided");
          }

          // Convert array into SQL-friendly format for ANY()
          const roleIds = `{${roles.join(",")}}`; // → {1,2,3}

          const query = `
            SELECT sni.permission_id, p.permission_name, chp.*
            FROM capabilities_have_permissions chp
            JOIN permissions p ON p.id = chp.permission_id
            JOIN sub_nav_items sni ON sni.permission_id = chp.permission_id
            WHERE chp.capability_id IN (
              SELECT c.id
              FROM capabilities c
              JOIN roles r ON r.id = c.role_id
              WHERE r.id = ANY('${roleIds}'::int[])
            )
          `;

          const roleHasCapabilites = await prismaClient.$queryRawUnsafe(query);

          return successReturn(roleHasCapabilites);
        } catch (err) {
          console.error(err);
          return failureReturn(err);
        }
      },

      permissionByCapId : async function getRoleHasCapabilities(capId:number) {
        try {

          if (!capId || isNaN(capId)) {
            return failureReturn("Capability ID is required and must be a number");
          }

            const query = `
              SELECT sni.permission_id, p.permission_name, chp.*
              FROM capabilities_have_permissions chp
              JOIN permissions p ON p.id = chp.permission_id
              JOIN sub_nav_items sni ON sni.permission_id = chp.permission_id
              WHERE chp.capability_id IN (
                SELECT c.id
                FROM capabilities c
          WHERE c.id =${capId}
              )

            `;

          const permByCapId = await prismaClient.$queryRawUnsafe(query);

          return successReturn(permByCapId);
        } catch (err) {
          console.error(err);
          return failureReturn(err);
        }
      },
  

          getNavbarList: async function (payload?: navigation_bar_list) {

              try {
    
             let navbarByRole:NavItem[] =await  prismaClient.$queryRawUnsafe(` 
               select ni.nav_item , ni.sub_menu , ni.href, sni.sub_nav_item , sni.href  as sub_href  , ni.icon as icon, sni.icon  as sub_icon , sni.permission_id    
               from nav_items ni 
              left join  sub_nav_items sni on  ni.id  = sni.nav_item_id
              where  ni.is_active = true and sni.is_active = true
              `)

            
            if(navbarByRole?.length==0)
              return successReturn(navbarByRole)

            // filter menu items by  capabilites has permissions 

            // let capHasPermission = await masterService.capHasPermsissions(payload.role)

            console.log("before>>", navbarByRole.length)
            console.log("after>>", navbarByRole.length)


              //  Group by role
              const grouped: Record<string, NavItem[]> = navbarByRole.reduce((acc, item) => {
                if (!acc[item.nav_item]) {
                  acc[item.nav_item] = [];
                }
                acc[item.nav_item].push(item);
                return acc;
              }, {} as Record<string, NavItem[]>);

              //  Sort each role group by `nav_item`
              Object.keys(grouped).forEach(nav_item => {
                grouped[nav_item].sort((a, b) => a.nav_item.localeCompare(b.nav_item));
              });

              //  Flatten to one array in the same structure
              const sortedFlattened: NavItem[] = Object.values(grouped).flat();
            
              let nav = transformNavItems(sortedFlattened , "", navbarByRole[0].nav_item?.toLocaleLowerCase())
             
              return successReturn(nav)
              }catch(err) {
                console.log("err>>",err)
                  return failureReturn(err)
              }
                
            },


          


  }


export default  masterService


import config from "../../config/config"
import { userRoles } from "../../config/constant"
import dotenv from "../../config/dotenv"
import { failureReturn, succesResponse, successReturn } from "../../config/utils"
import prismaClient from "../../db"
import primsaClient, { executeStoredProcedure } from "../../db"
import { checkValidUser, doesUserHaveRoleOrNot, loginPayload, userCreatePayload } from "../../types/users.types"
import { redisClient1 } from "../redis/redis.index"
import { s3Client1 } from "../s3Bucket/s3Bucket"

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
                where r."name" =$1
                
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
     


  }


export default  masterService


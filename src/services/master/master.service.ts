import config from "../../config/config"
import dotenv from "../../config/dotenv"
import { failureReturn, succesResponse, successReturn } from "../../config/utils"
import prismaClient from "../../db"
import primsaClient, { executeStoredProcedure } from "../../db"
import { checkValidUser, doesUserHaveRoleOrNot, loginPayload, userCreatePayload } from "../../types/users.types"
import { redisClient1 } from "../redis/redis.index"

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




    
     
  }


export default  masterService


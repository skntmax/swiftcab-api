import { Response , Request  } from "express"
import primsaClient from "../../db"
import masterService from "../../services/master/master.service"
import { failureResponse, succesResponse } from "../../config/utils"
const masterController  = {
      
    getCountries: async function (req:Request, res:Response):Promise<any> {
            
        try {
 
          const { cacheKey }  = req 
          let countries =await masterService.getCountries(cacheKey)
          if(!countries.status)
             return succesResponse({data:countries.data, message:"" } , res )  
        
          return succesResponse({data:countries.data, message:" countries" } , res )  
           
         }catch(err) {
          return  failureResponse({data:err}, res )
         }
      
       } ,

       getStates: async function (req:Request, res:Response):Promise<any> {
            
        try {
 
          const { cacheKey }  = req 
          const { country_id }  = req.params 
          let states =await masterService.getStates( country_id , cacheKey)
          
          if(!states.status)
             return succesResponse({data:states.data, message:"" } , res )  
        
          return succesResponse({data:states.data, message:" countries" } , res )  
           
         }catch(err) {
          return  failureResponse({data:err}, res )
         }
      
       } ,

       getCity: async function (req:Request, res:Response):Promise<any> {
            
        try {
 
          const { cacheKey }  = req 
          const { state_id }  = req.params 
          let cities =await masterService.getCity( state_id , cacheKey)
          
          if(!cities.status)
             return succesResponse({data:cities.data, message:"" } , res )  
        
          return succesResponse({data:cities.data, message:" cities" } , res )  

           
         }catch(err) {
          return  failureResponse({data:err}, res )
         }
      
       } ,

       getLocality: async function (req:Request, res:Response):Promise<any> {
            
        try {
 
          const { cacheKey }  = req 
          const {  city_id }  = req.params 
          let locality =await masterService.getLocality( city_id  , cacheKey)
          
          if(!locality.status)
             return succesResponse({data:locality.data, message:"" } , res )  
        
          
          return succesResponse({data:locality.data, message:" locality" } , res )  
          
         }catch(err) {
          return  failureResponse({data:err}, res )
         }
      
       } ,
    

    
}


export default masterController 
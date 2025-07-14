import { Response , Request, query  } from "express"
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

       getVhicleType: async function (req:Request, res:Response):Promise<any> {
            
        try {
 
          const { cacheKey }  = req 
          const {  city_id }  = req.params 
          let vhicleTypelist =await masterService.getVhicleType(cacheKey)
          
          if(!vhicleTypelist.status)
             return succesResponse({data:vhicleTypelist.data, message:"" } , res )  
        
          
          return succesResponse({data:vhicleTypelist.data, message:" vhicle types" } , res )  
          
         }catch(err) {
          return  failureResponse({data:err}, res )
         }
      
       } ,

       getbanks: async function (req:Request, res:Response):Promise<any> {
            
        try {
 
          const { cacheKey }  = req 
          let banklist =await masterService.getbanks(cacheKey)
          
          if(!banklist.status)
             return succesResponse({data:banklist.data, message:"" } , res )  
        
          
          return succesResponse({data:banklist.data, message:" bank list" } , res )  
          
         }catch(err) {
          return  failureResponse({data:err}, res )
         }
      
       } ,

       getBankBranch: async function (req:Request, res:Response):Promise<any> {
            
        try {
 
          const { cacheKey }  = req
          const { bankId }  = req.query

          let bankBranch =await masterService.getBankBranch({bankId:Number(bankId),cacheKey})
          
          if(!bankBranch.status)
             return succesResponse({data:bankBranch.data, message:"" } , res )  
        
          
          return succesResponse({data:bankBranch.data, message:" bank branch list" } , res )  
          
         }catch(err) {
          return  failureResponse({data:err}, res )
         }
      
       } ,

       
       getDriverList: async function (req:Request, res:Response):Promise<any> {
            
        try {
 
          const { cacheKey }  = req
          const { bankId }  = req.query

          let driverList =await masterService.getDriverList({cacheKey})
          
          if(!driverList.status)
             return succesResponse({data:driverList.data, message:"" } , res )  
        
          
          return succesResponse({data:driverList.data, message:" driver list" } , res )  
          
         }catch(err) {
          return  failureResponse({data:err}, res )
         }
       } ,
         
       uploadToS3: async function (req:Request, res:Response):Promise<any> {
            
        try {
          const { fileName , contentType} = req.body
          let putUrlObject =await masterService.uploadToS3({fileName , contentType})
          
          if(!putUrlObject.status)
             return failureResponse({data:putUrlObject.data, message:"" } , res )  
        
          
          return succesResponse({data:putUrlObject.data, message:" s3 put url" } , res )  
          
         }catch(err) {
          return  failureResponse({data:err}, res )
         }
      
       } ,

       getUploadedFile : async function (req:Request, res:Response):Promise<any> {
            
        try {
          const { key } = req.params 
          let downloadFile =await masterService.getUploadedFile(key)
          
          if(!downloadFile.status)
             return failureResponse({data:downloadFile.data, message:"" } , res )  
        
          
          return succesResponse({data:downloadFile.data, message:" download file" } , res )  
          
         }catch(err) {
          return  failureResponse({data:err}, res )
         }
      
       } ,



    

    
}


export default masterController 
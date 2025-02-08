import { Response , Request  } from "express"
import primsaClient from "../../db"
import authService from "../../services/auth/auth.service"
import { failureResponse, succesResponse } from "../../config/utils"
import ownerService from "../../services/owner/owner.service"

const ownerController  = {
    
   createOwnerHasVhicles : async function (req:Request, res:Response):Promise<any> {
        try {
         
             const {userId , username} = req.userObj

            let ownerVhicle =await ownerService.createOwnerHasVhicles({ownerId:Number(userId)  , vhicleId:req.body.vhicleId })
            if(!ownerVhicle.status)
               return succesResponse({data:ownerVhicle.data, message:"" } , res )  
          
            return succesResponse({data:ownerVhicle.data, message:"Inserted " } , res )  
           
           }catch(err) {
            console.log(err)
            return  failureResponse({data:err}, res )
           }
       } ,

       ownerOwnesVhicles : async function (req:Request, res:Response):Promise<any> {
        try {

          const {userId , username} = req.userObj
            let ownerVhicles =await ownerService.ownerVhicles({ownerId:Number(userId) })
            if(!ownerVhicles.status)
               return succesResponse({data:ownerVhicles.data, message:"" } , res )  
          
            return succesResponse({data:ownerVhicles.data, message:"got results" } , res )  
           
           }catch(err) {
            console.log(err)
            return  failureResponse({data:err}, res )
           }
      
       } ,
       
       getUserTypes : async  function (req:Request, res:Response):Promise<any> {

          try {

            const { cacheKey }  = req
            let userTypes =await ownerService.getUserTypes(cacheKey) 
            return succesResponse({data:userTypes.data, message:"user roles" } , res )  
          
          }catch(err) {
            console.log(err)
            return  failureResponse({data:err}, res )
          }
       },


       vhicleProvidesServices : async  function (req:Request, res:Response):Promise<any> {

         try {
          const {userId , username} = req.userObj
           let vhProvidesServices =await ownerService.vhicleProvidesServices({vhicleId:req.body.vhicleId , serviceId:req.body.serviceId}) 

           if(!vhProvidesServices.status)  return succesResponse({data: "null" ,  message:vhProvidesServices?.data } , res )
           
            return succesResponse({data:vhProvidesServices.data, message:"vhicle serviced added" } , res )  

         
         }catch(err) {
           console.log(err)
           return  failureResponse({data:err}, res )
         }
      },
   
       ownerActiveVhicleList  : async  function (req:Request, res:Response):Promise<any> {

         try {
          const {userId , username} = req.userObj
           let ownerActiveVhicleList =await ownerService.ownerActiveVhicleList({ ownerId: Number(userId) } ) 

           if(!ownerActiveVhicleList.status)  return succesResponse({data: "null" ,  message:ownerActiveVhicleList?.data } , res )
           
            return succesResponse({data:ownerActiveVhicleList.data, message:"vhicle serviced added" } , res )  
         
         }catch(err) {
           console.log(err)
           return  failureResponse({data:err}, res )
         }
      },


      getVhicleServicesList  : async  function (req:Request, res:Response):Promise<any> {

         try {
          const {userId , username} = req.userObj
           let vhProvidesServices =await ownerService.getVhicleServicesList({ ownerId: Number(userId) } ) 

           if(!vhProvidesServices.status)  return succesResponse({data: "null" ,  message:vhProvidesServices?.data } , res )
           
            return succesResponse({data:vhProvidesServices.data, message:"vhicle serviced added" } , res )  

         
         }catch(err) {
           console.log(err)
           return  failureResponse({data:err}, res )
         }
      },
   
    
}


export default ownerController 
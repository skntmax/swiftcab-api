import { Response , Request  } from "express"
import primsaClient from "../../db"
import authService from "../../services/auth/auth.service"
import { failureResponse, succesResponse } from "../../config/utils"
import ownerService from "../../services/owner/owner.service"

const ownerController  = {
    
      ownerHasVhicles : async function (req:Request, res:Response):Promise<any> {
        try {
            let ownerVhicle =await ownerService.createOwnerHasVhicles({ownerId:req.body.ownerId , vhicleId:req.body.vhicleId })
            if(!ownerVhicle.status)
               return succesResponse({data:ownerVhicle.data, message:"" } , res )  
          
            return succesResponse({data:ownerVhicle.data, message:"Inserted " } , res )  
           
           }catch(err) {
            return  failureResponse({data:err}, res )
           }
      
       } ,

       
       getUserTypes : async  function (req:Request, res:Response):Promise<any> {

          try {
            
            let userTypes =await ownerService.getUseTypes() 
            return succesResponse({data:userTypes.data, message:"user roles" } , res )  
          
          }catch(err) {
            return  failureResponse({data:err}, res )
          }
    

       },

   
    
}


export default ownerController 
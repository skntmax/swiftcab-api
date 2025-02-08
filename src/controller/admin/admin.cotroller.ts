import { Response , Request  } from "express"
import primsaClient from "../../db"
import authService from "../../services/admin/admin.service"
import { failureResponse, succesResponse } from "../../config/utils"
const adminController  = {
    
      getAllVhicles : async function (req:Request, res:Response):Promise<any> {
            
        try {
          let allVh =await authService.getAllVhicles()
          if(!allVh.status)
             return succesResponse({data:allVh.data, message:"some error caused" } , res )  
        
          return succesResponse({data:allVh.data, message:"all vhicle list" } , res )  
           
         }catch(err) {
          return  failureResponse({data:err}, res )
         }
      
       } ,

       serviceList : async function (req:Request, res:Response):Promise<any> {
            
        try {
          let serviceList =await authService.serviceList()
          if(!serviceList.status)
             return succesResponse({data:serviceList.data, message:"some error caused" } , res )  
        
          return succesResponse({data:serviceList.data, message:"all vhicle list" } , res )  
           
         }catch(err) {
          return  failureResponse({data:err}, res )
         }
      
       } ,



    
}


export default adminController 
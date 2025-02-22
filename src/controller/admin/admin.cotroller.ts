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
          console.log("err",err)
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
          console.log("err",err)
          return  failureResponse({data:err}, res )
         }
      
       } ,

           
       approveKyc : async function (req:Request, res:Response):Promise<any> {
        try {

          const {userId , username} = req.userObj
          let approvedKycResult =await authService.approveKyc({...req.body , userId: userId , })
          if(!approvedKycResult.status)
             return succesResponse({data:approvedKycResult.data, message:"some error caused" } , res )  
        
          return succesResponse({data:approvedKycResult.data, message:"kyc completed" } , res )  
           
         }catch(err) {
          console.log("err",err)
          return  failureResponse({data:err}, res )
         }
      
       } ,

       addMenu : async function (req:Request, res:Response):Promise<any> {
        try {

          // const {userId , username} = req.userObj
          const {roles ,  nav_menu_id  } = req.body 

          console.log("user_has_roles",roles)
          let menuAdded =await authService.addMenu({roles:roles   ,  nav_menu_id:nav_menu_id })
          if(!menuAdded.status)
             return succesResponse({data:menuAdded.data, message:"some error caused" } , res )  
        
          return succesResponse({data:menuAdded.data, message:"added menu " } , res )  
           
         }catch(err) {
          console.log("err",err)
          return  failureResponse({data:err}, res )
         }
      
       } ,


}


export default adminController 
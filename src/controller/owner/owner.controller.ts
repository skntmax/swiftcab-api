import { Response , Request  } from "express"
import primsaClient from "../../db"
import authService from "../../services/auth/auth.service"
import { failureResponse, succesResponse } from "../../config/utils"
import ownerService from "../../services/owner/owner.service"
import { KycStatus } from "@prisma/client"

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
          
       kycRequest : async  function (req:Request, res:Response):Promise<any> {

        try {

          let docs =  req.files 
          const {userId , username} = req.userObj
          let kycRequest =await ownerService.kycRequest({ userId:Number(userId) , ...req.body} , docs) 
          return succesResponse({data:kycRequest.data, message:"user roles" } , res )  
        
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

      getNavbar  : async  function (req:Request, res:Response):Promise<any> {

        try {
         const {userId , username} = req.userObj
         const { user_has_roles } = req
         
          let navbar =await ownerService.getNavbar({ ownerId: Number(userId) ,role:user_has_roles , username:username } ) 

          if(!navbar.status)  return succesResponse({data: "null" ,  message:navbar?.data } , res )

          return succesResponse({data:navbar.data, message:"nav bar " } , res )  

        
        }catch(err) {
          console.log(err)
          return  failureResponse({data:err}, res )
        }
     },

     getActiveUsers  : async  function (req:Request, res:Response):Promise<any> {

      try {
       const {userId , username} = req.userObj
       const { user_has_roles } = req
       const { roles , page=1 , limit=20 , usernameOrEmail=undefined , searchByManual=false  } = req.body
       
        let activeUsers =await ownerService.getActiveUsers({ ownerId: Number(userId) ,role:roles  , page , limit ,usernameOrEmail ,searchByManual   } ) 

        if(!activeUsers.status)  return succesResponse({data: "null" ,  message:activeUsers?.data } , res )

        return succesResponse({data:activeUsers.data, message:" Users with roles and vhicles " } , res )  

      
      }catch(err) {
        console.log(err)
        return  failureResponse({data:err}, res )
        }
    },
   
    getVhicleDetailsById  : async  function (req:Request, res:Response):Promise<any> {

      try {
       const {vhicleIds , ownerId} = req.body
       const { user_has_roles } = req
    
        let vhicleDetail =await ownerService.getVhicleDetailsById({ vhicleIds:vhicleIds , ownerId:Number(ownerId) } ) 

        if(!vhicleDetail.status)  return succesResponse({data: "null" ,  message:vhicleDetail?.data } , res )

        return succesResponse({data:vhicleDetail.data, message:" Users with roles and vhicles " } , res )  

      
      }catch(err) {
        console.log(err)
        return  failureResponse({data:err}, res )
        }
    },


    approveKycRequest  : async  function (req:Request, res:Response):Promise<any> {

      try {
       const {vhicleId , ownerId ,  kycStatus=KycStatus.INITIATED} = req.body
       const { user_has_roles } = req
    
        let kycApprovedOrRejected =await ownerService.approveVhicleKyc({ vhicleId , ownerId:Number(ownerId) , kycStatus } ) 

        if(!kycApprovedOrRejected.status)  return succesResponse({data: "null" ,  message:kycApprovedOrRejected?.data } , res )

        return succesResponse({data:kycApprovedOrRejected.data, message:" Kyc approve or rejected status " } , res )  

      
      }catch(err) {
        console.log(err)
        return  failureResponse({data:err}, res )
        }
    },

    removeUserByUsername  : async  function (req:Request, res:Response):Promise<any> {

      try {
       const {username} = req.body
       const { user_has_roles } = req
    
        let userRemoved =await ownerService.removeUserByUsername({ username } ) 

        if(!userRemoved.status)  return succesResponse({data: "null" ,  message:userRemoved?.data } , res )

        return succesResponse({data:userRemoved.data, message:" User removed" } , res )  

      
      }catch(err) {
        console.log(err)
        return  failureResponse({data:err}, res )
        }
    },


    blockUnblockuser  : async  function (req:Request, res:Response):Promise<any> {

      try {
       const {username , isActive=false} = req.body
       const { user_has_roles } = req
    
        let userRemoved =await ownerService.blockUnblockuser({ isActive , username } ) 

        if(!userRemoved.status)  return succesResponse({data: "null" ,  message:userRemoved?.data } , res )

        return succesResponse({data:userRemoved.data, message:" User removed" } , res )  

      
      }catch(err) {
        console.log(err)
        return  failureResponse({data:err}, res )
        }
    },

    updateVhicleAvatar  : async  function (req:Request, res:Response):Promise<any> {

      try {

        let docs =  req.files 
    
        let updateVhicleAvatar =await ownerService.updateVhicleAvatar({ docs } ) 

        if(!updateVhicleAvatar.status)  return succesResponse({data: updateVhicleAvatar?.data ,  message:updateVhicleAvatar?.data } , res )

        return succesResponse({data:updateVhicleAvatar.data, message:" User removed" } , res )  

      
      }catch(err) {
        console.log(err)
        return  failureResponse({data:err}, res )
        }
    },

    
}


export default ownerController 
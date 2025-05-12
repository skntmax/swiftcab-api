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

       addMenuItems : async function (req:Request, res:Response):Promise<any> {
        try {

          // const {userId , username} = req.userObj
          const { nav_item="" , sub_menu=false , href=null, icon=null,  } = req.body 

          let menuItemAdded =await authService.addingMenuItems({nav_item,href,icon,sub_menu})
          if(!menuItemAdded.status)
             return succesResponse({data:menuItemAdded.data, message:"error in adding menu" } , res )  
        
          return succesResponse({data:menuItemAdded.data, message:"primary menu added  " } , res )  
           
         }catch(err) {
          console.log("err",err)
          return  failureResponse({data:err}, res )
         }
      
       } ,

       getUsersByRole : async function (req:Request, res:Response):Promise<any> {
        try {

          const { role_id , limit=10 , pn=1 , pagePerSize=5 } = req.body
          let menuItemAdded =await authService.getUsersByRole({role_id: role_id , limit, pagePerSize , pn})
          if(!menuItemAdded.status)
             return succesResponse({data:menuItemAdded.data, message:"error in getting role based user" } , res )  
        
          return succesResponse({data:menuItemAdded.data, message:" role based user fetched succesfully" } , res )  
           
         }catch(err) {
          console.log("err",err)
          return  failureResponse({data:err}, res )
         }
      
       } ,

       addRoleToUsers : async function (req:Request, res:Response):Promise<any> {
        try {

          // const {userId , username} = req.userObj
          const { role_id ,userId  } : {role_id: number[] ,  userId: number } = req.body
          let args = {
             userId,
             role_id
          }
          let menuItemAdded =await authService.addRolesToUsers(args)
          if(!menuItemAdded.status)
             return succesResponse({data:menuItemAdded.data, message:"error in adding roles" } , res )  
        
          return succesResponse({data:menuItemAdded.data, message:" role added" } , res )  
           
         }catch(err) {
          console.log("err",err)
          return  failureResponse({data:err}, res )
         }
      
       } ,


            
       getNavbarItem : async function (req:Request, res:Response):Promise<any> {
         try {
 
           // const {userId , username} = req.userObj
          //  const {  nav_item  , sub_menu  , href  , icon=null  } = req.body
           let navbarMenuItem =await authService.getNavbarItem()
           if(!navbarMenuItem.status)
              return failureResponse({data:navbarMenuItem.data, message:"error in gettnig menu items " } , res )  
         
           return succesResponse({data:navbarMenuItem.data, message:" Nabar Items " } , res )  
            
          }catch(err) {
           console.log("err",err)
           return  failureResponse({data:err}, res )
          }
       
        } ,

        


       
       addNavbar : async function (req:Request, res:Response):Promise<any> {
         try {
 
           // const {userId , username} = req.userObj
           const {  nav_item  , sub_menu  , href  , icon=null  } = req.body
           let menuItemAdded =await authService.addNavbar({nav_item  , sub_menu  , href  , icon})
           if(!menuItemAdded.status)
              return failureResponse({data:menuItemAdded.data, message:"Navitem or  href already exist" } , res )  
         
           return succesResponse({data:menuItemAdded.data, message:" menu items added " } , res )  
            
          }catch(err) {
           console.log("err",err)
           return  failureResponse({data:err}, res )
          }
       
        } ,
           
       addSubNavbar : async function (req:Request, res:Response):Promise<any> {
         try {
 
           // const {userId , username} = req.userObj
           const {  sub_nav_item , sub_menu=true  , href="/"  , icon=null ,nav_item_id  ,  } = req.body
           let subMenuItemAdded =await authService.addSubNavbar({sub_nav_item ,   sub_menu  , href  , icon ,nav_item_id  ,})
           if(!subMenuItemAdded.status)
              return failureResponse({data:subMenuItemAdded.data, message:"Might be href already lies in navitem , please try using other href " } , res )  
         
           return succesResponse({data:subMenuItemAdded.data, message:" submenu items added " } , res )  
            
          }catch(err) {
           console.log("err",err)
           return  failureResponse({data:err}, res )
          }
       
        } ,

 

        



}


export default adminController 
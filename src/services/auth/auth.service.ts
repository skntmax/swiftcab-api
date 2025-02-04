import dotenv from "../../config/dotenv"
import { failureReturn, succesResponse, successReturn } from "../../config/utils"
import primsaClient, { executeStoredProcedure } from "../../db"
import { checkValidUser, doesUserHaveRoleOrNot, loginPayload, userCreatePayload } from "../../types/users.types"
import {bcrypt , jwt } from '../../packages/auth.package'
  
type UserRole = {
  username: string;
  email: string;
  role_id: number;
};

const  authService = {
    
    loginUser : async function(userPayload:loginPayload) {

      try {

        const {  emailOrUsername, password, userType } = userPayload  // default as client or customer , 1- customer , 2- owner 
        
        let newUser =await executeStoredProcedure('get_user_roles', [emailOrUsername, emailOrUsername, userType as number])
        newUser= newUser[0]

            
        if(!newUser)
           return  failureReturn('Please register first ')
          
        let isPass = await bcrypt.compare(password ,newUser?.password)
          
        if(!isPass)
          return  failureReturn('Invalid credential')
      
        console.log("newUser",newUser)
          let payload = {id:newUser.id , username: newUser.username  }
          let  token =  jwt.sign(payload ,  dotenv.SECRET_KEY , { expiresIn: "2h"})
  
          return successReturn({token ,  usersObj :{  username: newUser.username , firstName :newUser.first_name , lastName : newUser.last_name}}  )  

      }catch(err) {
          console.log(err)
               return failureReturn(err)  
      }
      
    } , 
    createUser  : async function (userPayload: userCreatePayload) {
        
         try {

          const {  email , password, userType , username} = userPayload 
          let userExist  =await  primsaClient.users.findFirst({ 
            where:{ 
             OR:[
                 {
                 email:email
                },
               {
                username:username
                }
              ]
             }})

          if(userExist)
            return failureReturn('user already exist') 

          let hashPass  =  await bcrypt.hash(password ,  10 )
          let newUser = await primsaClient.users.create({
                  data:{
                      username:username , 
                      password:hashPass ,
                      email:email,
                      is_active:true,
                      created_on:new Date(),
                      updated_on:new Date() ,
                  }
              })  
            
           let userRoles =await primsaClient.user_has_roles.create({
            data:{
              user_id:newUser.id,
              role_id:userType,
              created_on:new Date(),
              updated_on:new Date() ,
            }
           })

       
        let payload = {id:newUser.id , username: newUser.username  }
        let  token =  jwt.sign(payload ,  dotenv.SECRET_KEY , {
            expiresIn: "2h",
        })
         
      
        return successReturn({token ,  usersObj :{  username: newUser.username , firstName :newUser.first_name , lastName :    newUser.last_name }}  )
         }catch(err) {
                console.log(err)
               return failureReturn(err)
         }

     },
     
     checkValidUser:async function(payload:checkValidUser ) {
       try{

        let userExistOrNot =await primsaClient.users.findFirst({ where:{ username:payload.username }})
         if(!userExistOrNot)
          return failureReturn(false)
        
         return successReturn(true)

           
       }catch(err) {
        console.log(err)
        return failureReturn(err)
       }
     },

     getAllRoles :async function() {
    
      try {

        let roles  =await primsaClient.roles.findMany({
          select:{id:true , name:true}
        })                
          return successReturn(roles)
          }catch(err) {
                return failureReturn(err)
          }
       },

       userHasRolesOrNot :async function(param:doesUserHaveRoleOrNot) {
    
        try {
  
          let userrHasrole  =await primsaClient.$queryRawUnsafe(` 
                  select uhr.role_id ,r."name" from users u 
                  inner join user_has_roles uhr on uhr.user_id = u.id 
                  inner join roles r on r.id = uhr.role_id 
                  where u.id  =${param.userId} and  r."name" = '${param.roleName}'
            `)

  
          if(userrHasrole && Array.isArray(userrHasrole) && userrHasrole.length==0)
              return  false
            
          return true 
            }catch(err) {
                  return failureReturn(err)
            }
         },

     
  }


export default  authService


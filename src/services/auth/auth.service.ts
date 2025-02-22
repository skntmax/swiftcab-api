import dotenv from "../../config/dotenv"
import { failureReturn, succesResponse, successReturn } from "../../config/utils"
// import primsaClient, { executeStoredProcedure } from "../../db"
import { checkValidUser, doesUserHaveRoleOrNot, loginPayload, userCreatePayload } from "../../types/users.types"
import {bcrypt , jwt } from '../../packages/auth.package'
import prismaClient from "./../../db/index"
import { userRoles } from "../../config/constant"
  
type UserRole = {
  name: string;
  role_id: number;
};


type UserResult = {
  id? :number
  username: string;
  email: string;
  role_id: number;
  first_name: string;
  last_name: string;
  user_password: string;
};


const  authService = {
    
    loginUser : async function(userPayload:loginPayload) {

      try {

        const {  emailOrUsername, password, userType } = userPayload  // default as client or customer , 1- customer , 2- owner 
        
        // let newUser =await executeStoredProcedure('get_user_roles', [emailOrUsername, emailOrUsername, userType as number])
        // newUser= newUser[0]

        let newUserArray :UserResult[] = await prismaClient.$queryRawUnsafe<UserResult[]>(` 
                 SELECT x.*
          FROM (
            SELECT u.id ,  u.username username, 
        u.email email,
        uhr.role_id AS role_id,
          COALESCE(u.first_name::text, '') as first_name  , COALESCE (u.last_name::text, '') as last_name , u.password user_password 
            FROM users u
            INNER JOIN user_has_roles uhr ON uhr.user_id = u.id
            WHERE (u.email = $1  OR u.username = $1 )
          ) x
          WHERE x.role_id = $2 ` ,   emailOrUsername , userType
          ) 
      
      
        console.log(newUserArray,"newUserArray")


          // Fix: Assign the first object to a new variable
        let newUser: UserResult | undefined = newUserArray.length > 0 ? newUserArray[0] : undefined;

        console.log(newUser,"newUser")

        if(!newUser)
           return  failureReturn('Please register first ')
          
        let isPass = await bcrypt.compare(password ,newUser?.user_password)
          
        if(!isPass  )
          return  failureReturn('Invalid credential')
      
    
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
          let userExist  =await  prismaClient.users.findFirst({ 
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
          let newUser = await prismaClient.users.create({
                  data:{
                      username:username , 
                      password:hashPass ,
                      email:email,
                      is_active:true,
                      created_on:new Date(),
                      updated_on:new Date() ,
                  }
              })  
            
           let userRoles =await prismaClient.user_has_roles.create({
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

        // let userExistOrNot =await prismaClient.users.findFirst({ where:{ username:payload.username  }})
        let isUserOwnerOrNot =await prismaClient.$queryRawUnsafe(`
              select u.id ,u.email ,  r."name" as role ,  r.id as  role_id   from users u 
              inner join user_has_roles uhr ON uhr.user_id = u.id
              inner join  roles r on r.id =  uhr.role_id 
              where u.id = '${payload.id}' and  r."name" ='${payload.userType}' 
           `)

        if( isUserOwnerOrNot && Array.isArray(isUserOwnerOrNot) && isUserOwnerOrNot.length==0)
          return failureReturn(false)
        
         return successReturn(true)
       }catch(err) {
        console.log(err)
        return failureReturn(err)
       }
     },

     getAllRoles :async function() {
    
      try {

        let roles  =await prismaClient.roles.findMany({
          select:{id:true , name:true}
        })                
          return successReturn(roles)
          }catch(err) {
                return failureReturn(err)
          }
       },

       userHasRolesOrNot :async function(param:doesUserHaveRoleOrNot) {
    
        try {
  
          let userrHasrole: UserRole[] =await prismaClient.$queryRawUnsafe(` 
                  select uhr.role_id ,r."name" from users u 
                  inner join user_has_roles uhr on uhr.user_id = u.id 
                  inner join roles r on r.id = uhr.role_id 
                  where u.id  =${param.userId} and  r."name" = '${param.roleName}'
            `)

  
          if(userrHasrole && Array.isArray(userrHasrole) && userrHasrole.length==0)
              return failureReturn( {role_id:null}) 
            
           return successReturn({role_id:userrHasrole[0].role_id})  
            
          }catch(err) {
                  
            return failureReturn(err)
            }
         },

     
  }


export default  authService


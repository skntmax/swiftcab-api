import dotenv from "../../config/dotenv"
import { failureReturn, succesResponse, successReturn } from "../../config/utils"
import primsaClient from "../../db"
import { checkValidUser, loginPayload, userCreatePayload } from "../../types/users.types"
import {bcrypt , jwt } from '../../packages/auth.package'
  
const  authService = {
    
    

    loginUser : async function(userPayload:loginPayload) {
        const {  emailOrUsername, password, userType=1 , } = userPayload  // default as client or customer , 1- customer , 2- owner 
        
      let newUser = await primsaClient.users.findFirst({
          where:{ 
              OR: [
                  { email: emailOrUsername }, 
                  { username: emailOrUsername }
                ],
              user_type:userType}
      })
  
      if(!newUser)
         return  failureReturn('Please register first ')
        
      let isPass = await bcrypt.compare(password ,newUser?.password)
        
      if(!isPass)
        return  failureReturn('Invalid credential')
    
        let payload = {id:newUser.id , username: newUser.username  }
        let  token =  jwt.sign(payload ,  dotenv.SECRET_KEY , { expiresIn: "2h"})

        return successReturn({token ,  usersObj :{  username: newUser.username , firstName :newUser.first_name , lastName :    newUser.last_name}}  )  
    } , 
    createUser  : async function (userPayload: userCreatePayload) {
        
         try {

          const {  email , password, userType , username} = userPayload 
          let userExist  =await  primsaClient.users.findFirst({ where:{ email }})

          if(userExist)
            return failureReturn('user already exist') 

          let hashPass  =  await bcrypt.hash(password ,  10 )
          let newUser = await primsaClient.users.create({
                  data:{
                      username:username , 
                      password:hashPass ,
                      email:email,
                      user_type: userType,
                      is_active:true,
                      created_on:new Date(),
                      updated_on:new Date() ,
                  }
              })  

      
       
        let payload = {id:newUser.id , username: newUser.username  }
        let  token =  jwt.sign(payload ,  dotenv.SECRET_KEY , {
            expiresIn: "2h",
        })
         
      
        return successReturn({token ,  usersObj :{  username: newUser.username , firstName :newUser.first_name , lastName :    newUser.last_name}}  )
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
     }

     
  }


export default  authService


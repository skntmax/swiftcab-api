import dotenv from "../../config/dotenv"
import { failureReturn, generateEmail, generateUsername, succesResponse, successReturn } from "../../config/utils"
// import primsaClient, { executeStoredProcedure } from "../../db"
import { checkValidUser, doesUserHaveRoleOrNot, loginByOAuthPayload, loginPayload, sendSignupMail, userCreatePayload, verifyMailLinkpayload, verifyOtp } from "../../types/users.types"
import {bcrypt } from '../../packages/auth.package'
import prismaClient from "./../../db/index"
import { userRoles } from "../../config/constant"
import { redisClient1 } from "../redis/redis.index"
import config from "../../config/config"
import { LoginBy } from "@prisma/client"
import jwt from 'jsonwebtoken'
import { login_user_otp, signup_user_queue } from "../queues"
import { version } from "../../server"
import { sendMail } from "../../config/mailConfig"
import { createMailOptions, IMailOptions } from "../../types/mailer"
import { mailerTemplate } from "../../config/MailerTemplates/VerifyUser"
import moment from "moment"
  
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
  is_active?:boolean ,
  phone_no?:string,
  avatar?:string
};



type oAuthUser = {
    username?: string;
    email?: string;
    trafficBy?: string;
    profile_pic?: string;

}



interface GoogleTokenPayload {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  nbf: number;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
  jti: string;
}

const  authService = {
    
    loginUser : async function(userPayload:loginPayload) {

      try {

        const {  emailOrUsername, password, userType ,phone } = userPayload  // default as client or customer , 1- customer , 2- owner 
        
        // let newUser =await executeStoredProcedure('get_user_roles', [emailOrUsername, emailOrUsername, userType as number])
        // newUser= newUser[0]

        let newUserArray :UserResult[] = await prismaClient.$queryRawUnsafe<UserResult[]>(` 
                 SELECT x.*
                FROM (
                  SELECT u.id ,  u.username username , u.avatar ,   
              u.email email,
              uhr.role_id AS role_id, u.is_active , u.phone_no,
                COALESCE(u.first_name::text, '') as first_name  , COALESCE (u.last_name::text, '') as last_name , u.password user_password 
                  FROM users u
                  INNER JOIN user_has_roles uhr ON uhr.user_id = u.id
                  WHERE (u.email = $1  OR u.username = $1 OR  u.phone_no=$3  )
                ) x
                WHERE x.role_id = $2 AND x.is_active = true  ` ,   emailOrUsername , userType , phone
          ) 
      
      
          // Fix: Assign the first object to a new variable
        let newUser: UserResult | undefined = newUserArray.length > 0 ? newUserArray[0] : undefined;
          
          // if logged in by phone m then added in the queue 
          if(phone)  {

             if(!newUser) { // if phone exist and  newuser does not . then create a new user and send otp on the number   
              let userByPhone = await  prismaClient.users.findFirst({
                where:{
                  phone_no:phone.toString() 
                }
               })
   
              //  accountStatus:false  -- used for mail  varification 
             if(!userByPhone) {  // user does not exist , then register first and then send otp 
               let newUserObj = { email:""  , password:config.defaultPass , phone :phone.toString() ,  username: generateUsername('') , userType: Number(userType) , trafficBy:LoginBy.SWIFTCAB , accountStatus:false}
               let userCreated:any = await this.createNewPhoneUser(newUserObj) 
               if(!userCreated.status)
                  return failureReturn({data:userCreated.data, message:"User already exist" } )  
   
                login_user_otp.enqueue('user_otp' ,{phone , id:userCreated?.data?.id , username: userCreated?.data?.username })
               }
             }else{ // if phone payload exist and  user also  exist relaetd to  this  phone , then simply  send login otp    
              login_user_otp.enqueue('user_otp' ,{phone , id:newUser.id , username: newUser.username })
             }
            
          
           return successReturn("OTP has been sent on your Mobile"+ phone)   
        
          }


        if(!newUser)
           return  failureReturn('Please register first')

        let isPass = await bcrypt.compare(password ,newUser?.user_password)
          
        if(!isPass)
          return  failureReturn('Invalid credential')
        
          let payload = {id:newUser.id , username: newUser.username  } 
          let  token =  jwt.sign(payload ,  dotenv.SECRET_KEY , { expiresIn: "2h"})
          return successReturn({token ,  usersObj :{  username: newUser.username , firstName :newUser.first_name , lastName : newUser.last_name , avatar:newUser.avatar }}  )  

      }catch(err) {
          console.log(err)
               return failureReturn(err)  
      }
      
    } , 
     

    loginByAuth : async function(userPayload:loginByOAuthPayload) {

      try {

        const {  token ,trafficBy ,userType } = userPayload  // default as client or customer , 1- customer , 2- owner 
        let  newUser
        
        if(userPayload.trafficBy==LoginBy.GOOGLE){  
            newUser  =  jwt.decode( token) as GoogleTokenPayload   
          
            if(!newUser)
             failureReturn({data:"user not found or invalid token "})
         
          let objPrototype:oAuthUser  = {
            username: newUser?.name,
            email: newUser?.email,
            trafficBy: trafficBy,
            profile_pic: newUser?.picture,
          };
 
          let userExist = await prismaClient.users.findFirst({ 
           where: {
               OR: [
                   { username: objPrototype?.username }, 
                   { email: objPrototype?.email }
               ]
           }
         });
            
          if (!userExist) {
            // user does not  exist , then create a new record
            let newUserObj = { email:newUser.email , password:config.defaultPass , username: generateUsername(newUser.name) , userType:userPayload.userType , trafficBy:userPayload.trafficBy , avatar:objPrototype.profile_pic,  accountStatus:true}
            
            let userCreated = await this.createUser(newUserObj) 
            if(!userCreated.status)
              return failureReturn({data:userCreated.data, message:"User already exist" } )  
            
            return successReturn(userCreated?.data)  
          }else{
             // if user already exist 
          console.log("user already exist")
          let payload = {id:userExist.id , username: userExist.username  }
          let  token =  jwt.sign(payload ,  dotenv.SECRET_KEY , { expiresIn: "2h"})
           // Fix: Assign the first object to a new variable

            return successReturn({token ,  usersObj :{  username: userExist.username , firstName :userExist.first_name , lastName : userExist.last_name , avatar:userExist.avatar   }}  )  
          }
         }
       
          // return successReturn({token ,  usersObj :{  username: newUser.username , firstName :newUser.first_name , lastName : newUser.last_name}}  )  
          return successReturn({token , newUser} )  

      }catch(err) {
          console.log(err)
               return failureReturn(err)  
      }
      
    } 
    , 

    createNewPhoneUser :async function (userPayload: userCreatePayload)  {

      try {
          
        if(!userPayload.accountStatus) {
          userPayload.accountStatus = false // by default 
        }

        const {  email , password, userType , username , phone} = userPayload 
        let userExist  =await  prismaClient.users.findFirst({ 
          where:{ 
           phone_no:phone?.toString() 
           }})

           
           if (userExist) {
            if (userExist.is_active) {
              return failureReturn("User already exists");
            } else if(!userExist.is_active) {
              return failureReturn(`Please verify your account by clicking on the link sent on mail: ${email}`);
            }
          }


        let hashPass  =  await bcrypt.hash(password ?? config.defaultPass ,  10 )
        // generating user in user table 
        let newUser = await prismaClient.users.create({
                data:{
                    username:username?? generateUsername('SWC'+Math.random()*100) , 
                    password:hashPass ,
                    email:email?email:generateEmail(""),
                    phone_no: userPayload.phone??null,
                    is_active:userPayload.accountStatus,
                    traffic_from:userPayload.trafficBy??LoginBy.SWIFTCAB ,
                    created_on:new Date(),
                    updated_on:new Date() ,
                }
            })  
          

        // then after to role table 
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

      return successReturn(payload)
      return successReturn({token , is_active:newUser?.is_active,  usersObj :{  username: newUser.username , firstName :newUser.first_name , lastName :    newUser.last_name }}  )
       
    }catch(err) {
              console.log(err)
             return failureReturn(err)
       }


    } 
      , 

    createUser  : async function (userPayload: userCreatePayload) {
         try {
          
          if(!userPayload.accountStatus) {
            userPayload.accountStatus = false // by default 
          }

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
              ],
             }})

             
             if (userExist) {
              if (userExist.is_active) {
                return failureReturn("User already exists");
              } else if(!userExist.is_active) {
                return failureReturn(`Please verify your account by clicking on the link sent on mail: ${email}`);
              }
            }

          let hashPass  =  await bcrypt.hash(password ,  10 )
          // generating user in user table 
          let newUser = await prismaClient.users.create({
                  data:{
                      username:username?? generateUsername('SWC'+Math.random()*100) , 
                      password:hashPass ,
                      email:email??"",
                      phone_no: userPayload.phone??null,
                      is_active:userPayload.accountStatus,
                      traffic_from:userPayload.trafficBy??LoginBy.SWIFTCAB ,
                      avatar : userPayload.avatar ?? null  , 
                      created_on:new Date(),
                      updated_on:new Date() ,
                  }
              })  
            

          // then after to role table 
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


        
        // queuing part 
        const authToken = jwt.sign(payload, process.env.SECRET_KEY as string, {
          expiresIn: "5m", // Correct format
        });
        //  adding to  queue 
        let  authUrl  = `${process.env.NEXT_PUBLIC_API_URL}/${version}/auth/verify-mail-link?token=${authToken}&role=${userType}`
        signup_user_queue.enqueue('user',{authenticateUri:authUrl ,  userId:payload?.id ,email})

        return successReturn({token , is_active:newUser?.is_active,  usersObj :{  username: newUser.username , firstName :newUser.first_name , lastName :newUser.last_name  , avatar:newUser.avatar?? null }}  )
         
      }catch(err) {
                console.log(err)
               return failureReturn(err)
         }

     },
     

     verifyMailLink:async function(payload:verifyMailLinkpayload ) {
      try{

       // let userExistOrNot =await prismaClient.users.findFirst({ where:{ username:payload.username  }})
      const {  role ,userId , username} = payload
       
     let updateStatus = await prismaClient.users.update({
      where:{
         id:userId
      } ,
      data:{
           is_active:true
          }
       })

      
       let userExist:any  =await  prismaClient.users.findFirst({ 
        where:{ id:userId}})

      let userPayload = {id:userExist.id , username: userExist.username , first_name:userExist.first_name , last_name:userExist.last_name     }
      let  token =  jwt.sign(payload ,  dotenv.SECRET_KEY , {
          expiresIn: "2h",
      })

      
      return successReturn({token , usersObj :{  username: userPayload.username , firstName :userPayload.first_name , lastName :userPayload.last_name }}  )
     

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


      
    verifyOtp:async function(payload:verifyOtp ) {
      try{

        const  { otp ,phone}  = payload
       // let userExistOrNot =await prismaClient.users.findFirst({ where:{ username:payload.username  }})
       let user = await prismaClient.users.findFirst({
        where: {
          phone_no: payload.phone,
          otp: payload.otp,
          expiresIn: {
            gte: new Date(), // Check if expiresIn is greater than or equal to the current time
          },
        },
      });
  

     
      if (!user) {
        return failureReturn("Invalid or expired OTP");
      }
  
      // OTP is valid, now reset it
      await prismaClient.users.update({
        where: { id: user.id },
        data: { otp: null, expiresIn: null },
      });


      let userPayload = {id:user.id , username: user.username  } 
      let  token =  jwt.sign(userPayload ,  dotenv.SECRET_KEY , { expiresIn: "2h"})
      return successReturn({token ,  usersObj :{  username: user.username , firstName :user.first_name , lastName : user.last_name}}  )  
     
      }catch(err) {
       console.log(err)
       return failureReturn(err)
      }
    },



     sendAuthMail:async function(payload:sendSignupMail ) {
       try{
        const { authenticateUri ,email:to , userId} = payload

        const userMailPayload: IMailOptions = createMailOptions({
           to,
          subject:  mailerTemplate.subject,
          html: mailerTemplate.newSignup(authenticateUri),
        });


        let sendMailToVerify = sendMail(userMailPayload)

        if(sendMailToVerify)
         return successReturn(sendMailToVerify)

         return successReturn(false)
       }catch(err) {
        console.log(err)
        return failureReturn(err)
       }
     },

     generateAndSendOtpForLogin:async function(payload:any ) {
      try{
        const { phone, id, username}  =  payload
        let updates = await prismaClient.users.update({
           where:{
             id
           },
           data:{
            is_active:true,
            otp:'1111',
            expiresIn: moment().add(2, "minutes").toDate() //  valid for  2 minuted from current 
           }
        })
        
        return successReturn(updates)

        return successReturn(false)
      }catch(err) {
       console.log(err)
       return failureReturn(err)
      }
    },



     getAllRoles :async function(cacheKey:string) {
    
      try {

          let roles  =await prismaClient.roles.findMany({
            select:{id:true , name:true}
          })                

          if(cacheKey &&  roles  ){
            await redisClient1.set(cacheKey , JSON.stringify(roles), )
            await redisClient1.expire(cacheKey ,config.cache_time  )
          }

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



import { errors } from "celebrate"; // Import celebrate's error handler
import cors from 'cors'
import  express, { Express , Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import dotenv from './../config/dotenv'
import PrismaClient, { executeStoredProcedure } from './../db'
import jwt from 'jsonwebtoken'
import { failureResponse, succesResponse } from "../config/utils";
import { JwtPayload } from 'jsonwebtoken';
import authService from "../services/auth/auth.service";
import { redisClient1 } from "../services/redis/redis.index";
import multer from 'multer'
import path from 'path'
import fs from 'fs'
// Define allowed file types
const allowedFileTypes = /jpeg|jpg|png|gif|pdf/;


const storage = multer.diskStorage({

  destination: function (req, file, cb) {
     
    const uploadPath = path.join(__dirname, '../assets/uploads');
    console.log("uploadPath>>",uploadPath)
    cb(null, uploadPath )
  },
  
  filename: function (req, file, cb) {
    let ext =  file.originalname.split('.')[1] 
    const uniqueSuffix = `${Date.now() + '-' + Math.round(Math.random() * 1E9)}.${ext}` 
    cb(null, file.fieldname + '-' + uniqueSuffix)
  },

})



// File Type Validation
const fileFilter = (req:Request, file:any, cb:any) => {
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true); // Accept the file
  } else {
    return cb(new Error('Invalid file type! Only images are allowed.'), false); // Reject the file
  }
};


export const upload = multer({ 
  storage: storage ,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter
})

export const vhicleDocUpload = upload.fields([{ name: 'ss_one', maxCount: 1 }, { name: 'ss_two', maxCount: 1  } ,{ name: 'rc_doc', maxCount: 1 } ])




export async function deleteFiles(files: any): Promise<void> {
  try {
    for (const file of files) {
      if (file?.path) {
        await fs.unlink(file.path, ((file:any)=>{
           console.log(file , "deleted")
        })); // Delete file from local storage
      }
    }
  } catch (error) {
    console.error("Error deleting files:", error);
  }
}



export const middlewares = {

    corsOptions : {
     origin: '*',
     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
      }
  ,   
    globalMiddlewares: function (app:Express){


        app.use(cors(this.corsOptions))
        app.use(bodyParser.urlencoded({ extended: false }))
        app.use(express.json()) 
        app.use(errors()); 
        app.use((err: any, req: Request, res: Response, next: NextFunction):any => {
            if (err.joi) {
              return res.status(400).json({
                status: "error",
                message: "Validation failed",
                details: err.joi.details.map((detail: any) => detail.message), // Extracts Joi validation errors
              });
            }
          
            // If it's not a Celebrate error, pass it to the default handler
            next(err);
          });

    } , 

    validateUser : async function(req:Request, res:Response, next:NextFunction):Promise<any> {
    
      try{
        req.userObj={userId:"" , username:""}       
        const token = req.headers['authorization']        
        if(!token) return  failureResponse( {data:"un autherised user "} , res  );
        const bearer_token = token.split(' ')[1]  
        let decoded =  jwt.verify(bearer_token, dotenv.SECRET_KEY )  as JwtPayload 

        const { id:userId ,username} = decoded 

        if(!userId || !username) return failureResponse( {data:` expired token or not a valid user `} , res  );

         req.userObj.userId = userId 
         req.userObj.username = username
         next()
          }catch(err){
            console.log("error message", err);
           failureResponse( {data:"un autherised user "} , res  );
          }
    } ,



    checkRoles : async function(req:Request, res:Response, next:NextFunction):Promise<any> {
    
      try{
        req.userObj={userId:"" , username:""}       
        const token = req.headers['authorization']
        if(!token) return  failureResponse( {data:"un autherised user "} , res  );
        const bearer_token = token.split(' ')[1]  
        let decoded =  jwt.verify(bearer_token, dotenv.SECRET_KEY )  as JwtPayload 

        const { id:userId ,username} = decoded 

        const user_has_roles =await  PrismaClient.user_has_roles.findMany({
          where:{
            user_id:decoded?.id
          } , 
          select:{
            role_id:true, 
            user_id:true,                    
          }
        })
         
         req.userObj.userId = userId 
         req.userObj.username = username
         req.user_has_roles =   user_has_roles.map(ele=> ele.role_id)
         next()
          }catch(err){
            console.log("error message", err);
           failureResponse( {data:"un autherised user "} , res  );
          }
    } ,


    roleWisePermission :  async function(req:Request, res:Response, next:NextFunction):Promise<any> {
    
        try{
          req.userObj={userId:"" , username:""}       
          const token = req.headers['authorization']
          if(!token) return  failureResponse( {data:"un autherised user "} , res  );
          const bearer_token = token.split(' ')[1]  
          let decoded =  jwt.verify(bearer_token, dotenv.SECRET_KEY )  as JwtPayload 
          const { id:userId ,username} = decoded 
          
          let permissions =  await  executeStoredProcedure('role_has_permission', req.user_has_roles )
         
          req.role_has_permissions = permissions
          req.userObj.userId = userId 
          req.userObj.username = username 

           next()
            }catch(err){
              console.log("error message", err);
             failureResponse( {data:"un autherised user "} , res  );
            }
      },

      checkUserRoles : function(roleName:string ) {
        
        return async function(req:Request, res:Response, next:NextFunction):Promise<any> {
    
          try{
            req.userObj={userId:"" , username:""}       
            const token = req.headers['authorization']
            if(!token) return   failureResponse( {data:"un autherised user "} , res  );
            const bearer_token = token.split(' ')[1]  
            let decoded =  jwt.verify(bearer_token, dotenv.SECRET_KEY )  as JwtPayload 
    
            let { id:userId ,username} = decoded 
          
            console.log(userId ,username)
            
            if(!userId || !username) return failureResponse( {data:`Token expired or user not found`} , res  );   
            
            let doesRoleExist = await authService.userHasRolesOrNot({roleName:roleName ,userId:userId})
            
            console.log("doesRoleExist",doesRoleExist)
            if(!doesRoleExist?.status) return failureResponse( {data:`you don't have accessed role : ${roleName} `} , res  );
    

            req.userObj.userId = decoded.id 
            req.userObj.username = decoded.username

            req.user_has_roles = doesRoleExist.data.role_id
        
                         
             next()
              }catch(err){
                console.log("error message", err);
               failureResponse( {data:"un autherised user "} , res  );
              }
        } 
      } ,


      inCache : function(key:string ) {
        return async function(req:Request, res:Response, next:NextFunction):Promise<any> {
    
          try{
              
            if(req.params || req.query) {
              req.cacheKey = `${key}:${Object.values(req.params || req.query ).join(':')}` 
            }else{
              req.cacheKey = key
            }

             let data = await redisClient1.get(req.cacheKey)
              
             if(data)
                 return failureResponse( {data: JSON.parse(data) } , res  ); 

             next()
              }catch(err){
                console.log("error message", err);
               failureResponse( {data:"un autherised user "} , res  );
              }
        } 
      }  ,

      uploadFile: function(fileKey:string  ) {
        
        return async function(req:Request, res:Response, next:NextFunction):Promise<any> {
    
          try{
              upload.single(fileKey)
             next()
              }catch(err){
                console.log("error message", err);
               failureResponse( {data:"un autherised user "} , res  );
              }
        } 
      } ,

      getLoggedinuserRoleId: function(  ) {
        
        return async function(req:Request, res:Response, next:NextFunction):Promise<any> {
          try{
            
            let {userType} = req.params 
            req.userObj={userId:"" , username:""}       
            const token = req.headers['authorization']
            if(!token) return   failureResponse( {data:"un autherised user "} , res  );
            const bearer_token = token.split(' ')[1]  
            let decoded =  jwt.verify(bearer_token, dotenv.SECRET_KEY )  as JwtPayload 
    
            let { id:userId ,username} = decoded 


          // is token valid or not 
          if(!userId || !username) return failureResponse( {data:[] , message: `Token expired or user not found` } , res  );   

          
            //  does this user has this role or userType or not ?
            let doesRoleExist = await authService.userHasRolesOrNot({roleName:userType ,userId:userId})
                      
            if(!doesRoleExist?.status) return failureResponse( {data:[] ,  message:`you don't have accessed role : ${userType} `} , res  );
    
       
              let role =await PrismaClient.roles.findFirst({
                where:{
                  name:userType
                },
                select:{
                  id:true , name:true
                }
              })              

              
              // does this role exist in master record or not ?
              if(!role?.id) 
                return failureResponse( {data:`Role does not exist`} , res  );   

              if(role?.id) {
                req.user_has_roles =  role?.id
               }

               req.userObj.userId = decoded.id 
               req.userObj.username = decoded.username

               next()
              }catch(err){
                console.log("error message", err);
               failureResponse( {data:"un autherised user "} , res  );
              }
        } 
      } ,

    
    
   
    
}


export default middlewares
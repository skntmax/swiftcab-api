import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user_has_roles?: any; // Or use a proper type like `Role[]`
    role_has_permissions:any,
    userObj:{
      userId:number | string, 
      username:string
    },

    cacheKey:string
  }
}

import { Request } from 'express';

declare module 'express' {
  interface Request {
    user_has_roles?: any; // or whatever type user_has_roles should be
  }
}
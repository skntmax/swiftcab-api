import { LoginBy } from "@prisma/client"

export interface userCreatePayload  {
    email? : string 
    password :  string , 
    username? : string , 
    userType: number ,
    trafficBy:LoginBy ,
    phone? : string
    accountStatus?:boolean     
}




export interface loginPayload  {
        emailOrUsername : string 
        password :  string ,    
        userType?: number,
        phone?:number    

}



export interface loginByOAuthPayload  {
     token:string
     trafficBy:LoginBy,
     userType:number
}



export interface checkValidUser  {
    id :  number , 
    userType:string
}


export interface verifyOtp  {
    otp:string,
    phone:string
}


export interface doesUserHaveRoleOrNot  {
    userId : number ,
    roleName:string 

}




export interface verifyMailLinkpayload  { 
    role: number  
    userId:number , 
    username:string

}



export interface sendSignupMail  {
    authenticateUri:string ,
    userId:number,
    email:string
}
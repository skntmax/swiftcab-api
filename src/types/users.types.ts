import { LoginBy } from "@prisma/client"

export interface userCreatePayload  {
    email : string 
    password :  string , 
    username : string , 
    userType: number ,
    trafficBy:LoginBy    
}




export interface loginPayload  {
        emailOrUsername : string 
        password :  string ,    
        userType?: number    

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



export interface doesUserHaveRoleOrNot  {
    userId : number ,
    roleName:string 

}


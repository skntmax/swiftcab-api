export interface userCreatePayload  {
    email : string 
    password :  string , 
    username : string , 
    userType: number    

}




export interface loginPayload  {
        emailOrUsername : string 
        password :  string , 
    
        userType?: number    

}



export interface checkValidUser  {
    id :  number , 
    userType:string
}



export interface doesUserHaveRoleOrNot  {
    userId : number ,
    roleName:string 

}


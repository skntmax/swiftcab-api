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
    username : string , 
}



export interface doesUserHaveRoleOrNot  {
    userId : number ,
    roleName:string 

}


export interface userCreatePayload  {
    email : string 
    password :  string , 
    username : string , 
    userType: number    

}




export interface loginPayload  {
        email : string 
        password :  string , 
        username? : string , 
        userType?: number    

}



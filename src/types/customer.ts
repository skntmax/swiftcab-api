
export interface customerDetails  {
    userId:number , 
    username:string
 }   


 
export interface updateCustomerDetails  {
    userId:number , 
    params:{
        first_name:string
        last_name:string
        avatar?: string
    }
 }   

 
export interface driverDetails  {
    userId:number , 
    params?:{
        dl:string
        rc:string
        insurance?: string
        adhaarCard?: string
        panCard?:  string
    },
    bank_account:number
    bank_account_branch: number
    ifsc?:string
    docs: any
 }   
 
export interface getDriverDetails  {
    userId:number , 
 }   

 
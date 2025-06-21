
 
export interface driverDetails  {
    userId:number , 
    params?:{
        dl:string
        rc:string
        insurance?: string
        adhaarCard?: string
        panCard?:  string
    },
    docs: any
 }   
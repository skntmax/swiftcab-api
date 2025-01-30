import { Response , Request  } from "express"
interface commonResponse {   
    status? : number
    data?:  any 
    error?: boolean ,
    message?: string  
}


interface  failureResObj extends commonResponse {
    type : string 
}


export const  successReturn =  (data:any )=>{
     return {  
         status :  true   , data
     }
}

export const  failureReturn =  (data:any )=>{
    return {  
        status :  false   , data
    }
}


export  const  succesResponse =  (args:commonResponse , res: Response)=>{
    return  res.send({...args , status:200 , error:false   }) 
}


export  const  failureResponse =  (args:commonResponse , res: Response)=>{
    return  res.send({...args , status:500 , error:true   }) 
}

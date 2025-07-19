import { KycStatus } from "@prisma/client"


export interface owner_vhicles_payload  {
   ownerId :number
   vhicleId:number
}   





export interface owner_vhicles  {
   ownerId :number
}   



export interface kyc_request  {
   ownerId :number,
   vhicle_id:number
}   





export interface vhicle_provides_services  {
   vhicleId:number,
   serviceId:number
}   



export interface navigation_bar  {
   ownerId :number,
   role:number,
   username:string
}   



export interface assingDriverToVhicle  {
   userId:number
   owner: string, 
   driver:number , 
   vhicle_assigned:number
   self : boolean
}   



export interface vhicleDetail  {
   vhicleIds:number[] , 
   ownerId :number
}   

export interface driverSearch  {
userId : number
usernameOrEmail : string
page:number
limit : number
roles : number[]
}   


export interface approveKycStatus  {
   vhicleId:number , 
   ownerId :number,
   kycStatus:KycStatus
}


export interface removeUserByUsername  {
    username: string
}   



export interface blockUnblockPayload  {
   isActive: Boolean
   username: string
}   




export interface activeUserType  {
   ownerId :number,
   role:number | number[],
   page:number,
   limit:number,
   usernameOrEmail?:string,
   searchByManual?:boolean
}   

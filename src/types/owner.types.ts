

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



export interface activeUserType  {
   ownerId :number,
   role:number | number[],
   page:number,
   limit:number
}   

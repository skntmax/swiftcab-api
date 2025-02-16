

export interface kyc_varify_details  {
  id:number,
  vin?: string; // Vehicle Identification Number
  license_plate?: string;
  manufacturer?: string;
  model?: string;
  year?: Date; // DateTime in TypeScript
  color?: string;
  engine_number?: string;
  chassis_number?: string;
  fuel_type?: string;
  transmission?:string; // Restrict to known values
  userId?: number,
  is_active?:Boolean,
  is_kyc?: Boolean
 }   
 
 
 


 export interface nav_menu_item  {
  roles:number | number[],
   nav_menu_id:number,
   
}   

export interface nav_has_permission_by_role_schema  {
  role_id:number , 
  nav_item_id:number,
  created_on:  Date ,
  updated_on: Date 
   
}   
 
 
 
 
 
 
 
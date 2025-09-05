import { KycStatus } from "@prisma/client";


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
 
  
  export interface addMenuItemsParams  {
    nav_item? : string,
    sub_menu? : Boolean,
    href? :  string,
    icon? :  string,
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
 



export interface get_users_by_role_schema  {
  role_id:number | number[] ,    
  limit?: Number,
  pn? : Number,
  pagePerSize?: Number
}   
 

export interface add_roles_to_user  {
  role_id:  number[]
  userId :  number
}   
 


export interface add_navigation  {
  nav_item:  string
  sub_menu:  boolean
  href: string
  icon?: string
}   


export interface add_sub_navigation  {
  sub_nav_item: string
  nav_item_id:  number
  sub_menu:  boolean
  href: string
  extra_paths: string | string[]
  icon?: string
}   


 
export interface roleTypeUserTypes{
  id :number;
  role_id:  number;
  role : string;
  username: string;
  email: string;
  total : number
  };
export interface getDriverPartners{
  varified:boolean
  limit:number
  pn : number 
  pagePerSize: number
  };

 
  export interface driverAms{
  status: KycStatus
  driverId: number
  comment?:string
  };


    export interface permObject  {
  permission_name: string 
  permission_identifer :string   
 };

    export interface PermissionIdentifier  {
  subnavId :number , 
  permissionIdentifierId :number

 };

 
    export interface capabilityParams  {
  capability_name  :string , 
  capability_identifier  :string
  role_id : number | number[]
 };


  export interface capabilitiesHavePermissions  {
    capabilityId :number , 
    permissionId :number | number[]  
  };    


 


 

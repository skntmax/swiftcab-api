

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
 
 
 
 
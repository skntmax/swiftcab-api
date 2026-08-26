import { Response , Request  } from "express"
import { v4 as uuidv4 } from 'uuid'

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

export interface NavItem  {
    role:string;
    nav_item: string;
    sub_menu: boolean;
    href: string | null;
    sub_nav_item: string;
    sub_href: string;
    sub_icon: string;
    icon?:string
    permission_id?: number
  };

  
export interface userTypes  {
  id : number; 
  username:string;
  email : string;
  role_id:number;
  role: string  
};


export interface assingedVhiclesToUser  {
  id : number; 
  username:string;
  email : string;
  role_id:number;
  role: string;
  vhicle_id:number;
  vhicle_username  : string  
};


  
  export interface TransformedItem  {
    navlabel?: boolean;
    subheader?: string;
    href?: string;
    id?: string;
    title?: string;
    icon?: string;
    permission_id?: number
  };
  


  export interface totalCount  {
    total:BigInt
  };
  


export function transformNavItems(navItems: NavItem[] , username: string, roleType: string ): TransformedItem[]{
    const transformedArray: TransformedItem[] = [];
  const seenNavItems = new Set<string>();
  let idCounter = 1;

  for (const item of navItems) {

    if (!seenNavItems.has(item.nav_item)) {
      transformedArray.push({
        navlabel: item.sub_menu,
        subheader: item.nav_item,
        href: `/${roleType}/${username}/?tabs=${item?.href}`,
        permission_id: item?.permission_id
      });
      seenNavItems.add(item.nav_item);
    }

    // having submenu
    if(item.sub_menu) {
      transformedArray.push({
        id: idCounter.toString(),
        title: item.sub_nav_item,
        icon: item.sub_icon,
        href: `/${roleType}/${username}/?tabs=${
          (item?.sub_href ||  item?.href)?.replace("/", "")?? 
          ""} `,
        permission_id: item?.permission_id
      });  
    }


    // single menu 
    if(!item.sub_menu) {
      transformedArray.push({
        id: idCounter.toString(),
        title: item.nav_item,
        icon: item.icon,
        href: `/${roleType}/${username}/?tabs=${
          (item?.href)?.replace("/", "")?? 
          ""} `,
        permission_id: item?.permission_id
      });  
    }

   
    idCounter++;
  }

  return transformedArray;
}


export function generateUsername(name: string): string {
  let lowercaseName: string = name.toLowerCase().replace(/\s/g, '');
  let randomNumber: number = Math.floor(Math.random() * 9000) + 1000;
  let randomAlphabets: string = '';

  for (let j = 0; j < 5; j++) {
      randomAlphabets += String.fromCharCode(97 + Math.floor(Math.random() * 26)); // Random lowercase alphabet
  }

  return lowercaseName + randomNumber + randomAlphabets;
}


export function generateEmail(name: string): string {
  let lowercaseName: string = name.toLowerCase().replace(/\s/g, '');
  let randomNumber: number = Math.floor(Math.random() * 9000) + 1000;
  let randomAlphabets: string = '';

  for (let j = 0; j < 5; j++) {
      randomAlphabets += String.fromCharCode(97 + Math.floor(Math.random() * 26)); // Random lowercase alphabet
  }

  return `${lowercaseName}${randomNumber}${randomAlphabets}@swiftcab.in`;
}


// Helper function (Ensure it's properly defined)
function getRandomNumberInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to shorten a UUID (hash-based)
export function getShortDriverWalletCode() {
  const uuid = uuidv4()
   const timePart = Date.now().toString(36).toUpperCase()
   const randomPart = Math.random().toString(36).substring(2, 10) 
   return `DR_WALL_${timePart}${randomPart}`
}
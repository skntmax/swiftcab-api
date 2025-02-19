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

export interface NavItem  {
    nav_item: string;
    sub_menu: boolean;
    href: string | null;
    sub_nav_item: string;
    sub_href: string;
    sub_icon: string;
  };
  
  export interface TransformedItem  {
    navlabel?: boolean;
    subheader?: string;
    href?: string;
    id?: string;
    title?: string;
    icon?: string;
  };
  



export function transformNavItems(navItems: NavItem[] , username: string, roleType: string ): TransformedItem[]{
    const transformedArray: TransformedItem[] = [];
  const seenNavItems = new Set<string>();
  let idCounter = 1;

  for (const item of navItems) {
    if (!seenNavItems.has(item.nav_item)) {
      transformedArray.push({
        navlabel: true,
        subheader: item.nav_item,
        href: `/${roleType}/${username}/?tabs=undefined`
      });
      seenNavItems.add(item.nav_item);
    }

    transformedArray.push({
      id: idCounter.toString(),
      title: item.sub_nav_item,
      icon: item.sub_icon,
      href: `/${roleType}/${username}/?tabs=${item.sub_href.replace("/", "")} `
    });
    idCounter++;
  }

  return transformedArray;
}
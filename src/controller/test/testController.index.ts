import { Response , Request  } from "express"
import primsaClient from "../../db"
const testController  = {
    
    insertVhicle : async function (req:Request, res:Response){
   
        // console.log(vh)
        res.send({message:"insert vchile"}) 
    } 
    
    
}


export default testController 
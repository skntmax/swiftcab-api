import { Response , Request  } from "express"
import primsaClient from "../../db"
import {redisClient1} from "../../services/redis/redis.index"
// import redisClient from "../../services/redis/redis.index"
const testController  = {
    
    insertVhicle : async function (req:Request, res:Response){
   
        let vh = await primsaClient.vhicle.create({
            data: {
                username: "skntmax", // Updated to lowercase
                name: "name1",
                rc: "rc",
                type: "car",
                created_on: new Date(),
                updated_on: new Date(),
              },
        })
         
        console.log(vh)

        res.send({message:"insert vchile"}) 
    } ,
    
    addVhicleServices : async function (req:Request, res:Response){
        let services = ['Commercial','Full Day' , 'Tourist plan' , 'Emergency/Night']
        for(let val of services ) {        
            let service = await primsaClient.vhicle_services.create({
                data: {
                    service_name: val,
                    created_on: new Date(),
                    updated_on: new Date(),
                },
            })   
            console.log(service)
        }
         res.send({message:"added services" }) 
    }  ,


    addServicesUtils : async function (req:Request, res:Response){
        let services = [
            {id:1 ,   food:false , water:false , guide:false },
            {id:2 ,   food:true , water:true ,   guide:true  },
            {id:3 ,   food:true , water:true , guide:true },
            {id:4 ,   food:false , water:true , guide:false },
            ]

        for(let val of services ) {        
        
        }
         res.send({message:"added services utils" }) 
    } ,
    
    getRandomName : async function (req:Request, res:Response){   
         res.send({message:`${Math.ceil(Math.random()*100)}_random` }) 
    } 
     
}


export default testController 
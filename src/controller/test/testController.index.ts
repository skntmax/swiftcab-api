import { Response , Request  } from "express"
import primsaClient from "../../db"
import {redisClient1} from "../../services/redis/redis.index"
// import redisClient from "../../services/redis/redis.index"
const testController  = {
    

    checkStatus : async function (req:Request, res:Response){

        // console.log(vh)
        res.send({message:"ok"}) 
    } ,

    insertVhicle : async function (req:Request, res:Response){
   
        // let vh = await primsaClient.vhicle.create({
        //     data: {
        //         username: "skntmax", // Updated to lowercase
        //         name: "name1",
        //         rc: "rc",
        //         type: "car",
        //         created_on: new Date(),
        //         updated_on: new Date(),
        //       },
        // })
         
        // console.log(vh)
        res.send({message:"insert vchile"}) 
    } ,
    
    addVhicleServices : async function (req:Request, res:Response){
        let services = ['Commercial','Full Day Book' , 'Tourist plan ' , 'Emergency/Night' , "ßCommercial/cross-ite/outer city"]
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
 
    //    for(let obj of  services) {
    //     await  primsaClient.services_have_utils.create()
    //   }
        
         res.send({message:"added services utils" }) 
    } ,
    
    getRandomName : async function (req:Request, res:Response){   
         res.send({message:`${Math.ceil(Math.random()*100)}_random`}) 
    }  ,

    insertVhicleTypes : async function (req:Request, res:Response ) {

        let arr = [ 
            {vhicle_type :"2 Wheeler" , disc:"2 wheeler  vhicle"}, 
            {vhicle_type :"3 Wheeler" , disc:"3 wheeler  vhicle"}, 
            {vhicle_type :"4 Wheeler" , disc:"3 wheeler  vhicle"}, 
        
        ]

        let current_date  = new Date() 
        
        for(let obj of arr) {

            let type_of_vhicle = await primsaClient.type_of_vhicle.create({
                data:{
                    vhicle_type:obj.vhicle_type , 
                     disc:obj.disc ,    
                    created_on: current_date,
                    updated_on: current_date,
                }
            })

            console.log(type_of_vhicle)
        
        }

            res.send({message:`inserted  vhile types `})
    } ,

    insertTypeOfUser : async function (req:Request, res:Response){   
        let arr = [ "client" , "Owner" ]

        for(let uerType of arr) {

            let type_of_user = await primsaClient.type_of_user.create({
                data:{
                     user_type:uerType  ,
                    created_on: new Date(),
                    updated_on: new Date(),
                }
            })
        
        }
        
         res.send({message:`type of user inserted `}) 
   }  ,

     
}


export default testController 
import dotenv from "../../config/dotenv"
import { assingedVhiclesToUser, failureReturn, getShortDriverWalletCode, NavItem, succesResponse, successReturn, totalCount, transformNavItems, userTypes } from "../../config/utils"
import primsaClient from "../../db"
import { loginPayload, userCreatePayload } from "../../types/users.types"
import {bcrypt , jwt } from '../../packages/auth.package'
import { activeUserType, approveKycStatus, kyc_request, navigation_bar, owner_vhicles, owner_vhicles_payload, vhicle_provides_services, vhicleDetail } from "../../types/owner.types"
import { GOE_HASH_KEYS, userRoles } from "../../config/constant"
import prismaClient from "../../db"
// import { redisClient1 } from "../redis/redis.index"
import { v4 as uuidv4 } from "uuid";
import { kyc_varify_details } from "../../types/admin.types"
import { cld1 } from "../cloudinary"
import { deleteFiles } from "../../middlewares/middleware.index"
import { KycStatus } from "@prisma/client"
import { customerDetails, updateCustomerDetails } from "../../types/customer"
import { driverDetails, driverDetails2, getDriverDetails } from "../../types/driver.types"
import { redisClient1 } from "../redis/redis.index"
import { Request, Response } from "express"
  const  driverService = {
   
      getCustomerDetails : async function(payload:customerDetails) {

            try {

             let customer = await  prismaClient.users.findFirst({
               where:{
                OR:[
                  {
                  id:payload.userId
                  },
                 {
                  username:payload.username
                 }
               ],
               },
               select:{first_name:true , last_name:true , phone_no:true, email:true, avatar:true }
                })

              return successReturn(customer)
              }catch(err) {
                console.log("err>>",err)
                  return failureReturn(err)
              }``
          } ,

          updateDriverProfile : async function(payload:driverDetails) {

            try {

              
             const {dl , rc , adhaar_card , insurance ,  pan_card   }  = payload.docs
            
             if(dl.lenth==0 || rc.length==0 || insurance.length==0 || adhaar_card.length==0 || pan_card.length==0 )
                return failureReturn(" Documents if mendatory")  
               
             
             let dlPath =await cld1.upload(dl[0].path ,`${payload.userId}-${uuidv4()}` )
             let rcPath = await cld1.upload(rc[0].path ,`${payload.userId}-${uuidv4()}`)
             let insurancePath = await cld1.upload(insurance[0].path ,`${payload.userId}-${uuidv4()}`)
             let adhaarCardPath = await cld1.upload(adhaar_card[0].path ,`${payload.userId}-${uuidv4()}` )
             let panCardPath = await cld1.upload(pan_card[0].path ,`${payload.userId}-${uuidv4()}` )
           
            if(!dlPath || !rcPath || !insurancePath ||   !adhaarCardPath || !panCardPath)  {
              await deleteFiles([dlPath[0], rcPath[0], insurancePath[0], adhaarCardPath[0] , panCardPath[0]]);
              return failureReturn({ erroMessage:"Not uploaded on cloudinary " , error:{dlPath , rcPath ,insurancePath, adhaarCardPath , panCardPath }  } ) 
            }

              let {url:dlUrl}:{url:string}  = dlPath 
              let {url:rcUrl}:{url:string}  = rcPath 
              let {url:insuranceUrl}:{url:string}  = insurancePath 
              let {url:adhaarCardUrl}:{url:string}  = adhaarCardPath 
              let {url:panCardUrl}:{url:string}  = panCardPath 

              let updateDriverProfile =  await prismaClient.driver_profile.create({
                data:{
                  DL:dlUrl || "",
                  RC: rcUrl || "",
                  insurance: insuranceUrl || "",
                  adhar_card: adhaarCardUrl || "",
                  pan_card: panCardUrl || "",
                  driver:payload.userId,
                  bank_account:Number(payload.bank_account)  ,
                  bank_account_branch:Number(payload.bank_account_branch)  ,
                  ifsc:payload.ifsc || "",
                  is_varified: KycStatus.INITIATED ,
                  created_on: new Date(),
                  updated_on : new Date(),
                }
              })

              return successReturn(updateDriverProfile)
              }catch(err) {
                console.log("err>>",err)
                  return failureReturn(err)
              }``
          } ,
            
          updateDriverProfile2 : async function(payload:driverDetails2) {

        try {
          
                  const {
                dl: dlUrl,
                rc: rcUrl,
                adhaar_card: adhaarCardUrl,
                insurance: insuranceUrl,
                pan_card: panCardUrl,
                profile_pic: profilePicUrl,
                passbook: passbookUrl 
              } = payload.docs;

              let wallCode = getShortDriverWalletCode();

              const updateOrCreateDriverProfile = await prismaClient.driver_profile.upsert({
                where: {
                  driver: payload.userId,
                },
                update: {
                  profile_pic: profilePicUrl,
                  DL: dlUrl || "",
                  RC: rcUrl || "",
                  insurance: insuranceUrl || "",
                  adhar_card: adhaarCardUrl || "",
                  pan_card: panCardUrl || "",
                  bank_account: Number(payload.bank_account),
                  bank_account_branch: Number(payload.bank_account_branch),
                  passbook: passbookUrl || "",
                  bank_account_no: Number(payload.bank_account_no) || null,
                  ifsc: payload.ifsc || "",
                  updated_on: new Date(),
                },
                create: {
                  profile_pic: profilePicUrl,
                  DL: dlUrl || "",
                  RC: rcUrl || "",
                  insurance: insuranceUrl || "",
                  adhar_card: adhaarCardUrl || "",
                  pan_card: panCardUrl || "",
                  driver: payload.userId,
                  bank_account: Number(payload.bank_account),
                  bank_account_branch: Number(payload.bank_account_branch),
                  passbook: passbookUrl || "",
                  bank_account_no:  payload.bank_account_no  || 0,
                  ifsc: payload.ifsc || "",
                  is_varified: KycStatus.INITIATED,
                  wallet_code: wallCode,
                  created_on: new Date(),
                  updated_on: new Date(),
                }
              });

              return successReturn(
                JSON.parse(
                  JSON.stringify(updateOrCreateDriverProfile, (_, value) =>
                    typeof value === 'bigint' ? value.toString() : value
                  )
                )
              );
          }catch(err) {
              console.log("err>>",err)
              return failureReturn(err)
          }
             } ,

          getDriverDetails : async function(payload:getDriverDetails) {
             
            try {   
             
              let partnerDetails = await prismaClient.driver_profile.findFirst({
                where:{
                driver: payload.userId  
                },
                include: {
                 bank_have_branch:{
                  select:{
                    branch_name:true
                  }
                 },
                 driver_profile_id:{
                  select:{
                    username:true,
                    email:true
                  }
                 }
                }
              })
               return successReturn(
                JSON.parse(
                  JSON.stringify(partnerDetails, (_, value) =>
                    typeof value === 'bigint' ? value.toString() : value
                  )
                )
              );
              }catch(err) {
                  console.log("err>>",err)
                  return failureReturn(err)
              }
          },

          getDriverLiveLocation : async function( req:Request, res:Response ,userCoords:any) {
        try {
          const { lat, lng } =userCoords?.location

          if (!lat || !lng) {
            return res.status(400).json({ message: "lat and lng are required" });
          }

      const pickupLat = parseFloat(lat as string);
      const pickupLng = parseFloat(lng as string);
      const RADIUS_KM = 5;
      const GEO_KEY = GOE_HASH_KEYS.NOIDA_GEO_HASH || "driver:location:noida:geo";

      // Set SSE Headers
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");
      res.flushHeaders();

      res.write(`data: ${JSON.stringify({ message: "Connected to live driver stream" })}\n\n`);
      console.log(`📡 SSE connected for lat=${pickupLat}, lng=${pickupLng}`);

      // Function to fetch all available drivers within 5 km
      const findNearbyDrivers = async () => {
        try {
          const nearbyDrivers = (await redisClient1.geosearch(
            GEO_KEY,
            "FROMLONLAT",
            pickupLng,
            pickupLat,
            "BYRADIUS",
            RADIUS_KM,
            "km",
            "WITHDIST"
          )) as [string, string][];

          // console.log("nearbyDrivers>>",nearbyDrivers,pickupLat ,pickupLng)

          const driverList: any[] = [];
          for (const [username, distance] of nearbyDrivers) {
            console.log([username, distance])
            const metaKey = `driver:${username}:meta`;
            const meta = await redisClient1.hgetall(metaKey);

            // console.log("meta", meta)
            if (meta && meta.isAvailable === "true") {
              driverList.push({
                username,
                distance: `${distance} km`,
                lat: parseFloat(meta.lat),
                lng: parseFloat(meta.lng),
                correlationId: meta.correlationId,
                timestamp: meta.timestamp,
              });
            }
          }

          console.log(driverList)
            return driverList;
          } catch (err) {
            console.error("Redis error in findNearbyDrivers:", err);
            return [];
          }
        };

        // Function to send driver updates to client
        const sendDriversUpdate = async () => {
          const drivers = await findNearbyDrivers();
          const payload = {
            time: new Date().toISOString(),
            totalDrivers: drivers.length,
            drivers,
          };

          res.write(`data: ${JSON.stringify(payload)}\n\n`);
        };

            // Send immediately and then every 5 seconds
            await sendDriversUpdate();
            const interval = setInterval(async () => {
              await sendDriversUpdate();
            }, 5000);

            // Handle client disconnect
            req.on("close", () => {
              clearInterval(interval);
              console.log("SSE client disconnected");
            });
          } catch (err) {
            console.error(" Error in getDriverLiveLocation:", err);
            return failureReturn(err);
          }
        }
            
  }


export default  driverService





// try {

      
//     return successReturn("")
//      }catch(err) {
        
//            return failureReturn(err)
//      }
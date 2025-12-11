import CryptoJS from "crypto-js";
import { CONSOLE_COLORS } from "./constant";
import all_env from "./dotenv";
import { logger } from "../services/logger/logger";

const SECRET_KEY = "8a2c7e56f1f22311a9d8b6c7d49e7";
export const encryptPayload = (data:any) => {
  const ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    SECRET_KEY
  ).toString();

  return ciphertext;
};

export const AESSecurtiyEncryption = (req:any, res:any, next:any) => {
    console.log(CONSOLE_COLORS.BgBlue, "<<AES Encryption enabled? >>" , all_env.SECURITY_ENCRYPTION_ENABLED )
        
      // logger functions 
      
        logger.log({
             level: 'info',
             message: JSON.stringify({
             body: req.body,
             processId: process.pid,
             port: process.env.PORT
            })
            });

    if (!req.body || all_env.SECURITY_ENCRYPTION_ENABLED!="true") {
            return next();
        }
    
    // Decrypt the request body
    if (typeof req.body?.payload === 'string') {
        try {
        const bytes = CryptoJS.AES.decrypt(req.body?.payload, SECRET_KEY);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        req.body = JSON.parse(decryptedData);
        console.log(CONSOLE_COLORS.BgGreen, "<<after decrypt >>" , req.body )    
    } catch (error) {
        console.error("Decryption error:", error);
        return res.status(400).json({ error: "Invalid encrypted data" });
        }
    }
  next()   
};
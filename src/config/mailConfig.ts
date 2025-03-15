import nodemailer from  "nodemailer"
import all_env from "./dotenv";
import { createMailOptions, IMailOptions } from "../types/mailer";

type EnvType = "DEV" | "PROD"; // Define allowed keys
let env:EnvType = (all_env.NODE_ENV as EnvType) || "DEV"

export  const mailConfig = {
    
    DEV: {
        host: "smtp.hostinger.com",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
          user: "support@swiftcab.in",
          pass: "sKnT@9559835359",
        },
      },

      PROD: {
        host: "smtp.hostinger.com",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
          user: "support@swiftcab.in",
          pass: "sKnT@9559835359",
        },
      }

}

export  const transporter = nodemailer.createTransport(mailConfig[env]) 



export async function sendMail ( mailPayload:IMailOptions) {
     
    try {
         
        const info = await transporter.sendMail({
            from: mailPayload.from, // sender address
            to: mailPayload.to, // list of receivers
            subject: mailPayload.subject, // Subject line
            text: mailPayload.text, // plain text body
            html: mailPayload.html, // html body
          });

     return info.messageId 
           
    }catch(err) {
        return err          
    }
   
}


// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   // send mail with defined transport object
//   const info = await transporter.sendMail({
//     from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
//     to: "bar@example.com, baz@example.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
// }

// main().catch(console.error);
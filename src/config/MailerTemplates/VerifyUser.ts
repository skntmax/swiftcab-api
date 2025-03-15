
import fs from "fs";
import path from 'path'

// let logo = path.join(__dirname ,'./../../assets/logo/main_logo.svg')

export const  mailerTemplate = {

    //  svgToBase64 : (filePath:string) => {
    //     const svgData = fs.readFileSync(filePath, "utf8");
    //     return `data:image/svg+xml;base64,${Buffer.from(svgData).toString("base64")}`;
    //   },
    subject: "Verify Your Email - SwiftCab",
    newSignup : (verificationLink:string)=> ` 
     <html>
            <body>
                <div style="text-align: center; font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
                    <img src="" alt="SwiftCab Logo" style="width: 150px;">
                    <h2>Verify Your Email Address</h2>
                    <p>Thank you for signing up with <strong>SwiftCab</strong>! To continue, please verify your email address.</p>
                    <a href="${verificationLink}" style="background-color: #007bff; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold; margin-top: 20px; display: inline-block;">Verify Email</a>
                    <p>If you did not sign up for an account, please ignore this email.</p>
                    <p style="font-size: 14px; color: #666;">Need help? Contact our support team at <a href="mailto:support@swiftcab.in" style="color: #007bff;">support@swiftcab.in</a></p>
                </div>
            </body>
            </html>   
     `
}
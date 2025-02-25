import { v2 as cloudinary } from 'cloudinary';
import { v4 as uuidv4 } from "uuid";
import all_env from '../config/dotenv';
interface cloudinaryConstructorType {
    cloud_name: string; 
    api_key: string; 
    api_secret: string;    
}
 
class Cloudinary {
 
    #cloud_name:string=""  
    #api_key:string="" 
    #api_secret:string=""   
    state:any=null 

    constructor(args:cloudinaryConstructorType) {
         this.#cloud_name= args.cloud_name
         this.#api_key= args.api_key
         this.#api_secret = args.api_secret

          cloudinary.config({ 
            cloud_name:  this.#cloud_name, 
            api_key: this.#api_key, 
            api_secret: this.#api_secret // Click 'View API Keys' above to copy your API secret
        });

        this.state = cloudinary

    }

     upload(filepath:string ,public_id:string ,  options:any= {}) {        
        try {
       return  this.state.uploader.upload(
            filepath , {
               public_id ,
           }
       ).then((res:any)=>{
        return  res 
       })
       .catch((error:any) => {
           return error;
       })
        }catch(err) {
            return err 
        }
         
    }
    
    
}


 let cld1=  new  Cloudinary({
    cloud_name:all_env.CLOUDINARY_CLOUD_NAME,
    api_key: all_env.CLOUDINARY_API_KEY, 
    api_secret: all_env.CLOUDINARY_API_SECRET 
 })

 export {cld1} 
 
// (async function() {

//     // Configuration
//     cloudinary.config({ 
//         cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//         api_key: process.env.CLOUDINARY_API_KEY, 
//         api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
//     });
    
//     // Upload an image
//      const uploadResult = await cloudinary.uploader
//        .upload(
//            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//                public_id: 'shoes',
//            }
//        )
//        .catch((error) => {
//            console.log(error);
//        });
    
//     console.log(uploadResult);
    
//     // Optimize delivery by resizing and applying auto-format and auto-quality
//     const optimizeUrl = cloudinary.url('shoes', {
//         fetch_format: 'auto',
//         quality: 'auto'
//     });
    
//     console.log(optimizeUrl);
    
//     // Transform the image: auto-crop to square aspect_ratio
//     const autoCropUrl = cloudinary.url('shoes', {
//         crop: 'auto',
//         gravity: 'auto',
//         width: 500,
//         height: 500,
//     });
    
//     console.log(autoCropUrl);    
// })();
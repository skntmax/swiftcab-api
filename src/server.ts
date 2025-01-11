import  Express ,  {  Request , Response  } from "express";
import './config/dotenv'
import authRouter from "./routes/auth/auth";
import middlewares from "./middlewares/middleware.index";
let app = Express()

let port =  process.env.PORT  || 4000  
let version:String =  process.env.VERSION || "v1" 

middlewares.globalMiddlewares(app)  

app.use(`/${version}/auth`, authRouter )

app.listen(port , ()=>{
    console.log(`server started at ${port} `)
})
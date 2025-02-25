import  Express ,  {  Request , Response  } from "express";
import './config/loadingEnv'
import './config/dotenv'
import './db/index'
import authRouter from "./routes/auth/auth";
import middlewares from "./middlewares/middleware.index";
import testRouter from "./routes/test/test.index";
import ownerRouter from "./routes/owner/owner.index";
import adminRouter from "./routes/admin/admin.index";
import masterRouter from "./routes/master/master.index";
import fs from 'fs'
import path from "path";
let app = Express()

let port =  process.env.PORT  || 4000  
let version:String =  process.env.VERSION || "v1" 

middlewares.globalMiddlewares(app)  


app.use(`/${version}/auth`, authRouter )
app.use(`/${version}/owner`, ownerRouter )
app.use(`/${version}/test`, testRouter )
app.use(`/${version}/admin`, adminRouter )
app.use(`/${version}/master`, masterRouter )




// intialise uploads  folder 
let uploadDir =  path.join(__dirname , './assets/uploads')
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir , {
      recursive:true
    });
  }


app.listen(port , ()=>{
    console.log(`server started at ${port} `)
})

import cors from 'cors'
import  express, { Express } from 'express'
import bodyParser from 'body-parser'
export const middlewares = {

    corsOptions : {
     origin: '*',
     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
      }
  ,   
    globalMiddlewares: function (app:Express){
        app.use(cors(this.corsOptions))
        app.use(bodyParser.urlencoded({ extended: false }))
        app.use(express.json())        
    }
    
}


export default middlewares
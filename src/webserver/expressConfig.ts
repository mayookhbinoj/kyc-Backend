import express,{Application} from "express"
import cors from "cors"
import morgan  from "morgan"
import cookieParser from "cookie-parser"
import path from "path"

const expressconfig=(app:Application)=>{
    const corsConfig = {
        origin: 'http://localhost:5173', 
        credentials: true, 
    }
    app.use(cors(corsConfig))
    app.options('*', cors());
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    app.use(morgan("dev"))
    app.use(cookieParser())
    app.use('/Uploads', express.static(path.join(__dirname, '../../Uploads')));
   
     
}
export default expressconfig
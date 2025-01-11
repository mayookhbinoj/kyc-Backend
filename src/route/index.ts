import {Application} from "express"
import userRoute from "./userRoute"
import adminRoute from "./adminRoute"

const routes=(app:Application)=>{
    app.use("/api/user",userRoute())
    app.use("/api/admin",adminRoute())

}
export default  routes
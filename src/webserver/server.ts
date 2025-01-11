import {Server} from "http"
import configKeys from "../utils/Configure"

const serverConfig=(server:Server)=>{
    return server.listen(configKeys.port,()=>{
        console.log("running in",configKeys.port)
    })
}
export default serverConfig
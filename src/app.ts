    import expres,{Application} from "express"
    import http from "http"
    import serverConfig from "./webserver/server"
    import expressconfig from "./webserver/expressConfig"
    import connectDB from "./Database/connect"
    import route from "./route/index"
    import dotenv from "dotenv"
    dotenv.config()


    const app:Application=expres()
    const server=http.createServer(app)

    expressconfig(app)
    connectDB()
    route(app)
    serverConfig(server)
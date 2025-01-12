    import expres,{Application} from "express"
    import http from "http"
    import serverConfig from "./src/webserver/server"
    import expressconfig from "./src/webserver/expressConfig"
    import connectDB from "./src/Database/connect"
    import route from "./src/route/index"
    import dotenv from "dotenv"
    dotenv.config()


    const app:Application=expres()
    const server=http.createServer(app)

    expressconfig(app)
    connectDB()
    route(app)
    serverConfig(server)
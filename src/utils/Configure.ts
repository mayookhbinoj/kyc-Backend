import dotenv from "dotenv"
dotenv.config()

const configKeys={
   port:process.env.port,
   MONGODB_URI:process.env.MONGODB_URI as string,
   JWT_SECRET_KEY:process.env.JWT_SECRET_KEY as string
}


export default configKeys
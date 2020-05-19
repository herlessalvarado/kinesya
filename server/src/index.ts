import * as dotenv from "dotenv"
import express from "express"
import cors from "cors"
import MongoConnection from "./database/db.connection"
import { UserRouter } from "./controllers/user.controller"
import cookieParser from "cookie-parser"


dotenv.config()
const PORT = process.env.PORT
const connectionString = process.env.connectionString!
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(process.env.PhotosFolder!))
app.use(cookieParser())
app.use("/api/", UserRouter)
const mongo = new MongoConnection(connectionString)
mongo.connect()
app.listen(PORT, () => {
    console.log(`Running on ${PORT}`)
})

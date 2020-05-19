import * as dotenv from "dotenv"
import express from "express"
import cors from "cors"
import MongoConnection from "./database/db.connection"
import { UserRouter } from "./controllers/user.controller"
import cookieParser from "cookie-parser"
import path from "path"

dotenv.config()

const PORT = process.env.PORT
const connectionString = process.env.connectionString!

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, "build")))
app.use(express.static(process.env.PhotosFolder!))
app.use(cookieParser())
app.use("/api/", UserRouter)
app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"))
})

const mongo = new MongoConnection(connectionString)
mongo.connect()

app.listen(PORT, () => {
    console.log(`Running on ${PORT}`)
})

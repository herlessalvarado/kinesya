import * as dotenv from "dotenv"
import express from "express"
import cors from "cors"
import MongoConnection from "./database/db.connection"
import { UserRouter } from "./controllers/user.controller"
import cookieParser from "cookie-parser"
import static_compress from "express-static-gzip"
import fs from "fs"
import path from "path"
import "reflect-metadata"


dotenv.config()
const PORT = process.env.PORT
const connectionString = process.env.connectionString!
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(process.env.PhotosFolder!))
app.use(
    static_compress(path.join(__dirname, "build"), {
        enableBrotli: true,
    })
)
app.use(cookieParser())

app.use("/api/", UserRouter)
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"))
})

const mongo = new MongoConnection(connectionString)
mongo.connect()
app.listen(PORT, () => {
    console.log(`Running on ${PORT}`)
})

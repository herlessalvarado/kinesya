import { config } from "dotenv"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import static_compress from "express-static-gzip"
/* import fs from "fs" */
import path from "path"
import "reflect-metadata"
import { userRouter } from "./Presentation/Controllers/UserController"
import { userController, DBManager } from "./ioc/container"

config()

const PORT = process.env.PORT
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

app.use(userRouter(userController))
/* app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"))
})*/
DBManager.connect()
app.listen(PORT, () => {
    console.log(`Running on ${PORT}`)
})

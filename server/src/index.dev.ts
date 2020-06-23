import { config } from "dotenv"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import http from "http"
import "reflect-metadata"
import { userRouter } from "./Presentation/Controllers/UserController"
import { userController, DBManager } from "./ioc/container"

config()

const PORT = process.env.PORT
const app = express()
app.use(cors({ origin: "*", credentials: true }))
app.use(express.json())
app.use(express.static(process.env.PhotosFolder!))
app.use(cookieParser())

app.use("/api", userRouter(userController))
const httpServer = http.createServer(app)

DBManager.connect()

httpServer.listen(PORT, () => {
    console.log(`HTTP running on ${PORT}`)
})

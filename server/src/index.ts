import { config } from "dotenv"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import static_compress from "express-static-gzip"
import http from 'http';
import https from 'https';
import fs from 'fs';
import path from "path"
import "reflect-metadata"
import { userRouter } from "./Presentation/Controllers/UserController"
import { userController, DBManager } from "./ioc/container"

config()

const PORT = process.env.PORT
const app = express()
const privateKey = fs.readFileSync('/etc/letsencrypt/live/kinesya.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/kinesya.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/kinesya.com/chain.pem', 'utf8');
const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};
app.use(cors({ origin: "*",credentials: true}));
app.use(express.json())
app.use(express.static(__dirname, { dotfiles: 'allow' } ))
app.use(express.static(process.env.PhotosFolder!))
app.use(express.static(path.join(__dirname, '../src/build')))
app.use(
    static_compress(path.join(__dirname, "../src/build"), {
        enableBrotli: true,
    })
)
app.use(cookieParser())

app.use(userRouter(userController))
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../src/build", "index.html"))
})
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);
DBManager.connect()

httpServer.listen(PORT, () => {
    console.log(`HTTP running on ${PORT}`);
});
    
httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});

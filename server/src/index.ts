import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import MongoConnection from './database/db.connection';
import { UserRouter } from './controllers/user.controller';
import cookieParser from 'cookie-parser';
import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';

dotenv.config();

const PORT = process.env.PORT;
const connectionString = process.env.connectionString!;
// const whitelist = ['http://kinesya.com','http://www.kinesya.com','http://162.243.174.235'];

const app = express();

const privateKey = fs.readFileSync('/etc/letsencrypt/live/kinesya.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/kinesya.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/kinesya.com/chain.pem', 'utf8');

const credentials = {
        key: privateKey,
        cert: certificate,
        ca: ca
        };

app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });


app.use(cors({ credentials: true, origin: "*" }));
app.use(cookieParser());
app.use(express.json());
app.use(express.static(__dirname, { dotfiles: 'allow' } ));
app.use(express.static(process.env.PhotosFolder!));
/*app.use(cors({origin: function (origin, callback) {
    if (whitelist.indexOf(origin!) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
    },credentials: true}));*/
 app.use(UserRouter);

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

const mongo = new MongoConnection(connectionString);
mongo.connect();

httpServer.listen(PORT, () => {
console.log(`HTTP running on ${PORT}`);
});

httpsServer.listen(443, () => {
        console.log('HTTPS Server running on port 443');
});

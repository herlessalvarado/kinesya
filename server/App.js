"use strict"
const express = require('express');
const MongoDBConnector = require('./DBConnections/MongoDBConnector');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const employeeController = require('./Controllers/EmployeeController');
const cors = require('cors');
const app = express();


dotenv.config();
app.use(cookieParser());
app.use(express.static(process.env.PhotosFolder))
app.use(cors({origin: process.env.APP_WEB_DOMAIN,credentials: true}));
app.use(express.json());
app.use(employeeController);


(function(){
    const  connector = new  MongoDBConnector(process.env.DevCS);
    connector.connectDB();
    app.listen(process.env.PORT, () => console.log(`Listening port on ${process.env.PORT}`));
})();








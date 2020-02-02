"use strict"
const express = require('express');
const MongoDBConnector = require('./DBConnections/MongoDBConnector');
const dotenv = require('dotenv');
const userController = require('./Controllers/UserController');
const app = express();


dotenv.config();
app.use(express.static(process.env.PhotosFolder))
app.use(express.json());
app.use(userController);


(function(){
    const  connector = new  MongoDBConnector(process.env.DevCS);
    connector.connectDB();
    app.listen(process.env.PORT, () => console.log(`Listening port on ${process.env.Port}`));
})();








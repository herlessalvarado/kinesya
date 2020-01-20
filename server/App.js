"use strict"
const express = require('express');
const MongoDBConnector = require('./DBConnections/MongoDBConnector');
const dotenv = require('dotenv');
const userController = require('./Controllers/UserController');
const app = express();

dotenv.config();

app.use(express.json());
app.use(userController);
 
(function(){
    const  connector = new  MongoDBConnector(process.env.MONGODB_URL);
    connector.connectDB();
    app.listen(process.env.PORT, () => console.log(process.env.PORT));
})();








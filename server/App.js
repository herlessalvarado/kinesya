"use strict"
const express = require('express');
const MongoDBConnector = require('./DBConnections/MongoDBConnector');
const dotenv = require('dotenv');
const userController = require('./Controllers/UserController');
const employeeController = require('./Controllers/EmployeeController');
const app = express();


dotenv.config();
app.use(express.static(process.env.PhotosFolder))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(express.json());
app.use(userController);
app.use(employeeController);


(function(){
    const  connector = new  MongoDBConnector(process.env.DevCS);
    connector.connectDB();
    app.listen(process.env.PORT, () => console.log(`Listening port on ${process.env.PORT}`));
})();








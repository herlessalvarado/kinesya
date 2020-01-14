"use strict"
const express = require('express');
const envJson = require('./AppSettings')
const MongoDBConnector = require('./DBConnections/MongoDBConnector');
const environment = process.env.Environment || 'Dev';
const app = express();

 
(function(){
    const  connector = new  MongoDBConnector(envJson[environment].connectionString)
    connector.connectDB()
    connector.executeMigrations()
    app.listen(envJson[environment].Port, () => console.log('Server Started'));

})();








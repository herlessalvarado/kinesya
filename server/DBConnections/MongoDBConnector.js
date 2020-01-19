"use strict"

const seed = require("../Migrations/DevSeed")
const mongoose = require('mongoose');
const Persona = require("../Repository/PersonRepository")

var MongoDBConnector = class MongoDBConnector {
   
    constructor(connectionString)
    {
        this.connectionString = connectionString
    }
    async connectDB () {
        await mongoose.connect(this.connectionString, { useUnifiedTopology: true, useNewUrlParser: true  })
            .then(()=>console.log("DB Connect connectionString"))
            .catch((err)=>console.log(err));
    }

}
 module.exports = MongoDBConnector;


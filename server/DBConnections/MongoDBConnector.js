"use strict"

const seed = require("../Migrations/DevSeed")
const mongoose = require('mongoose');
const Persona = require("../Repository/PersonRepository")

var MongoDBConnector= class MongoDBConnector {
   
    constructor(connectionString)
    {
        this.connectionString = connectionString;
    }
    async connectDB () {
        await mongoose.connect(this.connectionString, { useUnifiedTopology: true, useNewUrlParser: true  })
            .then(()=>console.log("DB Connect connectionString"))
            .catch((err)=>console.log(err));
    }

    async executeMigrations (){
       await Persona.insertMany(seed)
            .then(()=>console.log(`Se ha insertado ${seed.length} documents : ${seed} `))
            .catch((err)=>console.log(`Error in migrations ${err}`))
    }

}
 module.exports = MongoDBConnector;


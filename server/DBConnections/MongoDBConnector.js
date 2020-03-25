"use strict"

const mongoose = require('mongoose');

var MongoDBConnector = class MongoDBConnector {
   
    constructor(connectionString)
    {
        this.connectionString = connectionString
    }
    async connectDB () {
        try {
            await mongoose.connect(this.connectionString, { useUnifiedTopology: true, useNewUrlParser: true  })
            console.log(`DB Connect ${this.connectionString} `)
        } catch (error) {
            console.log(error.message)            
        }
    }

}
 module.exports = MongoDBConnector;


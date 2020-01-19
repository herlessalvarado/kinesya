"use strict"
const personaSchema = require("../Schemas/Persona")
const mongoose = require('mongoose');

class PersonRepository 
{
    static findByName(name){
        return this.findOne( {name});
    }
    static findByEmail(email){
        return this.findOne({email})
    }
} 
personaSchema.loadClass(PersonRepository)


module.exports = mongoose.model('Persona',personaSchema)
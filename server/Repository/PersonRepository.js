"use strict"
const personaSchema = require("../Schemas/Persona")
const mongoose = require('mongoose');

class PersonRepository 
{
    static findByEmail(email){
        this.findOne({email});
    }
} 
personaSchema.loadClass(PersonRepository)


module.exports = mongoose.model('Persona',personaSchema)
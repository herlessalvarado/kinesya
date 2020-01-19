"use strict"
const mongoose = require('mongoose')
const envJson = require('../AppSettings')
const PersonaRepository = require("../Repository/PersonRepository")
var Personas = [
    new PersonaRepository ({email:"jose@hotmail.com",passwordHash:"ufdndhq223",name:"Jose",edad:20}),
    new PersonaRepository ({email:"jerles@hotmail.com",passwordHash:"ufdn223",name:"Herles",edad:20}),
    new PersonaRepository ({email:"CC@hotmail.com",passwordHash:"ufdn223",name:"Carlos",edad:40})
]

module.exports.init = async ()=>{
    var connected = await mongoose.connect(envJson["Dev"].TestDB, { useUnifiedTopology: true, useNewUrlParser: true  })
    let resultados = await PersonaRepository.insertMany(Personas,{ordered:true})
    connected.connection.close()
}



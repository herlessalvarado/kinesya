var assert = require('chai').assert;
const mongoose = require('mongoose')
const PersonRepository = require('../../Repository/PersonRepository')
const MongoDBConnector = require('../../DBConnections/MongoDBConnector');

describe("Prueba Repository",function(){
    before(function(done){
        const  connector = new  MongoDBConnector('mongodb://localhost:27017/test')
        connector.connectDB()
        done()
    })
    it('Buscar persona por nombre', async()=>{
        let nombre = 'Jose'
        const person = await PersonRepository.findByName(nombre)
        assert.equal(person.name,nombre)
    })
    it ('Buscar personas por email',async()=>{
        let email = 'jose@hotmail.com'
        const person = await PersonRepository.findByEmail(email)
        assert.equal(person.email,email)
    })
  });
const personRepository = require("../../Repository/PersonRepository")
const Validator = require("../Person/ValidatorBusiness")

module.exports = class PersonService{

    constructor(){
        this.validator = new Validator()
    }
    
    async getUserByEmail(email){
        return await personRepository.findByEmail(email)
    }

    async registerUser({email,passwordHash,name,edad}){
        if(!this.validator.isValidPerson(email)) throw Error("Persona No Valida");
        let persona = new personRepository({email:email,passwordHash:passwordHash,name:name,edad:edad})
        return await persona.save()
    }
}
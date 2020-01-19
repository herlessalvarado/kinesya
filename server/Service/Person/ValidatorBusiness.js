const personRepository = require("../../Repository/PersonRepository")

let validator = class ValidatorPersonBusinessRules{

    constructor(){
        
    }
    
    async isValidPerson(email){
        let user = await personRepository.findByEmail(email);
        return !!user
    }



}
module.exports = validator
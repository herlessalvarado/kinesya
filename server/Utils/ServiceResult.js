module.exports = class ServiceResult{
    constructor(){
        this.success = true
        this.errors = []
    }
    addError(error){
        this.success = false
        this.errors.push(error)
    }
    addData(result){
        this.data = result
    }
    
}
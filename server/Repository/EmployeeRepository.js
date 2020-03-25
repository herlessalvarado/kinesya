const UserModel = require('../Repository/UserRepository')
const EmployeeSchema = require('../Schemas/Employee')
module.exports =  UserModel.discriminator('Employee', EmployeeSchema)
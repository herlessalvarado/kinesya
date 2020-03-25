const User = require('../Repository/UserRepository');
const Employee = require('../Repository/EmployeeRepository');
const ServiceResult = require('../Utils/ServiceResult')
class UserService{
    async loginUser({email,password}){
        let serviceResult = new ServiceResult();
        try {
            let user = await User.findByCredentials(email, password)
            if (!user) {
                serviceResult.addError("This user doesn't exist")
            }
            let token = await user.generateAuthToken()
            serviceResult.addData({user: user,token: token})
        } catch (error) {
            serviceResult.addError(error.message)
        }finally{
            return serviceResult
        }
    }
    async userLogOut({user,token}){
        let serviceResult = new ServiceResult();
        try {
            user.tokens = user.tokens.filter(Token => Token.token != token)
            await user.save();
            serviceResult.addData({message:"You have been loggged out"})
        }catch (error) {
            serviceResult.addError(error.message)
        }finally{
            return serviceResult
        }
    }
    async userLogOutAll({user}){
        let serviceResult = new ServiceResult();
        try {
            user.tokens.splice(0, user.tokens.length)
            await user.save();
            serviceResult.addData({message:"Your sessions has been closed"})
        }catch (error) {
            serviceResult.addError(error.message)
        }finally{
            return serviceResult
        }
    }
    getUserInfo(requestUser){
        let serviceResult = new ServiceResult();
        serviceResult.addData(requestUser)
        return serviceResult
    }
 
}
module.exports = new UserService()

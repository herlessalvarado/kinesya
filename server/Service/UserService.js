const User = require('../Repository/UserRepository');
const ServiceResult = require('../Utils/ServiceResult')
class UserService{
    async createUser(requestUser) {
        let serviceResult = new ServiceResult()
        try {
            let user = new User(requestUser)
            await user.save()
            let token = await user.generateAuthToken()
            serviceResult.addData({user: user, token: token})
        } catch (error) {
            serviceResult.addError(error.message)
        }finally{
            return serviceResult
        }
    }
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
    async uploadPhotos({user,files}){
        let serviceResult = new ServiceResult();
        try {
            if (Object.keys(files).length === 0)
                throw new Error("There aren't any photos")
            if (!!files.references)
                user.referencePhotos = files.references.map(photo => photo.path)
            if (!!files.profile)
                user.profilePhoto = files.profile[0].path
            await user.save()
            serviceResult.addData({message:"Photos has been uploaded successfully"})
        } catch (error) {
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
}
module.exports = new UserService()

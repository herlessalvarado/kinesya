const EmployeeRepository = require('../Repository/EmployeeRepository');
const ServiceResult = require('../Utils/ServiceResult')
class Employee{
    async create(requestUser) {
        let serviceResult = new ServiceResult()
        try {
            let user = new EmployeeRepository(requestUser)
            await user.save()
            let token = await user.generateAuthToken()
            serviceResult.addData({user: user, token: token})
        } catch (error) {
            serviceResult.addError(error.message)
        }finally{
            return serviceResult
        }
    }
    async updateUser(req){
        let serviceResult = new ServiceResult();
        try {
            await this.updateUserInfo(req.body, req.user);
            if (!!req.files)
                this.uploadPhotos(req)
            serviceResult.addData({ message: "User info has been updated" });
        } catch (error) {
            serviceResult.addError(error.message)
        }finally
        {
            return serviceResult
        }
        
    }
    async updateUserInfo(newUser, user) {
        Object.keys(newUser).forEach((prop) => {
            user[prop] = newUser[prop];
        });
        await user.save();
    }

    async uploadPhotos({user,files}){
        if (!!files.references)
            user.referencePhotos = files.references.map(photo => photo.filename)
        if (!!files.profile)
            user.profilePhoto = files.profile[0].filename
        await user.save()
    }
    async getAll(){
        let serviceResult = new ServiceResult();
        try {
            var users = await EmployeeRepository.find()
            serviceResult.addData(users);
        } catch (error) {
            serviceResult.addError(error.message)
        } finally{
            return serviceResult
        }
    }

    async loginUser({email,password}){
        let serviceResult = new ServiceResult();
        try {
            let user = await EmployeeRepository.findByCredentials(email, password)
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

module.exports = new Employee();
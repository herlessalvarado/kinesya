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
}
module.exports = new Employee();
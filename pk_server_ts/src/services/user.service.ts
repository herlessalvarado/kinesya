import { Request } from 'express';
import { User } from '../repository/user.repository';
import { IUser } from '../user/user.interface';
import { ServiceResult } from '../results/service.result';
import bcrypt from 'bcryptjs';

export class UserService{
    async create(req: Request): Promise<ServiceResult> {
        const serviceResult = new ServiceResult();
        try{
            const user = new User(req.body);
            await user.save();
            const token = await user.generateAuthToken();
            serviceResult.addData({user,token});
        }catch(error){
            serviceResult.addError(error.message);
        }finally{
            return serviceResult;
        }
    };
    async logIn(req: Request): Promise<ServiceResult>{
        const serviceResult = new ServiceResult();
        try{
            const {email,password} = req.body;
            const user = await User.findOne({email});
            if(!user){
                serviceResult.addError({name: "EmailNotFound", message: "The email does not exist"});
            }else{
                const isPasswordMatch = await bcrypt.compare(password, user.password || "");
                if(!isPasswordMatch){
                    serviceResult.addError({name: "WrongPassword", message: "The password is wrong"});
                }else{
                    const token = await user.generateAuthToken();
                    serviceResult.addData({user,token});
                }
            }
        }catch(error){
            serviceResult.addError(error.message);
        }finally{
            return serviceResult;
        }
    };
    async getUser(user: IUser): Promise<ServiceResult>{
        const serviceResult = new ServiceResult();
        try{
            if(user){
                serviceResult.addData(user);
            }else{
                serviceResult.addError({name: "UserNotFound", message: "User is not found"});
            }
        }catch(error){
            serviceResult.addError(error.message);
        }finally{
            return serviceResult;
        }
    };
    async getAll(): Promise<ServiceResult>{
        const serviceResult = new ServiceResult();
        try{
            const users = await User.find();
            serviceResult.addData(users);
        }catch(error){
            serviceResult.addError({name: "UsersNotFound", message: "There are no users"});
        }finally{
            return serviceResult;
        }
    };
    async updateUser(req: Request): Promise<ServiceResult>{
        const serviceResult = new ServiceResult();
        try{
            const {user,name,age,description,price,phone,location} = req.body;
            user.name = name;
            user.age = age;
            user.description = description;
            user.price = price;
            user.phone = phone;
            user.location = location;
            await user.save();
            serviceResult.addData(user);
        }catch(error){
            serviceResult.addError(error.message);
        }finally{
            return serviceResult;
        }
    }
};
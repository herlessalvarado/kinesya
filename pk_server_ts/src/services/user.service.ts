import { Request,Response } from 'express';
import { User } from '../repository/user.repository';
import { IUser } from '../user/user.interface';
import { ServiceResult } from '../results/service.result';

export class UserService{

    private async uploadPhotos(req:Request){

        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        if(!!files.references){
            req.body.user.referencePhotos = files.references.map((photo: any) => photo.filename)
        }
        if(!!files.profile){
            req.body.user.profilePhoto = files.profile[0].filename;
        }
        await req.body.user.save();
    }
    private mapReqbodyToUser(user: IUser, req:Request) {
        user.name = req.body.name;
        user.age = req.body.age;
        user.isPublic = true;
        user.price = req.body.price;
        user.description = req.body.description;
        user.location = req.body.location;
        user.phone = req.body.phone;
    }


    async create(req: Request,res:Response): Promise<ServiceResult> {
        const serviceResult = new ServiceResult();
        try{
            const user = new User(req.body as IUser);
            await user.save();
            const token = await user.generateAuthToken();
            res.cookie('key',token,{httpOnly:true});
            serviceResult.addData("The user has been created");
        }catch(error){

            serviceResult.addError(error as Error);
        }finally{
            return serviceResult;
        }
    };
    async logIn(req: Request,res:Response): Promise<ServiceResult>{
        const serviceResult = new ServiceResult();
        
        try{
            const user:IUser = req.body.user;
            const token = await user.generateAuthToken();
            res.cookie('key',token,{httpOnly:true})
            
            serviceResult.addData({message:"The user has been logged successfully"});
        }catch(error){
            serviceResult.addError(error as Error);
        }finally{
            return serviceResult;
        }
    };
    async getUser(user: IUser): Promise<ServiceResult>{
        const serviceResult = new ServiceResult();
        try{
            serviceResult.addData(user);
        }catch(error){
            serviceResult.addError(error as Error);
        }finally{
            return serviceResult;
        }
    };
    async getAll(): Promise<ServiceResult>{
        const serviceResult = new ServiceResult();
        try{
            const users = await User.find({isPublic:true});
            serviceResult.addData(users);
        }catch(error){
            serviceResult.addError(error as Error);
        }finally{
            return serviceResult;
        }
    };
    async updateUser(req: Request): Promise<ServiceResult>{
        const user = req.body.user as IUser;
        const serviceResult = new ServiceResult();

        try{
            this.mapReqbodyToUser(user, req);
            await user.save();
            if (!!req.files)
                this.uploadPhotos(req);
            serviceResult.addData({message:"User updated"});
        }catch(error){
            serviceResult.addError(error as Error);
        }finally{
            return serviceResult;
        }
    }


    async logOut(req: Request): Promise<ServiceResult>{
        let serviceResult = new ServiceResult();
        try {
            req.body.user.tokens.splice(0, req.body.user.tokens.length);
            await req.body.user.save();
            serviceResult.addData({message:"The user has been logout"})
        } catch (error) {
            serviceResult.addError(error as Error);
        }finally{
            return serviceResult;
        }

    }

};
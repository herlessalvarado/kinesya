import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import { User } from '../repository/user.repository';
import { IUser } from '../user/user.interface';
import { ServiceResult } from '../results/service.result';
import { userCredentials } from '../utils/user.validators';



async function getUserByToken(token: any):Promise<IUser|null> {
    const data = jwt.verify(token, process.env.JWT_KEY!);
    return await User.findOne({ _id: data, 'tokens.token': token });
    
}



export const auth = async(req: Request, res: Response, next: NextFunction) => {
    
    let serviceResult = new ServiceResult();

    try {

        const token = req.cookies?.key || req.header('Authorization')?.replace('Bearer ', '');
        let user:IUser | null;   

        if (!!token){
            user = await getUserByToken(token);
        }else{
            
            user = await User.findByCredentials(req.body as IUser)
        }
        if(serviceResult.success){
            req.body.user = user as IUser;
            next();
        }
        else{
            res.status(401).send(serviceResult.getErrorMessages())
        }
    } catch (error) {
        res.clearCookie('key');
        let message = (error as Error).message
        res.status(401).send({message})
    }

};



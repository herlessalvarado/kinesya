import { ServiceResult } from "../results/service.result";
import { IUser } from "../user/user.interface";
import bcrypt from 'bcryptjs';



export async function userCredentials(serviceResult: ServiceResult, userDB: IUser|null, password:string){
    if (!userDB)
        serviceResult.addError(new Error("The email doesnt exists"))
    else{
        let isValidPassword = await bcrypt.compare(password, userDB.password!);
        if (!isValidPassword)
            serviceResult.addError(new Error("The password is wrong"))
    }
}

import { UserCreateDTO } from "../DTO/UserDTO";
import User from "../../Data/Entities/User"
import bcrypt from "bcryptjs"
import {v1 as uuidv1} from "uuid"

export async function fromUserCreateDTOtoEntity(user:UserCreateDTO):Promise<User>{
    return {
        id:uuidv1(),
        email:user.email,
        username:user.username,
        password: await bcrypt.hash(user.password, 8),
        isPublic:false
    }
}
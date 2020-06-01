import { UserCreateDTO } from "../DTO/UserDTO";

export interface UserService {
    create(user:UserCreateDTO):Promise<void>;
    
}
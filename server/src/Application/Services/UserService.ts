import UserDTO, { UserCreateDTO } from "../DTO/UserDTO";

export interface UserService {
    create(user:UserCreateDTO):Promise<void>;
    getAll():Promise<Array<UserDTO>>
}
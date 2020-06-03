import UserDTO, { UserCreateDTO } from "../DTO/UserDTO"
import { AuthDTO } from "../DTO/AuthDTO"

export interface UserService {
    create(user: UserCreateDTO): Promise<AuthDTO>
    getAll(): Promise<Array<UserDTO>>
}

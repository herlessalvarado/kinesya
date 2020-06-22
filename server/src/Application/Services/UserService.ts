import UserDTO, { UserCreateDTO, UserLoginDTO, UserFiltersDTO } from "../DTO/UserDTO"
import { AuthDTO } from "../DTO/AuthDTO"

export interface UserService {
    create(user: UserCreateDTO): Promise<AuthDTO>
    getAll(filters: UserFiltersDTO): Promise<Array<UserDTO>>
    login(user: UserLoginDTO): Promise<AuthDTO>
    logout(refreshToken: string | undefined): Promise<string>
    getByUsername(username: string): Promise<UserDTO>
    getCurrentUser(token: string | undefined): Promise<UserDTO>
    generateToken(refreshToken: string): Promise<AuthDTO>
    updateUserByToken(token: string, user: UserDTO): Promise<void>
}

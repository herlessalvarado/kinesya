import UserDTO, { UserCreateDTO, UserLoginDTO } from "../DTO/UserDTO"
import { AuthDTO } from "../DTO/AuthDTO"

export interface UserService {
    create(user: UserCreateDTO): Promise<AuthDTO>
    getAll(page?: number, limit?: number, location?: string): Promise<Array<UserDTO>>
    login(user: UserLoginDTO): Promise<AuthDTO>
    logout(refreshToken: string | undefined): Promise<string>
    getByUsername(username: string): Promise<UserDTO>
    getCurrentUser(refreshToken: string | undefined): Promise<UserDTO>
    generateToken(refreshToken: string): Promise<AuthDTO>
    updateUserByToken(token: string, user: UserDTO): Promise<void>
}

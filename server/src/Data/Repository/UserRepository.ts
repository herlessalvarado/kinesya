import { User } from "../Entities/User"

export default interface UserRepository {
    save(user: User): Promise<void>
    findAll(): Promise<User[]>
    update(user: User): Promise<void>
    getByName(name: string): Promise<User>
    findOnlyPublic(): Promise<User[]>
<<<<<<< HEAD
    findByEmailOrNull(email: string): Promise<User | null>
    findByUsernameOrNull(username: string): Promise<User | null>
=======
    isUserEmail(email: string): Promise<User>
>>>>>>> feature/backend-refactor
}

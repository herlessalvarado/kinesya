import { User } from "../Entities/User"
import { Query } from "../Helper/query"

export default interface UserRepository {
    save(user: User): Promise<void>
    update(user: User): Promise<void>
    findAll(query: Query): Promise<User[]>
    findOneOrNull(query: Query): Promise<User | null>
    findOne(query: Query): Promise<User>
}

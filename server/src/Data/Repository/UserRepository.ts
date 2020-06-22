import { User } from "../Entities/User"
import { Criteria } from "../Helper/query"

export default interface UserRepository {
    save(user: User): Promise<void>
    update(user: User): Promise<void>
    findAll(criteria: Criteria): Promise<User[]>
    findOneOrNull(criteria: Criteria): Promise<User | null>
    findOne(criteria: Criteria): Promise<User>
}

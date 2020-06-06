import UserRepository from "../../Data/Repository/UserRepository"
import { UserCreateDTO } from "../DTO/UserDTO"
import UserServiceException from "../Exceptions/UserServiceException"

abstract class UserValidator {
    protected readonly errors: string[]
    protected readonly repository: UserRepository
    constructor(userRepository: UserRepository) {
        this.errors = []
        this.repository = userRepository
    }

    async validate() {
        await this.executeValidations()
        if (this.errors.length > 0) throw new UserServiceException(this.errors)
    }

    abstract executeValidations(): Promise<void>

    getErrors() {
        return this.errors
    }
    hasErrors() {
        return this.errors.length > 0
    }
}
export class CreateUserValidator extends UserValidator {
    private readonly user: UserCreateDTO

    constructor(user: UserCreateDTO, userRepository: UserRepository) {
        super(userRepository)
        this.user = user
    }
    async executeValidations() {
        await this.validUniqueEmail()
        await this.validUniqueUsername()
    }

    private async validUniqueEmail() {
        if ((await this.repository.findByEmailOrNull(this.user.email)) === null)
            this.errors.push("This email already exists")
    }
    private async validUniqueUsername() {
        if ((await this.repository.findByUsernameOrNull(this.user.username)) === null)
            this.errors.push("this username already exists")
    }
}

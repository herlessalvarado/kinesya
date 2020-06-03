import UserRepository from "../../Data/Repository/UserRepository"
import { UserCreateDTO } from "../DTO/UserDTO"

interface UserValidator {
    validate(): Promise<void>
    isValid(): boolean
    errors: string[]
}
export class CreateUserValidator implements UserValidator {
    private _errors: string[] = []
    private readonly repository: UserRepository
    private readonly user: UserCreateDTO

    constructor(userRepository: UserRepository, user: UserCreateDTO) {
        this.repository = userRepository
        this.user = user
    }

    get errors() {
        return this._errors
    }

    isValid() {
        return this._errors.length === 0
    }

    async validate() {
        this.validUniqueEmail()
        this.validUniqueUsername()
    }

    private async validUniqueEmail() {
        if ((await this.repository.findAll()).some((v) => v.email === this.user.email))
            this._errors.push("This email already exists")
    }
    private async validUniqueUsername() {
        const users = await this.repository.findAll()
        if (users.some((v) => v.username === this.user.username))
            this._errors.push("this username already exists")
    }
}

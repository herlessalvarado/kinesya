import UserRepository from "../../../Data/Repository/UserRepository"
import UserDTO, { UserCreateDTO, UserLoginDTO } from "../../DTO/UserDTO"
import { fromUserCreateDTOtoEntity, fromEntityToUserDTO } from "../../Mappers/UserMapper"
import { injectable, inject, LazyServiceIdentifer } from "inversify"
import { TYPES } from "../../../ioc/container"
import { CreateUserValidator } from "../../Validators/UserServiceValidator"
import { UserService } from "../UserService"
import { generateStandardToken, verifyRefreshToken } from "../../../utils/tokenManager"
import { PasswordException } from "../../Exceptions/UserServiceException"

@injectable()
export default class UserServiceImpl implements UserService {
    private readonly userRepository: UserRepository

    constructor(
        @inject(new LazyServiceIdentifer(() => TYPES.UserRepository)) userRepository: UserRepository
    ) {
        this.userRepository = userRepository
    }
    async getAll(): Promise<Array<UserDTO>> {
        const users = await this.userRepository.findOnlyPublic()
        return users.map((u) => fromEntityToUserDTO(u))
    }

    async create(user: UserCreateDTO) {
        const validator = new CreateUserValidator(user,this.userRepository)
        await validator.validate()
        const entity = await fromUserCreateDTOtoEntity(user)
        entity.updateRefreshToken()
        await this.userRepository.save(entity)
        return { refreshToken: entity.refreshToken!, token: generateStandardToken(entity)}
    }

    async login(user: UserLoginDTO) {
        const _user = await this.userRepository.isUserEmail(user.email);
        if(await !_user.isPasswordMatch(user.email)) throw new PasswordException();
        verifyRefreshToken(_user);
        await this.userRepository.update(_user);
        return { refreshToken: _user.refreshToken!, token: generateStandardToken(_user)};
    }
}

import UserRepository from "../../../Data/Repository/UserRepository"
import UserDTO, { UserCreateDTO, UserLoginDTO } from "../../DTO/UserDTO"
import { fromUserCreateDTOtoEntity, fromEntityToUserDTO } from "../../Mappers/UserMapper"
import { injectable, inject, LazyServiceIdentifer } from "inversify"
import { TYPES } from "../../../ioc/container"
import { CreateUserValidator } from "../../Validators/UserServiceValidator"
import { UserService } from "../UserService"
import { generateStandardToken, verifyRefreshToken } from "../../../utils/tokenManager"
import { PasswordException } from "../../Exceptions/UserServiceException"
import { equals } from "../../../Data/Helper/query"

@injectable()
export default class UserServiceImpl implements UserService {
    private readonly userRepository: UserRepository

    constructor(
        @inject(new LazyServiceIdentifer(() => TYPES.UserRepository)) userRepository: UserRepository
    ) {
        this.userRepository = userRepository
    }
    async getAll(page?: number, limit?: number, location?: string): Promise<Array<UserDTO>> {
        const criteria: string[] = []
        if (!!location) criteria.push(equals("location", location))
        const users = await this.userRepository.findAll({
            where: [...criteria],
            paginator:
                !!page && !!limit
                    ? {
                          page: page > 0 ? (page - 1) * limit : 0,
                          limit: page * limit,
                      }
                    : undefined,
        })
        return users.map((u) => fromEntityToUserDTO(u))
    }

    async create(user: UserCreateDTO) {
        const validator = new CreateUserValidator(user, this.userRepository)
        await validator.validate()
        const entity = await fromUserCreateDTOtoEntity(user)
        entity.updateRefreshToken()
        await this.userRepository.save(entity)
        return { refreshToken: entity.refreshToken!, token: generateStandardToken(entity) }
    }

    async login(user: UserLoginDTO) {
        const _user = await this.userRepository.findOne({ where: [equals("email", user.email)] })
        if (!(await _user.isPasswordMatch(user.password))) throw new PasswordException()
        verifyRefreshToken(_user)
        await this.userRepository.update(_user)
        return { refreshToken: _user.refreshToken!, token: generateStandardToken(_user) }
    }

    async logout(refreshToken: string | undefined): Promise<string> {
        //ask if okay
        //falta tests
        const _user = await this.userRepository.findOne({ where: [equals("refreshToken", refreshToken)]});
        _user.removeRefreshToken();
        await this.userRepository.update(_user);
        return "The refresh token has been removed!";
    }

    async getByUsername(username: string): Promise<UserDTO> {
        //ask if okay
        //falta controller y test
        const _user = await this.userRepository.findOne({ where: [equals("username", username)]});
        return fromEntityToUserDTO(_user);
    }

    async getCurrentUser(refreshToken: string | undefined): Promise<UserDTO> {
        //ask if okay
        //falta controller y test
        const _user = await this.userRepository.findOne({ where: [equals("refreshToken", refreshToken)]});
        return fromEntityToUserDTO(_user);
    }
}

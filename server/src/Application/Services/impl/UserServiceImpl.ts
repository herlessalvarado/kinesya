import UserRepository from "../../../Data/Repository/UserRepository"
import UserDTO, { UserCreateDTO, UserLoginDTO, UserFiltersDTO } from "../../DTO/UserDTO"
import {
    fromUserCreateDTOtoEntity,
    fromEntityToUserDTO,
    updateEntityFromUserDTO,
} from "../../Mappers/UserMapper"
import { injectable, inject, LazyServiceIdentifer } from "inversify"
import { TYPES } from "../../../ioc/container"
import { CreateUserValidator } from "../../Validators/UserServiceValidator"
import { UserService } from "../UserService"
import {
    generateStandardToken,
    verifyRefreshTokenAndUpdate,
    getClaimsFromToken,
    verifyRefreshToken,
} from "../../../utils/tokenManager"
import { PasswordException } from "../../Exceptions/UserServiceException"
import { Criteria } from "../../../Data/Helper/query"

@injectable()
export default class UserServiceImpl implements UserService {
    private readonly userRepository: UserRepository

    constructor(
        @inject(new LazyServiceIdentifer(() => TYPES.UserRepository)) userRepository: UserRepository
    ) {
        this.userRepository = userRepository
    }
    async updateUserByToken(token: string, user: UserDTO): Promise<void> {
        const claims = getClaimsFromToken(token)
        const _user = await this.userRepository.findOne({
            where: [{ property: "username", eq: claims.username }],
        })
        const userDB = updateEntityFromUserDTO(_user, user)
        await this.userRepository.update(userDB)
    }
    async generateToken(refreshToken: string) {
        const claims = getClaimsFromToken(refreshToken)
        const _user = await this.userRepository.findOne({
            where: [{ property: "username", eq: claims.username }],
        })
        verifyRefreshToken(_user.refreshToken!)
        return { refreshToken: _user.refreshToken!, token: generateStandardToken(_user) }
    }
    async getAll(filters: UserFiltersDTO): Promise<Array<UserDTO>> {
        const users = await this.userRepository.findAll(this.getCriteria(filters))
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
        const _user = await this.userRepository.findOne({
            where: [{ property: "email", eq: user.email }],
        })
        if (!(await _user.isPasswordMatch(user.password))) throw new PasswordException()
        verifyRefreshTokenAndUpdate(_user)
        await this.userRepository.update(_user)
        return { refreshToken: _user.refreshToken!, token: generateStandardToken(_user) }
    }

    async logout(refreshToken: string | undefined): Promise<string> {
        const _user = await this.userRepository.findOne({
            where: [{ property: "refreshToken", eq: refreshToken }],
        })

        _user.removeRefreshToken()
        await this.userRepository.update(_user)
        return "The refresh token has been removed!"
    }

    async getByUsername(username: string): Promise<UserDTO> {
        const _user = await this.userRepository.findOne({
            where: [{ property: "username", eq: username }],
        })
        return fromEntityToUserDTO(_user)
    }

    async getCurrentUser(token: string | undefined): Promise<UserDTO> {
        const claims = getClaimsFromToken(token!)
        const _user = await this.userRepository.findOne({
            where: [{ property: "username", eq: claims.username }],
        })
        return fromEntityToUserDTO(_user)
    }
    private getCriteria(filters: UserFiltersDTO) {
        const criteria: Criteria = {
            where: [],
            paginator:
                !!filters.page && !!filters.limit
                    ? {
                          page: filters.page > 0 ? (filters.page - 1) * filters.limit : 0,
                          limit: filters.page * filters.limit,
                      }
                    : undefined,
        }
        if (!!filters.ethnicity)
            criteria.where.push({ property: "characteristics.ethnicity", eq: filters.ethnicity })
        if (!!filters.eyes)
            criteria.where.push({ property: "characteristics.eyes", eq: filters.eyes })
        if (!!filters.hair)
            criteria.where.push({ property: "characteristics.hair", eq: filters.hair })
        if (!!filters.zodiac)
            criteria.where.push({ property: "characteristics.zodiac", eq: filters.zodiac })
        if (!!filters.sexualOrientation)
            criteria.where.push({
                property: "characteristics.orientation",
                eq: filters.sexualOrientation,
            })
        if (!!filters.lowerPrice && !!filters.upperPrice)
            criteria.where.push({
                property: "price",
                range: { lower: filters.lowerPrice, upper: filters.upperPrice },
            })
        if (!!filters.fakeBoobs)
            criteria.where.push({ property: "characteristics.fakeBoobs", eq: filters.fakeBoobs })
        if (!!filters.birthPlace)
            criteria.where.push({ property: "characteristics.birthPlace", eq: filters.birthPlace })
        if (!!filters.services) criteria.where.push({ property: "tags", in: filters.services })
        if (!!filters.location) criteria.where.push({ property: "location", eq: filters.location })
        return criteria
    }
}

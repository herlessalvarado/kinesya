import UserRepository from "../../../Data/Repository/UserRepository";
import { UserCreateDTO } from "../../DTO/UserDTO";
import { fromUserCreateDTOtoEntity } from "../../Mappers/UserMapper";
import { injectable, inject, LazyServiceIdentifer } from "inversify";
import { TYPES } from "../../../ioc/container";
import { CreateUserValidator } from "../../Validators/UserServiceValidator";
import UserServiceException from "../../Exceptions/UserServiceException";
import { UserService } from "../UserService";

@injectable()
export default class UserServiceImpl implements UserService {
    private readonly userRepository: UserRepository;

    constructor(@inject(new LazyServiceIdentifer(() => TYPES.UserRepository)) userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async create(user: UserCreateDTO) {
        const validator = new CreateUserValidator(this.userRepository, user);
        await validator.validate()
        if (validator.isValid()) {
            const entity = await fromUserCreateDTOtoEntity(user);
            await this.userRepository.save(entity)
        }
        else{
            throw new UserServiceException(validator.errors)
        }

    }
}
import UserRepository from "../../Data/Repository/UserRepository";
import UserValidator, { UserCreateValidator } from "../Validators/UserValidator";
import UserDTO, { UserCreateDTO } from "../DTO/UserDTO";
import { fromUserCreateDTOtoEntity } from "../Mappers/UserMapper";

export default class UserService {
    private readonly userRepository:UserRepository; 

    constructor(userRepository:UserRepository){
        this.userRepository = userRepository;
    }

    async create(user:UserCreateDTO) {
        const usersDB = await this.userRepository.findAll();
        const blacklist = usersDB.map((user)=>user.username)
        const validator:UserValidator = new UserCreateValidator(user,blacklist);
        validator.validate()
        if(validator.hasErrors())
            throw new Error(validator.getErrors().join(","));
        const entity = await fromUserCreateDTOtoEntity(user)
        await this.userRepository.save(entity);
    }
    
}
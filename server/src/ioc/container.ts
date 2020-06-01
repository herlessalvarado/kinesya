import { Container } from "inversify"
import UserRepository from "../Data/Repository/UserRepository"
import MongooseUserRepository from "../Data/Repository/implementations/MongooseUserRepository"
import {UserService} from "../Application/Services/UserService";
import UserServiceImpl from "../Application/Services/impl/UserServiceImpl";

export const TYPES = {
    UserRepository: Symbol.for("PublisherRepository"),
    UserService: Symbol.for("PublisherService"),
}

const container = new Container()
container.bind<UserRepository>(TYPES.UserRepository).to(MongooseUserRepository);
container.bind<UserService>(TYPES.UserService).to(UserServiceImpl)
export default container
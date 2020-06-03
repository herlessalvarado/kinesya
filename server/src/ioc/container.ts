import { Container } from "inversify"
import UserRepository from "../Data/Repository/UserRepository"
import MongooseUserRepository from "../Data/Repository/implementations/MongooseUserRepository"
import { UserService } from "../Application/Services/UserService"
import UserServiceImpl from "../Application/Services/impl/UserServiceImpl"
import { PersistanceManager } from "../Data/Database/PersistanceManager"
import { MongoosePersistanceManager } from "../Data/Database/MongoosePersistanceManager"
import { UserController } from "../Presentation/Controllers/UserController"
import "reflect-metadata"
export const TYPES = {
    UserRepository: Symbol.for("UserRepository"),
    UserService: Symbol.for("UserService"),
    PersistanceManager: Symbol.for("PersistanceManager"),
}

const container = new Container()
container.bind<PersistanceManager>(TYPES.PersistanceManager).to(MongoosePersistanceManager)
container.bind<UserRepository>(TYPES.UserRepository).to(MongooseUserRepository)
container.bind<UserService>(TYPES.UserService).to(UserServiceImpl)
export default container
export const userService = container.get<UserService>(TYPES.UserService)
export const UserRepository = container.get<UserRepository>(TYPES.UserRepository)
export const DBManager = container.get<PersistanceManager>(TYPES.PersistanceManager)
export const userController = new UserController(userService)

import UserRepository from "../../src/Data/Repository/UserRepository"
import UserService from "../../src/Application/Services/impl/UserServiceImpl";
import User from "../../src/Data/Entities/User";
import { usersDB, BadUserCreateDTO, GoodUserCreateDTO } from "./Mocks/User";
import "reflect-metadata"
import container,{TYPES} from "../../src/ioc/container"
import UserServiceException from "../../src/Application/Exceptions/UserServiceException";
import "ts-jest"
import { injectable } from "inversify";

@injectable()
class FakeUserRepository implements UserRepository {
    save(user: User): Promise<void> {
        return new Promise((resolve,reject)=>{
            resolve()
            reject(new Error("DB Error"))
        })
    }
    findAll(): Promise<User[]> {
        return new Promise((resolve,reject)=>{
            resolve(usersDB)
            reject(new Error("No users"))
        })
    }
    update(user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getByName(name: string): Promise<User> {
        throw new Error("Method not implemented.");
    }

} 



describe('UserService tests', () => {
    let userService: UserService;
    beforeAll(()=>{
        container.unbind(TYPES.UserRepository);
        container.bind<UserRepository>(TYPES.UserRepository).to(FakeUserRepository);
        userService = container.get<UserService>(TYPES.UserService);
    })
   

    describe("create service", () => {
        test("user with duplicate email and username", async () => {
            expect.assertions(1)
            try {
                await userService.create(BadUserCreateDTO);
            } catch (error) {
                expect(error).toEqual(new UserServiceException(["This email already exists","this username already exists"]))
            }

        })
        test("user with unique email and username", async () => {
            await expect(userService.create(GoodUserCreateDTO)).resolves.toBe(undefined)
        })
    })
})

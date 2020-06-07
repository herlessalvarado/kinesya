import UserRepository from "../../src/Data/Repository/UserRepository"
import UserService from "../../src/Application/Services/impl/UserServiceImpl";
import {User} from "../../src/Data/Entities/User";
import { usersDB, BadUserCreateDTO, GoodUserCreateDTO, GoodUserLoginDTO, BadUserLoginDTO } from "../Mocks/User";
import "reflect-metadata"
import container,{TYPES} from "../../src/ioc/container"
import UserServiceException from "../../src/Application/Exceptions/UserServiceException";
import "ts-jest"
import { injectable } from "inversify";
import UserDTO from "../../src/Application/DTO/UserDTO";
import token from "jsonwebtoken"
import { AuthDTO } from "../../src/Application/DTO/AuthDTO";
import dotenv from "dotenv"
import bcrypt from "bcryptjs"
dotenv.config()

@injectable()
class FakeUserRepository implements UserRepository {
    findByEmailOrNull(email: string): Promise<User|null> {
        return new Promise((resolve,reject)=>{
            resolve((email !== BadUserCreateDTO.email )? new User(): null )
        })
    }
    findByUsernameOrNull(username: string): Promise<User|null> {
        return new Promise((resolve,reject)=>{
            resolve((username !== BadUserCreateDTO.username )? new User(): null )
        })
    }
    findOnlyPublic(): Promise<User[]> {
        return new Promise((resolve,reject)=>{
            resolve(usersDB.filter(v => v.isPublic===true))
            reject(new Error("No users"))
        })
    }
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
        return new Promise((resolve,reject)=>{
            resolve()
            reject(new Error("DB Error"))
        })
    }
    getByName(name: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    isUserEmail(email: string): Promise<User> {
        return new Promise((resolve,reject)=>{
            resolve(usersDB.find(v => v.email===email))
            reject(new Error("No users"))
        })
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
        afterEach(()=>{
            jest.restoreAllMocks()
          })
        test("user with duplicate email and username", async () => {
            expect.assertions(1)
            try {
                await userService.create(BadUserCreateDTO);
            } catch (error) {
                expect(error).toEqual(new UserServiceException(["This email already exists","this username already exists"]))
            }

        })
        test("user with unique email and username", async () => {
            token.sign = jest.fn().mockImplementation((claims,key,options)=>(key === process.env.JWT_KEY!) ? "token" : "refresh_token");
            const expectedAuthDTO:AuthDTO = {refreshToken :"refresh_token",token:"token"}

            
            await expect(userService.create(GoodUserCreateDTO)).resolves.toEqual(expectedAuthDTO)
        })
    })
    describe("get all user service", () => {
        test("get all public users", async () => {
            const expectedUsers = <Array<UserDTO>>[{
                username: "Pamela",
                email: "Pamela@gmail.com"
            },
            {
                username: "Alejandra",
                email: "Alejandra@gmail.com"
            },
            {
                username: "Elizabeth",
                email: "Elizabeth@gmail.com"
            }
        ]

        const users = await userService.getAll();

        expect(users).toEqual(expectedUsers)

        })

    })
    
    describe("login user service", () => {
        test("login valid user", async () => {
            token.sign = jest.fn().mockImplementation((claims,key,options)=>(key === process.env.JWT_KEY!) ? "token" : "refresh_token");
            const expectedAuthDTO:AuthDTO = {refreshToken :"refresh_token",token:"token"}

            const login = await userService.login(GoodUserLoginDTO)
            expect(login).toEqual(expectedAuthDTO)
        })
        test("login invalid password", async () => {
            jest.mock("bcryptjs",()=>({
                __esModule:true,
            }))
            bcrypt.compare = jest.fn().mockResolvedValueOnce(false);
            expect.assertions(1)
            try {
                await userService.login(BadUserLoginDTO);
            } catch (error) {
                expect(1).toEqual(1)
            }
        })
    })

})

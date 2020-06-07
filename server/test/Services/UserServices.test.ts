
import UserService from "../../src/Application/Services/impl/UserServiceImpl";
import { BadUserCreateDTO, GoodUserCreateDTO, GoodUserLoginDTO, BadUserLoginDTO, MockUserEntity, usersDB } from "../Mocks/User";
import UserServiceException, { PasswordException } from "../../src/Application/Exceptions/UserServiceException";
import "ts-jest"

import token from "jsonwebtoken"
import { AuthDTO } from "../../src/Application/DTO/AuthDTO";
import dotenv from "dotenv"
import bcrypt from "bcryptjs"

import { Query, equals } from "../../src/Data/Helper/query";
import "reflect-metadata"
import container, { TYPES } from "../../src/ioc/container";
import MongooseUserRepository from "../../src/Data/Repository/implementations/MongooseUserRepository"
import UserDTO from "../../src/Application/DTO/UserDTO";
dotenv.config()

describe('UserService tests', () => {

    let _userService: UserService;

    describe("create user service", () => {
        beforeEach(() => {
            jest.restoreAllMocks()

        })
        test("user with duplicate email and username", async () => {
            expect.assertions(1)
            MongooseUserRepository.prototype.save = jest.fn().mockResolvedValue(undefined)
            MongooseUserRepository.prototype.findOneOrNull = jest.fn().mockResolvedValue(MockUserEntity)
            _userService = container.get<UserService>(TYPES.UserService);

            try {
                await _userService.create(BadUserCreateDTO);
            } catch (error) {
                expect(error).toEqual(new UserServiceException(["This email already exists", "this username already exists"]))
            }

        })
        test("user with unique email and username", async () => {
            token.sign = jest.fn().mockImplementation((claims, key, options) => (key === process.env.JWT_KEY!) ? "token" : "refresh_token");
            MongooseUserRepository.prototype.save = jest.fn().mockResolvedValue(undefined)
            MongooseUserRepository.prototype.findOneOrNull = jest.fn().mockResolvedValue(null)
            _userService = container.get<UserService>(TYPES.UserService);
            const expectedAuthDTO: AuthDTO = { refreshToken: "refresh_token", token: "token" }


            await expect(_userService.create(GoodUserCreateDTO)).resolves.toEqual(expectedAuthDTO)
        })
    })
    describe("get all user service", () => {
        test("get all users", async () => {
            const expectedUsers = <Array<UserDTO>>[{
                username: "Pamela",
                email: "Pamela@gmail.com",
                location: "Chorrillos"
            },
            {
                username: "Alejandra",
                email: "Alejandra@gmail.com",
                location: "Chorrillos"
            },
            {
                username: "Elizabeth",
                email: "Elizabeth@gmail.com",
                location: "Chorrillos"
            }
            ]
            MongooseUserRepository.prototype.findAll = jest.fn().mockResolvedValue(usersDB.filter((v) => v.isPublic === true))

            const users = await _userService.getAll(1, 5, "Chorrillos");

            expect(users).toEqual(expectedUsers)

        })

        test("valid query builder", async () => {
            MongooseUserRepository.prototype.findAll = jest.fn().mockResolvedValue(usersDB)
            const expectedQuery: Query = {
                where: [equals("location", "Chorrillos")],
                paginator: {
                    page: 0,
                    limit: 5
                }
            }

            await _userService.getAll(1, 5, "Chorrillos");

            expect(MongooseUserRepository.prototype.findAll).toHaveBeenCalledWith(expectedQuery)

        })



    })

    describe("login user service", () => {
        beforeAll(() => {
            jest.restoreAllMocks()
            jest.mock("bcryptjs", () => ({
                __esModule: true,
            }))
        })
        afterEach(() => {
            jest.resetAllMocks()
        })
        test("login valid user", async () => {
            token.sign = jest.fn().mockImplementation((claims, key, options) => (key === process.env.JWT_KEY!) ? "token" : "refresh_token");
            const expectedAuthDTO: AuthDTO = { refreshToken: "refresh_token", token: "token" }
            bcrypt.compare = jest.fn().mockResolvedValueOnce(true);
            MongooseUserRepository.prototype.findOne = jest.fn().mockResolvedValue(MockUserEntity)
            MongooseUserRepository.prototype.update = jest.fn().mockResolvedValue(undefined)
            _userService = container.get<UserService>(TYPES.UserService);

            const login = await _userService.login(GoodUserLoginDTO)
            expect(login).toEqual(expectedAuthDTO)
        })
        test("login invalid password", async () => {
            bcrypt.compare = jest.fn().mockResolvedValueOnce(false);
            MongooseUserRepository.prototype.findOne = jest.fn().mockResolvedValue(MockUserEntity)
            MongooseUserRepository.prototype.update = jest.fn().mockResolvedValue(undefined)
            _userService = container.get<UserService>(TYPES.UserService);
            expect.assertions(1)
            try {
                await _userService.login(BadUserLoginDTO);
            } catch (error) {
                expect(error).toBeInstanceOf(PasswordException)
            }
        })
    })

})

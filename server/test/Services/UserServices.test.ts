import UserRepository from "../../src/Data/Repository/UserRepository"
import { mock } from 'jest-mock-extended';
import UserService from "../../src/Application/Services/UserService";
import User from "../../src/Data/Entities/User";
import { usersDB, BadUserCreateDTO, GoodUserCreateDTO } from "./Mocks/User";



describe('UserService tests', () => {

    let mockRepository = mock<UserRepository>();
    const userService = new UserService(mockRepository);

    describe("create service", () => {
        const mockFindAllPromise: Promise<User[]> = new Promise((resolve, reject) => {
            resolve(usersDB)
            reject({ error: "No Users" })
        })
        mockRepository.findAll.calledWith().mockReturnValue(mockFindAllPromise);
        test("user with bad credentials", async () => {
            expect.assertions(1)

            try {
                await userService.create(BadUserCreateDTO);
            } catch (error) {
                expect(error).toEqual(new Error("Invalid Email,Invalid Username"))
            }

        })
        test(" user with good credentials", async () => {
            await expect(userService.create(GoodUserCreateDTO)).resolves.toBe(undefined)
        })
    })
})

import "ts-jest"
import { UserService } from "../../src/Application/Services/UserService"
import { mock } from 'jest-mock-extended';
import {UserController, HttpResponse} from "../../src/Presentation/Controllers/UserController"
import {BAD_REQUEST,INTERNAL_SERVER_ERROR,getStatusText,OK,CREATED} from 'http-status-codes'
import UserServiceException from "../../src/Application/Exceptions/UserServiceException";
import {  usersDTO } from "../Mocks/User";


describe("User Presentation Test",()=>{
    let userService = mock<UserService>();
    const userController = new UserController(userService);
    describe("create user",()=>{
        test("user create DTO with invalid inputs",async ()=>{
            
            const expected:HttpResponse = {body:["Invalid Email","Invalid Password"],status:BAD_REQUEST}
            const result = await userController.create({body:{email:"hello",username:"pepe"}})

            expect(result.body).toStrictEqual(expected.body)
            expect(result.status).toStrictEqual(expected.status)
        })
        test(" user created successfully",async ()=>{
            userService.create.mockResolvedValueOnce({refreshToken:"refresh_token",token:"token"});
            const expected:HttpResponse = {body:{refreshToken:"refresh_token",token:"token"},status:CREATED}
            const result = await userController.create({body:{email:"jose45321@gmail.com",username:"pepe",password:"123qwe4r"}})

            expect(result).toEqual(expected)
        })
        test("user create DTO with duplicate username and email",async ()=>{
            userService.create.mockRejectedValueOnce(
                new UserServiceException(["Duplicate email","Duplicate username"])
            )
            const expected:HttpResponse = {body:"Duplicate email,Duplicate username",status:BAD_REQUEST}
            const result = await userController.create({body:{email:"jose45321@gmail.com",username:"pepe",password:"123qwe4r"}})

            expect(result.body).toStrictEqual(expected.body)
            expect(result.status).toStrictEqual(expected.status)
        })

        test("Internal Error raised",async ()=>{
            userService.create.mockRejectedValueOnce(
                new Error("Internal Error raised in Repository")
            )
            const expected:HttpResponse = {body:getStatusText(INTERNAL_SERVER_ERROR),status:INTERNAL_SERVER_ERROR}

            const result = await userController.create({body:{email:"jose45321@gmail.com",username:"pepe",password:"123qwe4r"}})
            
            expect(result.body).toStrictEqual(expected.body)
            expect(result.status).toStrictEqual(expected.status)
        })
    })
    describe("find all user services",()=>{
        test("get all public users",async ()=>{
            userService.getAll.mockResolvedValueOnce(usersDTO)
            const expectedResponse = <HttpResponse>{body:JSON.stringify(usersDTO),status:OK}

            const response = await userController.getAllUsers();
            
            expect(response).toEqual(expectedResponse)
        })
    })
})
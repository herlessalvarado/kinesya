import { Request, Response, NextFunction } from "express"
import {auth} from "../../src/Presentation/Middleware/auth"
import "ts-jest"
import { mock } from 'jest-mock-extended';
import dotenv from "dotenv"
import token from "jsonwebtoken"

dotenv.config()

const fakeToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJqdGkiOiI2NTBhNTY1ZS04MDE0LTQ5NWMtYmZlZi0yOGRjNjE2YzkyOGYiLCJleHAiOjE1OTEwNjQ3Nzh9.-OqDGdANEdnl1ZlOvKwxKLKmfPbbqpjiyr5uWyXb9j0"

describe("Auth middleware",()=>{
    afterEach(()=>{
      jest.restoreAllMocks()
    })
    test("Invalid Token",async ()=>{
        const req = mock<Request>();
        const resp = mock<Response>();
        resp.status.mockReturnValueOnce(resp);
        const next:NextFunction = jest.fn().mockImplementation(()=>{console.log('pass to other middleware')})

        await auth(req,resp,next)

        expect(resp.status).toHaveBeenCalledWith(401) 
        expect(resp.send).toHaveBeenCalledWith({message:"Invalid Token"})
    })
    test("Valid Token",async()=>{
        jest.mock("jsonwebtoken",()=>({
            __esModule:true,
        }))
        token.verify = jest.fn()
        
        const req = mock<Request>();
        const resp = mock<Response>();
        req.header.calledWith("Authorization").mockReturnValueOnce(`Bearer ${fakeToken}`)
        const next:NextFunction = jest.fn()
        
        await auth(req,resp,next)

        expect(req.body.token).toStrictEqual( `${fakeToken}`)
        expect(next).toHaveBeenCalled();
        
    })
    
   
})
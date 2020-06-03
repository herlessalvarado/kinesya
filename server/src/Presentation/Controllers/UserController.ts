import { UserCreateValidator } from "../Validators/UserValidator"
import { OK, CREATED, BAD_REQUEST, INTERNAL_SERVER_ERROR, getStatusText } from "http-status-codes"
import UserServiceException from "../../Application/Exceptions/UserServiceException"
import { UserCreateDTO } from "../../Application/DTO/UserDTO"
import { Router, Request, Response } from "express"
import { UserService } from "../../Application/Services/UserService"

export interface HttpRequest {
    body: any
}
export interface HttpResponse {
    body: any
    status: number
}

export function userRouter(userController: UserController) {
    const router = Router()
    router.post("/users", async (req: Request, res: Response) => {
        const response = await userController.create(req as HttpRequest)
        res.status(response.status).send(response.body)
    })

    router.get("/users", async (req: Request, res: Response) => {
        const response = await userController.getAllUsers()
        res.status(response.status).send(response.body)
    })
    return router
}
export class UserController {
    private readonly service: UserService

    constructor(service: UserService) {
        this.service = service
    }

    async create(req: HttpRequest): Promise<HttpResponse> {
        const resp: HttpResponse = { body: "", status: OK }

        try {
            const _user = req.body as UserCreateDTO
            const validator = new UserCreateValidator(_user)
            validator.validate()
            if (!validator.hasErrors()) {
                const auth = await this.service.create(_user)
                resp.status = CREATED
                resp.body = auth
            } else {
                resp.status = BAD_REQUEST
                resp.body = validator.getErrors()
            }
        } catch (error) {
            console.log(error)
            if (error instanceof UserServiceException) {
                resp.status = BAD_REQUEST
                resp.body = error.message
            } else {
                resp.status = INTERNAL_SERVER_ERROR
                resp.body = getStatusText(INTERNAL_SERVER_ERROR)
            }
        }
        return resp
    }

    async getAllUsers(): Promise<HttpResponse> {
        const resp: HttpResponse = { body: "", status: OK }
        try {
            const users = await this.service.getAll()
            resp.status = OK
            resp.body = JSON.stringify(users)
        } catch (error) {
            resp.status = INTERNAL_SERVER_ERROR
            resp.body = getStatusText(INTERNAL_SERVER_ERROR)
        }
        return resp
    }
}

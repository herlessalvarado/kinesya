import { UserCreateValidator } from "../Validators/UserValidator"
import { OK, CREATED } from "http-status-codes"
import UserDTO, { UserCreateDTO, UserLoginDTO } from "../../Application/DTO/UserDTO"
import { Router, Request, Response } from "express"
import { UserService } from "../../Application/Services/UserService"
import { handlerExceptions } from "../Handlers/HandlerExceptions"
import { Paginator } from "../../Data/Helper/query"
import { trackPhotos } from "../../utils/fileManager"
import { auth } from "../../middleware/user.auth"
import { upload } from "../../middleware/user.upload"

export interface HttpRequest {
    body: any
    query?: { location: string } & Paginator
    files?: any
}
export interface HttpResponse {
    body: any
    status: number
}

export interface HttpAuthRequest {
    body: { refreshToken: string }
}

export function userRouter(userController: UserController) {
    const router = Router()
    router.post("/users", async (req: Request, res: Response) => {
        const response = await userController.create(req as HttpRequest)
        res.status(response.status).send(response.body)
    })

    router.post("/users/login", async (req: Request, res: Response) => {
        const response = await userController.login(req as HttpAuthRequest)
        res.status(response.status).send(response.body)
    })

    router.get("/users", async (req: Request, res: Response) => {
        const response = await userController.getAllUsers(req as HttpRequest)
        res.status(response.status).send(response.body)
    })

    router.put("/users", [upload, auth], async (req: Request, res: Response) => {
        const response = await userController.updateUser(req as HttpRequest)
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
            const auth = await this.service.create(_user)
            resp.status = CREATED
            resp.body = auth
        } catch (err) {
            handlerExceptions(err, resp)
        }
        return resp
    }

    async login(req: HttpRequest): Promise<HttpResponse> {
        const resp: HttpResponse = { body: "", status: OK }
        try {
            const _user = req.body as UserLoginDTO
            const auth = await this.service.login(_user)
            resp.status = CREATED
            resp.body = auth
        } catch (err) {
            handlerExceptions(err, resp)
        }
        return resp
    }

    async getAllUsers(req: HttpRequest): Promise<HttpResponse> {
        const resp: HttpResponse = { body: "", status: OK }
        try {
            const users = await this.service.getAll(
                req.query?.page,
                req.query?.limit,
                req.query?.location
            )
            resp.status = OK
            resp.body = JSON.stringify(users)
        } catch (err) {
            handlerExceptions(err, resp)
        }
        return resp
    }

    async generateRefreshToken(req: HttpAuthRequest): Promise<HttpResponse> {
        const resp: HttpResponse = { body: "", status: OK }
        try {
            const auth = await this.service.generateToken(req.body?.refreshToken)
            resp.status = OK
            resp.body = auth
        } catch (err) {
            handlerExceptions(err, resp)
        }
        return resp
    }

    async updateUser(req: HttpRequest): Promise<HttpResponse> {
        const resp: HttpResponse = { body: "", status: OK }
        const user = req.body as UserDTO
        if (!!req.files) trackPhotos(user, req.files)
        try {
            await this.service.updateUserByToken(req.body.token, user)
            resp.status = OK
            resp.body = "User details updated successfully"
        } catch (err) {
            handlerExceptions(err, resp)
        }
        return resp
    }
}

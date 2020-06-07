import { UserCreateValidator } from "../Validators/UserValidator"
<<<<<<< HEAD
import { OK, CREATED } from "http-status-codes"
import { UserCreateDTO } from "../../Application/DTO/UserDTO"
=======
import { OK, CREATED} from "http-status-codes"
import { UserCreateDTO, UserLoginDTO } from "../../Application/DTO/UserDTO"
>>>>>>> feature/backend-refactor
import { Router, Request, Response } from "express"
import { UserService } from "../../Application/Services/UserService"
import { handlerExceptions } from "../Handlers/HandlerExceptions"

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

    router.post("/users/login", async (req: Request, res: Response) => {
        const response = await userController.login(req as HttpRequest);
        res.status(response.status).send(response.body);
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
            const auth = await this.service.create(_user)
            resp.status = CREATED
            resp.body = auth
        } catch (err) {
            handlerExceptions(err, resp)
        }
        return resp
    }

    async login(req: HttpRequest): Promise<HttpResponse> {
        const resp: HttpResponse = { body: "", status: OK };
        try {
            const _user = req.body as UserLoginDTO;
            const auth = await this.service.login(_user);
            resp.status = CREATED;
            resp.body = auth;
        } catch (err) {
            handlerExceptions(err, resp);
        }
        return resp;
    }

    async getAllUsers(): Promise<HttpResponse> {
        const resp: HttpResponse = { body: "", status: OK }
        try {
            const users = await this.service.getAll()
            resp.status = OK
            resp.body = JSON.stringify(users)
        } catch (err) {
            handlerExceptions(err, resp)
        }
        return resp
    }
}

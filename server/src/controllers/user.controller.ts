import express, { Request, Response, NextFunction } from "express"
import { auth } from "../middleware/user.auth"
import { UserService } from "../services/user.service"
import { upload } from "../middleware/user.upload"

const userService = new UserService()
export const UserRouter = express.Router()

/*
    CREATE USER
                */

UserRouter.post("/users", async (req: Request, res: Response) => {
    const result = await userService.create(req.body)
    if (result.success) {
        res.status(201).send(result.data)
    } else {
        res.status(400).send(result.getErrorMessages())
    }
})

/*
    LOGIN USER
                */

UserRouter.post("/users/login", async (req: Request, res: Response) => {
    const result = await userService.logIn(req.body)
    if (result.success) {
        res.status(201).send(result.data)
    } else {
        res.status(400).send(result.getErrorMessages())
    }
})

/*
    GET USER
                */

UserRouter.get("/users/me", auth, async (req: Request, res: Response) => {
    const result = await userService.getUser(req.body.token)
    if (result.success) {
        res.status(200).send(result.data)
    } else {
        res.status(400).send(result.getErrorMessages())
    }
})

UserRouter.get("/users", async (req: Request, res: Response) => {
    const result = await userService.getAll()
    if (result.success) {
        res.status(200).send(result.data)
    } else {
        res.status(400).send(result.getErrorMessages())
    }
})

/*
    UPDATE USER
                */

UserRouter.put("/users", [upload, auth], async (req: Request, res: Response) => {
    if (!!req.body.characteristics) req.body.characteristics = JSON.parse(req.body.characteristics)
    const result = await userService.updateUser(req.body.token, req.body, req.files)
    if (result.success) {
        res.status(200).send(result.data)
    } else {
        res.status(400).send(result.getErrorMessages())
    }
})

/*
    LOG OUT USER
                */

UserRouter.post("/users/me/logout", async (req: Request, res: Response) => {
    let result = await userService.logOut(req.body.refresh_token)
    if (result.success) {
        res.status(200).send(result.data)
    } else {
        res.status(500).send(result.getErrorMessages())
    }
})

UserRouter.post("/users/token", async (req: Request, res: Response) => {
    const refresh_token = req.body.refresh_token
    const result = await userService.generateToken(refresh_token)
    if (result.success) res.status(201).send(result.data)
    else res.status(401).send(result.getErrorMessages())
})

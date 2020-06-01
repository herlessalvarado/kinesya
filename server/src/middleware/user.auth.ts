import {verify} from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.replace("Bearer ", "")
    try {
        if (!!token) {
            verify(token, process.env.JWT_KEY!)
            req.body.token = token
            next()
        } else throw new Error("Invalid Token")
    } catch (error) {
        res.status(401).send({
            message: (error as Error).message,
        })
        
    }
}

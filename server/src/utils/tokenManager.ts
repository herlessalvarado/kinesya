import jwt from "jsonwebtoken"
import { IUser } from "../user/user.interface"
import { Claims } from "./constants_variables"

export function getClaimsFromToken(token: string): Claims {
    return jwt.decode(token!) as Claims
}

export function createRefreshToken(user: IUser) {
    const claims: Claims = { id: user._id }
    return jwt.sign(claims, process.env.JWT_KEY!, {
        expiresIn: process.env.REFRESH_JWT_EXPIRES!,
    })
}
export function createStandardToken(user: IUser): string {
    const claims: Claims = { id: user._id, username: user.username }
    return jwt.sign(claims, process.env.JWT_KEY!, {
        expiresIn: process.env.JWT_EXPIRES!,
    })
}

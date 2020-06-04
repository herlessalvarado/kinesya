import jwt from "jsonwebtoken"
import { IUser } from "../user/user.interface"
import { Claims } from "./constants_variables"
import { User } from "../Data/Entities/User"

export function getClaimsFromToken(token: string): Claims {
    return jwt.decode(token!) as Claims
}

export function createRefreshToken(user: IUser) {
    const claims: Claims = { id: user._id }
    return jwt.sign(claims, process.env.JWT_KEY!, {
        expiresIn: process.env.REFRESH_JWT_EXPIRES!,
    })
}

export const generateRefreshToken = function (user: User) {
    const claims: Claims = { id: user.Id }
    return jwt.sign(claims, process.env.R_JWT_KEY!, {
        expiresIn: process.env.REFRESH_JWT_EXPIRES!,
    })
}

export function createStandardToken(user: IUser): string {
    const claims: Claims = { id: user._id, username: user.username }
    return jwt.sign(claims, process.env.JWT_KEY!, {
        expiresIn: process.env.JWT_EXPIRES!,
    })
}

export const generateStandardToken = function (user: User): string {
    const claims: Claims = { id: user.Id, username: user.username }
    return jwt.sign(claims, process.env.JWT_KEY!, {
        expiresIn: process.env.JWT_EXPIRES!,
    })
}

import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { getClaimsFromToken } from "../utils/tokenManager"
import { userSchema } from "../user/user.schema"
import { IUser, IUserModel } from "../user/user.interface"
import { Claims } from "../utils/constants_variables"

userSchema.pre<IUser>("save", async function (next) {
    const user = this
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password!, 8)
    }
    next()
})

userSchema.methods.removeRefreshToken = function (): void {
    const user = this as IUser
    user.refresh_token = undefined
    user.save()
}

userSchema.methods.verifyRefreshToken = function (): boolean {
    let result = true
    const user = this as IUser
    jwt.verify(user.refresh_token!, process.env.JWT_KEY!, function (err) {
        if (!!err) {
            user.removeRefreshToken()
            result = false
        }
    })
    return result
}

userSchema.statics.findByCredentials = async ({ email, password }: IUser): Promise<IUser> => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error("Invalid login credentials")
    }
    const isPasswordMatch = await bcrypt.compare(password!, user.password!)
    if (!isPasswordMatch) {
        throw new Error("Invalid login credentials")
    }
    return user
}
userSchema.statics.findByRefreshToken = async (
    refresh_token: string | undefined,
    projection?: string
): Promise<IUser | null> => {
    let user: IUser | null = null
    if (!!refresh_token) {
        const payload = getClaimsFromToken(refresh_token)
        user = await User.findById(payload.id, projection)
    }
    return user
}

export const User = mongoose.model<IUser, IUserModel>("User", userSchema)

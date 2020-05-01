import { PROTECTED_FIELDS } from "../utils/constants_variables"
import { User } from "../repository/user.repository"
import { IUser } from "../user/user.interface"
import { ServiceResult } from "../results/service.result"
import { createStandardToken, createRefreshToken, getClaimsFromToken } from "../utils/tokenManager"

export class UserService {
    private async uploadUserPhotos(user: IUser, photos: any) {
        const files = photos as {
            [fieldname: string]: Express.Multer.File[]
        }
        if (!!files.references) {
            user.referencePhotos = files.references.map(
                (photo: Express.Multer.File): string => photo.filename
            )
        }
        if (!!files.profile) {
            user.profilePhoto = files.profile[0].filename
        }
        await user.save()
    }

    async getUserByToken(token: string | undefined): Promise<IUser | null> {
        return await User.findByRefreshToken(token)
    }
    async getUserByTokenForResponse(token: string | undefined): Promise<IUser | null> {
        return await User.findByRefreshToken(token, PROTECTED_FIELDS)
    }

    async create(requestUser: IUser): Promise<ServiceResult> {
        const serviceResult = new ServiceResult()
        try {
            const user: IUser = await User.create(requestUser)
            const refresh_token = createRefreshToken(user)
            const token = createStandardToken(user)
            user.refresh_token = refresh_token
            await user.save()
            serviceResult.addData({
                token,
                refresh_token,
            })
        } catch (error) {
            serviceResult.addError(error as Error)
        } finally {
            return serviceResult
        }
    }
    async logIn(requestUser: IUser): Promise<ServiceResult> {
        const serviceResult = new ServiceResult()
        try {
            const user: IUser = await User.findByCredentials(requestUser)
            const refresh_token = createRefreshToken(user)
            const token = createStandardToken(user)
            user.refresh_token = refresh_token
            await user.save()
            serviceResult.addData({
                token,
                refresh_token,
            })
        } catch (error) {
            serviceResult.addError(error as Error)
        } finally {
            return serviceResult
        }
    }
    async getUser(token: string | undefined): Promise<ServiceResult> {
        const serviceResult = new ServiceResult()
        try {
            const user = await this.getUserByTokenForResponse(token)
            serviceResult.addData(user)
        } catch (error) {
            serviceResult.addError(error as Error)
        } finally {
            return serviceResult
        }
    }
    async getAll(): Promise<ServiceResult> {
        const serviceResult = new ServiceResult()
        try {
            const users = await User.find({ isPublic: true }, PROTECTED_FIELDS)
            serviceResult.addData(users)
        } catch (error) {
            serviceResult.addError(error as Error)
        } finally {
            return serviceResult
        }
    }
    async getByUsername(username: string): Promise<ServiceResult> {
        const serviceResult = new ServiceResult()
        try {
            const user = await User.findOne({ username: username }, PROTECTED_FIELDS)
            serviceResult.addData(user)
        } catch (error) {
            serviceResult.addError(error as Error)
        } finally {
            return serviceResult
        }
    }
    async updateUser(token: string, newUser: IUser, photos: any): Promise<ServiceResult> {
        let serviceResult = new ServiceResult()
        let userID = getClaimsFromToken(token).id
        const user = await User.findOneAndUpdate({ _id: userID }, newUser)
        try {
            if (user === null) throw new Error("This User doesnt exists")
            if (!!photos) this.uploadUserPhotos(user, photos)
            serviceResult.addData({
                message: "User updated",
            })
        } catch (error) {
            serviceResult.addError(error as Error)
        } finally {
            return serviceResult
        }
    }

    async logOut(token: string | undefined): Promise<ServiceResult> {
        let serviceResult = new ServiceResult()
        const user = await this.getUserByToken(token)
        try {
            if (user === null) throw new Error("This user doesnt exists")
            else user.removeRefreshToken()
            serviceResult.addData({
                message: "The refresh token has been removed!",
            })
        } catch (error) {
            serviceResult.addError(error as Error)
        } finally {
            return serviceResult
        }
    }

    async generateToken(refresh_token: string | undefined) {
        let serviceResult = new ServiceResult()
        const user = await this.getUserByToken(refresh_token)
        try {
            if (
                user === null ||
                refresh_token !== user!.refresh_token ||
                !user!.verifyRefreshToken()
            )
                throw new Error("Invalid Refresh Token")
            serviceResult.addData({
                token: createStandardToken(user),
                refresh_token: user.refresh_token,
            })
        } catch (error) {
            serviceResult.addError(error)
        } finally {
            return serviceResult
        }
    }
}

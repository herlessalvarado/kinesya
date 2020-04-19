import mongoose, { Model } from "mongoose"

export interface IUser extends mongoose.Document {
    email?: string
    password?: string
    name?: string
    age?: number
    description?: string
    price?: number
    phone?: number
    location?: string
    refresh_token?: string
    isPublic?: boolean
    profilePhoto?: string
    referencePhotos?: Array<string>
    verifyRefreshToken(): boolean
    removeRefreshToken(): void
}
export interface IUserModel extends Model<IUser> {
    findByCredentials: ({ email, password }: IUser) => Promise<IUser>
    findByRefreshToken: (
        refresh_token: string | undefined,
        projection?: string
    ) => Promise<IUser | null>
}

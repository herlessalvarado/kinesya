import Tag from "./Tag"
import { generateRefreshToken } from "../../utils/tokenManager"

interface Characteristics {
    height?: number
    weight?: number
    eyes?: string
    hair?: string
    fakeBoobs?: boolean
    birthday?: Date
    birthPlace?: string
    zodiac?: string
    measurements?: string
    orientation?: string
    ethnicity?: string
}

export class User {
    Id: string = ""
    email: string = ""
    password: string = ""
    username: string = ""
    name?: string
    price?: string
    age?: number
    phone?: string
    location?: string
    refreshToken?: string
    isPublic: boolean = false
    profilePhoto?: string
    bannerPhoto?: string
    referencePhotos?: string
    characteristics?: Characteristics
    tags?: Tag[]

    setId(id: string) {
        this.Id = id
        return this
    }

    setEmail(email: string) {
        this.email = email
        return this
    }

    setUsername(username: string) {
        this.username = username
        return this
    }

    setPassword(password: string) {
        this.password = password
        return this
    }

    setPublic(_public: boolean) {
        this.isPublic = _public
        return this
    }

    updateRefreshToken() {
        this.refreshToken = generateRefreshToken(this)
    }
}

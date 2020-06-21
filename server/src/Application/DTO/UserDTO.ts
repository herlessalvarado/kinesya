export interface UserCreateDTO {
    email: string
    password: string
    username: string
}

export interface UserLoginDTO {
    email: string
    password: string
}

export default interface UserDTO {
    username: string
    name?: string
    description?: string
    email: string
    price?: string
    age?: string
    phone?: string
    location?: string
    profilePhoto?: string
    bannerPhoto?: string
    referencePhotos?: string[]
    height?: string
    weight?: string
    eyes?: string
    hair?: string
    fakeBoobs?: boolean
    birthday?: string
    birthPlace?: string
    zodiac?: string
    measurements?: string
    orientation?: string
    ethnicity?: string
    tags?: string[]
}
export interface UserFiltersDTO {
    location?: string
    hair?: string
    eyes?: string
    fakeBoobs?: string
    zodiac?: string
    sexualOrientation?: string
    ethnicity?: string
    services?: string[]
    birthPlace?: string
    lowerPrice?: number
    upperPrice?: number
    page?: number
    limit?: number
}

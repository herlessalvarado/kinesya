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

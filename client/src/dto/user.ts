export interface UserCharacteristicsDTO {
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
}
export interface UserDTO {
    bannerPhoto: string
    characteristics?: UserCharacteristicsDTO
    name?: string
    age?: number
    description?: string
    price?: number
    phone?: number
    location?: string
    profilePhoto?: string
    referencePhotos?: Array<string>
    tags?: Array<string>
}

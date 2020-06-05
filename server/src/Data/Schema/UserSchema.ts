
export interface CharacteristicsSchema {
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

export interface UserSchema { 
    id: string
    email: string
    password: string
    username: string
    name?: string
    price?: string
    age?: number
    phone?: string
    location?: string
    refreshToken?: string
    isPublic: boolean
    profilePhoto?: string
    bannerPhoto?: string
    referencePhotos?: Array<string>
    characteristics?: CharacteristicsSchema
    tags?: Array<string>
}
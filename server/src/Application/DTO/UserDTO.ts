
interface CharacteristicsDTO { 
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

export  interface UserCreateDTO{
    email: string;
    password:string;
    username:string;
}

export default interface UserDTO{
    email: string;
    password:string;
    username:string;
    name: string;
    price:string;
    age: string;
    phone: string;
    location: string;
    refreshToken: string;
    isPublic: boolean;
    profilePhoto: string;
    bannerPhoto: string;
    referencePhotos: string;
    characteristics: CharacteristicsDTO;
    tags:string[];
}
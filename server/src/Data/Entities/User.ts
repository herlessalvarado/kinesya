import Tag from "./Tag";

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


export default interface User {
    id: string;
    email: string;
    password:string;
    username:string;
    name?: string;
    price?:string;
    age?: number;
    phone?: string;
    location?: string;
    refreshToken?: string;
    isPublic: boolean;
    profilePhoto?: string;
    bannerPhoto?: string;
    referencePhotos?: string;
    characteristics?: Characteristics;
    tags?:Array<Tag>;
}
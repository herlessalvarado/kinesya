import { Photo } from "../components/UploadImage"

export const NullUser: UserViewModel = {
    bannerPhoto: Array<Photo>(),
    height: "",
    weight: "",
    eyes: "",
    hair: "",
    fakeBoobs: false,
    birthday: "",
    birthPlace: "",
    zodiac: "",
    measurements: "",
    orientation: "",
    ethnicity: "",
    name: "",
    age: "",
    description: "",
    price: "",
    phone: "",
    location: "",
    profilePhoto: Array<Photo>(),
    referencePhotos: Array<Photo>(),
    tags: Array<string>(),
}

export interface UserStateProps {
    user: UserViewModel
    onClick: (user: UserViewModel, step: number) => void
    stepId: number
}

export interface UserViewModel {
    bannerPhoto: Array<Photo>
    height: string
    weight: string
    eyes: string
    hair: string
    fakeBoobs: boolean
    birthday: string
    birthPlace: string
    zodiac: string
    measurements: string
    orientation: string
    ethnicity: string
    name: string
    age: string
    description: string
    price: string
    phone: string
    location: string
    profilePhoto: Array<Photo>
    referencePhotos: Array<Photo>
    tags: Array<string>
}

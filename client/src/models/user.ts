import { Photo } from "../components/photo/Photo"
import { DEFAULT_PHOTO, DATE_FORMAT } from "../commons/constants"
import { format, subYears } from "date-fns"
import { referencesDefaultPhoto } from "../commons/user_mapper"
export const NullUser: UserViewModel = {
    username:"",
    bannerPhoto: [{file:"NONE",srcUrl:DEFAULT_PHOTO}],
    height: "",
    weight: "",
    eyes: "",
    hair: "",
    fakeBoobs: false,
    birthday: format(subYears(new Date(), 18), DATE_FORMAT),
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
    profilePhoto: Array<Photo>({file:"",srcUrl:DEFAULT_PHOTO}),
    referencePhotos: referencesDefaultPhoto([]),
    tags: Array<string>(),
}

export interface UserStateProps {
    user: UserViewModel
    onClick: (user: UserViewModel, step: number) => void
    stepId: number
}

export interface UserViewModel {
    username:string
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

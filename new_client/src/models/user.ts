import { Photo } from "../components/photo/UploadImage"
import { DEFAULT_PHOTO, DATE_FORMAT } from "../commons/constants"
import { format, subYears } from "date-fns"
export const NullUser: UserViewModel = {
    bannerPhoto: [{file:"NONE",url:DEFAULT_PHOTO}],
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
    profilePhoto: Array<Photo>({file:"",url:DEFAULT_PHOTO}),
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

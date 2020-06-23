import { UserDTO } from "../dto/user"
import { UserViewModel } from "../models/user"
import { format, parse, differenceInCalendarYears, subYears } from "date-fns"
import { Photo } from "../components/photo/UploadImage"
import { DATE_FORMAT, IMAGE_LIMITS, DEFAULT_PHOTO } from "../commons/constants"

export function mapUserDTOToViewModel(user: UserDTO) {
    const result: UserViewModel = {
        username:user.username,
        age: user.age?.toString() || "",
        referencePhotos: referencesDefaultPhoto(user.referencePhotos),
        profilePhoto: !!user.profilePhoto
            ? new  Array<Photo>({
                  file: "",
                  srcUrl: process.env.REACT_APP_PHOTO_URL + user.profilePhoto,
              })
            : new Array<Photo>({file:"",srcUrl:DEFAULT_PHOTO}),
        bannerPhoto: !!user.bannerPhoto
            ? new  Array<Photo>({
                  file: "",
                  srcUrl: process.env.REACT_APP_PHOTO_URL + user.bannerPhoto,
              })
            : new Array<Photo>({file:"",srcUrl:DEFAULT_PHOTO}),
        name: user.name || "",
        description: user.description || "",
        price: user.price?.toString() || "",
        phone: user.phone?.toString() || "",
        location: user.location || "",
        tags: user.tags || [],
        height: user.height || "",
        weight: user.weight || "",
        eyes: user.eyes || "",
        hair: user.hair || "",
        fakeBoobs: user.fakeBoobs || false,
        birthday: !!user.birthday
            ? user.birthday
            : format(subYears(new Date(), 18), DATE_FORMAT),
        birthPlace: user.birthPlace || "",
        zodiac: user.zodiac || "",
        measurements: user.measurements || "",
        orientation: user.orientation || "",
        ethnicity: user.ethnicity || "",
    }
    return result
}

function setFileName(user:string,prefix:string,index:number,file:File){
    return new File([file as Blob],user+prefix+index+"."+file.name.split('.').pop(),{
        type:(file as Blob).type
    })
}


export function mapViewModelToUserRequest(user: UserViewModel) {
    let formData = new FormData()
    user.referencePhotos?.forEach((photo,index:number) => {
        if (!!photo.file) formData.append("references", setFileName(user.username,"references",index,photo.file))
        else
            if (photo.srcUrl?.includes(process.env.REACT_APP_PHOTO_URL!))
                formData.append("references",photo.srcUrl!)
    })
    user.profilePhoto?.forEach((photo,index:number) => {
        if (!!photo.file) formData.append("profile", setFileName(user.username,"profile",index,photo.file) )
    })
    user.bannerPhoto?.forEach((photo,index:number) => {
        if (!!photo.file) formData.append("banner", setFileName(user.username,"banner",index,photo.file))
    })
    formData.append("name", user.name!)
    formData.append(
        "age",
        differenceInCalendarYears(
            new Date(),
            parse(user.birthday, DATE_FORMAT, new Date())
        ).toString()
    )
    formData.append("description", user.description!)
    formData.append("price", user.price!)
    formData.append("phone", user.phone!)
    formData.append("location", user.location!)
    formData.append("isPublic", "true")
    user.tags?.forEach((tag) => {
        formData.append("tags", tag)
    })
    formData.append("height",user.height);
    formData.append("weight",user.weight);
    formData.append("eyes",user.eyes)
    formData.append("hair",user.hair)
    formData.append("fakeBoobs",String(user.fakeBoobs))
    formData.append("zodiac",user.zodiac)
    formData.append("orientation",user.orientation)
    formData.append("birthPlace",user.birthPlace)
    formData.append("measurements",user.measurements)
    formData.append("ethnicity",user.ethnicity)
    formData.append("birthday",user.birthday)
    return formData
}
export function referencesDefaultPhoto(references:Array<string>){
    const photos = new Array<Photo>()
    for (let index = 0; index < IMAGE_LIMITS; index++) {
        photos.push({
            file: "",
            srcUrl: DEFAULT_PHOTO,
        });
    }
    for (let index = 0; index < references.length; index++) {
        photos[index] = {
            file:"",
            srcUrl : (references[index].includes(process.env.REACT_APP_PHOTO_URL!)) ? references[index] : process.env.REACT_APP_PHOTO_URL! + references[index]
            }
    }

return photos
}
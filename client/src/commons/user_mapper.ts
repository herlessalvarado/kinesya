import { UserDTO } from "../dto/user"
import { UserViewModel } from "../models/user"
import { format, parse, differenceInCalendarYears, subYears } from "date-fns"
import { Photo } from "../components/photo/UploadImage"
import { DATE_FORMAT } from "../commons/constants"

export function mapUserDTOToViewModel(user: UserDTO) {
    const result: UserViewModel = {
        age: user.age?.toString() || "",
        referencePhotos: !!user.referencePhotos
            ? user.referencePhotos.map(
                  (url): Photo => ({
                      file: "",
                      url: process.env.REACT_APP_API_URL + url,
                  })
              )
            : Array<Photo>(),
        profilePhoto: !!user.profilePhoto
            ? Array<Photo>({
                  file: "",
                  url: process.env.REACT_APP_API_URL + user.profilePhoto,
              })
            : Array<Photo>(),
        bannerPhoto: !!user.bannerPhoto
            ? Array<Photo>({
                  file: "",
                  url: process.env.REACT_APP_API_URL + user.bannerPhoto,
              })
            : Array<Photo>(),
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

export function mapViewModelToUserRequest(user: UserViewModel) {
    let formData = new FormData()
    user.referencePhotos?.forEach((photo) => {
        if (!!photo.file) formData.append("references", photo.file)
    })
    user.profilePhoto?.forEach((photo) => {
        if (!!photo.file) formData.append("profile", photo.file)
    })
    user.bannerPhoto?.forEach((photo) => {
        if (!!photo.file) formData.append("banner", photo.file)
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

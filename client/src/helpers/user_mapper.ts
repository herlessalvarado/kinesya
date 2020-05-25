import { UserDTO } from "../dto/user"
import { UserViewModel } from "../models/user"
import { format, parse, differenceInCalendarDays } from "date-fns"
import { Photo } from "../components/UploadImage"
import { DATE_FORMAT } from "../utils/constants"

export function mapUserDTOToViewModel(user: UserDTO) {
    const result: UserViewModel = {
        age: user.age?.toString() || "",
        referencePhotos: !!user.referencePhotos
            ? user.referencePhotos.map(
                  (url): Photo => ({
                      file: "",
                      url: process.env.REACT_APP_PHOTO_URL + url,
                  })
              )
            : Array<Photo>(),
        profilePhoto: !!user.profilePhoto
            ? Array<Photo>({
                  file: "",
                  url: process.env.REACT_APP_PHOTO_URL + user.profilePhoto,
              })
            : Array<Photo>(),
        bannerPhoto: !!user.bannerPhoto
            ? Array<Photo>({
                  file: "",
                  url: process.env.REACT_APP_PHOTO_URL + user.bannerPhoto,
              })
            : Array<Photo>(),
        name: user.name || "",
        description: user.description || "",
        price: user.price?.toString() || "",
        phone: user.phone?.toString() || "",
        location: user.location || "",
        tags: user.tags || [],
        height: user.characteristics?.height || "",
        weight: user.characteristics?.weight || "",
        eyes: user.characteristics?.eyes || "",
        hair: user.characteristics?.hair || "",
        fakeBoobs: user.characteristics?.fakeBoobs || false,
        birthday: !!user.characteristics?.birthday
            ? user.characteristics.birthday
            : format(new Date(), DATE_FORMAT),
        birthPlace: user.characteristics?.birthPlace || "",
        zodiac: user.characteristics?.zodiac || "",
        measurements: user.characteristics?.measurements || "",
        orientation: user.characteristics?.orientation || "",
        ethnicity: user.characteristics?.ethnicity || "",
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
        differenceInCalendarDays(
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
    const characteristics = {
        height: user.height,
        weight: user.weight,
        eyes: user.eyes,
        hair: user.hair,
        fakeBoobs: user.fakeBoobs,
        zodiac: user.zodiac,
        orientation: user.orientation,
        birthPlace: user.birthPlace,
        measurements: user.measurements,
        ethnicity: user.ethnicity,
        birthday: parse(user.birthday, DATE_FORMAT, new Date()),
    }
    formData.append("characteristics", JSON.stringify(characteristics))
    return formData
}

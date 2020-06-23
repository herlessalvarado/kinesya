import UserDTO from "../Application/DTO/UserDTO"

export function trackPhotos(user: UserDTO, photos: any) {
    const files = photos as {
        [fieldname: string]: Express.Multer.File[]
    }
    if (!!files.references) {
        user.referencePhotos?.push(...files.references.map(
            (photo: Express.Multer.File): string => photo.filename
        ))
    }
    if (!!files.profile) {
        user.profilePhoto = files.profile[0].filename
    }
    if (!!files.banner) {
        user.bannerPhoto = files.banner[0].filename
    }
}

import { UserSchema } from "../Schema/UserSchema";
import { User } from "../Entities/User";

export function fromSchemaToEntity(user:UserSchema){
    return new User()
            .setId(user.id)
            .setLocation(user.location)
            .setPassword(user.password)
            .setPhone(user.phone)
            .setProfilePhoto(user.profilePhoto)
            .setPublic(user.isPublic)
            .setTags(user.tags)
            .setUsername(user.username)
            .setAge(user.age)
            .setBannerPhoto(user.bannerPhoto)
            .setCharacteristics(user.characteristics)
            .setRefreshToken(user.refreshToken)
            .setReferencePhotos(user.referencePhotos)
            .setName(user.name)
            .setEmail(user.email)
            .setPrice(user.price)
}

export function fromEntityToSchema(user:User){
    return {
        id: user.id,
        email: user.email,
        password: user.password,
        username: user.username,
        name: user.name,
        price: user.price,
        age: user.age,
        phone: user.phone,
        location: user.location,
        refreshToken: user.refreshToken,
        isPublic: user.isPublic,
        profilePhoto: user.profilePhoto,
        bannerPhoto: user.bannerPhoto,
        referencePhotos: user.referencePhotos,
        characteristics: user.characteristics,
        tags:user.tags
    }
}
import UserDTO, { UserCreateDTO } from "../DTO/UserDTO";
import User from "../../Data/Entities/User"
import bcrypt from "bcryptjs"
import {v1 as uuidv1} from "uuid"

export async function fromUserCreateDTOtoEntity(user:UserCreateDTO):Promise<User>{
    return {
        id:uuidv1(),
        email:user.email,
        username:user.username,
        password: await bcrypt.hash(user.password, 8),
        isPublic:false
    }
}

export function fromEntityToUserDTO(user:User):UserDTO{
    return {
        username:user.username,
        email:user.email,
        name:user.name,
        price:user.price,
        age:(user.age)?.toString(),
        phone:user.phone,
        location:user.location,
        referencePhotos:user.referencePhotos,
        height:user.characteristics?.height?.toString(),
        weight:user.characteristics?.weight?.toString(),
        eyes:user.characteristics?.eyes?.toString(),
        fakeBoobs:user.characteristics?.fakeBoobs,
        birthday:user.characteristics?.birthday?.toLocaleDateString("en-US"),
        birthPlace:user.characteristics?.birthPlace,
        zodiac:user.characteristics?.zodiac,
        measurements:user.characteristics?.measurements,
        orientation:user.characteristics?.orientation,
        ethnicity:user.characteristics?.ethnicity,
        tags:user.tags?.map(tag=>tag.nombre),
        bannerPhoto:user.bannerPhoto
    }
}
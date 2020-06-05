import UserDTO, { UserCreateDTO } from "../DTO/UserDTO"
import { User } from "../../Data/Entities/User"
import bcrypt from "bcryptjs"
import { v1 as uuidv1 } from "uuid"

export async function fromUserCreateDTOtoEntity(user: UserCreateDTO): Promise<User> {
    const result = new User()
    result.id = uuidv1()
    result.email = user.email
    result.username = user.username
    result.password = await bcrypt.hash(user.password, 8)
    result.isPublic = false
    return result
}

export function fromEntityToUserDTO(user: User): UserDTO {
    return {
        username: user.username,
        email: user.email,
        name: user.name,
        price: user.price,
        age: user.age?.toString(),
        phone: user.phone,
        location: user.location,
        referencePhotos: user.referencePhotos,
        height: user.characteristics?.height?.toString(),
        weight: user.characteristics?.weight?.toString(),
        eyes: user.characteristics?.eyes?.toString(),
        fakeBoobs: user.characteristics?.fakeBoobs,
        birthday: user.characteristics?.birthday?.toLocaleDateString("en-US"),
        birthPlace: user.characteristics?.birthPlace,
        zodiac: user.characteristics?.zodiac,
        measurements: user.characteristics?.measurements,
        orientation: user.characteristics?.orientation,
        ethnicity: user.characteristics?.ethnicity,
        tags: user.tags?.map((tag: any) => tag.nombre),
        bannerPhoto: user.bannerPhoto,
    }
}

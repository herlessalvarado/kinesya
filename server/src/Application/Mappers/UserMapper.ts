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

export function updateEntityFromUserDTO(user: User, dto: UserDTO): User {
    return user
        .setName(dto.name ?? user.name)
        .setPrice(dto.price ?? user.price)
        .setAge(!!dto.age ? parseInt(dto.age) : user.age)
        .setPhone(dto.phone ?? user.phone)
        .setLocation(dto.location ?? user.location)
        .setProfilePhoto(dto.profilePhoto ?? user.profilePhoto)
        .setReferencePhotos(dto.referencePhotos ?? user.referencePhotos)
        .setTags(dto.tags ?? user.tags)
        .setBannerPhoto(dto.bannerPhoto ?? user.bannerPhoto)
        .setCharacteristics({
            height: !!dto.height ? parseFloat(dto.height) : user.characteristics?.height,
            weight: !!dto.weight ? parseFloat(dto.weight) : user.characteristics?.weight,
            eyes: dto.eyes ?? user.characteristics?.eyes,
            hair: dto.hair ?? user.characteristics?.hair,
            fakeBoobs: dto.fakeBoobs ?? user.characteristics?.fakeBoobs,
            birthday: !!dto.birthday ? new Date(dto.birthday) : user.characteristics?.birthday,
            birthPlace: dto.birthPlace ?? user.characteristics?.birthPlace,
            zodiac: dto.zodiac ?? user.characteristics?.zodiac,
            measurements: dto.measurements ?? user.characteristics?.measurements,
            orientation: dto.orientation ?? user.characteristics?.orientation,
            ethnicity: dto.ethnicity ?? user.characteristics?.ethnicity,
        })
}

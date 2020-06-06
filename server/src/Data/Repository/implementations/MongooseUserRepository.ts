import { Schema, Document, model } from "mongoose"

import { Zodiac, Ethnicity, Services } from "../../../shared/constants"
import { Orientation } from "../../../utils/constants_variables"
import UserRepository from "../UserRepository"
import { injectable } from "inversify"
import { User } from "../../Entities/User"
import { UserSchema } from "../../Schema/UserSchema"
import { fromSchemaToEntity, fromEntityToSchema } from "../../Mapper/UserMapper"
import UserNotFoundException from "../../Exceptions/RepositoryException"

@injectable()
export default class MongooseUserRepository implements UserRepository {
    async findByEmailOrNull(email: string): Promise<User | null> {
        const _user = await UserModel.findOne({ email }).exec()
        return _user === null ? _user : fromSchemaToEntity(_user)
    }
    async findByUsernameOrNull(username: string): Promise<User | null> {
        const _user = await UserModel.findOne({ username }).exec()
        return _user === null ? _user : fromSchemaToEntity(_user)
    }

    async findOnlyPublic(): Promise<User[]> {
        const users = await UserModel.find({ isPublic: true }).exec()
        return users.map((u) => fromSchemaToEntity(u))
    }
    async findAll(): Promise<User[]> {
        const users = await UserModel.find().exec()
        return users.map((u) => fromSchemaToEntity(u))
    }
    async update(user: User): Promise<void> {
        const _user = await UserModel.findOneAndUpdate({ _id: user.id }, user).exec()
        if (_user === null) throw new UserNotFoundException()
    }
    async getByName(name: string): Promise<User> {
        const _user = await UserModel.findOne({ name }).exec()
        if (_user === null) throw new UserNotFoundException()
        return fromSchemaToEntity(_user)
    }

    async save(user: User): Promise<void> {
        const userDocument = new UserModel({ ...fromEntityToSchema(user) })
        await userDocument.save()
    }
}

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 6,
        index: true,
    },
    name: {
        type: String,
        trim: true,
    },
    age: {
        type: Number,
        min: 18,
        max: 99,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        min: 50,
    },
    phone: {
        type: Number,
    },
    location: {
        type: String,
    },
    profilePhoto: {
        type: String,
    },
    bannerPhoto: {
        type: String,
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    referencePhotos: [String],
    refresh_token: {
        type: String,
    },
    characteristics: {
        height: {
            type: Number,
        },
        weight: {
            type: Number,
        },
        eyes: {
            type: String,
        },
        hair: {
            type: String,
        },
        fakeBoobs: {
            type: Boolean,
        },
        birthday: {
            type: Date,
        },
        birthPlace: {
            type: String,
        },
        zodiac: {
            type: String,
            enum: Zodiac,
        },
        measurements: {
            type: String,
        },
        orientation: {
            type: String,
            enum: Orientation,
        },
        ethnicity: {
            type: String,
            enum: Ethnicity,
        },
    },
    tags: {
        type: [String],
        enum: Services,
    },
})

type UserDocument = UserSchema & Document

const UserModel = model<UserDocument>("User", userSchema)

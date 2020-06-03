import { Schema, Document, model, Model } from "mongoose"
import User from "../../Entities/User"
import { Zodiac, Ethnicity, Services } from "../../../shared/constants"
import { Orientation } from "../../../utils/constants_variables"
import UserRepository from "../UserRepository"
import { injectable } from "inversify"

@injectable()
export default class MongooseUserRepository implements UserRepository {
    async findOnlyPublic(): Promise<User[]> {
        return await UserModel.find({ isPublic: true }).exec()
    }

    async findAll(): Promise<User[]> {
        return await UserModel.find().exec()
    }
    async update(user: User): Promise<void> {
        const _user = await UserModel.findOneAndUpdate({ _id: user.id }, user)
        if (_user === null) throw new Error("This User doesnt exists")
    }
    async getByName(name: string): Promise<User | null> {
        return await UserModel.findOne({ name }).exec()
    }

    async save(user: User): Promise<void> {
        const userDocument = new UserModel({ ...user })
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

type UserDocument = Document & User

const UserModel = model<UserDocument, Model<UserDocument>>("User", userSchema)

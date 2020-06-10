import { Schema, Document, model } from "mongoose"

import { Orientation, Zodiac, Ethnicity, Services } from "../../../utils/constants_variables"
import UserRepository from "../UserRepository"
import { injectable } from "inversify"
import { User } from "../../Entities/User"
import { UserSchema } from "../../Schema/UserSchema"
import { fromSchemaToEntity, fromEntityToSchema } from "../../Mapper/UserMapper"
import UserNotFoundException from "../../Exceptions/RepositoryException"
import { Query } from "../../Helper/query"

@injectable()
export default class MongooseUserRepository implements UserRepository {
    async findOne(query: Query): Promise<User> {
        const _query = UserModel.findOne()
        query.where.forEach((criteria) => {
            _query.$where(criteria)
        })
        const _user = await _query.exec()
        if (_user === null) throw new UserNotFoundException()
        return fromSchemaToEntity(_user)
    }
    async findOneOrNull(query: Query): Promise<User | null> {
        const _query = UserModel.findOne()
        query.where.forEach((criteria) => {
            _query.$where(criteria)
        })
        const _user = await _query.exec()

        return _user === null ? _user : fromSchemaToEntity(_user)
    }

    async findAll(query: Query): Promise<User[]> {
        const _query = UserModel.find({ isPublic: true })
        query.where.forEach((criteria) => {
            _query.$where(criteria)
        })
        if (!!query.paginator) _query.skip(query.paginator.page).limit(query.paginator.limit)
        const users = await _query.exec()
        return users.map((u) => fromSchemaToEntity(u))
    }

    async update(user: User): Promise<void> {
        const _user = await UserModel.findOneAndUpdate({ _id: user.id }, user).exec()
        if (_user === null) throw new UserNotFoundException()
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
    refreshToken: {
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

export type UserDocument = UserSchema & Document

const UserModel = model<UserDocument>("User", userSchema)

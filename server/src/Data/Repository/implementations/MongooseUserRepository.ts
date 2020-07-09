import { Schema, Document, model } from "mongoose"

import { Orientation, Zodiac, Ethnicity, Services } from "../../../utils/constants_variables"
import UserRepository from "../UserRepository"
import { injectable } from "inversify"
import { User } from "../../Entities/User"
import { UserSchema } from "../../Schema/UserSchema"
import { fromSchemaToEntity, fromEntityToSchema } from "../../Mapper/UserMapper"
import UserNotFoundException from "../../Exceptions/RepositoryException"
import { Criteria } from "../../Helper/query"

@injectable()
export default class MongooseUserRepository implements UserRepository {
    async findOne(criteria: Criteria): Promise<User> {
        const _query = applyCriteria(UserModel.findOne(), criteria)
        const _user = await _query.exec()
        if (_user === null) throw new UserNotFoundException()
        return fromSchemaToEntity(_user)
    }
    async findOneOrNull(criteria: Criteria): Promise<User | null> {
        const _query = applyCriteria(UserModel.findOne(), criteria)
        const _user = await _query.exec()

        return _user === null ? _user : fromSchemaToEntity(_user)
    }

    async findAll(criteria: Criteria): Promise<User[]> {
        const _query = applyCriteria(UserModel.find({ isPublic: true }), criteria)

        const users = await _query.exec()
        return users.map((u: any) => fromSchemaToEntity(u))
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

function applyCriteria(query: any, criteria: Criteria) {
    criteria?.where.forEach((v) => {
        if (!!v.eq) query.where(v.property).equals(v.eq)
        if (!!v.range) query.where(v.property).gt(v.range.lower).lt(v.range.upper)
        if (!!v.in) query.where(v.property).in(v.in)
    })
    console.log(criteria)
    if (!!criteria.paginator) query.skip(criteria.paginator.page).limit(criteria.paginator.limit)
    return query
}

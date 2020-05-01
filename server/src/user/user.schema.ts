import mongoose from "mongoose"
import validator from "validator"
import { Services, Zodiac, Ethnicity, Orientation } from "../utils/constants_variables"

export const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: validator.isEmail,
            message: "{VALUE} is not a valid email",
            isAsync: false,
        },
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    username: {
        type: String,
        required: true,
        minlength: 6,
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

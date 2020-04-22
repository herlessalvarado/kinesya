"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var validator_1 = __importDefault(require("validator"));
exports.userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: validator_1.default.isEmail,
            message: "{VALUE} is not a valid email",
            isAsync: false,
        },
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
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
});

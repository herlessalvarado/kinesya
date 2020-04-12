import mongoose from 'mongoose';
import validator from 'validator';

export const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate:{
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email',
            isAsync: false
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    name: {
        type: String,
        trim: true
    },
    age:{
        type: Number,
        min: 18,
        max: 99
    },
    description :{
        type: String
    },
    price: {
        type: Number,
        min: 50
    },
    phone: {
        type: Number,
    },
    location: {
        type: String,
    },
    profilePhoto:{
        type: String
    },
    isPublic:{
        type: Boolean,
        default : false
    },
    referencePhotos:[String],
    tokens: [{
        token: {
            type: String,
        }
    }]
});
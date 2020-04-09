import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
    email ?: string;
    password ?: string;
    name ?: string;
    age ?: number;
    description ?: string;
    price ?: number;
    phone ?: number;
    location ?: string;
    tokens ?: [{token: string}];
    profilePhoto ?: string,
    referencePhotos ?: [string],
    generateAuthToken():any;
};
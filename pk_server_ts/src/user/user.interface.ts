import mongoose, { Model } from 'mongoose';

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
    isPublic ?:boolean;
    profilePhoto ?: string,
    referencePhotos ?: [string],
    generateAuthToken(): Promise<string>
};
export interface IUserModel extends Model<IUser>{
    findByCredentials: ({email, password}:IUser) => Promise<IUser>
 }

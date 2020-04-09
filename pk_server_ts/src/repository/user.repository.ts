import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { userSchema } from '../user/user.schema';
import { IUser } from '../user/user.interface';

userSchema.pre<IUser>('save', async function (next){
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password!, 8);
    }
    next();
});

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY!);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
};

export const User = mongoose.model<IUser>('User', userSchema);
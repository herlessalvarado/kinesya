import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { userSchema } from '../user/user.schema';
import { IUser,IUserModel } from '../user/user.interface';

userSchema.pre<IUser>('save', async function (next){
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password!, 8);
    }
    next();
});



userSchema.methods.generateAuthToken = async function():Promise<string> {
    const user = this;
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY!);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
};

userSchema.statics.findByCredentials = async ({email,password}:IUser):Promise<IUser> =>  {
    const user = await User.findOne({ email} )
    
    if (!user) {
        throw new Error( 'Invalid login credentials' )
    }
    const isPasswordMatch = await bcrypt.compare(password!, user.password!)
    if (!isPasswordMatch) {
        throw new Error('Invalid login credentials')
    }
    return user
}


export const User = mongoose.model<IUser,IUserModel>('User', userSchema);
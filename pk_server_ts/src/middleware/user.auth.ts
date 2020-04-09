import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import { User } from '../repository/user.repository';

export const auth = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')!.replace('Bearer ', '');
        const data = jwt.verify(token, process.env.JWT_KEY!);
        const user = await User.findOne({ _id: data, 'tokens.token': token });
        if (!user) {
            throw new Error();
        }
        req.body.user = user;
        req.body.token = token;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' });
    }
};
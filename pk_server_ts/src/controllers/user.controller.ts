import express, { Request, Response, NextFunction } from 'express';
import { auth } from '../middleware/user.auth';
import { UserService } from '../services/user.service';
import { upload } from '../middleware/user.upload';

const userService = new UserService();
export const UserRouter = express.Router();

/*
    CREATE USER
                */

UserRouter.post('/users', async (req: Request, res: Response) => {
    const result = await userService.create(req,res);
    if(result.success){
        res.status(201).send(result.data);
    }else{
        res.status(400).send(result.getErrorMessages());
    }
});

/*
    LOGIN USER
                */

UserRouter.post('/users/login',auth, async(req: Request, res: Response) => {
    const result = await userService.logIn(req,res);
    if(result.success){
        res.status(201).send(result.data);
    }else{
        res.status(400).send(result.getErrorMessages());
    }
});

/*
    GET USER
                */

UserRouter.get('/users/me', auth, async(req: Request, res: Response) => {
    const result = await userService.getUser(req.body.user);
    if(result.success){
        res.status(200).send(result.data);
    }else{
        res.status(400).send(result.getErrorMessages());
    }
});

UserRouter.get('/users', async(req: Request, res: Response) => {
    const result = await userService.getAll();
    if(result.success){
        res.status(200).send(result.data);
    }else{
        res.status(400).send(result.getErrorMessages());
    }
});

/*
    UPDATE USER
                */

UserRouter.put('/users', [upload,auth], async(req: Request, res: Response) => {
    const result = await userService.updateUser(req);
    if(result.success){
        res.status(200).send(result.data);
    }else{
        res.status(400).send(result.getErrorMessages());
    }
});

/*
    LOG OUT USER
                */

UserRouter.post('/users/me/logout', auth, async(req: Request, res: Response) => {
    let result = await  userService.logOut(req); 
    if(result.success){
        res.clearCookie("key");
        res.status(200).send(result.data);
    }else{
        res.status(500).send(result.getErrorMessages());
    }
});


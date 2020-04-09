import express, { Request, Response, NextFunction } from 'express';
import { User } from '../repository/user.repository';
import { auth } from '../middleware/user.auth';
import { upload } from '../middleware/user.upload';
import { UserService } from '../services/user.service';
import { ServiceResult } from '../results/service.result';

export const UserRouter = express.Router();

/*
    CREATE USER
                */

UserRouter.post('/users', async (req: Request, res: Response) => {
    const userService = new UserService();
    const result = await userService.create(req);
    if(result.success){
        res.status(201).send(result.data);
    }else{
        res.status(400).send(result.errors);
    }
});

/*
    LOGIN USER
                */

UserRouter.post('/users/login', async(req: Request, res: Response) => {
    const userService = new UserService();
    const result = await userService.logIn(req);
    if(result.success){
        res.status(201).send(result.data);
    }else{
        res.status(400).send(result.errors);
    }
});

/*
    GET USER
                */

UserRouter.get('/users/me', auth, async(req: Request, res: Response) => {
    const userService = new UserService();
    const result = await userService.getUser(req.body.user);
    if(result.success){
        res.status(200).send(result.data);
    }else{
        res.status(400).send(result.errors);
    }
});

UserRouter.get('/users', async(req: Request, res: Response) => {
    const userService =  new UserService();
    const result = await userService.getAll();
    if(result.success){
        res.status(200).send(result.data);
    }else{
        res.status(400).send(result.errors);
    }
});

/*
    UPDATE USER
                */

UserRouter.put('/users', auth, async(req: Request, res: Response) => {
    const userService = new UserService();
    const result = await userService.updateUser(req);
    if(result.success){
        res.status(200).send("User updated");
    }else{
        res.status(400).send(result.errors);
    }
});

/*
    LOG OUT USER
                */

UserRouter.post('/users/me/logout', auth, async (req: Request, res: Response) => {
    try {
        req.body.user.tokens = req.body.user.tokens.filter((token: any) => {
            return token.token != req.body.token;
        })
        await req.body.user.save();
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
});

UserRouter.post('/users/me/logoutall', auth, async(req: Request, res: Response) => {
    try {
        req.body.user.tokens.splice(0, req.body.user.tokens.length);
        await req.body.user.save();
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
});

/*
    UPLOAD PHOTO
                */

UserRouter.post('/users/upload', [upload, auth], async(req: Request, res: Response) => {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    try{
        if(Object.keys(files).length === 0){
            return res.status(400).send("There aren't any photos");
        }
        if(files.references){
            req.body.user.referencePhotos = files.references.map((photo: any) => photo.filename)
        }
        if(files.profile){
            req.body.user.profilePhoto = files.profile[0].filename;
        }
        await req.body.user.save();
        return res.status(200).send("Photos have been uploaded successfully");
    }catch(error){
        return res.status(400).send(error);
    }
});
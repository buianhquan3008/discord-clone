import express, { Router } from 'express';
import { getAllUsers, getDetailUser, login, signup } from '../controllers/user';
import { getDetailUser as getDetailUserValidation } from '../validations/user';
import validate from '../middlewares/validate';

const userRouter = Router({ mergeParams: true });

userRouter.get('/users', getAllUsers);
userRouter.get('/user/:userId', validate(getDetailUserValidation), getDetailUser);
userRouter.post('/login', login);
userRouter.post('/signup', signup);

export default userRouter;

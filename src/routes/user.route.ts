import express, { Router } from 'express';
import { getAllUsers, getDetailUser, login, signup } from '../controllers/user.controller';
import { getDetailUser as getDetailUserValidation } from '../validations/user';
import validate from '../middlewares/validate';
import basicAuth from '../middlewares/basicAuth';

// for session-cookei
import { loginHandler, getAllUsersHandler, logoutHandler } from '../controllers/sessionCookeiAuth.controller';

const userRouter = Router({ mergeParams: true });

// get all users by basic auth
userRouter.get('/users', basicAuth, getAllUsers);
userRouter.get('/user/:userId', validate(getDetailUserValidation), getDetailUser);
userRouter.post('/login', login);
userRouter.post('/signup', signup);

// session 
userRouter.post('/session/login', loginHandler);
userRouter.get('/session/users', getAllUsersHandler);
userRouter.post('/session/logout', logoutHandler);

export default userRouter;

import express, { Router } from 'express';
import { getAllUsers, getDetailUser, login, signup } from '../controllers/user';

const userRouter = Router({ mergeParams: true });

userRouter.get("/users", getAllUsers);
userRouter.get("/user/:userId", getDetailUser);
userRouter.post("/login", login);
userRouter.post("/signup", signup);

export default userRouter;
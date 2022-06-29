import express, { Router } from 'express';
import { getAllUsers, getDetailUser, login } from '../controllers/user';

const userRouter = Router({ mergeParams: true });

userRouter.get("/users", getAllUsers);
userRouter.get("/user/:userId", getDetailUser);
userRouter.post("/login", login)

export default userRouter;
import express, { Router } from 'express';
import { getAllUsers, getDetailUser, login, signup } from '../controllers/user.controller';
import { getDetailUser as getDetailUserValidation } from '../validations/user';
import validate from '../middlewares/validate';
import basicAuth from '../middlewares/basicAuth';
// for session-express auth
import { 
  login as loginSessionExpress,
  logout as logoutSessionExpress,
  getAllUsers as getAllUsersSessionExpress,
} from '../controllers/sessionExpressAuth.controller';

// for session-cookei
import { loginHandler, getAllUsersHandler, logoutHandler } from '../controllers/sessionCookeiAuth.controller';

const userRouter = Router({ mergeParams: true });

// get all users by basic auth
userRouter.get('/users', basicAuth, getAllUsers);
userRouter.get('/user/:userId', validate(getDetailUserValidation), getDetailUser);
userRouter.post('/login', login);
userRouter.post('/signup', signup);

// session basic implement
userRouter.post('/session/login', loginHandler);
userRouter.get('/session/users', getAllUsersHandler);
userRouter.post('/session/logout', logoutHandler);

// session with express-session
userRouter.post('/session-express/login', loginSessionExpress);
userRouter.get('/session-express/users', getAllUsersSessionExpress);
userRouter.post('/session-express/logout', logoutSessionExpress);

export default userRouter;

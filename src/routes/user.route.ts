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
import { loginHandler, getAllUsersHandler, logoutHandler, getDetailUserHandler } from '../controllers/sessionCookeiAuth.controller';

// for jwt
import { 
  login as loginJwt,
  getAllUsers as getAllUsersJwt,
  logout as logoutJwt,
  refreshToken,
} from '../controllers/tokenBasedAuthentication.controller';

const userRouter = Router({ mergeParams: true });

// get all users by basic auth
// userRouter.get('/users', basicAuth, getAllUsers);
userRouter.get('/users', getAllUsers);
userRouter.get('/user/:userId', validate(getDetailUserValidation), getDetailUser);
userRouter.post('/login', login);
userRouter.post('/signup', signup);

// session basic implement
userRouter.post('/session/login', loginHandler);
userRouter.get('/session/users', getAllUsersHandler);
userRouter.get('/session/user/:userId', getDetailUserHandler);
userRouter.post('/session/logout', logoutHandler);

// session with express-session
userRouter.post('/jwt/login', loginJwt);
userRouter.get('/jwt/users', getAllUsersJwt);
userRouter.post('/jwt/refresh', refreshToken);
userRouter.post('/jwt/logout', logoutJwt);

// for Token-based Authentication


export default userRouter;

import { Request, Response, NextFunction } from 'express';

import {
  login as loginService,
  getAllUsers as getAllUsersService,
  UserType,
} from '../services/user.service';

declare module 'express-session' {
  interface SessionData {
    user: UserType;
  }
}

/**
 * login
 * @param req
 * @param res
 * @param next
 */
async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const user = await loginService(email, password);
    req.session.user = req.body.user;
    return res.json(user);
  } catch (err) {
    next(err);
  }
}

/**
 * logout
 * @param req 
 * @param res 
 * @param next 
 */
async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    req.session.user = null;
    return res.json({"message": "logout success"});
  } catch (err) {
    next(err);
  }
}

/**
 * Get user list
 * @param req
 * @param res
 * @param next
 */
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getAllUsersService();
    return res.json(users);
  } catch (err) {
    next(err);
  }
};

export {
  login,
  logout,
  getAllUsers
}
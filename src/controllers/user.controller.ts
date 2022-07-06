import { Request, Response, NextFunction } from 'express';
import {
  getAllUsers as getAllUsersService,
  getDetailUser as getDetailUserService,
  login as loginService,
  signup as signupService,
  UserType
} from '../services/user.service';

/**
 * Get user list
 * @param req
 * @param res
 * @param next
 */
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getAllUsersService();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

/**
 * Get detail user
 * @param req
 * @param res
 * @param next
 */
const getDetailUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getDetailUserService(req.params.userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

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
    res.json(user);
  } catch (err) {
    next(err);
  }
}

/**
 * signup
 * @param req
 * @param res
 * @param next
 */
async function signup(req: Request, res: Response, next: NextFunction) {
  const { email, password, name, pic, isAdmin } = req.body;
  const user: UserType = { email, password, name, pic, isAdmin };
  const newUser = await signupService(user);
  res.json(newUser);
}

export { getAllUsers, getDetailUser, login, signup };

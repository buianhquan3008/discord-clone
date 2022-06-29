import { Request, Response, NextFunction } from "express";
import { 
  getAllUsers as getAllUsersService,
  getDetailUser as getDetailUserService, 
  login as loginService,
} from '../services/user';

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
}

/**
 * Get detail user
 * @param req 
 * @param res
 * @param next
 */
const getDetailUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await getDetailUserService(req.params.userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
}

/**
 * login 
 * @param email
 * @param password
 */

async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const user = await loginService(email, password);
    res.json(user);
  } catch (err) {
    next(err)
  }
}

export {
  getAllUsers,
  getDetailUser,
  login,
}
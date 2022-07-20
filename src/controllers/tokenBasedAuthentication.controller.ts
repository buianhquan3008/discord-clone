import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import {
  login as loginService,
  getAllUsers as getAllUsersService,
  // UserType,
} from '../services/user.service';

import User from '../models/user.model';

/**
 * login jwt
 * @param req 
 * @param res 
 * @param next 
 */
async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const user = await loginService(email, password);
    const accessToken = jwt.sign({ email: email }, 'secret_access_token_key', { expiresIn: '30s' });
    const refreshToken = jwt.sign({ email: email }, 'secret_refresh_token_key');
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    user.save();
    return res.json(user);
  } catch (err) {
    next(err);
  }
}

/**
 * get Users jwt
 * @param req 
 * @param res 
 * @param next 
 */
async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const reqAccessToken = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(reqAccessToken, 'secret_access_token_key');
    const listUser = await User.find( {} );
    const listEmail = listUser.map(item => item.email);
    if(listEmail.includes(decoded['email'])) {
      const users = await getAllUsersService();
      return res.json(users);
    }
    // else throw Error('not authorized')
  } catch (err) {
    next(err);
  }
}

/**
 * logout jwt
 * @param req 
 * @param res 
 * @param next 
 */
async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    const reqAccessToken = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(reqAccessToken, 'secret_access_token_key');
    const user = await User.findOneAndUpdate({ email: decoded['email'] }, { refreshToken: null });
    user.save();
    return res.json({"message": "logout success"});
  } catch (err) {
    next(err);
  }
}

/**
 * refresh token api
 * @param req 
 * @param res 
 * @param next 
 */
async function refreshToken(req: Request, res: Response, next: NextFunction){
  try {
    const reqRefreshToken = req.headers.authorization.split(' ')[1];
    const user = await User.findOne({ refreshToken: reqRefreshToken });
    const newAccessToken = jwt.sign({ email: user.email }, 'secret_access_token_key', { expiresIn: '30s' });
    const newRefreshToken = jwt.sign({ email: user.email }, 'secret_refresh_token_key');
    user.accessToken = newAccessToken;
    user.refreshToken = newRefreshToken;
    user.save();
    return res.json({
      message: "refresh success",
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    next(err);
  }
}

export {
  login,
  getAllUsers,
  logout,
  refreshToken,
}
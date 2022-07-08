import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import { v4 } from 'uuid';
import SessionModel, { Session } from '../models/session.model';
import {
  getAllUsers as getAllUsersService,
} from '../services/user.service';

async function loginHandler(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: 'Email not exists' });
  }

  if (!user.checkPassword(password)) {
    return res.status(401).json({ error: 'Password is wrong'});
  } 
  const sessionToken = v4();
  console.log(sessionToken)

  // set the expiry time as 120s after the current time
  const now = new Date();
  const expiresAt = new Date(+now + 120 * 1000);
  // create a session containing information about the user and expiry time
  const session = new Session(email, expiresAt);
  const userSession = new SessionModel({
    token: sessionToken,
    session,
  });
  userSession.save();
  res.cookie("session_token", sessionToken, { expires: expiresAt });
  return res.status(200).json({
    code: 200,
    message: 'login success'
  });
}

async function getAllUsersHandler(req: Request, res: Response, next: NextFunction) {
  // if this request doesn't have any cookies, that means it isn't
  // authenticated. Return an error code.
  if (!req.cookies) {
    return res.status(401).json({ error: 'not authorized: no cookie' });
  }

  // We can obtain the session token from the requests cookies, which come with every request
  const sessionToken = req.cookies['session_token']
  if (!sessionToken) {
    // If the cookie is not set, return an unauthorized status
    return res.status(401).json({ error: 'not authorized: no session_token in cookei' });
  }

  // We then get the session of the user from our session map
  // that we set in the signinHandler
  
  const userSession = await SessionModel.findOne({ token: sessionToken });
  if (!userSession) {
    // If the session token is not present in session map, return an unauthorized error
    return res.status(401).json({ error: 'not authorized: session_token incorrect' });
  }
  // if the session has expired, return an unauthorized error, and delete the 
  // session from our map
  if (userSession.session.expiresAt < (new Date())) {
    await SessionModel.deleteOne({ token: sessionToken })
    return res.status(401).json({ error: 'the session has expired' })
  }
  // If all checks have passed, we can consider the user authenticated and
  // send a welcome message
  try {
    const users = await getAllUsersService();
    return res.json(users);
  } catch (err) {
    next(err);
  }
}

async function logoutHandler(req: Request, res: Response, next: NextFunction) {
  if (!req.cookies) {
    return res.status(401).json({ error: 'not authorized' });
  }

  // We can obtain the session token from the requests cookies, which come with every request
  const sessionToken = req.cookies['session_token']
  if (!sessionToken) {
    // If the cookie is not set, return an unauthorized status
    return res.status(401).json({ error: 'not authorized' });
  }

  // We then get the session of the user from our session map
  // that we set in the signinHandler
  
  const userSession = await SessionModel.findOne({ token: sessionToken });
  if (!userSession) {
    // If the session token is not present in session map, return an unauthorized error
    return res.status(401).json({ error: 'not authorized' });
  }

  await SessionModel.deleteOne({ token: sessionToken })
    
  res.cookie("session_token", "", { expires: new Date() })
  return res.status(200).json({ message: 'logout success' })
}

export {
  loginHandler,
  getAllUsersHandler,
  logoutHandler,
}
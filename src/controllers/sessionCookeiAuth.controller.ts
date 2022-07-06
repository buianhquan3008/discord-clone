import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import uuid from 'uuid';
import SessionModel, { Session } from '../models/session.model';

async function loginHandler(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json('Email not exists');
  }

  if (!user.checkPassword(password)) {
    res.status(401).json('Password is wrong');
  } 
  console.log('asd')
  // const sessionToken = uuid.v4();
  // console.log(uuid.v4())

  // set the expiry time as 120s after the current time
  // const now = new Date();
  // const expiresAt = new Date(+now + 120 * 1000);
  // // create a session containing information about the user and expiry time
  // const session = new Session(email, expiresAt);
  // const userSession = new SessionModel({sessionToken: session});
  // userSession.save();
  // res.cookie("session_token", sessionToken, { expires: expiresAt });
  // res.status(200).json('login success');
}

export {
  loginHandler,
}
import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import { v4 } from 'uuid';
import SessionModel, { Session } from '../models/session.model';

async function loginHandler(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({ error: 'Email not exists' });
  }

  if (!user.checkPassword(password)) {
    res.status(401).json({ error: 'Password is wrong'});
  } 
  // console.log('asd')
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
  res.status(200).json({
    code: 200,
    message: 'login success'
  });
}

async function getAllUsersHandler(req: Request, res: Response, next: NextFunction) {
  // if this request doesn't have any cookies, that means it isn't
  // authenticated. Return an error code.
  console.log(req.cookies)
  if (!req.cookies) {
    res.status(401).json({ error: 'not authorization' });
  }

  // We can obtain the session token from the requests cookies, which come with every request
  const sessionToken = req.cookies['session_token']
  console.log(sessionToken)
  if (!sessionToken) {
    // If the cookie is not set, return an unauthorized status
    res.status(401).json({ error: 'not authorization' });
  }

  // We then get the session of the user from our session map
  // that we set in the signinHandler
  
  const userSession = await SessionModel.findOne({ token: sessionToken });
  if (!userSession) {
    // If the session token is not present in session map, return an unauthorized error
    res.status(401).json({ error: 'not authorization' });
  }
  console.log(userSession);
  // res.status(200).json({ error: 'not authorization' });
  // if the session has expired, return an unauthorized error, and delete the 
  // session from our map
  // if (!userSession.session.expiresAt ) {
      // delete sessions[sessionToken]
      // res.status(401).end()
      // return
  // }
  res.status(200).json({ error: 'not authorization' });
  // If all checks have passed, we can consider the user authenticated and
  // send a welcome message
  // res.send(`Welcome  ${userSession.username}!`).end()
}

export {
  loginHandler,
  getAllUsersHandler,
}
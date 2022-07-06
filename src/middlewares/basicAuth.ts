import { Request, Response, NextFunction } from 'express';
import { authenticate } from '../services/user.service';

interface ApiRequest extends Request {
  [key: string]: any;
}

async function basicAuth(req: ApiRequest, res: Response, next: NextFunction) {
  if (!req.headers.authorization ||  req.headers.authorization.indexOf('Basic ') === -1) {
      return res.status(401).json({ message: 'Missing Authorization Header' });
  }
   // verify auth credentials
  const base64Credentials = req.headers.authorization.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');
  const user = await authenticate(username, password);
  // console.log(user)
  if (!user) {
    return res.status(401).json({ message: 'Invalid Authentication Credentials' });
  }

  // attach user to request object
  req.user = user;

  next();
}

export default basicAuth;
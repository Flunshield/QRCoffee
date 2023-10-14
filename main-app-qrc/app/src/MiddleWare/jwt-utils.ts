import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { DecodedToken, RequestWithToken } from '../Interfaces/jwtUtilsInterface';

export function verifyJwt() {
  return function (req: RequestWithToken, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const accesTest = process.env.ACCESS_TEST;

    if (authHeader) {
      const token = authHeader.split(' ')[1];
      const publicKey = '-----BEGIN PUBLIC KEY-----\n' + process.env.CLERK_PUBLIC_KEY + '\n-----END PUBLIC KEY-----';
      try {
        req.decodedToken = jwt.verify(token, publicKey) as DecodedToken;
        next();
      } catch (error) {
        res.status(401).json({ error: 'Unauthorized' });
      }
    } else if (accesTest) {
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
}

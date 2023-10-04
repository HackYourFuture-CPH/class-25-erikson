import { adminFireAuth } from '../firebase/config';
import { Request, Response, NextFunction } from 'express';

export const validateAuth = async (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    const token = req.headers.authorization.split(' ')[1];
    try {
      await adminFireAuth.verifyIdToken(token);
      next();
    } catch (error) {
      res.status(401).send({ errorCode: 410, errorMessage: 'Token has expired' });
    }
  } else {
    res.status(401).send({ errorCode: 410, errorMessage: 'No token provided.' });
  }
};

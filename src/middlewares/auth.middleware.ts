import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { validUser } from '@/services/auth.service.js';

// Extendemos el Request para que typescript sepa que existirá req.user
declare module 'express-serve-static-core' {
  interface Request {
    user?: any;
    session?: {
      user?: any;
      [key: string]: any;
    };
  }
}

export const isAuthenticated = () => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'Token required' });
      return;
    }

    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'Invalid or expired token' });
        return;
      }
      req.user = decoded;
      next();
    });
  };
};

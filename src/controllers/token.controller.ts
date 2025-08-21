import tokenService from '../services/donations.service.js';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const getToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = { text: 'Returning one minute token' };
    const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '60s' });
    res.json({ token, expiresIn: 60 });
  } catch (error) {
    next(error);
  }
};

export default {
  getToken,
};

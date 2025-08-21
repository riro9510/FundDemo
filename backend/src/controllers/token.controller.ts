import tokenService from '../services/donations.service.js';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const getToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { clientId } = req.body;
    if (!clientId) {
      res.status(400).json({ error: 'clientId is required' });
    }

    const payload = { clientId };
    const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '60s' });
    res.json({ token, expiresIn: 300 });
  } catch (error) {
    next(error);
  }
};

export default {
  getToken,
};

import { tokenSchema } from '../validations/tokenSchema.js';
import { Request, Response, NextFunction } from 'express';

export const validateUserId = (req: Request, res: Response, next: NextFunction) => {
  const { error } = tokenSchema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).json({
      error: 'Validation failed',
      details: error.details.map((d) => d.message),
    });
    return;
  }
  next();
};

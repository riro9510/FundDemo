import { Request, Response, NextFunction } from 'express';
import { donationSchema } from '@/validations/donationsSchema.js';

const validateDonation = (req: Request, res: Response, next: NextFunction) => {
  const { error } = donationSchema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).json({
      error: 'Validación fallida',
      details: error.details.map((d) => d.message),
    });
    return;
  }
  next();
};

export { validateDonation };

// src/middlewares/error.middleware.ts

import { Request, Response, NextFunction } from 'express';

export interface CustomError extends Error {
  status?: number;
  details?: any;
}

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  // Puedes loggear el error aquí si quieres
  console.error(`[ERROR] ${req.method} ${req.url}: ${message}`);

  res.status(statusCode).json({
    success: false,
    message,
    details: err.details || null,
  });
};

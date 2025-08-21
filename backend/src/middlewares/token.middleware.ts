import { tokenSchema } from '../validations/tokenSchema.js';
import { Request, Response, NextFunction } from 'express';
import type { WebSocket } from 'ws';

export const validateClientIdWS = (payload: any, ws: WebSocket) => {
  const { error } = tokenSchema.validate(payload, { abortEarly: false });
  if (error) {
    ws.send(
      JSON.stringify({
        type: 'error',
        message: 'Validation failed',
        details: error.details.map((d) => d.message),
      })
    );
    return false;
  }
  return true;
};
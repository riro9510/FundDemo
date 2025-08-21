import { decryptAES } from '@/utils/crypto.js';
import donationsService from '../services/donations.service.js';
import { Request, Response, NextFunction } from 'express';

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await donationsService.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const getAllEncode = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await donationsService.getAll();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getAllDecode = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result: any[] = await donationsService.getAll();
    const decodedResult = result.map((d) => ({
      ...d.toJSON(),
      donorEmail: decryptAES(d.donorEmail),
      donorName: decryptAES(d.donorName),
    }));

    res.json(decodedResult);
  } catch (error) {
    next(error);
  }
};

export default {
  create,
  getAllEncode,
  getAllDecode,
};

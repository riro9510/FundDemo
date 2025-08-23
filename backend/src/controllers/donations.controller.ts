import { decryptAES } from '../utils/crypto.js';
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

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deleted = await donationsService.deleteOne(id as unknown as number);

    if (!deleted) {
      res.status(404).json({ message: "Donation not found" });
      return;
    }

    res.json({ message: `Order 66 executed. Donation ${id} has been removed.` });
  } catch (error) {
    next(error);
  }
};

const deleteAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await donationsService.deleteAll();
    res.json(result);
  } catch (error) {
    next(error);
  }
};
export default {
  create,
  getAllEncode,
  getAllDecode,
  deleteOne,
  deleteAll,
};


import Donations from '../models/donations.model.js';
import { IDonation } from '../models/donations.interface.js';
import { encryptAES } from '../utils/crypto.js';

type IDonationCreate = Omit<IDonation, 'id' | 'createdAt' | 'updatedAt'>;

const create = async (data: IDonationCreate) => {
  const register = await Donations.create({
    ...data,
    donorEmail: encryptAES(data.donorEmail),
    donorName: encryptAES(data.donorName),
  });
  return register;
};

const getAll = async () => {
  return await Donations.findAll();
};

export default {
  create,
  getAll,
};

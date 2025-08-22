import Donations from '../models/donations.model.js';
import { IDonation } from '../models/donations.interface.js';
import { encryptAES } from '../utils/crypto.js';

type IDonationCreate = Omit<IDonation, 'id' | 'createdAt' | 'updatedAt'>;

const create = async (data: IDonationCreate) => {
  try{
    const register = await Donations.create({
    ...data,
    donorEmail: encryptAES(data.donorEmail),
    donorName: encryptAES(data.donorName),
  });
  return register;
  }
  catch (error:any) {
    console.error('Error creating donation:', error);
    throw new Error('Failed to create donation: ' + error.toString());
  }
};

const getAll = async () => {
  try{
     const donations = await Donations.findAll();
    console.log('Donations fetched:', donations.length);
    return donations;
  }
  catch (error:any) {
    console.error('Error fetching donations:', error);
    throw new Error('Failed to fetch donations: ' + error.toString());
  }
};

export default {
  create,
  getAll,
};

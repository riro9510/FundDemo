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
const deleteOne = async (id: number) => {
  try {
    const deletedCount = await Donations.destroy({
      where: { id }
    });

    if (deletedCount === 0) {
      throw new Error(`Donation with id ${id} not found`);
    }

    console.log(`Donation with id ${id} deleted`);
    return { success: true, message: `Donation ${id} deleted` };
  } catch (error: any) {
    console.error('Error deleting donation:', error);
    throw new Error('Failed to delete donation: ' + error.toString());
  }
};

const deleteAll = async () => {
  try {
    const deletedCount = await Donations.destroy({
      where: {},
      truncate: true, // ⚠️ cuidado con esto, elimina *todo* de la tabla
    });

    console.log(`All donations deleted. Count: ${deletedCount}`);
    return { success: true, message: `All donations deleted` };
  } catch (error: any) {
    console.error('Error deleting all donations:', error);
    throw new Error('Failed to delete all donations: ' + error.toString());
  }
};

export default {
  create,
  getAll,
  deleteOne,
  deleteAll,
};

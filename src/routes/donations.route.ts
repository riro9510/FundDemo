import express from 'express';
import donationsController from '../controllers/donations.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';
import { errorHandler } from '../middlewares/error.middleware.js';
import { validateDonation } from '@/middlewares/donations.middleware.js';
const router = express.Router();

router.post('/', isAuthenticated(), validateDonation, donationsController.create);

router.get('/encode/', isAuthenticated(), donationsController.getAllEncode);

router.get('/decode/', isAuthenticated(), donationsController.getAllDecode);

router.use(errorHandler);

export default router;

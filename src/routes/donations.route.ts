import express from 'express';
import donationsController from '../controllers/donations.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';
import { errorHandler } from '../middlewares/error.middleware.js';
import { validateDonation } from '@/middlewares/donations.middleware.js';
const router = express.Router();

/**
 * @swagger
 * /donations:
 *   post:
 *     summary: Create a donation
 *     description: Creates a new donation record in the system.
 *     tags: [Donations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - donorName
 *               - donorEmail
 *               - amount
 *               - paymentMethod
 *             properties:
 *               donorName:
 *                 type: string
 *                 description: Name of the donor
 *                 example: "Jane Smith"
 *               donorEmail:
 *                 type: string
 *                 description: Email address of the donor
 *                 example: "janesmith@example.com"
 *               amount:
 *                 type: number
 *                 description: Donation amount
 *                 example: 50.0
 *               currency:
 *                 type: string
 *                 description: Currency of the donation (optional)
 *                 example: "USD"
 *               description:
 *                 type: string
 *                 description: Description or message from the donor (optional)
 *                 example: "This donation is to support the education fund."
 *               paymentMethod:
 *                 type: string
 *                 enum:
 *                   - credit_card
 *                   - paypal
 *                   - bank_transfer
 *                   - other
 *                 description: Payment method used for the donation
 *                 example: "credit_card"
 *     responses:
 *       201:
 *         description: Donation created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 */

router.post('/', isAuthenticated(), validateDonation, donationsController.create);
/**
 * @swagger
 * /donations/encode:
 *   get:
 *     summary: Get all encoded donations
 *     description: Returns all donation records in encoded format.
 *     tags: [Donations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of encoded donations
 *       401:
 *         description: Unauthorized
 */
router.get('/encode/', isAuthenticated(), donationsController.getAllEncode);
/**
 * @swagger
 * /donations/decode:
 *   get:
 *     summary: Get all decoded donations
 *     description: Returns all donation records in decoded format.
 *     tags: [Donations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of decoded donations
 *       401:
 *         description: Unauthorized
 */
router.get('/decode/', isAuthenticated(), donationsController.getAllDecode);

router.use(errorHandler);

export default router;

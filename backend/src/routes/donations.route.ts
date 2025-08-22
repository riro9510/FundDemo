import express from 'express';
import donationsController from '../controllers/donations.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';
import { errorHandler } from '../middlewares/error.middleware.js';
import { validateDonation } from '../middlewares/donations.middleware.js';
import { Request, Response, NextFunction } from 'express';
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 donorName:
 *                   type: string
 *                   example: "Jane Smith"
 *                 donorEmail:
 *                   type: string
 *                   example: "janesmith@example.com"
 *                 amount:
 *                   type: number
 *                   example: 50.0
 *                 currency:
 *                   type: string
 *                   example: "USD"
 *                 description:
 *                   type: string
 *                   example: "This donation is to support the education fund."
 *                 paymentMethod:
 *                   type: string
 *                   example: "credit_card"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid input data"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */

router.post('/', 
  async (req, res, next) => {
    try {
      // Primero autenticación
      await isAuthenticated()(req, res, next);
    } catch (err:any) {
      console.error("❌ Error en isAuthenticated:", err);
      res.status(401).json({ error: "No autorizado", details: err.message });
      return
    }
  },

  async (req, res, next) => {
    try {
      // Luego validación de datos
      await validateDonation(req, res, next);
    } catch (err:any) {
      console.error("❌ Error en validateDonation:", err);
       res.status(400).json({ error: "Datos inválidos", details: err.message });
       return;
    }
  },

  async (req, res,next) => {
    try {
      // Finalmente creación de la donación
      const result = await donationsController.create(req, res, next);
      res.status(201).json(result);
    } catch (err:any) {
      console.error("❌ Error en donationsController.create:", err);
      res.status(500).json({ error: "Error en el servidor", details: err.message });
      return;
    }
  }
);

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
router.get('/encode/', 
  async (req, res, next) => {
    try {
      await isAuthenticated()(req, res, next);
    } catch (err: any) {
      console.error("❌ Error en isAuthenticated (encode):", err);
      res.status(401).json({ error: "No autorizado", details: err.message });
      return;
    }
  },

  async (req, res, next) => {
    try {
      const result = await donationsController.getAllEncode(req, res, next);
      res.status(200).json(result);
    } catch (err: any) {
      console.error("❌ Error en donationsController.getAllEncode:", err);
      res.status(500).json({ error: "Error en el servidor", details: err.message });
      return;
    }
  }
);
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
router.get('/decode/', 
  async (req, res, next) => {
    try {
      await isAuthenticated()(req, res, next);
    } catch (err: any) {
      console.error("❌ Error en isAuthenticated (decode):", err);
      res.status(401).json({ error: "No autorizado", details: err.message });
      return;
    }
  },

  async (req, res, next) => {
    try {
      const result = await donationsController.getAllDecode(req, res, next);
      res.status(200).json(result);
    } catch (err: any) {
      console.error("❌ Error en donationsController.getAllDecode:", err);
      res.status(500).json({ error: "Error en el servidor", details: err.message });
      return;
    }
  }
);

router.use(errorHandler);

export default router;

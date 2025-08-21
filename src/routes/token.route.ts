import express from 'express';
import tokenController from '../controllers/token.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';
import { errorHandler } from '../middlewares/error.middleware.js';
const router = express.Router();

router.post('/', tokenController.getToken);

router.use(errorHandler);

export default router;

import { Router } from 'express';
const router = Router();
import donations from './donations.route.js';
import token from './token.route.js';

router.use('/donations', donations);
router.use('/token', token);

export default router;

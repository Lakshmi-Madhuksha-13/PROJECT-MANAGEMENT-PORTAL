import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { getReports } from '../services/reportService.js';

const router = express.Router();
router.use(authenticate);
router.get('/', getReports);

export default router;

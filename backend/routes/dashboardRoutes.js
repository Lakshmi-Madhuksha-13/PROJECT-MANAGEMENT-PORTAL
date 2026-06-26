import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { getDashboardStats } from '../services/dashboardService.js';

const router = express.Router();
router.use(authenticate);
router.get('/stats', getDashboardStats);

export default router;

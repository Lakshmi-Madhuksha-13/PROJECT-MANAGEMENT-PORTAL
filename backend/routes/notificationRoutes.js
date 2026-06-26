import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { getNotifications } from '../services/notificationService.js';

const router = express.Router();
router.use(authenticate);
router.get('/', getNotifications);

export default router;

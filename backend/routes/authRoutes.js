import express from 'express';
import { body } from 'express-validator';
import { register, login, logout, getProfile, updateProfile, forgotPassword } from '../services/authService.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
], register);

router.post('/login', [
  body('email').isEmail(),
  body('password').notEmpty()
], login);

router.post('/logout', authenticate, logout);
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);
router.post('/forgot-password', [body('email').isEmail()], forgotPassword);

export default router;

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/User.js';

dotenv.config();

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.cookies?.token;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

  if (!token) return res.status(401).json({ message: 'Authentication required' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(401).json({ message: 'Invalid token' });
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const authorizeRoles = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Forbidden: insufficient role' });
  }
  next();
};

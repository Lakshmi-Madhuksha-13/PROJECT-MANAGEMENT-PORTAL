import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import dotenv from 'dotenv';
import { User } from '../models/User.js';

dotenv.config();

const signToken = (user) => jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, password, phone, profession, organization, skills, experience, profilePicture, bio, role } = req.body;
  const existing = await User.findOne({ where: { email } });
  if (existing) return res.status(409).json({ message: 'Email already registered' });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed, phone, profession, organization, skills, experience, profilePicture, bio, role });
  const token = signToken(user);

  res.status(201).json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = signToken(user);
  res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
};

export const logout = async (req, res) => {
  res.json({ message: 'Logged out successfully' });
};

export const getProfile = async (req, res) => {
  const user = req.user;
  res.json({ user: { id: user.id, name: user.name, email: user.email, phone: user.phone, profession: user.profession, organization: user.organization, skills: user.skills, experience: user.experience, profilePicture: user.profilePicture, bio: user.bio, role: user.role } });
};

export const updateProfile = async (req, res) => {
  const user = req.user;
  await user.update(req.body);
  res.json({ message: 'Profile updated', user });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(404).json({ message: 'Email not found' });
  res.json({ message: 'Password reset link sent to your email (simulated)' });
};

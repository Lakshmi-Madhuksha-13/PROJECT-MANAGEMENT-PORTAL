import express from 'express';
import { body } from 'express-validator';
import { authenticate } from '../middleware/authMiddleware.js';
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  archiveProject,
  restoreProject
} from '../services/projectService.js';

const router = express.Router();

router.use(authenticate);
router.get('/', getProjects);
router.post('/', [body('name').notEmpty()], createProject);
router.put('/:id', [body('name').notEmpty()], updateProject);
router.delete('/:id', deleteProject);
router.patch('/:id/archive', archiveProject);
router.patch('/:id/restore', restoreProject);

export default router;

import express from 'express';
import { body } from 'express-validator';
import { authenticate } from '../middleware/authMiddleware.js';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  changeTaskStatus,
  archiveTask,
  restoreTask
} from '../services/taskService.js';

const router = express.Router();
router.use(authenticate);
router.get('/', getTasks);
router.post('/', [body('title').notEmpty(), body('projectId').notEmpty()], createTask);
router.put('/:id', [body('title').notEmpty()], updateTask);
router.delete('/:id', deleteTask);
router.patch('/:id/status', changeTaskStatus);
router.patch('/:id/archive', archiveTask);
router.patch('/:id/restore', restoreTask);

export default router;

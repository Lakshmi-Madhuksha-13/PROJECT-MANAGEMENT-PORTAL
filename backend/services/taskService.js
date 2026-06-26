import { validationResult } from 'express-validator';
import { Task } from '../models/Task.js';
import { Project } from '../models/Project.js';

export const getTasks = async (req, res) => {
  const tasks = await Task.findAll({ where: { archived: false }, include: ['project', 'assignedUser'] });
  res.json({ tasks });
};

export const createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { projectId, ...payload } = req.body;
  const project = await Project.findByPk(projectId);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  const task = await Task.create({ ...payload, projectId });
  res.status(201).json({ task });
};

export const updateTask = async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  await task.update(req.body);
  res.json({ task });
};

export const deleteTask = async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  await task.destroy();
  res.json({ message: 'Task deleted' });
};

export const changeTaskStatus = async (req, res) => {
  const { status } = req.body;
  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  await task.update({ status, completed: status === 'Completed' });
  res.json({ task });
};

export const archiveTask = async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  await task.update({ archived: true });
  res.json({ task });
};

export const restoreTask = async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  await task.update({ archived: false });
  res.json({ task });
};

import { validationResult } from 'express-validator';
import { Project } from '../models/Project.js';

export const getProjects = async (req, res) => {
  const projects = await Project.findAll({ where: { ownerId: req.user.id } });
  res.json({ projects });
};

export const createProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const project = await Project.create({ ...req.body, ownerId: req.user.id });
  res.status(201).json({ project });
};

export const updateProject = async (req, res) => {
  const project = await Project.findOne({ where: { id: req.params.id, ownerId: req.user.id } });
  if (!project) return res.status(404).json({ message: 'Project not found' });
  await project.update(req.body);
  res.json({ project });
};

export const deleteProject = async (req, res) => {
  const project = await Project.findOne({ where: { id: req.params.id, ownerId: req.user.id } });
  if (!project) return res.status(404).json({ message: 'Project not found' });
  await project.destroy();
  res.json({ message: 'Project deleted' });
};

export const archiveProject = async (req, res) => {
  const project = await Project.findOne({ where: { id: req.params.id, ownerId: req.user.id } });
  if (!project) return res.status(404).json({ message: 'Project not found' });
  await project.update({ archived: true, status: 'Archived' });
  res.json({ project });
};

export const restoreProject = async (req, res) => {
  const project = await Project.findOne({ where: { id: req.params.id, ownerId: req.user.id } });
  if (!project) return res.status(404).json({ message: 'Project not found' });
  await project.update({ archived: false, status: 'Active' });
  res.json({ project });
};

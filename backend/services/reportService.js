import { Project } from '../models/Project.js';
import { Task } from '../models/Task.js';

export const getReports = async (req, res) => {
  const projects = await Project.findAll({ where: { ownerId: req.user.id } });
  const tasks = await Task.findAll();
  res.json({ projects, tasks, generatedAt: new Date() });
};

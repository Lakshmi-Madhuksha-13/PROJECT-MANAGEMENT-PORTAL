import { Project } from '../models/Project.js';
import { Task } from '../models/Task.js';

export const getDashboardStats = async (req, res) => {
  const projects = await Project.findAll({ where: { ownerId: req.user.id } });
  const tasks = await Task.findAll();

  const stats = {
    totalProjects: projects.length,
    activeProjects: projects.filter((p) => p.status === 'Active').length,
    completedProjects: projects.filter((p) => p.status === 'Completed').length,
    totalTasks: tasks.length,
    pendingTasks: tasks.filter((t) => t.status === 'Pending').length,
    inProgressTasks: tasks.filter((t) => t.status === 'In Progress').length,
    completedTasks: tasks.filter((t) => t.completed).length,
    highPriorityTasks: tasks.filter((t) => t.priority === 'High' || t.priority === 'Critical').length,
    overdueTasks: tasks.filter((t) => t.deadline && new Date(t.deadline) < new Date() && !t.completed).length,
  };

  res.json({ stats, recentProjects: projects.slice(0, 3), recentTasks: tasks.slice(0, 5) });
};

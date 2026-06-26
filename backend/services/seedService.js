import bcrypt from 'bcrypt';
import { User } from '../models/User.js';
import { Project } from '../models/Project.js';
import { Task } from '../models/Task.js';
import { Notification } from '../models/Notification.js';

export const initializeData = async () => {
  const adminEmail = 'admin@projectnest.com';
  const admin = await User.findOne({ where: { email: adminEmail } });
  if (!admin) {
    const password = await bcrypt.hash('Admin123!', 10);
    await User.create({ name: 'ProjectNest Admin', email: adminEmail, password, role: 'Admin', profession: 'Platform Owner', organization: 'ProjectNest' });
  }

  const userEmail = 'user@projectnest.com';
  let user = await User.findOne({ where: { email: userEmail } });
  if (!user) {
    const password = await bcrypt.hash('User123!', 10);
    user = await User.create({ name: 'Demo User', email: userEmail, password, role: 'Student', profession: 'Student', organization: 'University', skills: 'React, Node, SQL', experience: '1 year' });
  }

  const existingProject = await Project.findOne({ where: { name: 'Product Launch' } });
  if (!existingProject) {
    await Project.create({
      name: 'Product Launch',
      description: 'Launch the new product with marketing, development, and release planning.',
      category: 'Marketing',
      status: 'Active',
      priority: 'High',
      deadline: new Date(new Date().setDate(new Date().getDate() + 14)),
      startDate: new Date(),
      tags: 'launch,marketing,release',
      teamMembers: 'Alice,Bob',
      estimatedHours: 120,
      progress: 45,
      ownerId: user.id
    });
  }

  const existingTask = await Task.findOne({ where: { title: 'Design landing page' } });
  if (!existingTask) {
    const project = await Project.findOne({ where: { ownerId: user.id } });
    await Task.create({
      title: 'Design landing page',
      description: 'Create wireframes and UI design for landing page.',
      category: 'Design',
      status: 'In Progress',
      priority: 'Medium',
      deadline: new Date(new Date().setDate(new Date().getDate() + 5)),
      projectId: project.id,
      notes: 'Use glassmorphism and gradient theme.'
    });
  }

  const existingNotification = await Notification.findOne({ where: { title: 'Welcome to ProjectNest' } });
  if (!existingNotification) {
    await Notification.create({ title: 'Welcome to ProjectNest', message: 'Your demo workspace is ready.', userId: user.id, type: 'info' });
  }
};

import { DataTypes } from 'sequelize';
import { Project } from './Project.js';
import { User } from './User.js';

export let Task;

export const initTaskModel = (sequelize) => {
  Task = sequelize.define('Task', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    category: { type: DataTypes.STRING, allowNull: true },
    status: { type: DataTypes.ENUM('Pending','In Progress','Completed','On Hold','Cancelled'), defaultValue: 'Pending' },
    priority: { type: DataTypes.ENUM('Low','Medium','High','Critical'), defaultValue: 'Medium' },
    deadline: { type: DataTypes.DATE, allowNull: true },
    estimatedHours: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    tags: { type: DataTypes.STRING, allowNull: true },
    notes: { type: DataTypes.TEXT, allowNull: true },
    attachments: { type: DataTypes.TEXT, allowNull: true },
    archived: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    completed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
  });

  Task.belongsTo(Project, { as: 'project', foreignKey: 'projectId' });
  Project.hasMany(Task, { as: 'tasks', foreignKey: 'projectId' });
  Task.belongsTo(User, { as: 'assignedUser', foreignKey: 'assignedUserId' });
  User.hasMany(Task, { as: 'tasks', foreignKey: 'assignedUserId' });
  return Task;
};

import { DataTypes } from 'sequelize';
import { User } from './User.js';

export let Project;

export const initProjectModel = (sequelize) => {
  Project = sequelize.define('Project', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    category: { type: DataTypes.STRING, allowNull: true },
    status: { type: DataTypes.ENUM('Planning','Active','On Hold','Completed','Cancelled','Archived'), defaultValue: 'Planning' },
    priority: { type: DataTypes.ENUM('Low','Medium','High','Critical'), defaultValue: 'Medium' },
    deadline: { type: DataTypes.DATE, allowNull: true },
    startDate: { type: DataTypes.DATE, allowNull: true },
    endDate: { type: DataTypes.DATE, allowNull: true },
    tags: { type: DataTypes.STRING, allowNull: true },
    teamMembers: { type: DataTypes.STRING, allowNull: true },
    estimatedHours: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    progress: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    attachments: { type: DataTypes.TEXT, allowNull: true },
    notes: { type: DataTypes.TEXT, allowNull: true },
    archived: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
  });
  Project.belongsTo(User, { as: 'owner', foreignKey: 'ownerId' });
  User.hasMany(Project, { as: 'projects', foreignKey: 'ownerId' });
  return Project;
};

import { DataTypes } from 'sequelize';
import { User } from './User.js';

export let Notification;

export const initNotificationModel = (sequelize) => {
  Notification = sequelize.define('Notification', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: true },
    type: { type: DataTypes.STRING, allowNull: true },
    read: { type: DataTypes.BOOLEAN, defaultValue: false }
  });

  Notification.belongsTo(User, { as: 'user', foreignKey: 'userId' });
  User.hasMany(Notification, { as: 'notifications', foreignKey: 'userId' });
  return Notification;
};

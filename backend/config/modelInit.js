import { initUserModel } from '../models/User.js';
import { initProjectModel } from '../models/Project.js';
import { initTaskModel } from '../models/Task.js';
import { initNotificationModel } from '../models/Notification.js';

export const initializeModels = (sequelize) => {
  initUserModel(sequelize);
  initProjectModel(sequelize);
  initTaskModel(sequelize);
  initNotificationModel(sequelize);
};

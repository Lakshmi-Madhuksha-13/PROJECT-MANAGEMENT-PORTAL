import { DataTypes } from 'sequelize';

export let User;

export const initUserModel = (sequelize) => {
  User = sequelize.define('User', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    password: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: true },
    profession: { type: DataTypes.STRING, allowNull: true },
    organization: { type: DataTypes.STRING, allowNull: true },
    skills: { type: DataTypes.TEXT, allowNull: true },
    experience: { type: DataTypes.STRING, allowNull: true },
    profilePicture: { type: DataTypes.STRING, allowNull: true },
    bio: { type: DataTypes.TEXT, allowNull: true },
    role: { type: DataTypes.ENUM('Student','Working Professional','Freelancer','Team Leader','Faculty','Startup Founder','Admin'), defaultValue: 'Student' },
    rememberToken: { type: DataTypes.STRING, allowNull: true }
  });
  return User;
};

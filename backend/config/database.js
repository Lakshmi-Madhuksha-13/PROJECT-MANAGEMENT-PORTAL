import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 3306;
const database = process.env.DB_NAME || 'projectnest';
const username = process.env.DB_USER || 'root';
const password = process.env.DB_PASSWORD || '';

const createMySQL = () => new Sequelize(database, username, password, {
  host,
  port,
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    connectTimeout: 10000,
  },
});

const createSQLite = () => new Sequelize({
  dialect: 'sqlite',
  storage: process.env.SQLITE_STORAGE || 'database.sqlite',
  logging: false,
});

export const initializeDatabase = async () => {
  const mysql = createMySQL();
  try {
    console.log(`Connecting to MySQL ${username}@${host}:${port}/${database}`);
    await mysql.authenticate();
    console.log('Connected to MySQL database');
    return mysql;
  } catch (error) {
    console.warn('MySQL connection failed, falling back to SQLite.');
    console.warn(`MySQL details: host=${host}, port=${port}, database=${database}, user=${username}`);
    const sqlite = createSQLite();
    await sqlite.authenticate();
    console.log('Connected to SQLite database fallback');
    return sqlite;
  }
};

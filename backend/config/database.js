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

const createPostgres = (url) => new Sequelize(url, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const createSQLite = () => new Sequelize({
  dialect: 'sqlite',
  storage: process.env.SQLITE_STORAGE || process.env.VERCEL ? '/tmp/database.sqlite' : 'database.sqlite',
  logging: false,
});

export const initializeDatabase = async () => {
  if (process.env.DATABASE_URL) {
    try {
      console.log('Connecting to database via DATABASE_URL...');
      const isPostgres = process.env.DATABASE_URL.startsWith('postgres');
      const db = isPostgres ? createPostgres(process.env.DATABASE_URL) : new Sequelize(process.env.DATABASE_URL, { logging: false });
      await db.authenticate();
      console.log(`Connected to database via DATABASE_URL (${isPostgres ? 'PostgreSQL' : 'default'})`);
      return db;
    } catch (error) {
      console.warn('Connection via DATABASE_URL failed, falling back to other connection methods.', error.message);
    }
  }

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

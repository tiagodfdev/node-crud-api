import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

// eslint-disable-next-line import/prefer-default-export
export const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!, 10),
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_DATABASE,
});

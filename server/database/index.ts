import { Pool, Client } from 'pg';

const database = process.env.NODE_ENV === 'test'
  ? process.env.TEST_DB_NAME
  : process.env.DB_NAME;

const connection = {
  database,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASS,
  port: 5432,
};

export const pool = new Pool(connection);
export const client = new Client(connection);

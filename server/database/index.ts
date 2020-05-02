import { Pool, Client } from 'pg';

const connection = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
};

export const pool = new Pool(connection);
export const client = new Client(connection);
client.connect();

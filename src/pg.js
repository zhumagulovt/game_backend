require('dotenv').config()

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.on('connect', () => {
  console.log('connected to db');
});

pool.on('error', () => {
  console.log('error');
  process.exit(1);
});

module.exports = {
  pool,
};
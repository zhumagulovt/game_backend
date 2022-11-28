const bcrypt = require('bcrypt');
const crypto = require('crypto');

const { pool } = require('../pg');

const saltRounds = 12;

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}

async function createUser(email, password) {

  const hashedPassword = await hashPassword(password);

  const data = await pool.query(
    `INSERT INTO users (email, password) 
     VALUES ($1, $2)
     RETURNING id, email;`, [email, hashedPassword]
  );
    
  return data.rows[0];
}

async function genereateAuthToken(user_id) {
  const token = await crypto.randomBytes(20).toString('hex');

  await pool.query(
    `INSERT INTO user_tokens (token, userid) 
     VALUES ($1, $2);`, [token, user_id]
  );

  return token;
}

async function checkCredentials(email, password) {

  const data = await pool.query(`
    SELECT * FROM users
    WHERE email=$1
  `, [email]);

  if (data.rows.length === 0) {
    throw('This email is not registered');
  }

  const match = await bcrypt.compare(password, data.rows[0].password);

  if (!match) {
    throw('Incorrect password');
  }

  return data.rows[0];
}

async function getUserByPk(user_id) {
  const data = await pool.query(
    `SELECT id, email FROM users 
      WHERE id=$1;`, [user_id]
  );

  if (data.rows.length === 0) {
    return ;
  }

  return data.rows[0];
}

async function checkAuthToken(token) {
  const data = await pool.query(
    `SELECT * FROM user_tokens 
      WHERE token=$1;`, [token]
  );

  if (data.rows.length === 0) {
    return ;
  }

  const user = await getUserByPk(data.rows[0].userid);

  return user;
}

module.exports = {
  checkCredentials,
  createUser,
  genereateAuthToken,
  checkAuthToken
};
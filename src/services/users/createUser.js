const { pool } = require('../../pg');
const bcrypt = require('bcrypt');
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

module.exports = {
  createUser,
};
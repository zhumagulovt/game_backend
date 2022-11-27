const { pool } = require('../../pg');
const bcrypt = require('bcrypt');

async function loginCheck(email, password) {
  const data = await pool.query(`
    SELECT * FROM users
    WHERE email=$1
  `, [email]);

  if (data.rows.length === 0) {
    return false;
  }

  const match = await bcrypt.compare(password, data.rows[0].password);

  if (!match) return false;

  return true;
}

module.exports = {
  loginCheck
}
import { pool } from '../config/db.js';

export const createUser = async (client, { email, username, first_name, last_name }) => {
  const res = await client.query(
    `INSERT INTO users (email, username, first_name, last_name)
     VALUES ($1, $2, $3, $4) RETURNING username`,
    [email, username, first_name, last_name]
  );
  return res.rows[0];
};

export const storeHashedPassword = async (client, username, hashedPassword) => {
  await client.query(
    `INSERT INTO hashpwd (username, password) VALUES ($1, $2)`,
    [username, hashedPassword]
  );
};

export const getAllUsers = async () => {
  const res = await pool.query(`SELECT * FROM users ORDER BY id`);
  return res.rows;
};

export const getUserById = async (id) => {
  const res = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return res.rows[0];
};

export const updateUserById = async (id, data) => {
  const { email, username, first_name, last_name } = data;
  const res = await pool.query(
    `UPDATE users SET email=$1, username=$2, first_name=$3, last_name=$4 WHERE id=$5 RETURNING *`,
    [email, username, first_name, last_name, id]
  );
  return res.rows[0];
};

export const getPasswordByUsername = async (username) => {
  const res = await pool.query(`SELECT password FROM hashpwd WHERE username = $1`, [username]);
  return res.rows[0];
};

import bcrypt from 'bcrypt';
import { pool } from '../config/db.js';
import {
  createUser,
  storeHashedPassword,
  getAllUsers,
  getUserById,
  updateUserById,
  getPasswordByUsername
} from '../models/users.js';

export const registerUser = async (req, res) => {
  const { email, username, first_name, last_name, password } = req.body;
  if (!email || !username || !password) return res.status(400).json({ message: 'Required fields missing' });

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const user = await createUser(client, { email, username, first_name, last_name });
    const hashedPassword = await bcrypt.hash(password, 10);
    await storeHashedPassword(client, user.username, hashedPassword);
    await client.query('COMMIT');
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ message: 'Registration failed', error: err.message });
  } finally {
    client.release();
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Username and password required' });

  try {
    const record = await getPasswordByUsername(username);
    if (!record) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, record.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await updateUserById(req.params.id, req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};
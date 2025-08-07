import express from 'express';
import fs from 'fs/promises';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config(); 
const USERS_FILE = 'users.json';
const JWT_SECRET = process.env.JWT_SECRET;

// Helpers
async function readUsers() {
  const data = await fs.readFile(USERS_FILE, 'utf-8');
  return JSON.parse(data);
}

async function writeUsers(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

// Register
router.post('/register', async (req, res) => {
  const { username, password, email, first_name, last_name } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Missing required fields' });

  const users = await readUsers();
  const exists = users.find(u => u.username === username || u.email === email);
  if (exists) return res.status(400).json({ message: 'error1' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: uuid(), username, email, first_name, last_name, password: hashedPassword };
  users.push(newUser);
  await writeUsers(users);

  res.json({ message: 'register', newUser });
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const users = await readUsers();
  const user = users.find(u => u.username === username);
  if (!user) return res.status(404).json({ message: 'error2' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Invalid password' });

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true, secure: false });
  res.json({ message: 'login is Success',});
});

// GET users
router.get('/users', async (_, res) => {
  const users = await readUsers();
  res.json(users);
});

router.get('/users/:id', async (req, res) => {
  const users = await readUsers();
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

router.put('/users/:id', async (req, res) => {
  const users = await readUsers();
  const index = users.findIndex(u => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'User not found' });

  users[index] = { ...users[index], ...req.body };
  await writeUsers(users);
  res.json({ message: 'User updated' });
});

export default router;

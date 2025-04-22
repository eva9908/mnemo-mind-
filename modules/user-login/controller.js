// Created: 2025-04-22T18:20:00
// Controller: 用户登录模块
import jwt from 'jsonwebtoken';
import User from '../../database/models/User.js';

const JWT_SECRET = process.env.JWT_SECRET;

export async function register(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.register(email, password);
    res.json({ id: user._id, email: user.email, createdAt: user.createdAt });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.authenticate(email, password);
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

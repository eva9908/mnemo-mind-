// Created: 2025-04-22T18:20:00
// Service: 用户登录模块
import User from '../../database/models/User.js';

export async function registerService(email, password) {
  return User.register(email, password);
}

export async function loginService(email, password) {
  return User.authenticate(email, password);
}

// Created: 2025-04-22T18:10:00
// 用户模型
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
}, { timestamps: true });

UserSchema.statics.register = async function(email, password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = new this({ email, passwordHash: hash });
  return user.save();
};

UserSchema.statics.authenticate = async function(email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error('用户不存在');
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new Error('密码错误');
  return user;
};

export default mongoose.model('User', UserSchema);

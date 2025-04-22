// Created: 2025-04-22T18:45:00
// 成就模型
import mongoose from 'mongoose';

const AchievementSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  progress: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Achievement', AchievementSchema);

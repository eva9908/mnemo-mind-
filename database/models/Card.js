// Created: 2025-04-22T18:30:00
// 卡片模型
import mongoose from 'mongoose';

const CardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  frontText: { type: String, required: true },
  backText: { type: String, required: true },
  imageUrl: { type: String },
  audioUrl: { type: String },
}, { timestamps: true });

export default mongoose.model('Card', CardSchema);

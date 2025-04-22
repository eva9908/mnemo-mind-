// Created: 2025-04-22T18:35:00
// 复习记录模型
import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  cardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Card', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['mastered', 'pending'], default: 'pending' },
  reviewDate: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Review', ReviewSchema);

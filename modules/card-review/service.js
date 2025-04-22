// Created: 2025-04-22T18:50:00
// Service: 卡片复习模块
import Review from '../../database/models/Review.js';

/**
 * 获取用户待复习的记录
 * @param {string} userId 用户 ID
 */
export async function getDueReviews(userId) {
  return Review.find({ userId, status: 'pending' });
}

/**
 * 更新复习记录状态
 * @param {string} reviewId 记录 ID
 * @param {string} status 新状态
 */
export async function updateReviewStatus(reviewId, status) {
  return Review.findByIdAndUpdate(reviewId, { status, reviewDate: Date.now() }, { new: true });
}

// Created: 2025-04-22T18:55:00
// Controller: 卡片复习模块
import Review from '../../database/models/Review.js';
import Card from '../../database/models/Card.js';

/**
 * 获取待复习卡片
 * GET /api/review/due/:userId
 */
export async function getDueCards(req, res) {
  const { userId } = req.params;
  try {
    const reviews = await Review.find({ userId, status: 'pending' }).populate('cardId');
    const cards = reviews.map(r => ({ reviewId: r._id, ...r.cardId._doc }));
    res.json({ cards, timestamp: Date.now() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * 提交复习结果
 * POST /api/review/submit
 * Body: { reviewId: string, status: 'mastered' | 'pending' }
 */
export async function submitReview(req, res) {
  const { reviewId, status } = req.body;
  try {
    const review = await Review.findByIdAndUpdate(reviewId, { status, reviewDate: Date.now() }, { new: true });
    res.json({ review, timestamp: Date.now() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

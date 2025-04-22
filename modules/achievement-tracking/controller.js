// Created: 2025-04-22T18:58:00
// Controller: 成就追踪模块
import Achievement from '../../database/models/Achievement.js';

/**
 * 获取用户成就列表
 * GET /api/achievement/:userId
 */
export async function getAchievements(req, res) {
  try {
    const { userId } = req.params;
    const list = await Achievement.find({ userId });
    res.json({ achievements: list, timestamp: Date.now() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * 更新或创建成就
 * POST /api/achievement/update
 * Body: { userId: string, type: string, progress: number }
 */
export async function updateAchievement(req, res) {
  try {
    const { userId, type, progress } = req.body;
    const ach = await Achievement.findOneAndUpdate(
      { userId, type },
      { progress, updatedAt: Date.now() },
      { upsert: true, new: true }
    );
    res.json({ achievement: ach, timestamp: Date.now() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Created: 2025-04-22T18:55:00
// Controller: 卡片生成模块
import { generateText, generateImage, generateTTS } from '../../services/huggingface.js';
import Card from '../../database/models/Card.js';

/**
 * POST /api/card/generate
 * Body: { prompt: string, userId: string }
 */
export async function generateCard(req, res) {
  try {
    const { prompt, userId } = req.body;
    // 文本生成前面和背面
    const frontText = await generateText(`请从以下内容中提取知识点，生成问题: ${prompt}`);
    const backText = await generateText(`请从以下内容中提取知识点，生成答案: ${prompt}`);
    // 图像生成
    const imageUrl = await generateImage(prompt);
    // TTS
    const audioUrl = await generateTTS(backText);
    // 存储卡片
    const card = await Card.create({ userId, frontText, backText, imageUrl, audioUrl });
    res.json({ card, timestamp: Date.now() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

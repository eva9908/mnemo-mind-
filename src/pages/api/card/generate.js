// Created: 2025-04-22T23:45:00
import { connectToDB } from '../../../utils/db';
import Card from '../../../../database/models/Card.js';
import { generateText, generateImage, generateTTS } from '../../../services/huggingface.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });
  try {
    await connectToDB();
    const { prompt, userId } = req.body;
    const frontText = await generateText(`请从以下内容中提取知识点，生成问题: ${prompt}`);
    const backText = await generateText(`请从以下内容中提取知识点，生成答案: ${prompt}`);
    const imageUrl = await generateImage(prompt);
    const audioUrl = await generateTTS(backText);
    const card = await Card.create({ userId, frontText, backText, imageUrl, audioUrl });
    return res.status(200).json({ card, timestamp: Date.now() });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}

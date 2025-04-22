// Created: 2025-04-22T23:50:00
import { connectToDB } from '../../../../utils/db';
import Review from '../../../../../database/models/Review';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  const { userId } = req.query;
  try {
    await connectToDB();
    const reviews = await Review.find({ userId, status: 'pending' }).populate('cardId');
    const cards = reviews.map(r => ({ reviewId: r._id, ...r.cardId._doc }));
    return res.status(200).json({ cards, timestamp: Date.now() });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}

// Created: 2025-04-22T23:55:00
import { connectToDB } from '../../../utils/db';
import Review from '../../../../database/models/Review';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });
  const { reviewId, status } = req.body;
  try {
    await connectToDB();
    const review = await Review.findByIdAndUpdate(reviewId, { status, reviewDate: Date.now() }, { new: true });
    return res.status(200).json({ review, timestamp: Date.now() });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}

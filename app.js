// Created: 2025-04-22T18:15:00
// Main server entry
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userLoginRoutes from './routes/user-login.js';
import cardGenRoutes from './routes/card-generator.js';
import cardReviewRoutes from './routes/card-review.js';
import notionSyncRoutes from './routes/notion-sync.js';
import achievementRoutes from './routes/achievement-tracking.js';

dotenv.config();
const app = express();
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/user', userLoginRoutes);
app.use('/api/card', cardGenRoutes);
app.use('/api/review', cardReviewRoutes);
app.use('/api/notion', notionSyncRoutes);
app.use('/api/achievement', achievementRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

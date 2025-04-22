// Created: 2025-04-22T18:15:00
// Controller: Notion 同步模块
import { listDatabases, listPages, createCard } from '../../services/notion.js';

/**
 * GET /api/notion/databases
 */
export async function getDatabases(req, res) {
  try {
    const dbs = await listDatabases();
    res.json({ databases: dbs, timestamp: Date.now() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * GET /api/notion/pages/:databaseId
 */
export async function getPages(req, res) {
  try {
    const pages = await listPages(req.params.databaseId);
    res.json({ pages, timestamp: Date.now() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * POST /api/notion/upload
 * Body: { databaseId: string, cards: Array<{front, back, tags}> }
 */
export async function uploadCards(req, res) {
  try {
    const { databaseId, cards } = req.body;
    const results = await Promise.all(cards.map(c => createCard(databaseId, c)));
    res.json({ results, timestamp: Date.now() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Created: 2025-04-22T19:00:00
// Service: Notion 同步模块（代理 controllers 调用）
import { listDatabases, listPages, createCard } from '../../services/notion.js';

export async function listDatabasesService() {
  return listDatabases();
}

export async function listPagesService(databaseId) {
  return listPages(databaseId);
}

export async function createCardsService(databaseId, cards) {
  return Promise.all(cards.map(c => createCard(databaseId, c)));
}

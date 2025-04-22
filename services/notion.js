// Created: 2025-04-22T18:05:00
// Module: Notion 同步服务封装
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const NOTION_TOKEN = process.env.NOTION_API_TOKEN;
const NOTION_VERSION = process.env.NOTION_VERSION || '2022-06-28';

if (!NOTION_TOKEN) console.warn('Missing NOTION_API_TOKEN in environment');

const NOTION_HEADERS = {
  'Authorization': `Bearer ${NOTION_TOKEN}`,
  'Notion-Version': NOTION_VERSION,
  'Content-Type': 'application/json'
};

/**
 * 搜索用户的数据库列表
 * @returns {Promise<Array>} 数据库清单
 */
export async function listDatabases() {
  const url = 'https://api.notion.com/v1/search';
  const body = { filter: { value: 'database', property: 'object' } };
  const res = await axios.post(url, body, { headers: NOTION_HEADERS });
  return res.data.results.map(db => ({ id: db.id, title: db.title }));
}

/**
 * 获取数据库中的页面（行）
 * @param {string} databaseId 数据库 ID
 * @returns {Promise<Array>} 页面列表
 */
export async function listPages(databaseId) {
  const url = `https://api.notion.com/v1/databases/${databaseId}/query`;
  const res = await axios.post(url, {}, { headers: NOTION_HEADERS });
  return res.data.results;
}

/**
 * 向指定数据库添加卡片数据
 * @param {string} databaseId 数据库 ID
 * @param {{front: string, back: string, tags: string[]}} card 卡片内容
 * @returns {Promise<Object>} Notion 返回结果
 */
export async function createCard(databaseId, card) {
  const url = 'https://api.notion.com/v1/pages';
  const properties = {
    Front: { title: [{ text: { content: card.front } }] },
    Back: { rich_text: [{ text: { content: card.back } }] },
    Tags: { multi_select: card.tags.map(tag => ({ name: tag })) }
  };
  const body = { parent: { database_id: databaseId }, properties };
  const res = await axios.post(url, body, { headers: NOTION_HEADERS });
  return res.data;
}

// Created: 2025-04-22T18:00:00
// Script: 自动从 docs/PRD.md 读取模块名并生成前后端及数据库模型及 API 文档骨架
import fs from 'fs';
import path from 'path';

// 配置映射：PRD 模块名称 -> 文件夹名
const modules = {
  '用户登录模块': 'user-login',
  '卡片生成模块': 'card-generator',
  '卡片复习模块': 'card-review',
  'Notion 同步模块': 'notion-sync',
  '成就追踪模块': 'achievement-tracking'
};

const projectRoot = path.resolve(__dirname, '..');
const dirs = {
  frontend: path.join(projectRoot, 'src/modules'),
  backendModules: path.join(projectRoot, 'server/modules'),
  backendRoutes: path.join(projectRoot, 'server/routes'),
  dbModels: path.join(projectRoot, 'database/models'),
  apiDocs: path.join(projectRoot, 'docs/apis')
};

// 创建所需目录
Object.values(dirs).forEach(dir => { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); });

Object.entries(modules).forEach(([name, folder]) => {
  // 前端
  const feDir = path.join(dirs.frontend, folder, 'components');
  fs.mkdirSync(feDir, { recursive: true });
  fs.writeFileSync(path.join(feDir, `${toPascal(folder)}.jsx`),
`// TODO: 实现 ${name} 前端组件
import React from 'react';
const ${toPascal(folder)} = () => <div>${name} Component</div>;
export default ${toPascal(folder)};
`);

  // 后端模块 controller & service
  const beDir = path.join(dirs.backendModules, folder);
  fs.mkdirSync(beDir, { recursive: true });
  fs.writeFileSync(path.join(beDir, 'controller.js'),
`// TODO: 实现 ${name} 控制器
export const handler = async (req, res) => { res.json({ module: '${folder}', timestamp: Date.now() }); };
`);
  fs.writeFileSync(path.join(beDir, 'service.js'),
`// TODO: 实现 ${name} 服务逻辑
export const process = async (data) => { /* ... */ };
`);

  // 路由
  fs.writeFileSync(path.join(dirs.backendRoutes, `${folder}.js`),
`import express from 'express';
import { handler } from '../modules/${folder}/controller.js';
const router = express.Router();
router.post('/${folder}', handler);
export default router;
`);

  // 数据库模型
  fs.writeFileSync(path.join(dirs.dbModels, `${toPascal(folder)}.js`),
`// TODO: 定义 ${name} Mongoose 模型
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ${toPascal(folder)}Schema = new Schema({ /* fields */ }, { timestamps: true });
export default mongoose.model('${toPascal(folder)}', ${toPascal(folder)}Schema);
`);

  // API 文档
  fs.writeFileSync(path.join(dirs.apiDocs, `${folder}.md`),
`# ${name} API

REST endpoints for ${name}.
`);
});

function toPascal(str) {
  return str.split(/[-_]/).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
}

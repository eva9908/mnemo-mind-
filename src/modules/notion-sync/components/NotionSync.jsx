// Created: 2025-04-22T18:27:00
// Module: notion-sync
import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';

const fetchDatabases = () => fetch('/api/notion/databases').then(res => res.json());
const fetchPages = dbId => fetch(`/api/notion/pages/${dbId}`).then(res => res.json());
const uploadCards = data => fetch('/api/notion/upload', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data) }).then(res=>res.json());

export default function NotionSync() {
  const [dbId, setDbId] = useState('');
  const [cards, setCards] = useState([]);
  const { data: dbData } = useQuery('databases', fetchDatabases);
  const { data: pageData } = useQuery(['pages', dbId], () => fetchPages(dbId), { enabled: !!dbId });
  const mutation = useMutation(uploadCards);

  const handleUpload = () => {
    mutation.mutate({ databaseId: dbId, cards });
  };

  return (
    <div>
      <h2>Notion 同步</h2>
      <div>
        <label>选择数据库：</label>
        <select value={dbId} onChange={e=>setDbId(e.target.value)}>
          <option value="">--Select--</option>
          {dbData?.databases.map(db => <option key={db.id} value={db.id}>{db.title}</option>)}
        </select>
      </div>
      {pageData?.pages && <p>共 {pageData.pages.length} 条页面</p>}
      <button onClick={handleUpload} disabled={!cards.length}>上传卡片</button>
      {mutation.isSuccess && <p>上传成功</p>}
    </div>
  );
}

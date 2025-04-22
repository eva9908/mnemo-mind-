// Created: 2025-04-22T18:50:00
// Module: card-generator
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

const CardGenerator = () => {
  const router = useRouter();
  const [prompt, setPrompt] = useState('');
  const mutation = useMutation(data => fetch('/api/card/generate', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
  }).then(res => res.json()));
  const handleSubmit = e => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    mutation.mutate({ prompt, userId });
  };
  return (
    <div className="card-generator">
      <h2>卡片生成</h2>
      <form onSubmit={handleSubmit}>
        <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="输入学习内容" required />
        <button type="submit">生成卡片</button>
      </form>
      {mutation.isLoading && <p>生成中...</p>}
      {mutation.data && (
        <div className="card">
          <h3>Q: {mutation.data.card.frontText}</h3>
          <img src={mutation.data.card.imageUrl} alt="Card Image" />
          <button onClick={()=>router.push('/review')}>开始复习</button>
        </div>
      )}
    </div>
  );
};

export default CardGenerator;

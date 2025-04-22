// Created: 2025-04-22T18:23:00
// Module: card-review
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const fetchDue = userId => fetch(`/api/review/due/${userId}`).then(res=>res.json());
const postSubmit = data => fetch('/api/review/submit', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data) }).then(res=>res.json());

export default function ReviewComponent() {
  const userId = localStorage.getItem('userId');
  const qc = useQueryClient();
  const { data, isLoading } = useQuery(['due', userId], () => fetchDue(userId));
  const mutation = useMutation(postSubmit, { onSuccess: () => qc.invalidateQueries(['due', userId]) });
  const [showBack, setShowBack] = useState(null);

  if (isLoading) return <p>加载中...</p>;
  if (!data.cards.length) return <p>暂无待复习卡片</p>;

  const card = data.cards[0];
  return (
    <div className="review-card">
      <div><strong>Q:</strong> {card.frontText}</div>
      {showBack && <div><strong>A:</strong> {card.backText} <button onClick={()=>new Audio(card.audioUrl).play()}>🔊</button></div>}
      {!showBack
        ? <button onClick={()=>setShowBack(card.reviewId)}>查看答案</button>
        : <div>
            <button onClick={()=>mutation.mutate({ reviewId: card.reviewId, status:'mastered' })}>已掌握</button>
            <button onClick={()=>mutation.mutate({ reviewId: card.reviewId, status:'pending' })}>未掌握</button>
          </div>
      }
    </div>
  );
}

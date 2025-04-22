// Created: 2025-04-22T18:30:00
// Module: achievement-tracking
import React from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchAchievements = userId => fetch(`/api/achievement/${userId}`).then(res => res.json());

export default function AchievementTracker() {
  const userId = localStorage.getItem('userId');
  const { data, isLoading, isError, error } = useQuery(['achievements', userId], () => fetchAchievements(userId));
  if (isLoading) return <p>加载中...</p>;
  if (isError) return <p>错误：{error.message}</p>;
  return (
    <div>
      <h2>成就追踪</h2>
      <ul>
        {data.achievements.map(a => (
          <li key={a._id}>{a.type}: {a.progress}</li>
        ))}
      </ul>
    </div>
  );
}

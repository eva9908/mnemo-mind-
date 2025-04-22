// Created: 2025-04-22T17:59:53
// Module: user-login
// A React component placeholder for user login UI
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';

const LoginComponent = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const mutation = useMutation(data => fetch('/api/user/login', {
    method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(data)
  }).then(res => res.json()));
  const handleSubmit = async e => {
    e.preventDefault();
    const res = await mutation.mutateAsync({ email, password });
    if (res.token) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('userId', res.user.id);
      router.push('/card-generator');
    }
  };
  return (
    <div className="login-container">
      <h2>User Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      {mutation.isError && <p>{mutation.error.message}</p>}
    </div>
  );
};

export default LoginComponent;

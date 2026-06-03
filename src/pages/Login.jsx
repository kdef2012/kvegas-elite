import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulated login - immediately redirect to the dashboard
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      <div className="login-card fade-in">
        <div className="login-header">
          <img src="/logo.jpg" alt="K-Vegas Elite" className="login-logo" />
          <h2>Member <span>Login</span></h2>
        </div>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              placeholder="athlete@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            Access Hub
          </button>
        </form>
        
        <div className="login-footer">
          <p>Don't have an account? <span onClick={() => navigate('/join')} style={{ color: 'var(--primary-red)', cursor: 'pointer', textDecoration: 'underline' }}>Join the team.</span></p>
          <button onClick={() => navigate('/')} className="btn btn-outline" style={{ marginTop: '2rem', fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
            &larr; Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

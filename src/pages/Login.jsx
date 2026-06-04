import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to authenticate.');
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-card fade-in">
        <div className="login-header">
          <img src="/logo.jpg" alt="K-Vegas Elite" className="login-logo" />
          <h2>Member <span>Login</span></h2>
        </div>
        
        {error && <div style={{ color: '#D92121', background: 'rgba(217,33,33,0.1)', padding: '1rem', borderRadius: '4px', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
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
          
          <button disabled={loading} type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            Access Hub
          </button>
        </form>
        
        <div className="login-footer">
          <p>
            Don't have an account? 
            <span 
              onClick={() => navigate('/join')} 
              style={{ color: '#D92121', cursor: 'pointer', textDecoration: 'underline', marginLeft: '0.5rem' }}>
              Join the team for free.
            </span>
          </p>
          <button onClick={() => navigate('/')} className="btn btn-outline" style={{ marginTop: '2rem', fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
            &larr; Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

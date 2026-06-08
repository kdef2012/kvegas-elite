import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const { login, resetPassword } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResetMessage('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to authenticate.');
    }
    setLoading(false);
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError('Please enter your email address above to reset your password.');
      setResetMessage('');
      return;
    }
    try {
      setLoading(true);
      await resetPassword(email);
      setResetMessage('Password reset email sent! Check your inbox.');
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to reset password.');
      setResetMessage('');
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
        {resetMessage && <div style={{ color: '#00ff00', background: 'rgba(0,255,0,0.1)', padding: '1rem', borderRadius: '4px', marginBottom: '1rem', textAlign: 'center' }}>{resetMessage}</div>}

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
          <div style={{ textAlign: 'right', marginTop: '-0.5rem', marginBottom: '1rem' }}>
            <span onClick={handleResetPassword} style={{ color: '#a0a0a0', cursor: 'pointer', fontSize: '0.85rem', textDecoration: 'underline' }}>
              Forgot Password?
            </span>
          </div>
          
          <button disabled={loading} type="submit" className="btn btn-primary" style={{ width: '100%' }}>
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

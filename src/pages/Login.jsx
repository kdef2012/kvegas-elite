import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        await signup(email, password, name);
      } else {
        await login(email, password);
      }
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
          <h2>{isSignUp ? 'Join the ' : 'Member '}<span>{isSignUp ? 'Team' : 'Login'}</span></h2>
        </div>
        
        {error && <div style={{ color: '#D92121', background: 'rgba(217,33,33,0.1)', padding: '1rem', borderRadius: '4px', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          {isSignUp && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input 
                type="text" 
                id="name" 
                placeholder="Jordan Burroughs" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={isSignUp} 
              />
            </div>
          )}

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
            {isSignUp ? 'Create Free Account' : 'Access Hub'}
          </button>
        </form>
        
        <div className="login-footer">
          <p>
            {isSignUp ? "Already have an account?" : "Don't have an account?"} 
            <span 
              onClick={() => { setIsSignUp(!isSignUp); setError(''); }} 
              style={{ color: '#D92121', cursor: 'pointer', textDecoration: 'underline', marginLeft: '0.5rem' }}>
              {isSignUp ? "Log in instead." : "Join the team for free."}
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

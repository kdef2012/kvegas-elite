import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './MemberDashboard.css';

export default function MemberDashboard() {
  const navigate = useNavigate();
  const { userProfile, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <div className="member-dashboard fade-in">
      {/* Dashboard Nav */}
      <nav className="dashboard-nav">
        <div className="logo-section" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <img src="/logo.jpg" alt="K-Vegas Elite" />
          <span>K-Vegas Elite</span>
        </div>
        <div className="user-controls">
          <span className="user-badge">{userProfile?.role === 'admin' ? 'Coach' : 'Athlete'}</span>
          <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>Log Out</button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="dashboard-header">
        <h2 style={{ fontFamily: 'Oswald, sans-serif', color: '#D92121', fontSize: '2.5rem', textTransform: 'uppercase' }}>
          {userProfile?.role === 'admin' ? 'Coach' : 'Athlete'} <span style={{ color: '#fff' }}>Hub</span>
        </h2>
        <p style={{ color: '#a0a0a0' }}>Welcome back, {userProfile?.name || 'Athlete'}. Stay sharp.</p>
      </div>

      </div>

      {/* Profile Details & Unlocked Content */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
        <div style={{ background: 'rgba(25, 25, 25, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '2rem' }}>
          <h3 style={{ borderBottom: '1px solid #D92121', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Profile Information</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#a0a0a0' }}>Membership Tier:</span>
              <span style={{ color: userProfile?.membership === 'elite' ? '#00ff00' : (userProfile?.membership === 'beginner' ? '#FFD700' : '#fff'), fontWeight: 'bold', textTransform: 'uppercase' }}>{userProfile?.membership || 'none'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#a0a0a0' }}>Age:</span>
              <span>{userProfile?.age || 'Not set'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#a0a0a0' }}>School:</span>
              <span>{userProfile?.school || 'Not set'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#a0a0a0' }}>Competition Team:</span>
              <span style={{ color: userProfile?.competition === 'yes' ? '#D92121' : '#fff', fontWeight: 'bold' }}>{userProfile?.competition === 'yes' ? 'YES' : 'NO'}</span>
            </div>
            {(userProfile?.accountType === 'parent' || userProfile?.parentName) && (
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.8rem', marginTop: '0.5rem' }}>
                <span style={{ color: '#a0a0a0' }}>Parent/Guardian:</span>
                <span>{userProfile?.parentName}</span>
              </div>
            )}
          </div>
        </div>

        <div style={{ background: 'rgba(25, 25, 25, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '2rem' }}>
          <h3 style={{ borderBottom: '1px solid #D92121', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Unlocked Content</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: (userProfile?.membership === 'elite' || userProfile?.membership === 'beginner') ? '#00ff00' : '#ff4444' }}>
                {(userProfile?.membership === 'elite' || userProfile?.membership === 'beginner') ? '✓' : '🔒'}
              </span>
              <span>Strength & Conditioning Library</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: userProfile?.unlockedVideos?.length > 0 ? '#00ff00' : '#a0a0a0' }}>
                {userProfile?.unlockedVideos?.length > 0 ? '✓' : '—'}
              </span>
              <span>{userProfile?.unlockedVideos?.length || 0} Technique Videos Unlocked</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Personal Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <div style={{ background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 215, 0, 0.05))', border: '1px solid rgba(255, 215, 0, 0.3)', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🥇</div>
          <div style={{ color: '#FFD700', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', fontWeight: 'bold' }}>Gold Medals</div>
          <div style={{ fontSize: '2.5rem', fontFamily: 'Oswald, sans-serif', color: '#fff' }}>{userProfile?.medals?.gold || 0}</div>
        </div>
        
        <div style={{ background: 'linear-gradient(135deg, rgba(192, 192, 192, 0.1), rgba(192, 192, 192, 0.05))', border: '1px solid rgba(192, 192, 192, 0.3)', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🥈</div>
          <div style={{ color: '#C0C0C0', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', fontWeight: 'bold' }}>Silver Medals</div>
          <div style={{ fontSize: '2.5rem', fontFamily: 'Oswald, sans-serif', color: '#fff' }}>{userProfile?.medals?.silver || 0}</div>
        </div>
        
        <div style={{ background: 'linear-gradient(135deg, rgba(205, 127, 50, 0.1), rgba(205, 127, 50, 0.05))', border: '1px solid rgba(205, 127, 50, 0.3)', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🥉</div>
          <div style={{ color: '#CD7F32', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', fontWeight: 'bold' }}>Bronze Medals</div>
          <div style={{ fontSize: '2.5rem', fontFamily: 'Oswald, sans-serif', color: '#fff' }}>{userProfile?.medals?.bronze || 0}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
        <div className="glass-card hub-panel">
            <h3>Training Resources</h3>
            <div className="action-list">
              <Link to="/calendar" className="action-item">
                <div className="icon">📅</div>
                <div className="action-text">
                  <h4>Schedule & Private Lessons</h4>
                  <p>View upcoming practices and book 1-on-1 sessions</p>
                </div>
              </Link>
              
              <Link to="/strength" className="action-item">
                <div className="icon">🏋️</div>
                <div className="action-text">
                  <h4>S&C Library</h4>
                  <p>Access periodized strength protocols</p>
                </div>
              </Link>

              <Link to="/technique" className="action-item">
                <div className="icon">🤼</div>
                <div className="action-text">
                  <h4>Technique Vault</h4>
                  <p>Master Neutral, Top, and Bottom positions</p>
                </div>
              </Link>

              <Link to="/leaderboard" className="action-item">
                <div className="icon">🏆</div>
                <div className="action-text">
                  <h4>Leaderboards</h4>
                  <p>See where you rank on the team</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Communication & Analysis */}
          <div className="glass-card hub-panel">
            <h3>Communication</h3>
            <div className="action-list">
              <Link to="/chat" className="action-item">
                <div className="icon">💬</div>
                <div className="action-text">
                  <h4>Team Chat</h4>
                  <p>Connect with coaches and teammates</p>
                </div>
              </Link>
              
              <Link to="/analysis" className="action-item">
                <div className="icon">📹</div>
                <div className="action-text">
                  <h4>Match Analysis</h4>
                  <p>Submit footage for Coach Nelson to review</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Upcoming Events Widget */}
          <div className="glass-card hub-panel announcements-panel">
            <h3>Coach's Bulletin</h3>
            <div className="bulletin-board">
              <div className="bulletin-item">
                <span className="date">Oct 14</span>
                <h4>Super 32 Registration</h4>
                <p>Registration closes this Friday. Make sure your weight class is finalized.</p>
              </div>
              <div className="bulletin-item">
                <span className="date">Oct 18</span>
                <h4>Open Mat Cancellation</h4>
                <p>Sunday open mat is cancelled due to the facility maintenance schedule.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
  );
}

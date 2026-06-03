import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [roster, setRoster] = useState([
    { id: 1, name: 'Alex Smith', team: 'Competition Team', status: 'Awaiting Waiver Approval' }
  ]);

  const handleAccept = (id) => {
    setRoster(roster.filter(athlete => athlete.id !== id));
    alert('Athlete accepted to active roster.');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '2rem', color: '#fff', fontFamily: 'Inter, sans-serif' }} className="fade-in">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontFamily: 'Oswald, sans-serif', color: '#D92121', fontSize: '2.5rem', textTransform: 'uppercase' }}>
          Coach's <span style={{ color: '#fff' }}>Dashboard</span>
        </h2>
        <p style={{ color: '#a0a0a0' }}>Welcome back, Coach Nelson. Here is your daily overview.</p>
      </div>

      {/* Analytics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <div style={{ background: 'rgba(25, 25, 25, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ color: '#a0a0a0', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Active Roster</div>
          <div style={{ fontSize: '2.5rem', fontFamily: 'Oswald, sans-serif', color: '#fff' }}>42 <span style={{ fontSize: '1rem', color: '#00ff00' }}>+3</span></div>
        </div>
        <div style={{ background: 'rgba(25, 25, 25, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ color: '#a0a0a0', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Monthly Revenue</div>
          <div style={{ fontSize: '2.5rem', fontFamily: 'Oswald, sans-serif', color: '#D92121' }}>$4,250</div>
        </div>
        <div style={{ background: 'rgba(25, 25, 25, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ color: '#a0a0a0', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Practice Attendance</div>
          <div style={{ fontSize: '2.5rem', fontFamily: 'Oswald, sans-serif', color: '#fff' }}>88%</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        {/* Pending Match Analysis Card */}
        <div style={{ background: 'rgba(25, 25, 25, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '2rem' }}>
          <h3 style={{ borderBottom: '1px solid #D92121', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Pending Video Analysis</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', marginBottom: '0.5rem', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>Jordan Burroughs</strong> - Super 32 Finals
                <div style={{ fontSize: '0.8rem', color: '#D92121' }}>Pro Tier ($50)</div>
              </div>
              <Link to="/analysis" state={{ adminMode: true }}><button className="btn btn-outline" style={{ padding: '0.5rem' }}>Review</button></Link>
            </li>
          </ul>
        </div>

        {/* New Member Registrations */}
        <div style={{ background: 'rgba(25, 25, 25, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '2rem' }}>
          <h3 style={{ borderBottom: '1px solid #D92121', paddingBottom: '0.5rem', marginBottom: '1rem' }}>New Roster Additions</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {roster.length === 0 ? (
              <li style={{ padding: '1rem', color: '#a0a0a0' }}>No pending additions.</li>
            ) : (
              roster.map(athlete => (
                <li key={athlete.id} style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', marginBottom: '0.5rem', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong>{athlete.name}</strong> ({athlete.team})
                    <div style={{ fontSize: '0.8rem', color: '#a0a0a0' }}>{athlete.status}</div>
                  </div>
                  <button onClick={() => handleAccept(athlete.id)} className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Accept</button>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Quick Links */}
        <div style={{ background: 'rgba(25, 25, 25, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '2rem' }}>
          <h3 style={{ borderBottom: '1px solid #D92121', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Management Tools</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link to="/leaderboard" state={{ adminMode: true }}><button className="btn btn-outline" style={{ width: '100%' }}>Update Leaderboards</button></Link>
            <Link to="/strength" state={{ adminMode: true }}><button className="btn btn-outline" style={{ width: '100%' }}>Edit S&C Library</button></Link>
            <Link to="/calendar" state={{ adminMode: true }}><button className="btn btn-outline" style={{ width: '100%' }}>Manage Schedule</button></Link>
            <Link to="/chat" state={{ adminMode: true }}><button className="btn btn-outline" style={{ width: '100%' }}>Messages</button></Link>
          </div>
        </div>

      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TechniqueLibrary.css';

const techniqueData = [
  {
    id: 'neutral',
    title: 'Neutral Position',
    description: 'Takedowns, setups, handfighting, and defense from the feet.',
    image: '/media__1780475546628.jpg', // Using an existing artifact image as placeholder
    videos: [
      { title: "Russian Tie Snap Down", duration: "4:15", locked: true },
      { title: "Defending the High Crotch", duration: "5:30", locked: true },
      { title: "Collar Tie Clear to Single Leg", duration: "6:45", locked: true },
      { title: "Heavy Hands: Underhook Series", duration: "8:20", locked: true }
    ]
  },
  {
    id: 'top',
    title: 'Top Position',
    description: 'Turns, rides, pinning combinations, and mat returns.',
    image: '/media__1780475546629.jpg',
    videos: [
      { title: "Tight Waist Far Ankle Ride", duration: "3:40", locked: true },
      { title: "Crossface Cradle Finish", duration: "4:50", locked: true },
      { title: "Spiral Ride Breakdown", duration: "5:15", locked: true },
      { title: "Defending the Standup", duration: "6:05", locked: true }
    ]
  },
  {
    id: 'bottom',
    title: 'Bottom Position',
    description: 'Escapes, reversals, stand-ups, and clearing rides.',
    image: '/media__1780475546631.jpg',
    videos: [
      { title: "Explosive Inside Standup", duration: "4:25", locked: true },
      { title: "Clearing the Spiral Ride", duration: "3:55", locked: true },
      { title: "Granby Roll Fundamentals", duration: "7:10", locked: true },
      { title: "Switch to Double Leg", duration: "5:40", locked: true }
    ]
  }
];

export default function TechniqueLibrary() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  if (selectedCategory) {
    return (
      <div className="technique-container fade-in">
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <button onClick={() => navigate(-1)} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>&larr; Hub</button>
          <button className="btn btn-outline" onClick={() => setSelectedCategory(null)}>← Library</button>
        </div>
        
        <div className="technique-detail-view">
          <div className="technique-sidebar">
            <h3 style={{ padding: '1.5rem', borderBottom: '1px solid #D92121', margin: 0, textTransform: 'uppercase' }}>
              {selectedCategory.title}
            </h3>
            <div style={{ padding: '1.5rem', color: '#a0a0a0', fontSize: '0.9rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              {selectedCategory.description}
            </div>
          </div>

          <div className="technique-video-list">
            <h3 style={{ marginBottom: '2rem', color: '#fff' }}>Video Vault</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {selectedCategory.videos.map((vid, idx) => (
                <div key={idx} className="locked-video-item">
                  <div className="video-info">
                    <span className="play-icon">▶</span>
                    <span className="video-title">{vid.title}</span>
                    <span className="video-duration">{vid.duration}</span>
                  </div>
                  <div className="lock-icon" title="Premium Content">🔒 Locked</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="technique-container fade-in">
      <button onClick={() => navigate(-1)} className="btn btn-outline" style={{ marginBottom: '2rem', padding: '0.5rem 1rem' }}>&larr; Back to Hub</button>
      
      <div className="library-header">
        <h2>Technique <span>Vault</span></h2>
        <p>Master the positions. Browse our comprehensive library of elite wrestling techniques, broken down by Neutral, Top, and Bottom.</p>
      </div>

      <div className="technique-grid">
        {techniqueData.map(cat => (
          <div key={cat.id} className="technique-card" onClick={() => setSelectedCategory(cat)}>
            <div className="card-image-placeholder" style={{ backgroundImage: `url(${cat.image})` }}></div>
            <div className="card-content">
              <h3>{cat.title}</h3>
              <p>{cat.description}</p>
              <button className="btn btn-outline" style={{ width: '100%' }}>View Videos</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

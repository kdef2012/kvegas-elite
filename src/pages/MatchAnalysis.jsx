import React, { useState, useRef, useEffect } from 'react';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate, useLocation } from 'react-router-dom';
import './MatchAnalysis.css';

export default function MatchAnalysis() {
  const navigate = useNavigate();
  const location = useLocation();
  const [view, setView] = useState(location.state?.adminMode ? 'player' : 'upload'); // 'upload' or 'player'
  const [tier, setTier] = useState('basic');
  const [contextText, setContextText] = useState('');
  
  // Player State
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [annotations, setAnnotations] = useState([
    // Mock data for testing the UI
    { time: 12.5, text: "Your stance is too high here. Lower your hips.", type: "text", color: "red" },
    { time: 45.0, text: "Great shot entry. Listen to the voiceover for finishing details.", type: "voice", color: "blue" },
    { time: 88.2, text: "Notice the drawing. Hand control is critical.", type: "both", color: "green" }
  ]);

  const [isAdmin, setIsAdmin] = useState(true); // Toggle this to test coach vs athlete view
  const [newAnnotation, setNewAnnotation] = useState('');

  // Word count constraint
  const handleContextChange = (e) => {
    const text = e.target.value;
    if (text.split(' ').length <= 100) {
      setContextText(text);
    }
  };

  const handleUploadSubmit = () => {
    // Mock upload completion
    setView('player');
  };

  // Video Controls
  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration;
    setProgress((current / total) * 100);

    // Check if we hit an annotation to auto-pause (Athlete view)
    if (!isAdmin && isPlaying) {
      const hit = annotations.find(a => Math.abs(a.time - current) < 0.2);
      if (hit) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleSeek = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    videoRef.current.currentTime = percentage * videoRef.current.duration;
  };

  const addAnnotation = (type) => {
    const color = type === 'text' ? 'red' : type === 'voice' ? 'blue' : 'green';
    setAnnotations([...annotations, {
      time: videoRef.current.currentTime,
      text: newAnnotation || "New Voiceover/Drawing Added",
      type,
      color
    }]);
    setNewAnnotation('');
  };

  return (
    <div className="match-analysis-container fade-in">
      <button onClick={() => navigate(-1)} className="btn btn-outline" style={{ marginBottom: '2rem', padding: '0.5rem 1rem' }}>&larr; Back</button>
      <div className="header">
        <h2>Match <span>Analysis</span></h2>
      </div>

      {view === 'upload' ? (
        <div className="upload-section fade-in">
          <h3>Request a Breakdown</h3>
          <p style={{ color: '#a0a0a0', marginBottom: '2rem' }}>Upload your tournament match and get personalized feedback from Coach Nelson.</p>
          
          <div className="tier-selection">
            <div className={`tier-card ${tier === 'basic' ? 'selected' : ''}`} onClick={() => setTier('basic')}>
              <h4>Basic Analysis</h4>
              <h3 style={{ color: '#D92121', margin: '10px 0' }}>$20</h3>
              <p style={{ fontSize: '0.9rem' }}>Time-stamped text annotations pointing out technical errors and adjustments.</p>
            </div>
            <div className={`tier-card ${tier === 'pro' ? 'selected' : ''}`} onClick={() => setTier('pro')}>
              <h4>Pro Analysis</h4>
              <h3 style={{ color: '#D92121', margin: '10px 0' }}>$50</h3>
              <p style={{ fontSize: '0.9rem' }}>Includes Voiceover breakdown, screen-drawing (telestrator), and detailed notes.</p>
            </div>
          </div>

          <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
            <label style={{ fontWeight: 'bold' }}>Specific Questions or Focus Areas (Max 100 words):</label>
            <textarea 
              value={contextText}
              onChange={handleContextChange}
              placeholder="e.g., Please look at my neutral setups, I keep getting blocked off on my single leg attempts."
            />
            <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#a0a0a0' }}>
              Words: {contextText.split(' ').filter(w => w !== '').length} / 100
            </div>
          </div>

          <div style={{ marginTop: '2rem', background: '#fff', padding: '10px', borderRadius: '8px' }}>
            <PayPalButtons 
              style={{ layout: "vertical", color: "gold", shape: "rect", label: "checkout" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [{ 
                    description: `${tier === 'basic' ? 'Basic' : 'Pro'} Match Analysis`,
                    amount: { value: tier === 'basic' ? '20.00' : '50.00' } 
                  }]
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  alert(`Payment completed by ${details.payer.name.given_name}. Uploading video...`);
                  handleUploadSubmit();
                });
              }}
            />
          </div>
        </div>
      ) : (
        <div className="player-container fade-in-up">
          <div className="video-wrapper">
            {/* Mock video source for demonstration */}
            <video 
              ref={videoRef}
              className="video-element"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={() => setDuration(videoRef.current.duration)}
              src="https://www.w3schools.com/html/mov_bbb.mp4"
            />
            
            {/* Telestrator Canvas (Hidden in Basic mode, active in Pro mode when paused) */}
            <canvas ref={canvasRef} className="canvas-overlay" />

            <div className="custom-controls">
              <div className="timeline-wrapper" onClick={handleSeek}>
                <div className="timeline-progress" style={{ width: `${progress}%` }}></div>
                {/* Render colored tickers */}
                {annotations.map((ann, i) => (
                  <div 
                    key={i} 
                    className={`ticker ${ann.color}`} 
                    style={{ left: `${(ann.time / duration) * 100}%` }}
                    title={ann.text}
                  />
                ))}
              </div>
              <div className="control-buttons">
                <button className="play-btn" onClick={togglePlay}>
                  {isPlaying ? '⏸' : '▶'}
                </button>
                <span style={{ fontSize: '0.9rem' }}>
                  {Math.floor(videoRef.current?.currentTime || 0)}s / {Math.floor(duration || 0)}s
                </span>
              </div>
            </div>
          </div>

          <div className="tool-panel">
            <h3>{isAdmin ? "Coach's Dashboard" : "Analysis Notes"}</h3>
            
            <div className="annotations-list" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {annotations.map((ann, i) => (
                <div key={i} className="annotation-item" style={{ borderLeftColor: ann.color === 'red' ? '#ff3333' : ann.color === 'blue' ? '#3388ff' : '#33ff33' }}>
                  <div className="annotation-time">{Math.floor(ann.time)}s</div>
                  <p>{ann.text}</p>
                </div>
              ))}
            </div>

            {isAdmin && (
              <div className="admin-tools">
                <h4 style={{ color: '#a0a0a0', marginBottom: '5px' }}>Add Annotation at Current Time:</h4>
                <textarea 
                  placeholder="Type your feedback here..." 
                  value={newAnnotation}
                  onChange={(e) => setNewAnnotation(e.target.value)}
                />
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="btn btn-outline" style={{ padding: '0.5rem', flex: 1, fontSize: '0.9rem' }} onClick={() => addAnnotation('text')}>Add Text</button>
                  <button className="btn btn-primary" style={{ padding: '0.5rem', flex: 1, fontSize: '0.9rem', background: '#3388ff' }} onClick={() => addAnnotation('voice')}>+ Voice</button>
                  <button className="btn btn-primary" style={{ padding: '0.5rem', flex: 1, fontSize: '0.9rem', background: '#33ff33' }} onClick={() => addAnnotation('both')}>+ Draw</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

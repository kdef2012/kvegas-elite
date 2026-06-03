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
  
  // Drawing State
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const isDrawing = useRef(false);
  const ctx = useRef(null);

  // Phase 5 State
  const [strokeColor, setStrokeColor] = useState('#D92121');
  const [showPalette, setShowPalette] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const mediaRecorderRef = useRef(null);

  useEffect(() => {
    try {
      if (canvasRef.current) {
        // Set canvas internal resolution to match its CSS display size
        canvasRef.current.width = canvasRef.current.offsetWidth || 800;
        canvasRef.current.height = canvasRef.current.offsetHeight || 450;
        ctx.current = canvasRef.current.getContext('2d');
        if (ctx.current) {
          ctx.current.strokeStyle = strokeColor === 'eraser' ? '#000000' : strokeColor;
          ctx.current.lineWidth = strokeColor === 'eraser' ? 20 : 4;
          ctx.current.lineCap = 'round';
          ctx.current.globalCompositeOperation = strokeColor === 'eraser' ? 'destination-out' : 'source-over';
        }
      }
    } catch (e) {
      console.error("Canvas init error", e);
    }
  }, [view, strokeColor]); // Re-run when view switches to 'player' or color changes

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
      setIsDrawingMode(false);
      clearCanvas(); // Clear drawings when video resumes
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      if (isAdmin) setIsDrawingMode(true); // Enable drawing when paused
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

  // Drawing Handlers
  const startDrawing = (e) => {
    if (!isDrawingMode || !ctx.current || !canvasRef.current) return;
    try {
      isDrawing.current = true;
      const rect = canvasRef.current.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      ctx.current.beginPath();
      ctx.current.moveTo(clientX - rect.left, clientY - rect.top);
    } catch (err) {
      console.error(err);
    }
  };
  
  const draw = (e) => {
    if (!isDrawing.current || !isDrawingMode || !ctx.current || !canvasRef.current) return;
    try {
      // Prevent scrolling while drawing on mobile
      if (e.cancelable) e.preventDefault(); 
      const rect = canvasRef.current.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      ctx.current.lineTo(clientX - rect.left, clientY - rect.top);
      ctx.current.stroke();
    } catch (err) {
      console.error(err);
    }
  };
  
  const stopDrawing = () => {
    isDrawing.current = false;
  };
  
  const clearCanvas = () => {
    if (ctx.current && canvasRef.current) {
      try {
        ctx.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleVoiceToggle = async () => {
    if (isRecording) {
      if (mediaRecorderRef.current) mediaRecorderRef.current.stop();
      setIsRecording(false);
      addAnnotation('voice');
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.start();
        setIsRecording(true);
      } catch (err) {
        alert("Microphone access denied or not available. Please allow permissions in your browser.");
      }
    }
  };

  const handleSubmitAnalysis = () => {
    if (window.confirm("Are you sure you want to send this finished analysis to the member's inbox?")) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        alert("Analysis Sent to Member Inbox!");
        navigate('/admin');
      }, 3000); // Simulate rendering time
    }
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
            
            {/* Telestrator Canvas (Active in Pro mode when paused) */}
            <canvas 
              ref={canvasRef} 
              className={`canvas-overlay ${isDrawingMode ? 'drawing-mode' : ''}`}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              onTouchCancel={stopDrawing}
            />

            {/* Paint Palette */}
            {showPalette && isDrawingMode && (
              <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.8)', padding: '10px', borderRadius: '8px', zIndex: 30, display: 'flex', gap: '10px', border: '1px solid rgba(255,255,255,0.2)' }}>
                <button onClick={() => setStrokeColor('#D92121')} style={{ width: '25px', height: '25px', background: '#D92121', border: strokeColor === '#D92121' ? '2px solid white' : 'none', borderRadius: '50%', cursor: 'pointer' }} title="Red"></button>
                <button onClick={() => setStrokeColor('#3388ff')} style={{ width: '25px', height: '25px', background: '#3388ff', border: strokeColor === '#3388ff' ? '2px solid white' : 'none', borderRadius: '50%', cursor: 'pointer' }} title="Blue"></button>
                <button onClick={() => setStrokeColor('#33ff33')} style={{ width: '25px', height: '25px', background: '#33ff33', border: strokeColor === '#33ff33' ? '2px solid white' : 'none', borderRadius: '50%', cursor: 'pointer' }} title="Green"></button>
                <button onClick={() => setStrokeColor('eraser')} style={{ width: '25px', height: '25px', background: '#fff', border: strokeColor === 'eraser' ? '2px solid red' : 'none', borderRadius: '4px', cursor: 'pointer', color: 'black', fontWeight: 'bold', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Eraser">E</button>
                <button onClick={clearCanvas} style={{ padding: '0 10px', fontSize: '0.8rem', cursor: 'pointer', background: 'transparent', color: 'white', border: '1px solid white', borderRadius: '4px' }}>Clear</button>
              </div>
            )}

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
                  <button 
                    className="btn btn-primary" 
                    style={{ padding: '0.5rem', flex: 1, fontSize: '0.9rem', background: isRecording ? '#ff3333' : '#3388ff', color: '#fff' }} 
                    onClick={handleVoiceToggle}
                  >
                    {isRecording ? '■ Stop Rec' : '+ Voice'}
                  </button>
                  <button className="btn btn-primary" style={{ padding: '0.5rem', flex: 1, fontSize: '0.9rem', background: '#33ff33', color: '#000' }} onClick={() => setShowPalette(!showPalette)}>+ Draw</button>
                </div>
                <button 
                  className="btn btn-primary" 
                  style={{ width: '100%', marginTop: '1rem', background: '#D92121', opacity: isSubmitting ? 0.7 : 1 }} 
                  onClick={handleSubmitAnalysis}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Rendering Video... Please Wait' : 'Submit Analysis'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

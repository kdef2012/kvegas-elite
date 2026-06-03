import React, { useState, useRef, useEffect } from 'react';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, getDocs, doc, updateDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import './MatchAnalysis.css';

export default function MatchAnalysis() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userProfile, isAdmin } = useAuth();
  
  const [view, setView] = useState(isAdmin ? 'player' : 'upload'); // 'upload' or 'player'
  const [tier, setTier] = useState('basic');
  const [contextText, setContextText] = useState('');
  const [activeAnalysisId, setActiveAnalysisId] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  // Player State
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [annotations, setAnnotations] = useState([]);

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
  
  // Video URL to play
  const [videoUrl, setVideoUrl] = useState("https://www.w3schools.com/html/mov_bbb.mp4");

  // Fetch mock analysis if Admin, or just set an empty state
  useEffect(() => {
    if (view === 'player' && isAdmin) {
      setAnnotations([
        { time: 12.5, text: "Your stance is too high here. Lower your hips.", type: "text", color: "red" },
        { time: 45.0, text: "Great shot entry. Listen to the voiceover for finishing details.", type: "voice", color: "blue" }
      ]);
    }
  }, [view, isAdmin]);

  useEffect(() => {
    try {
      if (canvasRef.current) {
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
  }, [view, strokeColor]);

  const handleContextChange = (e) => {
    const text = e.target.value;
    if (text.split(' ').length <= 100) {
      setContextText(text);
    }
  };

  const handleUploadSubmit = async () => {
    if (!videoFile) {
      alert("Please select a video file to upload first.");
      return;
    }

    try {
      setIsUploading(true);
      const storage = getStorage();
      const storageRef = ref(storage, `match_analyses/${userProfile?.uid}_${Date.now()}_${videoFile.name}`);
      
      const uploadTask = uploadBytesResumable(storageRef, videoFile);

      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        }, 
        (error) => {
          console.error("Upload failed:", error);
          setIsUploading(false);
          alert("Video upload failed. Please try again.");
        }, 
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const docRef = await addDoc(collection(db, 'analyses'), {
            userId: userProfile?.uid || 'unknown',
            userName: userProfile?.name || 'Athlete',
            tier: tier,
            context: contextText,
            videoUrl: downloadURL,
            status: 'pending',
            createdAt: serverTimestamp()
          });
          setActiveAnalysisId(docRef.id);
          setVideoUrl(downloadURL);
          setIsUploading(false);
          setView('player');
        }
      );
    } catch (e) {
      console.error("Error starting upload: ", e);
      setIsUploading(false);
    }
  };

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
      setIsDrawingMode(false);
      clearCanvas();
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      if (isAdmin) setIsDrawingMode(true);
    }
  };

  const handleTimeUpdate = () => {
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration;
    setProgress((current / total) * 100);

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
      text: newAnnotation || "New Feedback Added",
      type,
      color
    }]);
    setNewAnnotation('');
  };

  const startDrawing = (e) => {
    if (!isDrawingMode || !ctx.current || !canvasRef.current) return;
    try {
      isDrawing.current = true;
      const rect = canvasRef.current.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      ctx.current.beginPath();
      ctx.current.moveTo(clientX - rect.left, clientY - rect.top);
    } catch (err) {}
  };
  
  const draw = (e) => {
    if (!isDrawing.current || !isDrawingMode || !ctx.current || !canvasRef.current) return;
    try {
      if (e.cancelable) e.preventDefault(); 
      const rect = canvasRef.current.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      ctx.current.lineTo(clientX - rect.left, clientY - rect.top);
      ctx.current.stroke();
    } catch (err) {}
  };
  
  const stopDrawing = () => {
    isDrawing.current = false;
  };
  
  const clearCanvas = () => {
    if (ctx.current && canvasRef.current) {
      ctx.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
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
        alert("Microphone access denied.");
      }
    }
  };

  const handleSubmitAnalysis = async () => {
    if (window.confirm("Are you sure you want to send this finished analysis to the member's inbox?")) {
      setIsSubmitting(true);
      try {
        // Save to Firestore
        await addDoc(collection(db, 'completed_analyses'), {
          annotations: annotations,
          createdAt: serverTimestamp(),
          coach: 'Coach Nelson'
        });
        
        setIsSubmitting(false);
        alert("Analysis Sent to Member Inbox & Saved to Database!");
        navigate('/admin');
      } catch (err) {
        setIsSubmitting(false);
        alert("Failed to save analysis.");
      }
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

          <div style={{ textAlign: 'left', marginBottom: '1rem', background: 'rgba(0,0,0,0.5)', padding: '1rem', borderRadius: '8px', border: '1px solid #333' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>Upload Match Video (MP4, MOV):</label>
            <input 
              type="file" 
              accept="video/*" 
              onChange={(e) => setVideoFile(e.target.files[0])} 
              style={{ color: '#fff' }}
            />
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
            {isUploading ? (
              <div style={{ padding: '1rem', textAlign: 'center', color: '#000' }}>
                <h4 style={{ marginBottom: '10px' }}>Uploading Video... {Math.round(uploadProgress)}%</h4>
                <div style={{ width: '100%', background: '#ccc', height: '10px', borderRadius: '5px' }}>
                  <div style={{ width: `${uploadProgress}%`, background: '#D92121', height: '100%', borderRadius: '5px' }}></div>
                </div>
              </div>
            ) : (
              <PayPalButtons 
                style={{ layout: "vertical", color: "gold", shape: "rect", label: "checkout" }}
                disabled={!videoFile}
                createOrder={(data, actions) => {
                  if (!videoFile) {
                    alert("Please upload a video file first.");
                    return;
                  }
                  return actions.order.create({
                    purchase_units: [{ 
                      description: `${tier === 'basic' ? 'Basic' : 'Pro'} Match Analysis`,
                      amount: { value: tier === 'basic' ? '20.00' : '50.00' } 
                    }]
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then((details) => {
                    handleUploadSubmit();
                  });
                }}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="player-container fade-in-up">
          <div className="video-wrapper">
            <video 
              ref={videoRef}
              className="video-element"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={() => setDuration(videoRef.current.duration)}
              src={videoUrl}
            />
            
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

            {showPalette && isDrawingMode && (
              <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.8)', padding: '10px', borderRadius: '8px', zIndex: 30, display: 'flex', gap: '10px', border: '1px solid rgba(255,255,255,0.2)' }}>
                <button onClick={() => setStrokeColor('#D92121')} style={{ width: '25px', height: '25px', background: '#D92121', border: strokeColor === '#D92121' ? '2px solid white' : 'none', borderRadius: '50%', cursor: 'pointer' }}></button>
                <button onClick={() => setStrokeColor('#3388ff')} style={{ width: '25px', height: '25px', background: '#3388ff', border: strokeColor === '#3388ff' ? '2px solid white' : 'none', borderRadius: '50%', cursor: 'pointer' }}></button>
                <button onClick={() => setStrokeColor('#33ff33')} style={{ width: '25px', height: '25px', background: '#33ff33', border: strokeColor === '#33ff33' ? '2px solid white' : 'none', borderRadius: '50%', cursor: 'pointer' }}></button>
                <button onClick={() => setStrokeColor('eraser')} style={{ width: '25px', height: '25px', background: '#fff', border: strokeColor === 'eraser' ? '2px solid red' : 'none', borderRadius: '4px', cursor: 'pointer', color: 'black', fontWeight: 'bold', fontSize: '12px' }}>E</button>
                <button onClick={clearCanvas} style={{ padding: '0 10px', fontSize: '0.8rem', cursor: 'pointer', background: 'transparent', color: 'white', border: '1px solid white', borderRadius: '4px' }}>Clear</button>
              </div>
            )}

            <div className="custom-controls">
              <div className="timeline-wrapper" onClick={handleSeek}>
                <div className="timeline-progress" style={{ width: `${progress}%` }}></div>
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
                  {isSubmitting ? 'Saving to Database...' : 'Submit Analysis'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

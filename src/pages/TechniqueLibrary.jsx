import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db, functions } from '../firebase';
import { collection, addDoc, getDocs, doc, updateDoc, onSnapshot, arrayUnion, serverTimestamp } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { PayPalButtons } from "@paypal/react-paypal-js";
import './TechniqueLibrary.css';

const categories = [
  { id: 'neutral', title: 'Neutral Position', description: 'Takedowns, setups, handfighting, and defense.', image: '/media__1780475546628.jpg' },
  { id: 'top', title: 'Top Position', description: 'Turns, rides, pinning combinations, and mat returns.', image: '/media__1780475546629.jpg' },
  { id: 'bottom', title: 'Bottom Position', description: 'Escapes, reversals, stand-ups, and clearing rides.', image: '/media__1780475546631.jpg' },
  { id: 'mechanics', title: 'Small Mechanics', description: 'Micro-adjustments, grip fighting, head position.', image: '/media__1780475546634.jpg' }
];

export default function TechniqueLibrary() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userProfile, currentUser } = useAuth();
  const isAdminView = location.state?.adminMode || false;
  const [isAdmin, setIsAdmin] = useState(isAdminView);

  const [videos, setVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  // Admin Upload State
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [newVideoCat, setNewVideoCat] = useState('neutral');
  const [newVideoPrice, setNewVideoPrice] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // User playback State
  const [playingVideoId, setPlayingVideoId] = useState(null);
  
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'technique_videos'), (snapshot) => {
      const vids = [];
      snapshot.forEach(doc => vids.push({ id: doc.id, ...doc.data() }));
      setVideos(vids);
    });
    return () => unsub();
  }, []);

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile || !newVideoTitle || !newVideoPrice) {
      alert("Please fill all fields and select a video.");
      return;
    }

    try {
      setIsUploading(true);
      const storage = getStorage();
      const storageRef = ref(storage, `technique_vault/${Date.now()}_${videoFile.name}`);
      
      const uploadTask = uploadBytesResumable(storageRef, videoFile);

      uploadTask.on('state_changed', 
        (snapshot) => {
          setUploadProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        }, 
        (error) => {
          setIsUploading(false);
          alert("Video upload failed.");
        }, 
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await addDoc(collection(db, 'technique_videos'), {
            title: newVideoTitle,
            category: newVideoCat,
            price: Number(newVideoPrice),
            videoUrl: downloadURL,
            createdAt: serverTimestamp()
          });
          
          setIsUploading(false);
          setShowUploadForm(false);
          setVideoFile(null);
          setNewVideoTitle('');
          setNewVideoPrice('');
          alert("Video published successfully!");
        }
      );
    } catch (e) {
      setIsUploading(false);
      alert("Error saving video.");
    }
  };

  const hasUnlockedVideo = (videoId) => {
    if (userProfile?.role === 'admin') return true;
    return userProfile?.unlockedVideos?.includes(videoId);
  };

  const getPrice = (basePrice) => {
    if (userProfile?.membership === 'elite') {
      return basePrice * 0.5; // 50% off
    }
    return basePrice;
  };

  const handlePurchaseVideo = async (videoId, orderId) => {
    if (currentUser) {
      const verifyPayPalTransaction = httpsCallable(functions, 'verifyPayPalTransaction');
      try {
        const result = await verifyPayPalTransaction({ orderId, videoId });
        if (result.data.success) {
          alert("Video Unlocked!");
        } else {
          alert("Verification failed.");
        }
      } catch (e) {
        console.error(e);
        alert("Transaction failed to verify.");
      }
    }
  };

  if (selectedCategory) {
    const categoryVideos = videos.filter(v => v.category === selectedCategory.id);

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
            
            {isAdmin && (
              <div style={{ padding: '1.5rem' }}>
                <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setShowUploadForm(!showUploadForm)}>
                  {showUploadForm ? 'Cancel Upload' : '+ Upload Video'}
                </button>
              </div>
            )}
          </div>

          <div className="technique-video-list">
            
            {showUploadForm && isAdmin && (
              <div style={{ background: 'rgba(0,0,0,0.5)', padding: '2rem', borderRadius: '12px', border: '1px solid #D92121', marginBottom: '2rem' }} className="fade-in">
                <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Upload New Technique</h3>
                <form onSubmit={handleUploadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <input type="text" placeholder="Video Title" value={newVideoTitle} onChange={e => setNewVideoTitle(e.target.value)} required style={{ padding: '1rem', background: '#111', color: '#fff', border: '1px solid #333', borderRadius: '4px' }} />
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <select value={newVideoCat} onChange={e => setNewVideoCat(e.target.value)} style={{ padding: '1rem', background: '#111', color: '#fff', border: '1px solid #333', borderRadius: '4px', flex: 1 }}>
                      <option value="neutral">Neutral</option>
                      <option value="top">Top</option>
                      <option value="bottom">Bottom</option>
                      <option value="mechanics">Mechanics</option>
                    </select>
                    <input type="number" placeholder="Base Price ($)" value={newVideoPrice} onChange={e => setNewVideoPrice(e.target.value)} required style={{ padding: '1rem', background: '#111', color: '#fff', border: '1px solid #333', borderRadius: '4px', flex: 1 }} />
                  </div>
                  <input type="file" accept="video/*" onChange={e => setVideoFile(e.target.files[0])} required style={{ color: '#fff', padding: '1rem 0' }} />
                  
                  {isUploading ? (
                    <div style={{ padding: '1rem', textAlign: 'center', background: '#222', borderRadius: '4px' }}>
                      <div style={{ marginBottom: '5px' }}>Uploading... {Math.round(uploadProgress)}%</div>
                      <div style={{ width: '100%', background: '#000', height: '5px' }}>
                        <div style={{ width: `${uploadProgress}%`, background: '#D92121', height: '100%' }}></div>
                      </div>
                    </div>
                  ) : (
                    <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>Publish Video</button>
                  )}
                </form>
              </div>
            )}

            <h3 style={{ marginBottom: '2rem', color: '#fff' }}>Video Vault</h3>
            
            {categoryVideos.length === 0 ? (
              <p style={{ color: '#a0a0a0' }}>No videos in this category yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {categoryVideos.map(vid => (
                  <div key={vid.id} style={{ background: 'rgba(25,25,25,0.8)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column' }}>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ fontSize: '1.2rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ color: '#D92121' }}>▶</span> {vid.title}
                      </h4>
                      {!hasUnlockedVideo(vid.id) && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          {userProfile?.membership === 'elite' ? (
                            <div style={{ textAlign: 'right' }}>
                              <span style={{ color: '#ff3333', textDecoration: 'line-through', fontSize: '0.8rem', marginRight: '5px' }}>${vid.price}</span>
                              <span style={{ color: '#00ff00', fontWeight: 'bold' }}>${getPrice(vid.price)} (50% Off)</span>
                            </div>
                          ) : (
                            <span style={{ color: '#D92121', fontWeight: 'bold' }}>${vid.price}</span>
                          )}
                        </div>
                      )}
                    </div>

                    {hasUnlockedVideo(vid.id) ? (
                      <div style={{ marginTop: '1.5rem' }}>
                        <video src={vid.videoUrl} controls style={{ width: '100%', borderRadius: '8px', border: '1px solid #333', background: '#000' }} />
                      </div>
                    ) : (
                      <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: 'rgba(0,0,0,0.5)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                        <span style={{ color: '#a0a0a0' }}>Purchase to unlock this premium breakdown permanently.</span>
                        <div style={{ width: '150px', background: '#fff', padding: '5px', borderRadius: '6px' }}>
                          <PayPalButtons 
                            style={{ layout: "horizontal", height: 35, tagline: false }}
                            createOrder={(data, actions) => {
                              return actions.order.create({
                                purchase_units: [{ amount: { value: getPrice(vid.price).toString() }, description: `Technique: ${vid.title}` }]
                              });
                            }}
                            onApprove={async (data, actions) => {
                              // Security update: Do not capture on client side.
                              // Let backend verify and capture
                              handlePurchaseVideo(vid.id, data.orderID);
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="technique-container fade-in">
      <button onClick={() => navigate(-1)} className="btn btn-outline" style={{ marginBottom: '2rem', padding: '0.5rem 1rem' }}>&larr; Back to Hub</button>
      
      {userProfile?.role === 'admin' && (
        <div className="admin-toggle" style={{ marginBottom: '2rem' }}>
          <label>Simulation Mode:</label>
          <button className={`btn ${isAdmin ? 'btn-primary' : 'btn-outline'}`} onClick={() => setIsAdmin(true)}>Admin View</button>
          <button className={`btn ${!isAdmin ? 'btn-primary' : 'btn-outline'}`} onClick={() => setIsAdmin(false)}>Athlete View</button>
        </div>
      )}

      <div className="library-header">
        <h2>Technique <span>Vault</span></h2>
        <p>Master the positions. Browse our comprehensive library of elite wrestling techniques, broken down by Neutral, Top, and Bottom. Elite Members get 50% off all video purchases.</p>
      </div>

      <div className="technique-grid">
        {categories.map(cat => (
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

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { doc, updateDoc, collection, onSnapshot, arrayUnion } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { PayPalButtons } from "@paypal/react-paypal-js";
import './StrengthLibrary.css';

export default function StrengthLibrary() {
  const navigate = useNavigate();
  const { userProfile, currentUser } = useAuth();
  const [selectedTier, setSelectedTier] = useState(null);
  
  // Dynamic Data State
  const [libraryData, setLibraryData] = useState([]);
  const [anatomyGuide, setAnatomyGuide] = useState([]);

  // Dual-Pane State
  const [activeSidebarTab, setActiveSidebarTab] = useState('exercises'); // 'exercises' or 'workouts'
  const [selectedItem, setSelectedItem] = useState(null);
  const [expandedRoutineIndex, setExpandedRoutineIndex] = useState(null);

  // Admin State
  const isAdminView = location.state?.adminMode || false;
  const [isAdmin, setIsAdmin] = useState(isAdminView);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [newExName, setNewExName] = useState('');
  const [newExDesc, setNewExDesc] = useState('');
  const [exImageFile, setExImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    // Fetch Tiers
    const unsubTiers = onSnapshot(collection(db, 'strength_tiers'), (snapshot) => {
      const tiers = [];
      snapshot.forEach(doc => tiers.push({ id: doc.id, ...doc.data() }));
      // Sort tiers by extracting the phase number (e.g. "Phase 1: ...")
      tiers.sort((a, b) => {
        const numA = parseInt(a.title.match(/Phase (\d+)/)?.[1] || "0", 10);
        const numB = parseInt(b.title.match(/Phase (\d+)/)?.[1] || "0", 10);
        return numA - numB;
      });
      setLibraryData(tiers);
    });

    // Fetch Anatomy Guide
    const unsubAnatomy = onSnapshot(doc(db, 'strength_metadata', 'anatomy'), (docSnap) => {
      if (docSnap.exists() && docSnap.data().regions) {
        setAnatomyGuide(docSnap.data().regions);
      }
    });

    return () => {
      unsubTiers();
      unsubAnatomy();
    };
  }, []);

  const handleAddExercise = async (e) => {
    e.preventDefault();
    if (!newExName || !newExDesc) return;
    
    setIsUploading(true);
    let imageUrl = '/logo.jpg'; // fallback

    if (exImageFile) {
      const storage = getStorage();
      const storageRef = ref(storage, `strength_assets/${Date.now()}_${exImageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, exImageFile);
      
      try {
        await new Promise((resolve, reject) => {
          uploadTask.on('state_changed', null, reject, async () => {
            imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
            resolve();
          });
        });
      } catch (err) {
        console.error(err);
        alert('Image upload failed, using fallback.');
      }
    }

    await updateDoc(doc(db, 'strength_tiers', selectedTier.id), {
      exercises: arrayUnion({
        name: newExName,
        description: newExDesc,
        image: imageUrl
      })
    });

    setIsUploading(false);
    setShowUploadForm(false);
    setNewExName('');
    setNewExDesc('');
    setExImageFile(null);
    alert('Exercise added successfully!');
  };

  // Check access logic
  const hasAccess = userProfile?.membership === 'elite' || 
                    userProfile?.membership === 'beginner' || 
                    userProfile?.purchasedSC === true || 
                    userProfile?.role === 'admin';

  const handleCardClick = (tier) => {
    if (hasAccess) {
      setSelectedTier(tier);
      setActiveSidebarTab('exercises');
      setSelectedItem({ type: 'exercise', data: tier.exercises[0] });
    }
  };

  const handlePurchaseAccess = async (actions) => {
    try {
      await actions.order.capture();
      if (currentUser) {
        await updateDoc(doc(db, 'users', currentUser.uid), {
          purchasedSC: true
        });
        alert("S&C Library Unlocked Successfully!");
        window.location.reload();
      }
    } catch (err) {
      alert("Payment failed.");
    }
  };

  if (selectedTier) {
    const currentItem = selectedItem || { type: 'exercise', data: selectedTier.exercises[0] };

    return (
      <div className="strength-container fade-in">
        <div className="routine-detail">
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <button onClick={() => navigate(-1)} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>&larr; Hub</button>
            <button className="btn btn-outline" onClick={() => { setSelectedTier(null); setSelectedItem(null); }}>← Library</button>
          </div>
          
          <div style={{ display: 'flex', gap: '2rem', height: '600px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
            
            {/* Sidebar List */}
            <div style={{ width: '300px', background: 'rgba(0,0,0,0.5)', borderRight: '1px solid #D92121', display: 'flex', flexDirection: 'column' }}>
               <h3 style={{ padding: '1.5rem', borderBottom: '1px solid #D92121', margin: 0, textTransform: 'uppercase' }}>
                {selectedTier.title}
               </h3>
               
               <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                 <button 
                   className={`tab-btn ${activeSidebarTab === 'exercises' ? 'active' : ''}`}
                   onClick={() => { setActiveSidebarTab('exercises'); setSelectedItem(null); setExpandedRoutineIndex(null); }} 
                   style={{ flex: 1, padding: '1rem', background: activeSidebarTab === 'exercises' ? '#D92121' : 'transparent', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                   Exercises
                 </button>
                 <button 
                   className={`tab-btn ${activeSidebarTab === 'workouts' ? 'active' : ''}`}
                   onClick={() => { setActiveSidebarTab('workouts'); setSelectedItem(null); setExpandedRoutineIndex(null); }} 
                   style={{ flex: 1, padding: '1rem', background: activeSidebarTab === 'workouts' ? '#D92121' : 'transparent', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                   Workouts
                 </button>
               </div>

               {isAdmin && (
                 <div style={{ padding: '1rem' }}>
                   <button className="btn btn-primary" style={{ width: '100%', fontSize: '0.9rem' }} onClick={() => setShowUploadForm(!showUploadForm)}>
                     {showUploadForm ? 'Cancel' : (activeSidebarTab === 'exercises' ? '+ Add Exercise' : '+ Add Workout')}
                   </button>
                 </div>
               )}
               
               {/* Clickable Items */}
               <div style={{ overflowY: 'auto', flex: 1 }}>
                 {activeSidebarTab === 'exercises' && selectedTier.exercises.map(ex => (
                   <div 
                     key={ex.name} 
                     onClick={() => { setSelectedItem({ type: 'exercise', data: ex }); setExpandedRoutineIndex(null); }} 
                     style={{ padding: '1.5rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', background: currentItem?.data.name === ex.name ? 'rgba(217,33,33,0.2)' : 'transparent', borderLeft: currentItem?.data.name === ex.name ? '4px solid #D92121' : '4px solid transparent', transition: 'all 0.2s' }}>
                     {ex.name}
                   </div>
                 ))}
                 {activeSidebarTab === 'workouts' && selectedTier.workouts?.map(wk => (
                   <div 
                     key={wk.name} 
                     onClick={() => { setSelectedItem({ type: 'workout', data: wk }); setExpandedRoutineIndex(null); }} 
                     style={{ padding: '1.5rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', background: currentItem?.data.name === wk.name ? 'rgba(217,33,33,0.2)' : 'transparent', borderLeft: currentItem?.data.name === wk.name ? '4px solid #D92121' : '4px solid transparent', transition: 'all 0.2s' }}>
                     {wk.name}
                   </div>
                 ))}
               </div>
            </div>

            {/* Main Viewing Pane */}
            <div style={{ flex: 1, padding: '3rem', background: 'rgba(25,25,25,0.8)', overflowY: 'auto', position: 'relative' }} className="fade-in">
              
               {showUploadForm && isAdmin && activeSidebarTab === 'exercises' && (
                 <div style={{ background: 'rgba(0,0,0,0.5)', padding: '2rem', borderRadius: '12px', border: '1px solid #D92121', marginBottom: '2rem' }}>
                   <h3 style={{ marginBottom: '1.5rem' }}>Add New Exercise to {selectedTier.title}</h3>
                   <form onSubmit={handleAddExercise} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                     <input type="text" placeholder="Exercise Name" value={newExName} onChange={e => setNewExName(e.target.value)} required style={{ padding: '1rem', background: '#111', color: '#fff', border: '1px solid #333', borderRadius: '4px' }} />
                     <textarea placeholder="Step-by-step description..." value={newExDesc} onChange={e => setNewExDesc(e.target.value)} required style={{ padding: '1rem', background: '#111', color: '#fff', border: '1px solid #333', borderRadius: '4px', minHeight: '150px', fontFamily: 'Inter' }} />
                     <label style={{ fontSize: '0.9rem', color: '#a0a0a0' }}>Demo Image (Optional)</label>
                     <input type="file" accept="image/*" onChange={e => setExImageFile(e.target.files[0])} style={{ color: '#fff' }} />
                     <button type="submit" className="btn btn-primary" disabled={isUploading}>
                       {isUploading ? 'Uploading...' : 'Save Exercise'}
                     </button>
                   </form>
                 </div>
               )}

               {showUploadForm && isAdmin && activeSidebarTab === 'workouts' && (
                 <div style={{ background: 'rgba(0,0,0,0.5)', padding: '2rem', borderRadius: '12px', border: '1px solid #D92121', marginBottom: '2rem' }}>
                   <h3 style={{ marginBottom: '1.5rem' }}>Add New Workout</h3>
                   <p style={{ color: '#a0a0a0' }}>*Workout builder UI coming in Phase 2 of Admin upgrades.*</p>
                 </div>
               )}

               {!showUploadForm && currentItem && (
                 currentItem.type === 'exercise' ? (
                  <>
                    <span style={{ position: 'absolute', top: '2rem', right: '3rem', color: '#D92121', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem' }}>Exercise Glossary</span>
                    <h3 style={{ fontSize: '2.5rem', fontFamily: 'Oswald, sans-serif', color: '#fff', marginBottom: '1.5rem', textTransform: 'uppercase' }}>{currentItem.data.name}</h3>
                    <div style={{ width: '100%', height: '350px', backgroundImage: `url(${currentItem.data.image})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundColor: '#fff', borderRadius: '8px', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}></div>
                    <p style={{ fontSize: '1.2rem', color: '#a0a0a0', lineHeight: '1.8', whiteSpace: 'pre-line' }}>{currentItem.data.description}</p>
                  </>
                ) : (
                  <>
                    <span style={{ position: 'absolute', top: '2rem', right: '3rem', color: '#D92121', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem' }}>Workout Routine</span>
                    <h3 style={{ fontSize: '2.5rem', fontFamily: 'Oswald, sans-serif', color: '#fff', marginBottom: '0.5rem', textTransform: 'uppercase' }}>{currentItem.data.name} Split</h3>
                    <p style={{ color: '#a0a0a0', marginBottom: '3rem', fontSize: '1.1rem' }}><strong>Wrestling Focus:</strong> {currentItem.data.focus}</p>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {currentItem.data.routine.map((r, i) => (
                        <div 
                          key={i} 
                          onClick={() => setExpandedRoutineIndex(expandedRoutineIndex === i ? null : i)}
                          style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.5)', borderRadius: '6px', borderLeft: '4px solid #D92121', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <span style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
                              {r.name}
                            </span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                              <span style={{ color: '#D92121', fontWeight: 'bold', fontSize: '1.2rem', background: 'rgba(217,33,33,0.1)', padding: '0.5rem 1rem', borderRadius: '4px' }}>{r.reps}</span>
                              <button className="btn btn-outline" style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', pointerEvents: 'none' }}>
                                {expandedRoutineIndex === i ? 'Hide ▲' : 'View Exercise ▼'}
                              </button>
                            </div>
                          </div>
                          
                          {expandedRoutineIndex === i && (
                            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }} className="fade-in">
                              {(() => {
                                const exDetails = selectedTier.exercises.find(ex => ex.name.toLowerCase().trim() === r.name.toLowerCase().trim());
                                if (!exDetails) return <span style={{ color: '#a0a0a0' }}>No details available for {r.name}.</span>;
                                return (
                                  <>
                                    <div style={{ width: '100%', height: '250px', backgroundImage: `url(${exDetails.image})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundColor: '#fff', borderRadius: '8px', marginBottom: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}></div>
                                    <p style={{ fontSize: '1.1rem', color: '#a0a0a0', lineHeight: '1.6', whiteSpace: 'pre-line' }}>{exDetails.description}</p>
                                  </>
                                );
                              })()}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )
              )}
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="strength-container fade-in">
      <button onClick={() => navigate(-1)} className="btn btn-outline" style={{ marginBottom: '2rem', padding: '0.5rem 1rem' }}>&larr; Back to Hub</button>
      
      {userProfile?.role === 'admin' && (
        <div className="admin-toggle" style={{ marginBottom: '2rem' }}>
          <label style={{ marginRight: '1rem' }}>Simulation Mode:</label>
          <button className={`btn ${isAdmin ? 'btn-primary' : 'btn-outline'}`} onClick={() => setIsAdmin(true)} style={{ marginRight: '0.5rem' }}>Admin View</button>
          <button className={`btn ${!isAdmin ? 'btn-primary' : 'btn-outline'}`} onClick={() => setIsAdmin(false)}>Athlete View</button>
        </div>
      )}

      <div className="library-header">
        <h2>S&C <span>Library</span></h2>
        <p>Elite wrestling requires elite physical preparation. Browse our periodized strength and conditioning protocols designed specifically for the mat.</p>
      </div>

      <div style={{ background: 'rgba(25, 25, 25, 0.8)', padding: '2rem', borderRadius: '12px', border: '1px solid #D92121', marginBottom: '3rem' }}>
        <h3 style={{ fontFamily: 'Oswald, sans-serif', color: '#fff', fontSize: '2rem', marginBottom: '1.5rem', textTransform: 'uppercase' }}>The Wrestler's Anatomy: <span style={{ color: '#D92121' }}>Key Target Regions</span></h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {anatomyGuide.map((region, idx) => (
            <div key={idx} style={{ background: 'rgba(0,0,0,0.5)', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #D92121' }}>
              <h4 style={{ color: '#fff', marginBottom: '0.5rem', fontSize: '1.1rem' }}>{region.region}</h4>
              <p style={{ color: '#a0a0a0', fontSize: '0.9rem', lineHeight: '1.5' }}>{region.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="tier-grid">
        {libraryData.map(tier => (
          <div key={tier.id} className="strength-card" onClick={() => handleCardClick(tier)} style={{ cursor: (hasAccess || isAdmin) ? 'pointer' : 'default' }}>
            <div className="card-image-placeholder" style={{ backgroundImage: `url(${tier.image})` }}></div>
            <div className="card-content">
              <h3>{tier.title}</h3>
              <p>{tier.description}</p>
              {(hasAccess || isAdmin) && <button className="btn btn-outline" style={{ width: '100%' }}>View Protocol</button>}
            </div>
            {!(hasAccess || isAdmin) && (
              <div className="lock-overlay" style={{ background: 'rgba(0,0,0,0.85)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                <span style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</span>
                <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Premium Access Required</h4>
                <p style={{ color: '#a0a0a0', fontSize: '0.9rem', marginBottom: '1.5rem', textAlign: 'center' }}>Unlock the entire S&C library forever for a one-time fee of $25. Free for K-Vegas Elite Members.</p>
                <div style={{ width: '100%' }}>
                  <PayPalButtons 
                    style={{ layout: "horizontal", height: 35, tagline: false }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [{ amount: { value: "25.00" }, description: "Lifetime S&C Library Access" }]
                      });
                    }}
                    onApprove={(data, actions) => handlePurchaseAccess(actions)}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

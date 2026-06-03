import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './StrengthLibrary.css';

import { libraryData, anatomyGuide } from '../data/strengthData';

export default function StrengthLibrary() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminView = location.state?.adminMode || false; // Inherited from Dashboard
  const [isAdmin, setIsAdmin] = useState(isAdminView); // Local toggle for demo
  const [selectedTier, setSelectedTier] = useState(null);
  
  // Dual-Pane State
  const [activeSidebarTab, setActiveSidebarTab] = useState('exercises'); // 'exercises' or 'workouts'
  const [selectedItem, setSelectedItem] = useState(null);

  const handleCardClick = (tier) => {
    if (isAdmin) {
      setSelectedTier(tier);
      setActiveSidebarTab('exercises');
      setSelectedItem({ type: 'exercise', data: tier.exercises[0] });
    } else {
      alert("Access Restricted. Please contact Admin or purchase a premium membership to view these routines.");
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
               {/* Toggle Tabs */}
               <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                 <button 
                   onClick={() => setActiveSidebarTab('exercises')} 
                   style={{ flex: 1, padding: '1rem', background: activeSidebarTab === 'exercises' ? '#D92121' : 'transparent', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                   Exercises
                 </button>
                 <button 
                   onClick={() => setActiveSidebarTab('workouts')} 
                   style={{ flex: 1, padding: '1rem', background: activeSidebarTab === 'workouts' ? '#D92121' : 'transparent', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                   Workouts
                 </button>
               </div>
               
               {/* Clickable Items */}
               <div style={{ overflowY: 'auto', flex: 1 }}>
                 {activeSidebarTab === 'exercises' && selectedTier.exercises.map(ex => (
                   <div 
                     key={ex.name} 
                     onClick={() => setSelectedItem({ type: 'exercise', data: ex })} 
                     style={{ padding: '1.5rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', background: currentItem.data.name === ex.name ? 'rgba(217,33,33,0.2)' : 'transparent', borderLeft: currentItem.data.name === ex.name ? '4px solid #D92121' : '4px solid transparent', transition: 'all 0.2s' }}>
                     {ex.name}
                   </div>
                 ))}
                 {activeSidebarTab === 'workouts' && selectedTier.workouts.map(wk => (
                   <div 
                     key={wk.name} 
                     onClick={() => setSelectedItem({ type: 'workout', data: wk })} 
                     style={{ padding: '1.5rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', background: currentItem.data.name === wk.name ? 'rgba(217,33,33,0.2)' : 'transparent', borderLeft: currentItem.data.name === wk.name ? '4px solid #D92121' : '4px solid transparent', transition: 'all 0.2s' }}>
                     {wk.name}
                   </div>
                 ))}
               </div>
            </div>

            {/* Main Viewing Pane (Drag Box) */}
            <div style={{ flex: 1, padding: '3rem', background: 'rgba(25,25,25,0.8)', overflowY: 'auto', position: 'relative' }} className="fade-in">
              {currentItem.type === 'exercise' ? (
                <>
                  <span style={{ position: 'absolute', top: '2rem', right: '3rem', color: '#D92121', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem' }}>Exercise Glossary</span>
                  <h3 style={{ fontSize: '2.5rem', fontFamily: 'Oswald, sans-serif', color: '#fff', marginBottom: '1.5rem', textTransform: 'uppercase' }}>{currentItem.data.name}</h3>
                  <div style={{ width: '100%', height: '350px', backgroundImage: `url(${currentItem.data.image})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '8px', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}></div>
                  <p style={{ fontSize: '1.2rem', color: '#a0a0a0', lineHeight: '1.8' }}>{currentItem.data.description}</p>
                </>
              ) : (
                <>
                  <span style={{ position: 'absolute', top: '2rem', right: '3rem', color: '#D92121', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem' }}>Workout Routine</span>
                  <h3 style={{ fontSize: '2.5rem', fontFamily: 'Oswald, sans-serif', color: '#fff', marginBottom: '0.5rem', textTransform: 'uppercase' }}>{currentItem.data.name} Split</h3>
                  <p style={{ color: '#a0a0a0', marginBottom: '3rem', fontSize: '1.1rem' }}><strong>Wrestling Focus:</strong> {currentItem.data.focus}</p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {currentItem.data.routine.map((r, i) => (
                      <div key={i} style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.5)', borderRadius: '6px', borderLeft: '4px solid #D92121', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#fff' }}>{r.name}</span>
                        <span style={{ color: '#D92121', fontWeight: 'bold', fontSize: '1.2rem', background: 'rgba(217,33,33,0.1)', padding: '0.5rem 1rem', borderRadius: '4px' }}>{r.reps}</span>
                      </div>
                    ))}
                  </div>
                </>
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
      <div className="admin-toggle">
        <label>Simulation Mode:</label>
        <button 
          className={`btn ${isAdmin ? 'btn-primary' : 'btn-outline'}`} 
          onClick={() => setIsAdmin(true)}>
          Admin View
        </button>
        <button 
          className={`btn ${!isAdmin ? 'btn-primary' : 'btn-outline'}`} 
          onClick={() => setIsAdmin(false)}>
          Athlete View
        </button>
      </div>

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
          <div key={tier.id} className="strength-card" onClick={() => handleCardClick(tier)}>
            <div className="card-image-placeholder" style={{ backgroundImage: `url(${tier.image})` }}></div>
            <div className="card-content">
              <h3>{tier.title}</h3>
              <p>{tier.description}</p>
              <button className="btn btn-outline" style={{ width: '100%' }}>View Protocol</button>
            </div>
            {!isAdmin && (
              <div className="lock-overlay">
                <span>🔒</span>
                <p>Admin Gated</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

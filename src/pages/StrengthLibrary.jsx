import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './StrengthLibrary.css';

const libraryData = [
  {
    id: 'beginner',
    title: 'Phase 1: Foundation',
    description: 'Perfect for new athletes. Master movement patterns, build tendon strength, and introduce neck/grip capacity.',
    image: '/assets/beginner_squat.png',
    exercises: [
      { name: "Goblet Squat", description: "Keep chest up. Drive through heels. Excellent for hip mobility required in wrestling stances.", image: "/assets/beginner_squat.png" },
      { name: "Romanian Deadlifts (RDLs)", description: "Learning to hinge at the hips. Essential for posterior chain strength.", image: "/coach-yelling.jpg" },
      { name: "Inverted Bodyweight Rows", description: "Pulling strength for handfighting and snapping opponents down.", image: "/coach-yelling.jpg" },
      { name: "Manual Neck Resistance", description: "Your insurance policy. Build tolerance using your own hand or a partner.", image: "/coach-yelling.jpg" }
    ],
    workouts: [
      { name: "Day 1: Lower Body & Core", focus: "Mastering movement patterns", routine: [{name: "Goblet Squats", reps: "3x10"}, {name: "Romanian Deadlifts (RDLs)", reps: "3x8"}, {name: "Walking Lunges", reps: "2x10/leg"}, {name: "Plank Hold", reps: "3x45s"}, {name: "Farmer’s Walks", reps: "3x50yds"}] },
      { name: "Day 2: Upper Pull/Push & Neck", focus: "Building upper body stability", routine: [{name: "Inverted Bodyweight Rows", reps: "3xMax"}, {name: "Dumbbell Floor Press", reps: "3x10"}, {name: "Seated Dumbbell Shoulder Press", reps: "3x8"}, {name: "Dumbbell Shrugs", reps: "3x12"}, {name: "Manual Neck Resistance", reps: "3x10/dir"}] },
      { name: "Day 3: Full Body & Grip", focus: "Functional explosion and grip", routine: [{name: "Trap Bar Deadlifts", reps: "3x5"}, {name: "Push-ups", reps: "3xMax"}, {name: "Lat Pulldowns", reps: "3x8"}, {name: "Hanging Knee Raises", reps: "3x12"}, {name: "Plate Pinches", reps: "3x30s"}] }
    ]
  },
  {
    id: 'intermediate',
    title: 'Phase 2: Power Generation',
    description: 'Increasing absolute strength, adding volume, and integrating explosive movements.',
    image: '/assets/intermediate_clean.png',
    exercises: [
      { name: "Barbell Back Squats", description: "Heavy but clean. The core lower body driver.", image: "/assets/intermediate_clean.png" },
      { name: "Bulgarian Split Squats", description: "Unilateral leg strength. Essential for shooting off one leg and finishing singles.", image: "/coach-yelling.jpg" },
      { name: "Weighted Pull-ups", description: "Builds the heavy pulling strength needed for vicious snap-downs and front headlocks.", image: "/coach-yelling.jpg" },
      { name: "Dumbbell Clean and Press", description: "Explosive full-body transfer.", image: "/coach-yelling.jpg" }
    ],
    workouts: [
      { name: "Day 1: Max Effort Lower", focus: "Glute/Core Drive", routine: [{name: "Barbell Back Squats", reps: "4x5"}, {name: "Barbell Hip Thrusts", reps: "3x8"}, {name: "Bulgarian Split Squats", reps: "3x8/leg"}, {name: "Hanging Leg Raises", reps: "3x10"}, {name: "Med Ball Rotational Throws", reps: "3x8/side"}] },
      { name: "Day 2: Upper Pull Dominant", focus: "Mid-back for hand fighting", routine: [{name: "Weighted Pull-ups", reps: "4x5"}, {name: "Barbell Row (Overhand)", reps: "3x8"}, {name: "Incline Dumbbell Press", reps: "3x8"}, {name: "Standing Overhead Press", reps: "3x6"}, {name: "4-Way Neck Machine", reps: "3x12"}] },
      { name: "Day 3: Posterior Chain Explosion", focus: "Full-body transfer", routine: [{name: "Conventional Deadlifts", reps: "4x4"}, {name: "Dumbbell Clean and Press", reps: "3x6"}, {name: "Face Pulls", reps: "3x15"}, {name: "Dips", reps: "3x10"}, {name: "Heavy Fat-Grip Holds", reps: "3xMax"}] }
    ]
  },
  {
    id: 'advanced',
    title: 'Phase 3: The Mat Monster',
    description: 'High-threshold power output, isometric bracing, and chaotic core stability.',
    image: '/assets/advanced_deadlift.png',
    exercises: [
      { name: "Barbell Power Cleans", description: "Pure explosive hip extension. The ultimate wrestling lift.", image: "/assets/advanced_deadlift.png" },
      { name: "Front Squats", description: "Forces immense core and upper back rigidity.", image: "/coach-yelling.jpg" },
      { name: "Z-Press", description: "Seated on floor overhead press. No leg drive allowed, absolute shoulder/core demand.", image: "/coach-yelling.jpg" },
      { name: "Wrestler's Bridge", description: "Neck isometrics. Front and back bridges, fully controlled.", image: "/coach-yelling.jpg" }
    ],
    workouts: [
      { name: "Day 1: Dynamic Lower Power", focus: "Static Core Rigidity", routine: [{name: "Barbell Power Cleans", reps: "5x3"}, {name: "Front Squats", reps: "4x4"}, {name: "Glute-Ham Raises (GHR)", reps: "3x8"}, {name: "Cable Woodchoppers", reps: "3x10/side"}, {name: "Ab Wheel Rollouts", reps: "3xMax"}] },
      { name: "Day 2: Upper Body Chaos", focus: "Massive hand/wrist stability", routine: [{name: "Weighted Chin-ups (Fat Gripz)", reps: "4x6"}, {name: "Heavy DB Bench Press", reps: "4x6"}, {name: "Meadows Rows", reps: "3x8/side"}, {name: "Z-Press", reps: "3x6"}, {name: "Wrestler's Bridge (Neck)", reps: "3x30s"}] },
      { name: "Day 3: High-Load Posterior", focus: "GPP Conditioning", routine: [{name: "Deficit Deadlifts", reps: "3x3"}, {name: "Sandbag Bear Hug Carries", reps: "3x100ft"}, {name: "Heavy Kettlebell Swings", reps: "3x15"}, {name: "Towel Pull-ups", reps: "3xMax"}, {name: "Pallof Press", reps: "3x12/side"}] }
    ]
  }
];

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

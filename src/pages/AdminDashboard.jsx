import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

export default function AdminDashboard() {
  const [athletes, setAthletes] = useState([]);

  useEffect(() => {
    const fetchAthletes = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersList = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.role === 'athlete') {
          usersList.push({ id: doc.id, ...data });
        }
      });
      setAthletes(usersList);
    };
    fetchAthletes();
  }, []);

  const handleMedalUpdate = async (athleteId, currentMedals, type) => {
    try {
      const newAmount = (currentMedals[type] || 0) + 1;
      await updateDoc(doc(db, "users", athleteId), {
        [`medals.${type}`]: newAmount
      });
      
      // Update local state to reflect UI immediately
      setAthletes(athletes.map(a => 
        a.id === athleteId 
          ? { ...a, medals: { ...a.medals, [type]: newAmount } } 
          : a
      ));
    } catch (error) {
      console.error("Error updating medal", error);
      alert("Failed to update medal.");
    }
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
          <div style={{ fontSize: '2.5rem', fontFamily: 'Oswald, sans-serif', color: '#fff' }}>{athletes.length}</div>
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
        
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

        {/* Athlete Medal Management */}
        <div style={{ background: 'rgba(25, 25, 25, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '2rem', gridColumn: '1 / -1' }}>
          <h3 style={{ borderBottom: '1px solid #D92121', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Active Roster & Medal Tracking</h3>
          <p style={{ color: '#a0a0a0', marginBottom: '1rem', fontSize: '0.9rem' }}>Click a medal button to add a tournament placement to the wrestler's profile.</p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {athletes.length === 0 ? (
              <li style={{ padding: '1rem', color: '#a0a0a0' }}>No athletes registered yet.</li>
            ) : (
              athletes.map(athlete => (
                <li key={athlete.id} style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', marginBottom: '0.5rem', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <strong>{athlete.name}</strong> 
                    <div style={{ fontSize: '0.8rem', color: '#a0a0a0' }}>{athlete.email}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <button onClick={() => handleMedalUpdate(athlete.id, athlete.medals || {}, 'gold')} className="btn btn-outline" style={{ padding: '0.2rem 0.5rem', borderColor: '#FFD700', color: '#FFD700' }}>+ 🥇</button>
                      <span style={{ fontSize: '0.8rem', marginTop: '0.2rem' }}>{athlete.medals?.gold || 0}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <button onClick={() => handleMedalUpdate(athlete.id, athlete.medals || {}, 'silver')} className="btn btn-outline" style={{ padding: '0.2rem 0.5rem', borderColor: '#C0C0C0', color: '#C0C0C0' }}>+ 🥈</button>
                      <span style={{ fontSize: '0.8rem', marginTop: '0.2rem' }}>{athlete.medals?.silver || 0}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <button onClick={() => handleMedalUpdate(athlete.id, athlete.medals || {}, 'bronze')} className="btn btn-outline" style={{ padding: '0.2rem 0.5rem', borderColor: '#CD7F32', color: '#CD7F32' }}>+ 🥉</button>
                      <span style={{ fontSize: '0.8rem', marginTop: '0.2rem' }}>{athlete.medals?.bronze || 0}</span>
                    </div>
                  </div>
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
            <Link to="/technique" state={{ adminMode: true }}><button className="btn btn-outline" style={{ width: '100%' }}>Edit Technique Vault</button></Link>
            <Link to="/calendar" state={{ adminMode: true }}><button className="btn btn-outline" style={{ width: '100%' }}>Manage Schedule</button></Link>
            <Link to="/chat" state={{ adminMode: true }}><button className="btn btn-outline" style={{ width: '100%' }}>Messages</button></Link>
          </div>
        </div>

      </div>
    </div>
  );
}

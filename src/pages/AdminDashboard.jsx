import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

export default function AdminDashboard() {
  const [wrestlers, setWrestlers] = useState([]);
  const [parents, setParents] = useState([]);
  const [pendingAnalyses, setPendingAnalyses] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const wList = [];
      const pList = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.role === 'athlete') {
          if (data.accountType === 'parent') {
            pList.push({ id: doc.id, ...data });
          } else {
            wList.push({ id: doc.id, ...data });
          }
        }
      });
      setWrestlers(wList);
      setParents(pList);
    };
    
    const fetchAnalyses = async () => {
      const querySnapshot = await getDocs(collection(db, "analyses"));
      const analysesList = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.status === 'pending') {
          analysesList.push({ id: doc.id, ...data });
        }
      });
      setPendingAnalyses(analysesList);
    };

    fetchUsers();
    fetchAnalyses();
  }, []);

  const handleMedalUpdate = async (athleteId, currentMedals, type) => {
    try {
      const newAmount = (currentMedals[type] || 0) + 1;
      await updateDoc(doc(db, "users", athleteId), {
        [`medals.${type}`]: newAmount
      });
      
      setWrestlers(wrestlers.map(a => 
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
        
        {/* Pending Match Analysis Card */}
        <div style={{ background: 'rgba(25, 25, 25, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '2rem', gridColumn: '1 / -1' }}>
          <h3 style={{ borderBottom: '1px solid #D92121', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Pending Video Analysis</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {pendingAnalyses.length === 0 ? (
              <li style={{ padding: '1rem', color: '#a0a0a0' }}>No pending video requests.</li>
            ) : (
              pendingAnalyses.map(analysis => (
                <li key={analysis.id} style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', marginBottom: '0.5rem', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong>{analysis.userName}</strong>
                    <div style={{ fontSize: '0.8rem', color: '#D92121', textTransform: 'capitalize' }}>{analysis.tier} Tier</div>
                  </div>
                  <Link to="/analysis" state={{ adminMode: true }}><button className="btn btn-outline" style={{ padding: '0.5rem' }}>Review</button></Link>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Wrestler Roster */}
        <div style={{ background: 'rgba(25, 25, 25, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '2rem', gridColumn: '1 / -1' }}>
          <h3 style={{ borderBottom: '1px solid #D92121', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Wrestler Roster & Medal Tracking</h3>
          <p style={{ color: '#a0a0a0', marginBottom: '1rem', fontSize: '0.9rem' }}>Click a medal button to add a tournament placement to the wrestler's profile.</p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {wrestlers.length === 0 ? (
              <li style={{ padding: '1rem', color: '#a0a0a0' }}>No wrestlers registered yet.</li>
            ) : (
              wrestlers.map(athlete => (
                <li key={athlete.id} style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', marginBottom: '0.5rem', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <strong style={{ fontSize: '1.1rem', color: athlete.competition === 'yes' ? '#D92121' : '#fff' }}>{athlete.name}</strong> 
                    <div style={{ fontSize: '0.85rem', color: '#a0a0a0', marginTop: '4px' }}>
                      📧 {athlete.email} {athlete.phone ? `| 📱 ${athlete.phone}` : ''}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#888', marginTop: '2px' }}>
                      {athlete.school ? `School: ${athlete.school}` : ''} {athlete.age ? `| Age: ${athlete.age}` : ''} {athlete.competition === 'yes' ? '| Comp. Team' : ''}
                    </div>
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

        {/* Parent Directory */}
        <div style={{ background: 'rgba(25, 25, 25, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '2rem', gridColumn: '1 / -1' }}>
          <h3 style={{ borderBottom: '1px solid #D92121', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Parent Directory</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {parents.length === 0 ? (
              <li style={{ padding: '1rem', color: '#a0a0a0' }}>No parents registered yet.</li>
            ) : (
              parents.map(parent => (
                <li key={parent.id} style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', marginBottom: '0.5rem', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <strong style={{ fontSize: '1.1rem' }}>{parent.parentName}</strong> <span style={{ color: '#a0a0a0', fontSize: '0.9rem' }}>(Parent of {parent.name})</span>
                    <div style={{ fontSize: '0.85rem', color: '#a0a0a0', marginTop: '4px' }}>
                      📧 {parent.email} {parent.phone ? `| 📱 ${parent.phone}` : ''}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#888', marginTop: '2px' }}>
                      {parent.school ? `Child's School: ${parent.school}` : ''} {parent.age ? `| Child's Age: ${parent.age}` : ''}
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

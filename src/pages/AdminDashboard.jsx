import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

export default function AdminDashboard() {
  const [wrestlers, setWrestlers] = useState([]);
  const [parents, setParents] = useState([]);
  const [pendingAnalyses, setPendingAnalyses] = useState([]);

  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const wList = [];
        const pList = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          
          // Temporary fix for Faubion
          if (data.email === 'faubionwrestling@gmail.com' && !data.accountType) {
            updateDoc(doc.ref, {
              accountType: 'parent',
              parentName: 'Faubion Parent',
              name: 'Faubion Child',
              role: 'athlete'
            }).catch(e => console.error("Update fail:", e));
            data.accountType = 'parent';
            data.parentName = 'Faubion Parent';
            data.name = 'Faubion Child';
          }

          // Skip admins, show everyone else
          if (data.role !== 'admin' && data.email !== 'coach@kvegaselite.com') {
            if (data.accountType === 'parent' || data.parentName) {
              pList.push({ id: doc.id, ...data });
              // Parent accounts also contain the wrestler's info, so put them on the wrestler roster too!
              wList.push({ id: doc.id, ...data });
            } else {
              wList.push({ id: doc.id, ...data });
            }
          }
        });
        setWrestlers(wList);
        setParents(pList);
      } catch (err) {
        console.error("fetchUsers error:", err);
        setErrorMsg(err.message || 'Failed to fetch users.');
      }
    };
    
    const fetchAnalyses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "analyses"));
        const analysesList = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.status === 'pending') {
            analysesList.push({ id: doc.id, ...data });
          }
        });
        setPendingAnalyses(analysesList);
      } catch (err) {
        console.error("fetchAnalyses error:", err);
        if (!errorMsg) setErrorMsg(err.message || 'Failed to fetch analyses.');
      }
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

  const handleMembershipToggle = async (userId, currentMembership) => {
    try {
      const newMembership = currentMembership === 'elite' ? 'none' : 'elite';
      const newIsPremium = newMembership === 'elite';
      
      await updateDoc(doc(db, "users", userId), {
        membership: newMembership,
        isPremium: newIsPremium
      });
      
      setWrestlers(wrestlers.map(a => 
        a.id === userId ? { ...a, membership: newMembership, isPremium: newIsPremium } : a
      ));
      
      setParents(parents.map(p => 
        p.id === userId ? { ...p, membership: newMembership, isPremium: newIsPremium } : p
      ));
    } catch (error) {
      console.error("Error updating membership", error);
      alert("Failed to update membership status.");
    }
  };

  const handleRemoveUser = async (userId, userName, userType) => {
    if (window.confirm(`Are you sure you want to permanently remove ${userName} from the database?`)) {
      try {
        await deleteDoc(doc(db, "users", userId));
        // Remove from both lists to handle parent+child combo accounts
        setWrestlers(wrestlers.filter(w => w.id !== userId));
        setParents(parents.filter(p => p.id !== userId));
      } catch (error) {
        console.error("Error removing user", error);
        alert("Failed to remove user.");
      }
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '2rem', color: '#fff', fontFamily: 'Inter, sans-serif' }} className="fade-in">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontFamily: 'Oswald, sans-serif', color: '#D92121', fontSize: '2.5rem', textTransform: 'uppercase' }}>
          Coach's <span style={{ color: '#fff' }}>Dashboard</span>
        </h2>
        <p style={{ color: '#a0a0a0' }}>Welcome back, Coach Nelson. Here is your daily overview.</p>
        {errorMsg && <div style={{ color: '#D92121', background: 'rgba(217,33,33,0.1)', padding: '1rem', borderRadius: '4px', marginTop: '1rem', border: '1px solid #D92121' }}><strong>Error:</strong> {errorMsg}</div>}
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
                    <strong style={{ fontSize: '1.1rem', color: athlete.competition === 'yes' ? '#D92121' : '#fff' }}>
                      {athlete.membership && athlete.membership !== 'none' && <span style={{ color: '#00ff00', marginRight: '6px' }}>$</span>}
                      {athlete.name}
                    </strong> 
                    <div style={{ fontSize: '0.85rem', color: '#a0a0a0', marginTop: '4px' }}>
                      📧 {athlete.email} {athlete.phone ? `| 📱 ${athlete.phone}` : ''}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#888', marginTop: '2px' }}>
                      {athlete.school ? `School: ${athlete.school}` : ''} {athlete.age ? `| Age: ${athlete.age}` : ''} {athlete.competition === 'yes' ? '| Comp. Team' : ''}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <button 
                      onClick={() => handleMembershipToggle(athlete.id, athlete.membership)}
                      className="btn btn-outline"
                      style={{ 
                        padding: '0.2rem 0.5rem', 
                        fontSize: '0.75rem', 
                        borderColor: athlete.membership === 'elite' ? '#00ff00' : '#888',
                        color: athlete.membership === 'elite' ? '#00ff00' : '#888',
                        marginRight: '0.5rem'
                      }}
                    >
                      {athlete.membership === 'elite' ? 'Revoke Elite' : 'Grant Elite'}
                    </button>
                    <button 
                      onClick={() => handleRemoveUser(athlete.id, athlete.name, 'wrestler')}
                      className="btn btn-outline"
                      style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', borderColor: '#D92121', color: '#D92121', marginRight: '0.5rem' }}
                    >
                      Remove
                    </button>
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
                <li key={parent.id} style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', marginBottom: '0.5rem', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderLeft: parent.membership && parent.membership !== 'none' ? '4px solid #00ff00' : 'none' }}>
                  <div style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                      <strong style={{ fontSize: '1.1rem', color: '#fff' }}>
                        {parent.membership && parent.membership !== 'none' && <span style={{ color: '#00ff00', marginRight: '6px' }}>$</span>}
                        {parent.parentName}
                      </strong>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <button 
                          onClick={() => handleMembershipToggle(parent.id, parent.membership)}
                          className="btn btn-outline"
                          style={{ 
                            padding: '0.2rem 0.5rem', 
                            fontSize: '0.75rem', 
                            borderColor: parent.membership === 'elite' ? '#00ff00' : '#888',
                            color: parent.membership === 'elite' ? '#00ff00' : '#888'
                          }}
                        >
                          {parent.membership === 'elite' ? 'Revoke Elite' : 'Grant Elite'}
                        </button>
                        <button 
                          onClick={() => handleRemoveUser(parent.id, parent.parentName, 'parent')}
                          className="btn btn-outline"
                          style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', borderColor: '#D92121', color: '#D92121' }}
                        >
                          Remove
                        </button>
                        <span style={{ background: 'rgba(217, 33, 33, 0.2)', color: '#D92121', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                          Child: {parent.name}
                        </span>
                      </div>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#a0a0a0', marginTop: '8px' }}>
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

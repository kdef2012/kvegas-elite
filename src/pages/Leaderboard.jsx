import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';

export default function Leaderboard() {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  
  const [placements, setPlacements] = useState([]);
  const [newEntry, setNewEntry] = useState({ name: '', weight: '', tournament: '', placement: '' });

  useEffect(() => {
    const q = query(collection(db, 'leaderboard'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = [];
      snapshot.forEach((docSnap) => {
        data.push({ id: docSnap.id, ...docSnap.data() });
      });
      setPlacements(data);
    });

    return () => unsubscribe();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newEntry.name || !newEntry.placement) return;
    
    await addDoc(collection(db, 'leaderboard'), {
      ...newEntry,
      createdAt: serverTimestamp()
    });
    
    setNewEntry({ name: '', weight: '', tournament: '', placement: '' });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      await deleteDoc(doc(db, 'leaderboard', id));
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '2rem', color: '#fff', fontFamily: 'Inter, sans-serif' }} className="fade-in">
      <button onClick={() => navigate(-1)} className="btn btn-outline" style={{ marginBottom: '2rem', padding: '0.5rem 1rem', cursor: 'pointer', background: 'transparent', border: '1px solid #D92121', color: '#D92121', borderRadius: '4px' }}>&larr; Back</button>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontFamily: 'Oswald, sans-serif', color: '#D92121', fontSize: '3rem', textTransform: 'uppercase' }}>
          K-Vegas <span>Wall of Fame</span>
        </h2>
        <p style={{ color: '#a0a0a0' }}>Recent tournament placements from our elite athletes.</p>
      </div>

      <div style={{ background: 'rgba(25, 25, 25, 0.8)', border: '1px solid rgba(217, 33, 33, 0.5)', borderRadius: '12px', overflow: 'hidden' }}>
        
        {isAdmin && (
          <form onSubmit={handleAdd} style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.4)', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <input type="text" placeholder="Athlete Name" value={newEntry.name} onChange={e => setNewEntry({...newEntry, name: e.target.value})} style={{ flex: 1, padding: '0.8rem', background: '#111', color: '#fff', border: '1px solid #333', borderRadius: '4px' }} required />
            <input type="text" placeholder="Weight Class" value={newEntry.weight} onChange={e => setNewEntry({...newEntry, weight: e.target.value})} style={{ flex: 1, padding: '0.8rem', background: '#111', color: '#fff', border: '1px solid #333', borderRadius: '4px' }} required />
            <input type="text" placeholder="Tournament" value={newEntry.tournament} onChange={e => setNewEntry({...newEntry, tournament: e.target.value})} style={{ flex: 1, padding: '0.8rem', background: '#111', color: '#fff', border: '1px solid #333', borderRadius: '4px' }} required />
            <input type="text" placeholder="Placement (e.g. 1st Place)" value={newEntry.placement} onChange={e => setNewEntry({...newEntry, placement: e.target.value})} style={{ flex: 1, padding: '0.8rem', background: '#111', color: '#fff', border: '1px solid #333', borderRadius: '4px' }} required />
            <button type="submit" className="btn btn-primary" style={{ padding: '0.8rem 1.5rem' }}>Add Entry</button>
          </form>
        )}

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(0,0,0,0.5)', color: '#D92121', textTransform: 'uppercase' }}>
              <th style={{ padding: '1.5rem' }}>Athlete</th>
              <th style={{ padding: '1.5rem' }}>Weight Class</th>
              <th style={{ padding: '1.5rem' }}>Tournament</th>
              <th style={{ padding: '1.5rem' }}>Placement</th>
              {isAdmin && <th style={{ padding: '1.5rem', textAlign: 'right' }}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {placements.length === 0 ? (
              <tr>
                <td colSpan={isAdmin ? 5 : 4} style={{ padding: '2rem', textAlign: 'center', color: '#a0a0a0' }}>No recent placements recorded.</td>
              </tr>
            ) : placements.map((p) => (
              <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <td style={{ padding: '1.5rem', fontWeight: 'bold' }}>{p.name}</td>
                <td style={{ padding: '1.5rem', color: '#a0a0a0' }}>{p.weight}</td>
                <td style={{ padding: '1.5rem' }}>{p.tournament}</td>
                <td style={{ padding: '1.5rem', color: String(p.placement).includes('1st') ? '#ffd700' : '#c0c0c0', fontWeight: 'bold' }}>
                  {String(p.placement).includes('1st') ? '🥇 ' : '🥈 '}{p.placement}
                </td>
                {isAdmin && (
                  <td style={{ padding: '1.5rem', textAlign: 'right' }}>
                    <button onClick={() => handleDelete(p.id)} className="btn btn-outline" style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', borderColor: '#ff4444', color: '#ff4444' }}>Delete</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

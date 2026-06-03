import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, deleteDoc, updateDoc, doc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';

export default function Calendar() {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [view, setView] = useState('team'); // 'team' or 'private'
  
  // State Data
  const [teamPractices, setTeamPractices] = useState([]);
  const [privateSlots, setPrivateSlots] = useState([]);

  // Admin Forms State
  const [newPractice, setNewPractice] = useState({ day: '', time: '', focus: '' });
  const [newSlot, setNewSlot] = useState({ date: '', time: '' });

  useEffect(() => {
    // Listen to Team Practices
    const qTeam = query(collection(db, 'team_practices'), orderBy('createdAt', 'asc'));
    const unsubTeam = onSnapshot(qTeam, (snapshot) => {
      const data = [];
      snapshot.forEach(doc => data.push({ id: doc.id, ...doc.data() }));
      setTeamPractices(data);
    });

    // Listen to Private Slots
    const qPrivate = query(collection(db, 'private_slots'), orderBy('createdAt', 'asc'));
    const unsubPrivate = onSnapshot(qPrivate, (snapshot) => {
      const data = [];
      snapshot.forEach(doc => data.push({ id: doc.id, ...doc.data() }));
      setPrivateSlots(data);
    });

    return () => {
      unsubTeam();
      unsubPrivate();
    };
  }, []);

  const handleAddPractice = async (e) => {
    e.preventDefault();
    if (!newPractice.day || !newPractice.time) return;
    await addDoc(collection(db, 'team_practices'), { ...newPractice, createdAt: serverTimestamp() });
    setNewPractice({ day: '', time: '', focus: '' });
  };

  const handleDeletePractice = async (id) => {
    await deleteDoc(doc(db, 'team_practices', id));
  };

  const handleAddSlot = async (e) => {
    e.preventDefault();
    if (!newSlot.date || !newSlot.time) return;
    await addDoc(collection(db, 'private_slots'), { ...newSlot, status: 'Available', createdAt: serverTimestamp() });
    setNewSlot({ date: '', time: '' });
  };

  const handleDeleteSlot = async (id) => {
    await deleteDoc(doc(db, 'private_slots', id));
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '2rem auto', padding: '2rem', color: '#fff', fontFamily: 'Inter, sans-serif' }} className="fade-in">
      
      <button onClick={() => navigate(-1)} className="btn btn-outline" style={{ marginBottom: '2rem', padding: '0.5rem 1rem' }}>&larr; Back</button>

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontFamily: 'Oswald, sans-serif', color: '#D92121', fontSize: '3rem', textTransform: 'uppercase' }}>
          Schedule & <span>Booking</span>
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
          <button className={`btn ${view === 'team' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setView('team')}>Team Schedule</button>
          <button className={`btn ${view === 'private' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setView('private')}>Book Private Lesson</button>
        </div>
      </div>

      {view === 'team' ? (
        <div className="fade-in">
          {isAdmin && (
            <form onSubmit={handleAddPractice} style={{ marginBottom: '2rem', padding: '1.5rem', background: 'rgba(0,0,0,0.4)', border: '1px solid #D92121', borderRadius: '8px', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <input type="text" placeholder="Day (e.g., Monday)" value={newPractice.day} onChange={e => setNewPractice({...newPractice, day: e.target.value})} style={{ flex: 1, padding: '0.8rem', background: '#111', color: '#fff', border: '1px solid #333', borderRadius: '4px' }} required />
              <input type="text" placeholder="Time (e.g., 6:00 PM - 8:00 PM)" value={newPractice.time} onChange={e => setNewPractice({...newPractice, time: e.target.value})} style={{ flex: 1, padding: '0.8rem', background: '#111', color: '#fff', border: '1px solid #333', borderRadius: '4px' }} required />
              <input type="text" placeholder="Focus (e.g., Live Wrestling)" value={newPractice.focus} onChange={e => setNewPractice({...newPractice, focus: e.target.value})} style={{ flex: 1, padding: '0.8rem', background: '#111', color: '#fff', border: '1px solid #333', borderRadius: '4px' }} required />
              <button type="submit" className="btn btn-primary">Add Practice</button>
            </form>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {teamPractices.map((p) => (
              <div key={p.id} style={{ background: 'rgba(25, 25, 25, 0.8)', padding: '2rem', borderRadius: '12px', borderTop: '4px solid #D92121', textAlign: 'center', position: 'relative' }}>
                {isAdmin && <button onClick={() => handleDeletePractice(p.id)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'transparent', border: 'none', color: '#ff4444', cursor: 'pointer', fontSize: '1.2rem' }}>&times;</button>}
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{p.day}</h3>
                <div style={{ color: '#D92121', fontWeight: 'bold', marginBottom: '1rem' }}>{p.time}</div>
                <p style={{ color: '#a0a0a0' }}>{p.focus}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ background: 'rgba(25, 25, 25, 0.8)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }} className="fade-in">
          <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #D92121', paddingBottom: '0.5rem' }}>
            {isAdmin ? 'Manage Your Availability' : 'Available Slots with Coach Nelson'}
          </h3>
          
          {isAdmin && (
            <form onSubmit={handleAddSlot} style={{ marginBottom: '2rem', padding: '1rem', background: 'rgba(0,0,0,0.4)', border: '1px solid #D92121', borderRadius: '8px', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <input type="text" placeholder="Date (e.g., Oct 28, 2026)" value={newSlot.date} onChange={e => setNewSlot({...newSlot, date: e.target.value})} style={{ flex: 1, padding: '0.8rem', background: '#111', color: '#fff', border: '1px solid #333', borderRadius: '4px' }} required />
              <input type="text" placeholder="Time (e.g., 5:00 PM)" value={newSlot.time} onChange={e => setNewSlot({...newSlot, time: e.target.value})} style={{ flex: 1, padding: '0.8rem', background: '#111', color: '#fff', border: '1px solid #333', borderRadius: '4px' }} required />
              <button type="submit" className="btn btn-primary">Add Slot</button>
            </form>
          )}

          <ul style={{ listStyle: 'none', padding: 0 }}>
            {privateSlots.map((slot) => (
              <li key={slot.id} style={{ padding: '1rem', background: 'rgba(0,0,0,0.5)', marginBottom: '1rem', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>{slot.date}</strong> at {slot.time}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  {isAdmin ? (
                    <>
                      <span style={{ color: slot.status === 'Available' ? '#00ff00' : '#ff4444', fontWeight: 'bold' }}>{slot.status}</span>
                      <button onClick={() => handleDeleteSlot(slot.id)} className="btn btn-outline" style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', borderColor: '#ff4444', color: '#ff4444' }}>Delete</button>
                    </>
                  ) : slot.status === 'Available' ? (
                    <div style={{ width: '150px', background: '#fff', padding: '5px', borderRadius: '6px' }}>
                      <PayPalButtons 
                        style={{ layout: "horizontal", height: 30, tagline: false }}
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [{ description: "Private Lesson - 1 Hour", amount: { value: '60.00' } }]
                          });
                        }}
                        onApprove={async (data, actions) => {
                          const details = await actions.order.capture();
                          await updateDoc(doc(db, 'private_slots', slot.id), { status: 'Booked' });
                          alert(`Lesson booked successfully for ${details.payer.name.given_name}!`);
                        }}
                      />
                    </div>
                  ) : (
                    <span style={{ color: '#a0a0a0', fontWeight: 'bold' }}>Booked</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}

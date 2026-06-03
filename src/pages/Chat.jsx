import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Chat() {
  const navigate = useNavigate();
  const [activeChat, setActiveChat] = useState('team'); // 'team' or 'coach'
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { sender: "Coach Nelson (Admin)", text: "Practice is moved to 6:00 PM tonight due to weather. See you all on the mat.", time: "10:00 AM", type: "team", isMe: true },
    { sender: "Alex S.", text: "Got it, Coach. Bringing my gear.", time: "10:05 AM", type: "team", isMe: false },
    { sender: "Coach Nelson (Admin)", text: "Hey David, your stance was much better yesterday. Let's work on hand fighting today.", time: "11:00 AM", type: "coach", isMe: true }
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    const newMessage = { sender: "Coach Nelson (Admin)", text: message, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), type: activeChat, isMe: true };
    setMessages([...messages, newMessage]);
    setMessage('');
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '2rem auto', padding: '2rem', color: '#fff', fontFamily: 'Inter, sans-serif' }} className="fade-in">
      <button onClick={() => navigate(-1)} className="btn btn-outline" style={{ marginBottom: '2rem', padding: '0.5rem 1rem' }}>&larr; Back</button>
      <div style={{ display: 'flex', gap: '2rem', height: '600px' }}>
        
        {/* Sidebar */}
        <div style={{ width: '250px', background: 'rgba(25, 25, 25, 0.8)', borderRadius: '12px', padding: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h3 style={{ color: '#D92121', marginBottom: '1.5rem', fontFamily: 'Oswald' }}>CHANNELS</h3>
          <div 
            style={{ padding: '1rem', borderRadius: '6px', cursor: 'pointer', background: activeChat === 'team' ? 'rgba(217, 33, 33, 0.2)' : 'transparent', borderLeft: activeChat === 'team' ? '3px solid #D92121' : 'none' }}
            onClick={() => setActiveChat('team')}
          >
            # Team Announcements
          </div>
          <div 
            style={{ padding: '1rem', borderRadius: '6px', cursor: 'pointer', background: activeChat === 'coach' ? 'rgba(217, 33, 33, 0.2)' : 'transparent', borderLeft: activeChat === 'coach' ? '3px solid #D92121' : 'none' }}
            onClick={() => setActiveChat('coach')}
          >
            # Direct: Coach Nelson
          </div>
        </div>

        {/* Chat Area */}
        <div style={{ flex: 1, background: 'rgba(0, 0, 0, 0.5)', borderRadius: '12px', display: 'flex', flexDirection: 'column', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <h3>{activeChat === 'team' ? 'Team Announcements' : 'Direct Message'}</h3>
          </div>
          
          <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {messages.filter(m => m.type === activeChat).map((m, i) => (
              <div key={i} style={{ alignSelf: m.sender === 'You' ? 'flex-end' : 'flex-start', background: m.sender === 'You' ? '#D92121' : 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '8px', maxWidth: '70%' }}>
                <div style={{ fontSize: '0.8rem', color: m.sender === 'You' ? '#ffcccc' : '#a0a0a0', marginBottom: '5px' }}>{m.sender} • {m.time}</div>
                <div>{m.text}</div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '1rem' }}>
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..." 
              style={{ flex: 1, padding: '1rem', background: 'rgba(25,25,25,0.8)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '6px' }} 
            />
            <button type="submit" className="btn btn-primary">Send</button>
          </form>
        </div>

      </div>
    </div>
  );
}

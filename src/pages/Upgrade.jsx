import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { PayPalButtons } from "@paypal/react-paypal-js";
import './Login.css';

export default function Upgrade() {
  const navigate = useNavigate();
  const { currentUser, userProfile, logout } = useAuth();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleApprove = async (data, actions) => {
    try {
      const details = await actions.order.capture();
      // Update Firestore user to premium
      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        await updateDoc(userRef, { isPremium: true });
        setSuccess(true);
        setTimeout(() => {
          navigate('/dashboard');
          window.location.reload(); // Refresh state
        }, 3000);
      }
    } catch (err) {
      setError("Payment processing failed. Please contact Coach Nelson.");
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (success) {
    return (
      <div className="login-page fade-in">
        <div className="login-card" style={{ textAlign: 'center', maxWidth: '600px' }}>
          <h2 style={{ color: '#00ff00', fontSize: '3rem', marginBottom: '1rem' }}>Success!</h2>
          <p style={{ color: '#fff', fontSize: '1.2rem' }}>Your K-Vegas Elite Premium membership is active.</p>
          <p style={{ color: '#a0a0a0', marginTop: '1rem' }}>Redirecting to your Athlete Hub...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page fade-in">
      <div className="login-card" style={{ maxWidth: '600px' }}>
        <div className="login-header">
          <h2>Premium <span>Access Required</span></h2>
          <p style={{ color: '#a0a0a0', marginTop: '1rem' }}>
            To access the S&C Library, Technique Vault, Match Analysis, and Team Practice Schedule, you must hold an active K-Vegas Elite membership.
          </p>
        </div>

        {error && <div style={{ color: '#D92121', background: 'rgba(217,33,33,0.1)', padding: '1rem', borderRadius: '4px', marginBottom: '2rem', textAlign: 'center' }}>{error}</div>}

        <div style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid #D92121', borderRadius: '8px', padding: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
          <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Elite Membership</h3>
          <div style={{ fontSize: '3rem', fontFamily: 'Oswald, sans-serif', color: '#D92121', marginBottom: '1.5rem' }}>$150<span style={{ fontSize: '1rem', color: '#a0a0a0' }}>/month</span></div>
          <ul style={{ listStyle: 'none', padding: 0, color: '#fff', textAlign: 'left', margin: '0 auto', maxWidth: '300px' }}>
            <li style={{ marginBottom: '0.5rem' }}>✓ Full Facility Access</li>
            <li style={{ marginBottom: '0.5rem' }}>✓ Periodized S&C Programs</li>
            <li style={{ marginBottom: '0.5rem' }}>✓ Unlimited Match Analysis</li>
            <li style={{ marginBottom: '0.5rem' }}>✓ Technique Vault Access</li>
          </ul>
        </div>

        <div style={{ padding: '0 2rem' }}>
          <PayPalButtons 
            style={{ layout: "vertical", shape: "rect", color: "gold" }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: "150.00"
                  },
                  description: "K-Vegas Elite Premium Membership"
                }]
              });
            }}
            onApprove={handleApprove}
            onError={(err) => setError("PayPal encountered an error. Please try again.")}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', padding: '0 1rem' }}>
          <button onClick={() => navigate('/dashboard')} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>Return to Free Hub</button>
          <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.5rem 1rem', borderColor: '#D92121', color: '#D92121' }}>Sign Out</button>
        </div>
      </div>
    </div>
  );
}

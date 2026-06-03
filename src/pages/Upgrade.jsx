import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { PayPalButtons } from "@paypal/react-paypal-js";
import './Login.css';

export default function Upgrade() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleApprove = async (tier) => {
    try {
      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        await updateDoc(userRef, { 
          isPremium: true,
          membership: tier 
        });
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
          <p style={{ color: '#fff', fontSize: '1.2rem' }}>Your K-Vegas Elite membership is active.</p>
          <p style={{ color: '#a0a0a0', marginTop: '1rem' }}>Redirecting to your Athlete Hub...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page fade-in" style={{ padding: '4rem 1rem' }}>
      <div className="login-card" style={{ maxWidth: '800px', width: '100%' }}>
        <div className="login-header" style={{ marginBottom: '3rem' }}>
          <h2>Select Your <span>Membership</span></h2>
          <p style={{ color: '#a0a0a0', marginTop: '1rem' }}>
            Upgrade your account to unlock free S&C protocols, technique discounts, and full facility access.
          </p>
        </div>

        {error && <div style={{ color: '#D92121', background: 'rgba(217,33,33,0.1)', padding: '1rem', borderRadius: '4px', marginBottom: '2rem', textAlign: 'center' }}>{error}</div>}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
          
          {/* Beginner Tier */}
          <div style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '0.5rem', textAlign: 'center' }}>Beginner Membership</h3>
            <div style={{ fontSize: '3rem', fontFamily: 'Oswald, sans-serif', color: '#fff', marginBottom: '1.5rem', textAlign: 'center' }}>$100<span style={{ fontSize: '1rem', color: '#a0a0a0' }}>/month</span></div>
            <ul style={{ listStyle: 'none', padding: 0, color: '#a0a0a0', marginBottom: '2rem', flexGrow: 1 }}>
              <li style={{ marginBottom: '0.5rem' }}>✓ Fundamentals Training</li>
              <li style={{ marginBottom: '0.5rem' }}>✓ Free S&C Library Access</li>
              <li style={{ marginBottom: '0.5rem' }}>✓ Access to Team Schedule</li>
              <li style={{ marginBottom: '0.5rem' }}>✓ Discounted Match Analysis</li>
            </ul>
            <PayPalButtons 
              style={{ layout: "vertical", shape: "rect", color: "white" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [{ amount: { value: "100.00" }, description: "Beginner Membership" }]
                });
              }}
              onApprove={async (data, actions) => {
                await actions.order.capture();
                handleApprove('beginner');
              }}
              onError={(err) => setError("PayPal encountered an error.")}
            />
          </div>

          {/* Elite Tier */}
          <div style={{ background: 'rgba(217,33,33,0.1)', border: '2px solid #D92121', borderRadius: '8px', padding: '2rem', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#D92121', padding: '2px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' }}>MOST POPULAR</div>
            <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '0.5rem', textAlign: 'center' }}>Elite Membership</h3>
            <div style={{ fontSize: '3rem', fontFamily: 'Oswald, sans-serif', color: '#D92121', marginBottom: '1.5rem', textAlign: 'center' }}>$150<span style={{ fontSize: '1rem', color: '#a0a0a0' }}>/month</span></div>
            <ul style={{ listStyle: 'none', padding: 0, color: '#fff', marginBottom: '2rem', flexGrow: 1 }}>
              <li style={{ marginBottom: '0.5rem' }}>✓ Elite Competition Training</li>
              <li style={{ marginBottom: '0.5rem' }}>✓ Free S&C Library Access</li>
              <li style={{ marginBottom: '0.5rem', color: '#00ff00' }}>✓ 50% Off All Technique Videos</li>
              <li style={{ marginBottom: '0.5rem' }}>✓ Discounted Match Analysis</li>
            </ul>
            <PayPalButtons 
              style={{ layout: "vertical", shape: "rect", color: "gold" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [{ amount: { value: "150.00" }, description: "Elite Membership" }]
                });
              }}
              onApprove={async (data, actions) => {
                await actions.order.capture();
                handleApprove('elite');
              }}
              onError={(err) => setError("PayPal encountered an error.")}
            />
          </div>

        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/dashboard')} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>Return to Free Hub</button>
        </div>
      </div>
    </div>
  );
}

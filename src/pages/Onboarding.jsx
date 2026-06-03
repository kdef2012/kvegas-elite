import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Onboarding.css';

export default function Onboarding() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  
  const [role, setRole] = useState(null); // 'parent' or 'wrestler'
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    password: '',
    name: '', // child's name if parent, or wrestler's name
    school: '',
    age: '',
    experience: '', // optional
    competition: '' // 'yes' or 'no'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Call Firebase Auth signup from AuthContext
      await signup(formData.email, formData.password, formData.name);
      
      // Successfully signed up and profile written to Firestore
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to create account.');
    }
    
    setLoading(false);
  };

  return (
    <div className="onboarding-container fade-in">
      {!role ? (
        <div className="role-selection">
          <h2>Join K-Vegas Elite</h2>
          <p>Are you registering yourself or your child?</p>
          <div className="role-buttons">
            <button className="btn btn-primary" onClick={() => setRole('wrestler')}>I am a Wrestler</button>
            <button className="btn btn-outline" onClick={() => setRole('parent')}>I am a Parent</button>
          </div>
        </div>
      ) : (
        <form className="onboarding-form fade-in" onSubmit={handleSubmit}>
          <h2>{role === 'parent' ? 'Parent Registration' : 'Wrestler Registration'}</h2>
          
          {error && <div style={{ color: '#D92121', background: 'rgba(217,33,33,0.1)', padding: '1rem', borderRadius: '4px', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

          {role === 'parent' && (
            <div className="parent-fields section-box">
              <h3>Parent/Guardian Details</h3>
              <div className="form-group">
                <label>Parent Full Name *</label>
                <input type="text" name="parentName" required onChange={handleChange} />
              </div>
            </div>
          )}

          <div className="wrestler-fields section-box">
            <h3>{role === 'parent' ? 'Child Details' : 'Athlete Details'}</h3>
            <div className="form-group">
              <label>{role === 'parent' ? "Child's Full Name *" : "Full Name *"}</label>
              <input type="text" name="name" required onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>School *</label>
              <input type="text" name="school" required onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Age *</label>
              <input type="number" name="age" required onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Years of Experience (Optional)</label>
              <input type="number" name="experience" onChange={handleChange} />
            </div>
            
            <div className="form-group radio-group">
              <label>Training Path *</label>
              <div className="radio-options">
                <label>
                  <input type="radio" name="competition" value="yes" required onChange={handleChange} />
                  Competition Team
                </label>
                <label>
                  <input type="radio" name="competition" value="no" required onChange={handleChange} />
                  Non-Competition / Fundamentals
                </label>
              </div>
            </div>
          </div>

          <div className="account-fields section-box">
            <h3>Account Setup</h3>
            <div className="form-group">
              <label>Email Address *</label>
              <input type="email" name="email" required onChange={handleChange} placeholder="athlete@example.com" />
            </div>
            <div className="form-group">
              <label>Password *</label>
              <input type="password" name="password" required onChange={handleChange} placeholder="••••••••" minLength="6" />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={() => setRole(null)}>Back</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Creating Account...' : 'Complete Registration'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

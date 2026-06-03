import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Onboarding.css';

export default function Onboarding() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null); // 'parent' or 'wrestler'
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [profileData, setProfileData] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    name: '', // child's name if parent, or wrestler's name
    school: '',
    age: '',
    experience: '', // optional
    competition: '' // 'yes' or 'no'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here we would normally save to Firebase Auth and Firestore
    
    // Generate Instant Locker Card Data
    setProfileData({
      name: role === 'parent' ? formData.name : formData.name,
      school: formData.school,
      status: formData.competition === 'yes' ? 'Competition Athlete' : 'Non-Competition Athlete',
      role: role
    });
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="locker-card-container">
        <div className="locker-card fade-in">
          <h2>Official K-Vegas Elite Roster</h2>
          <div className="profile-details">
            <div className="avatar-placeholder"></div>
            <div className="info">
              <h3>{profileData.name}</h3>
              <p><strong>School:</strong> {profileData.school}</p>
              <p><strong>Status:</strong> <span className="status-badge">{profileData.status}</span></p>
            </div>
          </div>
          <p className="welcome-msg">Welcome to the family. Your digital locker is ready.</p>
          <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
        </div>
      </div>
    );
  }

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
          
          {role === 'parent' && (
            <div className="parent-fields section-box">
              <h3>Parent/Guardian Details</h3>
              <div className="form-group">
                <label>Parent Full Name *</label>
                <input type="text" name="parentName" required onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input type="email" name="email" required onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input type="tel" name="phone" required onChange={handleChange} />
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

          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={() => setRole(null)}>Back</button>
            <button type="submit" className="btn btn-primary">Complete Registration</button>
          </div>
        </form>
      )}
    </div>
  );
}

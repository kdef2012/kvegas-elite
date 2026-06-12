import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Onboarding.css';

export default function Onboarding() {
  const navigate = useNavigate();
  const { signup, createChildAccount } = useAuth();
  
  const [role, setRole] = useState(null); // 'parent' or 'wrestler'
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    password: '',
  });

  const [wrestlers, setWrestlers] = useState([
    { name: '', school: '', age: '', experience: '', competition: 'no', childEmail: '', childPassword: '' }
  ]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWrestlerChange = (index, e) => {
    const updatedWrestlers = [...wrestlers];
    updatedWrestlers[index][e.target.name] = e.target.value;
    setWrestlers(updatedWrestlers);
  };

  const addWrestler = () => {
    setWrestlers([...wrestlers, { name: '', school: '', age: '', experience: '', competition: 'no', childEmail: '', childPassword: '' }]);
  };

  const removeWrestler = (index) => {
    if (wrestlers.length > 1) {
      const updatedWrestlers = wrestlers.filter((_, i) => i !== index);
      setWrestlers(updatedWrestlers);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (role === 'parent') {
        // 1. Create Parent Account
        const { password, email, parentName, phone } = formData;
        const parentResult = await signup(email, password, {
          parentName,
          phone,
          accountType: 'parent',
          role: 'parent'
        });

        const parentUid = parentResult.user.uid;

        // 2. Loop through wrestlers and create child accounts
        for (let i = 0; i < wrestlers.length; i++) {
          const w = wrestlers[i];
          await createChildAccount(
            w.childEmail, 
            w.childPassword, 
            {
              name: w.name,
              school: w.school,
              age: w.age,
              experience: w.experience,
              competition: w.competition,
              parentName: parentName,
              phone: phone
            },
            parentUid
          );
        }
      } else {
        // Independent Wrestler Flow
        const w = wrestlers[0];
        const { password, email, phone } = formData;
        await signup(email, password, {
          name: w.name,
          phone: phone,
          school: w.school,
          age: w.age,
          experience: w.experience,
          competition: w.competition,
          accountType: 'wrestler',
          role: 'athlete'
        });
      }
      
      // Successfully signed up
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError('An email provided is already registered. Please ensure all parent and child emails are unique.');
      } else {
        setError(err.message || 'Failed to create account.');
      }
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
            <button className="btn btn-primary" onClick={() => setRole('wrestler')}>I am an Athlete</button>
            <button className="btn btn-outline" onClick={() => setRole('parent')}>I am a Parent</button>
          </div>
          <div style={{ marginTop: '2rem' }}>
            <p style={{ color: '#a0a0a0' }}>Already have an account? <span onClick={() => navigate('/login')} style={{ color: '#D92121', cursor: 'pointer', textDecoration: 'underline' }}>Log in here.</span></p>
          </div>
        </div>
      ) : (
        <form className="onboarding-form fade-in" onSubmit={handleSubmit}>
          <h2>{role === 'parent' ? 'Parent Registration' : 'Athlete Registration'}</h2>
          
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

          <div className="account-fields section-box">
            <h3>{role === 'parent' ? 'Parent Account Login' : 'Account Setup'}</h3>
            <div className="form-group">
              <label>Email Address *</label>
              <input type="email" name="email" required onChange={handleChange} placeholder="athlete@example.com" />
            </div>
            <div className="form-group">
              <label>Phone Number *</label>
              <input type="tel" name="phone" required onChange={handleChange} placeholder="(555) 555-5555" />
            </div>
            <div className="form-group">
              <label>Password *</label>
              <input type="password" name="password" required onChange={handleChange} placeholder="••••••••" minLength="6" autoComplete="new-password" />
            </div>
          </div>

          {wrestlers.map((wrestler, index) => (
            <div key={index} className="wrestler-fields section-box" style={{ position: 'relative' }}>
              <h3>{role === 'parent' ? `Child Details #${index + 1}` : 'Athlete Details'}</h3>
              
              {role === 'parent' && wrestlers.length > 1 && (
                <button 
                  type="button" 
                  onClick={() => removeWrestler(index)}
                  style={{ position: 'absolute', top: '15px', right: '15px', background: 'transparent', border: '1px solid #D92121', color: '#D92121', borderRadius: '4px', cursor: 'pointer', padding: '0.2rem 0.5rem' }}
                >
                  Remove
                </button>
              )}

              <div className="form-group">
                <label>{role === 'parent' ? "Child's Full Name *" : "Full Name *"}</label>
                <input type="text" name="name" value={wrestler.name} required onChange={(e) => handleWrestlerChange(index, e)} />
              </div>

              {role === 'parent' && (
                <>
                  <div className="form-group">
                    <label>Child's Login Email *</label>
                    <input type="email" name="childEmail" value={wrestler.childEmail} required onChange={(e) => handleWrestlerChange(index, e)} placeholder="child@example.com" />
                  </div>
                  <div className="form-group">
                    <label>Child's Password *</label>
                    <input type="password" name="childPassword" value={wrestler.childPassword} required onChange={(e) => handleWrestlerChange(index, e)} placeholder="••••••••" minLength="6" autoComplete="new-password" />
                  </div>
                </>
              )}

              <div className="form-group">
                <label>School *</label>
                <input type="text" name="school" value={wrestler.school} required onChange={(e) => handleWrestlerChange(index, e)} />
              </div>
              <div className="form-group">
                <label>Age *</label>
                <input type="number" name="age" value={wrestler.age} required onChange={(e) => handleWrestlerChange(index, e)} />
              </div>
              <div className="form-group">
                <label>Years of Experience (Optional)</label>
                <input type="number" name="experience" value={wrestler.experience} onChange={(e) => handleWrestlerChange(index, e)} />
              </div>
              
              <div className="form-group radio-group">
                <label>Training Path *</label>
                <div className="radio-options">
                  <label>
                    <input type="radio" name="competition" value="yes" checked={wrestler.competition === 'yes'} required onChange={(e) => handleWrestlerChange(index, e)} />
                    Competition Team
                  </label>
                  <label>
                    <input type="radio" name="competition" value="no" checked={wrestler.competition === 'no'} required onChange={(e) => handleWrestlerChange(index, e)} />
                    Non-Competition / Fundamentals
                  </label>
                </div>
              </div>
            </div>
          ))}

          {role === 'parent' && (
            <button type="button" className="btn btn-outline" onClick={addWrestler} style={{ marginBottom: '2rem', width: '100%' }}>
              + Add Another Wrestler
            </button>
          )}

          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={() => setRole(null)}>Back</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Creating Account(s)...' : 'Complete Registration'}
            </button>
          </div>
          
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <p style={{ color: '#a0a0a0', fontSize: '0.9rem' }}>Already registered? <span onClick={() => navigate('/login')} style={{ color: '#D92121', cursor: 'pointer', textDecoration: 'underline' }}>Log in</span></p>
          </div>
        </form>
      )}
    </div>
  );
}

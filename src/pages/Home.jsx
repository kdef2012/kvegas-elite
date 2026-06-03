import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const [logoClicks, setLogoClicks] = useState(0);

  const handleLogoClick = (e) => {
    e.preventDefault();
    const newClicks = logoClicks + 1;
    if (newClicks >= 3) {
      const password = window.prompt("Enter Admin Password:");
      if (password === "0610") {
        navigate('/admin');
      }
      setLogoClicks(0);
    } else {
      setLogoClicks(newClicks);
    }
  };

  return (
    <>
      {/* Navigation */}
      <nav className="glass">
        <div className="container nav-container">
          <Link to="/" className="logo" onClick={handleLogoClick}>
            <img src="/logo.jpg" alt="K-Vegas Elite Logo" />
          </Link>
          <ul className="nav-links">
            <li><a href="#hero">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#programs">Programs</a></li>
            <li><a href="#coach-corner">Coach's Corner</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="/join" className="btn btn-primary">Join Now</Link>
            <Link to="/login" className="btn btn-outline" style={{ borderColor: 'var(--border-color)', color: 'var(--text-light)' }}>Log In</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="hero">
        <div className="hero-bg" style={{ backgroundImage: "linear-gradient(rgba(10, 10, 10, 0.8), rgba(10, 10, 10, 0.9)), url('/hero.jpg')" }}></div>
        <div className="container">
          <div className="hero-content fade-in">
            <h1 className="hero-title">Train With The <span>Elite</span></h1>
            <p className="hero-subtitle">Building champions on and off the mat. We provide a family-oriented environment for wrestlers of all skill levels, from beginners to national competitors.</p>
            <div className="hero-buttons">
              <a href="#programs" className="btn btn-primary">View Programs</a>
              <a href="#about" className="btn btn-outline">Meet Coach Nelson</a>
            </div>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-image fade-in-left" style={{ backgroundImage: "url('/20251017_202016.jpg')" }}></div>
            <div className="about-text fade-in-right">
              <h2 className="section-title" style={{ textAlign: 'left' }}>About <span>K-Vegas Elite</span></h2>
              <p>Led by Coach Kendall Nelson, K-Vegas Elite (formerly Falcon Wrestling) was rebranded in 2018 to elevate wrestling in the Winston-Salem and Kernersville area.</p>
              <p>Our mission is to provide a safe, inclusive, and highly competitive environment. We believe that the discipline, confidence, and hard work developed on the mat translate directly into success in life.</p>
              <p>Whether you are stepping onto the mat for the first time or training for a national title, we have the coaching, facility, and community to help you achieve your goals.</p>
              <a href="#programs" className="btn btn-outline" style={{ marginTop: '1rem' }}>Start Your Journey</a>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" style={{ backgroundColor: 'var(--bg-darker)' }}>
        <div className="container">
          <h2 className="section-title">Our <span>Programs</span></h2>
          <div className="programs-grid">
            <div className="glass-card program-card fade-in-up">
              <h3>Youth & Beginner</h3>
              <p>Focuses on fundamental skills, body awareness, and developing a love for the sport in a fun and safe environment.</p>
              <span className="price">$100<span>/mo</span></span>
              <Link to="/join" className="btn btn-outline" style={{ width: '100%' }}>Sign Up</Link>
            </div>
            
            <div className="glass-card program-card fade-in-up" style={{ borderColor: 'var(--primary-red)' }}>
              <h3>Elite Competition</h3>
              <p>Intensive training for experienced wrestlers preparing for state and national level competition. Advanced technique and live wrestling.</p>
              <span className="price">$150<span>/mo</span></span>
              <Link to="/join" className="btn btn-primary" style={{ width: '100%' }}>Sign Up</Link>
            </div>

            <div className="glass-card program-card fade-in-up">
              <h3>Private Sessions</h3>
              <p>1-on-1 coaching with Coach Kendall Nelson. Highly personalized technical drilling and strategy development.</p>
              <span className="price">$60<span>/session</span></span>
              <Link to="/calendar" className="btn btn-outline" style={{ width: '100%' }}>Book Session</Link>
            </div>
          </div>
          
          <div className="fade-in-up" style={{ textAlign: 'center', marginTop: '3rem', padding: '2rem', borderRadius: '12px', background: 'var(--bg-card)', border: '1px dashed var(--primary-red)' }}>
            <h3 style={{ color: 'var(--text-light)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Just passing through?</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>We welcome guests from out of town or wrestlers looking for extra mat time.</p>
            <div style={{ fontSize: '2.5rem', fontFamily: 'Oswald, sans-serif', color: 'var(--primary-red)', margin: '1rem 0' }}>$20 <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Drop-in Fee</span></div>
            <a href="#contact" className="btn btn-primary">Contact Us to Drop In</a>
          </div>
        </div>
      </section>

      {/* Coach's Corner Section */}
      <section id="coach-corner">
        <div className="container">
          <h2 className="section-title">Coach's <span>Corner</span></h2>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 3rem auto' }} className="fade-in">
            Unlock premium technique breakdowns and get personalized match analysis.
          </p>
          
          <div className="video-grid">
            <div className="video-card fade-in-up">
              <div className="video-thumbnail" style={{ backgroundImage: "url('/92558abc-3d94-427b-bd46-28c55f7ac688.jpg')" }}>
                <span className="premium-badge">Premium</span>
              </div>
              <div className="video-info">
                <h4>Match Analysis Tool</h4>
                <p>Upload your match video. Coach Nelson will review it with text notes, voiceover, and telestrator drawings on a custom timeline.</p>
                <Link to="/analysis" className="btn btn-outline" style={{ width: '100%', fontSize: '0.9rem', padding: '0.6rem' }}>Request Analysis</Link>
              </div>
            </div>

            <div className="video-card fade-in-up">
              <div className="video-thumbnail" style={{ backgroundImage: "url('/IMG_20240723_064942.jpg')" }}>
                <span className="premium-badge">S&C</span>
              </div>
              <div className="video-info">
                <h4>Strength & Conditioning</h4>
                <p>Browse our periodized strength and conditioning protocols designed specifically for the mat.</p>
                <Link to="/strength" className="btn btn-primary" style={{ width: '100%', fontSize: '0.9rem', padding: '0.6rem' }}>View Library</Link>
              </div>
            </div>
            
            <div className="video-card fade-in-up">
              <div className="video-thumbnail" style={{ backgroundImage: "url('/coach-yelling.jpg')" }}>
                <span className="premium-badge">Premium</span>
              </div>
              <div className="video-info">
                <h4>Coach's Corner</h4>
                <p>Unlock premium technique breakdowns, exclusive training concepts, and Coach Nelson's signature moves.</p>
                <Link to="/technique" className="btn btn-outline" style={{ width: '100%', fontSize: '0.9rem', padding: '0.6rem' }}>View Technique</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <div className="container">
          <h2 className="section-title">Ready to <span>Wrestle?</span></h2>
          <div className="contact-grid">
            <div className="contact-info fade-in-left">
              <div className="info-item">
                <h4>Location</h4>
                <p>4353 High Point Rd<br/>Kernersville, NC 27284</p>
              </div>
              <div className="info-item">
                <h4>Phone</h4>
                <p>336-500-4765</p>
              </div>
              <div className="info-item">
                <h4>Email</h4>
                <p>kradletrained@gmail.com</p>
              </div>
            </div>
            
            <div className="glass-card fade-in-right">
              <form className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" required placeholder="John Doe" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" required placeholder="john@example.com" />
                </div>
                <button type="submit" className="btn btn-primary">Contact Coach Nelson</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-logo">K-VEGAS ELITE</div>
          <p style={{ color: 'var(--text-muted)' }}>&copy; 2026 K-Vegas Elite Wrestling. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

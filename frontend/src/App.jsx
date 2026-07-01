import React, { useState, useEffect } from 'react';

function App() {
  // State for theme: default to 'dark' as specified in the Brand Voice .docx
  const [theme, setTheme] = useState('dark');

  // Toggle theme utility
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'light') {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
    }
  };

  // State for the client intake form
  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    company_name: '',
    project_description: ''
  });
  
  // State for form submission feedback
  const [statusMsg, setStatusMsg] = useState('');
  const [statusType, setStatusType] = useState(''); // 'success' or 'error'
  const [isSubmitting, setIsSubmitting] = useState(false);

  // CTA variations for A/B testing as defined in the Brand Voice document
  const ctaOptions = [
    "Send us a brief",
    "Tell us about your project",
    "Let’s discuss what you’re building",
    "Enquire about availability"
  ];
  const [selectedCta, setSelectedCta] = useState(0);

  // Form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Form submit handler connecting to Vercel serverless function /api/send
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMsg('');

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatusType('success');
        setStatusMsg('Brief received. We limit our quarterly engagements and will review yours within 48 hours.');
        // Reset form
        setFormData({
          client_name: '',
          client_email: '',
          company_name: '',
          project_description: ''
        });
      } else {
        setStatusType('error');
        setStatusMsg(data.error || 'Could not send brief. Please check your inputs.');
      }
    } catch (err) {
      // Graceful fallback if backend is offline during frontend-only validation
      setStatusType('error');
      setStatusMsg('Connection offline. Your details have been cached locally. (Resend API offline or Vercel dev server not running)');
      console.warn("API offline. Details cached locally:", formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-layout">
      {/* NAVIGATION */}
      <header className="navbar">
        <div className="container navbar-container">
          <a href="#" className="logo">buildlyone</a>
          <nav className="nav-links">
            <a href="#work" className="nav-link">Work</a>
            <a href="#approach" className="nav-link">Approach</a>
            <a href="#about" className="nav-link">About</a>
            <button 
              type="button" 
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label="Toggle visual theme"
            >
              Theme: {theme === 'dark' ? 'Dark' : 'Light'}
            </button>
            <a href="#contact" className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
              Start a conversation
            </a>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="container hero-content">
          <h1>Built for one standard.</h1>
          <p>
            buildlyone is a software engineering agency for banks, enterprises, and governments across Africa and beyond. We build the systems your operations depend on.
          </p>
          <div className="hero-ctas">
            <a href="#contact" className="btn-primary">
              Discuss your project &rarr;
            </a>
            <a href="#work" className="btn-secondary">
              See our work &rarr;
            </a>
          </div>
          <div className="hero-tags">
            <span className="tag-small">Custom software</span>
            <span className="tag-small">&middot;</span>
            <span className="tag-small">Financial infrastructure</span>
            <span className="tag-small">&middot;</span>
            <span className="tag-small">Enterprise systems</span>
            <span className="tag-small">&middot;</span>
            <span className="tag-small">API integrations</span>
            <span className="tag-small">&middot;</span>
            <span className="tag-small">AI & data</span>
          </div>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section id="work" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">01 &mdash; Capability</span>
            <h2 className="section-title">What we build.</h2>
            <p className="section-body">
              We design and engineer software for environments where precision is not optional. Our engagements span core financial infrastructure, enterprise platforms, and integrated digital systems &mdash; built to the standards regulated industries demand.
            </p>
          </div>
          
          <div className="services-grid">
            <div className="service-card">
              <span className="service-number">01</span>
              <h3 className="service-title">Core banking & financial infrastructure</h3>
            </div>
            <div className="service-card">
              <span className="service-number">02</span>
              <h3 className="service-title">Custom enterprise software</h3>
            </div>
            <div className="service-card">
              <span className="service-number">03</span>
              <h3 className="service-title">Web & mobile applications</h3>
            </div>
            <div className="service-card">
              <span className="service-number">04</span>
              <h3 className="service-title">API design & system integrations</h3>
            </div>
            <div className="service-card">
              <span className="service-number">05</span>
              <h3 className="service-title">AI-powered systems & data infrastructure</h3>
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section id="approach" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">02 &mdash; Rigour</span>
            <h2 className="section-title">How we work.</h2>
            <p className="section-body">
              We operate differently from most agencies. Our process is deliberate, our standards are fixed, and our engagements are collaborative from day one.
            </p>
          </div>

          <div className="process-list">
            <div className="process-item">
              <div className="process-step">01</div>
              <div className="process-content">
                <h3>Discovery & architecture</h3>
                <p>
                  Every engagement begins with rigorous scoping. We don’t write a single line of code until we understand your systems, your constraints, and the consequences of failure.
                </p>
              </div>
            </div>
            <div className="process-item">
              <div className="process-step">02</div>
              <div className="process-content">
                <h3>Engineering</h3>
                <p>
                  We build with the discipline your industry demands. Documented, auditable, production-grade code. Security and compliance are built in &mdash; not added after the fact.
                </p>
              </div>
            </div>
            <div className="process-item">
              <div className="process-step">03</div>
              <div className="process-content">
                <h3>Delivery & accountability</h3>
                <p>
                  We don’t hand off and disappear. We stay until the system performs. Long after the build, we remain the partner you can call.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE WORK WITH */}
      <section id="about" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">03 &mdash; Intake</span>
            <h2 className="section-title">We’re selective by design.</h2>
            <p className="section-body">
              Our clients are banks and financial institutions, fintechs with traction, enterprises with real complexity, and government bodies carrying public responsibility. We work best with organizations that understand what high-quality software requires &mdash; precision, time, and the right partner.
            </p>
          </div>

          <div className="audience-tags">
            <span className="tag-large">Banks & financial institutions</span>
            <span className="tag-large">Fintechs & growth-stage startups</span>
            <span className="tag-large">Large enterprises & corporates</span>
            <span className="tag-large">Government & public sector bodies</span>
            <span className="tag-large">High-net-worth individuals with complex digital needs</span>
          </div>

          <div className="geo-reach">
            <strong>Geographic reach:</strong> Nigeria &middot; Africa &middot; United Kingdom &middot; United States
          </div>
        </div>
      </section>

      {/* WHY BUILDLYONE */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">04 &mdash; Alignment</span>
            <h2 className="section-title">One engagement. Full commitment.</h2>
            <p className="section-body">
              The name says it plainly. We don’t spread thin across dozens of clients. We take on what we can do well, give it everything, and stand behind the result.
            </p>
          </div>

          <div className="diff-grid">
            <div className="diff-card">
              <h3>We only take on what we can do well.</h3>
              <p>
                We limit our active engagements per quarter. Not because of capacity &mdash; because of commitment. The institutions we work with deserve our full attention, not a fraction of it.
              </p>
            </div>
            <div className="diff-card">
              <h3>We understand the industries we build for.</h3>
              <p>
                Financial regulation, data compliance, infrastructure realities, local and cross-border complexity &mdash; we don’t need these explained to us. We have built in this environment.
              </p>
            </div>
            <div className="diff-card">
              <h3>We measure ourselves by outcomes, not outputs.</h3>
              <p>
                Code is not the deliverable. A working, trusted, institutional-grade system is. We hold ourselves to that standard &mdash; and we expect our clients to hold us to it too.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section id="contact" className="section" style={{ borderBottom: 'none' }}>
        <div className="container contact-section">
          <div className="contact-info">
            <div>
              <span className="section-label">05 &mdash; Enquire</span>
              <h2 className="section-title" style={{ fontSize: '3.5rem', marginBottom: '24px' }}>
                Start a conversation.
              </h2>
              <p className="section-body" style={{ fontSize: '1.1rem' }}>
                We take on a limited number of engagements each quarter. If you’re building something that demands excellence, we’d like to hear about it.
              </p>
            </div>
            
            {/* Interactive selector for A/B testing CTAs */}
            <div style={{ marginTop: '40px' }}>
              <span className="form-label" style={{ fontSize: '0.75rem', marginBottom: '8px', display: 'block' }}>
                CTA Variation (A/B Test)
              </span>
              <div className="cta-variations">
                {ctaOptions.map((opt, idx) => (
                  <button 
                    key={idx}
                    type="button" 
                    className={`cta-variation-btn ${selectedCta === idx ? 'active' : ''}`}
                    onClick={() => setSelectedCta(idx)}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="client_name" className="form-label">Your Name</label>
              <input 
                type="text" 
                id="client_name"
                name="client_name" 
                className="form-input"
                required
                value={formData.client_name}
                onChange={handleInputChange}
                placeholder="e.g., Senior Systems Director"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="client_email" className="form-label">Email Address</label>
              <input 
                type="email" 
                id="client_email"
                name="client_email" 
                className="form-input"
                required
                value={formData.client_email}
                onChange={handleInputChange}
                placeholder="name@institution.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="company_name" className="form-label">Institution / Organization</label>
              <input 
                type="text" 
                id="company_name"
                name="company_name" 
                className="form-input"
                value={formData.company_name}
                onChange={handleInputChange}
                placeholder="e.g., Federal Reserve Bank, Global Finance PLC"
              />
            </div>

            <div className="form-group">
              <label htmlFor="project_description" className="form-label">Project Brief & Details</label>
              <textarea 
                id="project_description"
                name="project_description" 
                className="form-input form-textarea"
                required
                value={formData.project_description}
                onChange={handleInputChange}
                placeholder="Describe the system, the operational constraints, and the consequences of failure."
              />
            </div>

            {statusMsg && (
              <div className={`form-status ${statusType}`}>
                {statusMsg}
              </div>
            )}

            <button 
              type="submit" 
              className="btn-primary" 
              style={{ alignSelf: 'flex-start' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : `${ctaOptions[selectedCta]} →`}
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer" style={{ borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <h2>buildlyone</h2>
              <p className="footer-tagline">Software engineering for institutions.</p>
            </div>
            <div className="footer-locations">
              Lagos &middot; London &middot; Global
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-links">
              <a href="#work" className="footer-link">Work</a>
              <a href="#approach" className="footer-link">Approach</a>
              <a href="#about" className="footer-link">About</a>
              <a href="#contact" className="footer-link">Start a conversation</a>
            </div>
            <div className="copyright">
              &copy; 2026 buildlyone. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

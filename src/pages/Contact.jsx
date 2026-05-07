import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { siteData } from '../data';

/* ─── Info card ─── */
function InfoCard({ icon, label, value }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 16, padding: '20px 22px',
      background: 'var(--card)', border: '1px solid var(--border)',
      backdropFilter: 'blur(14px)',
      transition: 'border-color 0.3s, transform 0.3s',
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateX(0)'; }}
    >
      <div style={{
        width: 40, height: 40, flexShrink: 0,
        background: 'var(--accent-dim)', border: '1px solid var(--border2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 2,
      }}>{icon}</div>
      <div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '3px', color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 5 }}>{label}</p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text)', fontWeight: 500 }}>{value}</p>
      </div>
    </div>
  );
}

/* ─── Response badge ─── */
function ResponseBadge() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '18px 20px',
      background: 'var(--card)', border: '1px solid var(--border)',
      backdropFilter: 'blur(14px)',
    }}>
      <div style={{
        width: 10, height: 10, borderRadius: '50%',
        background: 'var(--green)', flexShrink: 0,
        boxShadow: '0 0 10px var(--green)',
        animation: 'glowPulse 2s ease-in-out infinite',
      }} />
      <div>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 3 }}>Usually within 24 hours</p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text2)' }}>Urgent? Mention it — we'll prioritize.</p>
      </div>
    </div>
  );
}

export default function Contact() {
  const sectRef = useScrollAnimation();
  const [form, setForm] = useState({ name: '', company: '', email: '', service: '', message: '' });
  //button hover adding
  const [isHovered, setIsHovered] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState('');

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setForm({ name: '', company: '', email: '', service: '', message: '' }); }, 4000);
  };

  return (
    <div ref={sectRef}>

      {/* ── HERO ── */}
      <section style={{ paddingTop: 148, paddingBottom: 80 }}>
        <div className="reveal">
          <span className="section-tag">// get in touch</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(38px,5.5vw,68px)' }}>
            Let's Build<br/>Something Great
          </h1>
          <div className="section-line" style={{ margin: '18px 0 0' }} />
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: 'var(--text2)', lineHeight: 1.8, maxWidth: 440, marginTop: 26 }}>
            Tell us about your idea. We respond to every inquiry within 24 hours with honest thoughts and a clear next step.
          </p>
        </div>
      </section>

      {/* ── CONTACT BODY ── */}
      <section style={{ background: 'var(--bg2)', paddingTop: 80, paddingBottom: 110, transition: 'background var(--transition)' }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 1.5fr',
          gap: 60, alignItems: 'start',
        }}>

          {/* Left — info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="reveal-left" style={{ marginBottom: 8 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 8 }}>Contact Info</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)' }}>Reach us through any of these channels.</p>
            </div>

            <div className="reveal-left">
              <InfoCard
                icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
                label="Email"
                value={siteData.company.email}
              />
            </div>
            <div className="reveal-left">
              <InfoCard
                icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.1 1.21a2 2 0 012-2.18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 5.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 12.1v4.82z"/></svg>}
                label="Phone"
                value={siteData.company.phone}
              />
            </div>
            <div className="reveal-left">
              <InfoCard
                icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>}
                label="Location"
                value={siteData.company.address}
              />
            </div>

            <div className="reveal-left" style={{ marginTop: 6 }}>
              <ResponseBadge />
            </div>
          </div>

          {/* Right — form */}
          <div className="reveal-right">
            {submitted ? (
              <div style={{
                padding: '60px 40px', textAlign: 'center',
                border: '1px solid rgba(0,232,150,0.3)',
                background: 'rgba(0,232,150,0.05)',
                animation: 'fadeUp 0.4s var(--ease)',
              }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: 'rgba(0,232,150,0.15)',
                  border: '1px solid rgba(0,232,150,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 24px', fontSize: 28,
                }}>✓</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: 'var(--green)', marginBottom: 12 }}>Message Sent!</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text2)' }}>We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div className="form-group">
                    <label className="form-label">Name *</label>
                    <input name="name" value={form.name} onChange={handleChange}
                      className="form-input" placeholder="Jane Smith" required
                      onFocus={() => setFocused('name')} onBlur={() => setFocused('')} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Company</label>
                    <input name="company" value={form.company} onChange={handleChange}
                      className="form-input" placeholder="Acme Inc."
                      onFocus={() => setFocused('company')} onBlur={() => setFocused('')} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange}
                    className="form-input" placeholder="jane@acme.com" required
                    onFocus={() => setFocused('email')} onBlur={() => setFocused('')} />
                </div>
                <div className="form-group">
                  <label className="form-label">Service Needed</label>
                  <select name="service" value={form.service} onChange={handleChange}
                    className="form-input" style={{ cursor: 'pointer' }}>
                    <option value="">Select a service...</option>
                    {siteData.services.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                    <option value="other">Other / Not sure yet</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange}
                    className="form-textarea" placeholder="Tell us about your project, timeline, and budget..." required
                    onFocus={() => setFocused('message')} onBlur={() => setFocused('')} />
                </div>

                <button type="submit" className="btn-primary" onMouseEnter = {() => setIsHovered(true)}
                  onMouseLeave ={()=> setIsHovered(false)} 
                  style={{
                    alignSelf:'flex-start',
                    marginTop: 8,
                    backgroundColor: isHovered ? 'orange' : 'orange', 
                    border: 'none',
                    padding: '12px 24px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease', 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                      Send Message 
                </button>

                <style>{`
                  .btn-primary {
                    position: relative;
                    overflow: hidden;
                    background-color: orange !important;
                    color: black;
                    border: none;
                    padding: 12px 28px;
                    
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                  }

                  .btn-primary:hover {
                    background-color: orange !important;
                    transform: translateY(-2px);
                  }

                  /* Shine effect eka */
                  .btn-primary::before {
                    content: '';
                    position: absolute;
                    top: 0; left: -100%;
                    width: 50%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
                    transform: skewX(-20deg);
                    animation: button-shine 4s infinite; /* Nav eke wagema 6s damma */
                  }

                  @keyframes button-shine {
                    0% { left: -100%; }
                    15% { left: 200%; }
                    100% { left: 200%; }
                  }
                `}</style>
              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}

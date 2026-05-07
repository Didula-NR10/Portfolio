import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { siteData } from '../data';

function TerminalBlock() {
  return (
    <div style={{
      background: 'var(--bg)',
      border: '1px solid var(--border)',
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      lineHeight: 1.9,
      overflow: 'hidden',
    }}>
      {/* Terminal bar */}
      <div style={{
        background: 'var(--surface2)', padding: '10px 14px',
        display: 'flex', alignItems: 'center', gap: 7,
        borderBottom: '1px solid var(--border)',
      }}>
        {['#FF5F57','#FFBD2E','#28C840'].map((c, i) => (
          <div key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
        ))}
        <span style={{ marginLeft: 8, fontSize: 11, color: 'var(--text3)', letterSpacing: '1px' }}>
          geno@studio — contact
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: '20px 22px' }}>
        {[
          { prompt: true, text: 'contact --init', delay: 0 },
          { color: 'var(--text3)', text: 'Initializing communication channel...', delay: 0.2 },
          { color: 'var(--text3)', text: 'Locating nearest Gen O engineer...', delay: 0.5 },
          { color: '#28C840', text: '✓ Channel established', delay: 0.8 },
          { color: 'var(--text2)', text: `📍 ${siteData.company.email}`, delay: 1.0 },
          { color: 'var(--text2)', text: `📞 ${siteData.company.phone}`, delay: 1.1 },
          { color: 'var(--text2)', text: `🌍 ${siteData.company.address}`, delay: 1.2 },
          { prompt: true, text: '', cursor: true, delay: 1.4 },
        ].map((line, i) => (
          <div key={i} style={{
            display: 'flex', gap: 8, alignItems: 'center',
            color: line.color || 'var(--text)',
            opacity: 0, animation: `fadeIn 0.4s ease forwards ${line.delay}s`,
          }}>
            {line.prompt && (
              <span style={{ color: 'var(--accent)', userSelect: 'none' }}>geno@studio:~$</span>
            )}
            <span>{line.text}</span>
            {line.cursor && (
              <span style={{
                display: 'inline-block', width: 8, height: 16,
                background: 'var(--accent)',
                animation: 'blink 1s step-end infinite',
                verticalAlign: 'middle',
              }} />
            )}
          </div>
        ))}
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

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setForm({ name: '', company: '', email: '', service: '', message: '' }); }, 4000);
  };

  return (
    <div ref={sectRef}>

      {/* ── HERO ── */}
      <section style={{ paddingTop: 140, paddingBottom: 80 }}>
        <div className="reveal">
          <span className="section-tag">// get in touch</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(38px,5vw,64px)', letterSpacing: '-2px' }}>
            Let's Build<br/>Something Great
          </h1>
          <div className="section-line" style={{ margin: '18px 0 0' }} />
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: 'var(--text2)',
            lineHeight: 1.75, maxWidth: 440, marginTop: 24 }}>
            Tell us about your idea. We respond to every inquiry within 24 hours with
            honest thoughts and a clear next step.
          </p>
        </div>
      </section>

      {/* ── CONTACT BODY ── */}
      <section style={{ background: 'var(--bg2)', paddingTop: 80, paddingBottom: 100, transition: 'background var(--transition)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 60, alignItems: 'start' }}>

          {/* Left — info */}
          <div>
            <div className="reveal-left" style={{ marginBottom: 32 }}>
              <TerminalBlock />
            </div>

            {/* Response time note */}
            <div className="reveal-left card" style={{ padding: '22px 20px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#28C840',
                marginTop: 5, flexShrink: 0, boxShadow: '0 0 8px #28C84066',
                animation: 'glowPulse 2s ease-in-out infinite' }} />
              <div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
                  Usually respond within 24 hours
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text2)' }}>
                  For urgent projects, mention it in your message and we'll prioritize.
                </p>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="reveal-right">
            {submitted ? (
              <div style={{
                padding: '48px 32px', textAlign: 'center',
                border: '1px solid #28C84044', background: '#28C84011',
                animation: 'fadeUp 0.4s ease',
              }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>✓</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800,
                  color: '#28C840', marginBottom: 10 }}>Message Sent!</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text2)' }}>
                  We'll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div className="form-group">
                    <label className="form-label">Name *</label>
                    <input name="name" value={form.name} onChange={handleChange}
                      className="form-input" placeholder="Jane Smith" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Company</label>
                    <input name="company" value={form.company} onChange={handleChange}
                      className="form-input" placeholder="Acme Inc." />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange}
                    className="form-input" placeholder="jane@acme.com" required />
                </div>

                <div className="form-group">
                  <label className="form-label">Service Needed</label>
                  <select name="service" value={form.service} onChange={handleChange}
                    className="form-input" style={{ cursor: 'pointer' }}>
                    <option value="">Select a service...</option>
                    {siteData.services.map((s) => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                    <option value="other">Other / Not sure yet</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange}
                    className="form-textarea" placeholder="Tell us about your project, timeline, and budget..." required />
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
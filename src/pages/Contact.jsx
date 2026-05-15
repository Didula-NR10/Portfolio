import { useState, useRef, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { siteData } from '../data';

/* ─── Animated typing label ─── */
function TypedTag({ text }) {
  const [displayed, setDisplayed] = useState('');
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let i = 0;
        const timer = setInterval(() => {
          setDisplayed(text.slice(0, i + 1));
          i++;
          if (i >= text.length) clearInterval(timer);
        }, 55);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [text]);

  return (
    <span ref={ref} className="section-tag" style={{ display: 'inline-block' }}>
      {displayed}
      <span style={{
        display: 'inline-block', width: 1, height: '1em',
        background: 'var(--accent)', marginLeft: 2,
        animation: 'blink 0.9s step-end infinite',
        verticalAlign: 'text-bottom',
      }} />
    </span>
  );
}

/* ─── Info card ─── */
function InfoCard({ icon, label, value, delay = 0 }) {
  const [hovered, setHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'flex-start', gap: 16,
        padding: '20px 22px',
        background: 'var(--card)',
        border: `1px solid ${hovered ? 'var(--border2)' : 'var(--border)'}`,
        backdropFilter: 'blur(14px)',
        transform: mounted
          ? hovered ? 'translateX(5px)' : 'translateX(0)'
          : 'translateX(-30px)',
        opacity: mounted ? 1 : 0,
        transition: 'transform 0.5s var(--ease), opacity 0.5s var(--ease), border-color 0.3s',
        boxShadow: hovered ? 'var(--shadow)' : 'none',
      }}
    >
      <div style={{
        width: 42, height: 42, flexShrink: 0,
        background: hovered ? 'var(--glow)' : 'var(--accent-dim)',
        border: `1px solid ${hovered ? 'var(--accent)' : 'var(--border2)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 2, transition: 'all 0.3s',
      }}>{icon}</div>
      <div>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '3px',
          color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 5,
        }}>{label}</p>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 15,
          color: 'var(--text)', fontWeight: 500,
        }}>{value}</p>
      </div>
    </div>
  );
}

/* ─── Status dot ─── */
function StatusBadge() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14, padding: '18px 20px',
      background: 'var(--card)', border: '1px solid var(--border)',
      backdropFilter: 'blur(14px)',
    }}>
      <div style={{
        width: 10, height: 10, borderRadius: '50%',
        background: 'var(--green, #00E896)', flexShrink: 0,
        boxShadow: '0 0 12px #00E896',
        animation: 'glowPulse 2s ease-in-out infinite',
      }} />
      <div>
        <p style={{
          fontFamily: 'var(--font-display)', fontSize: 14,
          fontWeight: 700, color: 'var(--text)', marginBottom: 3,
        }}>Usually within 24 hours</p>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text2)',
        }}>Urgent? Mention it — we'll prioritize.</p>
      </div>
    </div>
  );
}

/* ─── Form field ─── */
function FormField({ label, children, style }) {
  return (
    <div className="form-group" style={style}>
      <label className="form-label">{label}</label>
      {children}
    </div>
  );
}

export default function Contact() {
  const sectRef = useScrollAnimation();
  const [form, setForm] = useState({ name: '', company: '', email: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [focused, setFocused] = useState('');
  const [btnHovered, setBtnHovered] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setForm({ name: '', company: '', email: '', service: '', message: '' });
      }, 4500);
    }, 1400);
  };

  const svgEmail = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );
  const svgPhone = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.1 1.21a2 2 0 012-2.18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 5.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 12.1v4.82z"/>
    </svg>
  );
  const svgPin = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  );

  return (
    <div ref={sectRef}>

      {/* ── HERO ── */}
      <section style={{ paddingTop: 148, paddingBottom: 80 }}>
        <div className="reveal">
          <TypedTag text="// get in touch" />
          <h1 className="section-title" style={{ fontSize: 'clamp(38px,5.5vw,68px)', marginTop: 16 }}>
            Let's Build<br />Something Great
          </h1>
          <div className="section-line" style={{ margin: '18px 0 0' }} />
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 17, color: 'var(--text2)',
            lineHeight: 1.8, maxWidth: 440, marginTop: 26,
          }}>
            Tell us about your idea. We respond to every inquiry within 24 hours with honest
            thoughts and a clear next step.
          </p>
        </div>
      </section>

      {/* ── CONTACT BODY ── */}
      <section style={{
        background: 'var(--bg2)', paddingTop: 80, paddingBottom: 110,
        transition: 'background var(--transition)',
      }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 1.6fr',
          gap: 64, alignItems: 'start',
        }}>

          {/* Left — info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="reveal-left" style={{ marginBottom: 10 }}>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: 23,
                fontWeight: 800, color: 'var(--text)', marginBottom: 8,
              }}>Contact Info</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)' }}>
                Reach us through any of these channels.
              </p>
            </div>

            <InfoCard icon={svgEmail} label="Email" value={siteData.company.email} delay={100} />
            <InfoCard icon={svgPhone} label="Phone" value={siteData.company.phone} delay={200} />
            <InfoCard icon={svgPin} label="Location" value={siteData.company.address} delay={300} />

            <div style={{
              opacity: 0,
              animation: 'fadeUp 0.6s var(--ease) 0.5s forwards',
              marginTop: 6,
            }}>
              <StatusBadge />
            </div>

            {/* Social links */}
            <div style={{
              opacity: 0,
              animation: 'fadeUp 0.6s var(--ease) 0.65s forwards',
              marginTop: 6,
            }}>
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '3px',
                color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 14,
              }}>// socials</p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {siteData.footer.socials.map(s => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '2px',
                      color: 'var(--text3)', textTransform: 'uppercase',
                      padding: '7px 14px',
                      border: '1px solid var(--border)',
                      background: 'var(--surface)',
                      textDecoration: 'none',
                      transition: 'all 0.25s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'var(--accent)';
                      e.currentTarget.style.color = 'var(--accent)';
                      e.currentTarget.style.background = 'var(--accent-dim)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--border)';
                      e.currentTarget.style.color = 'var(--text3)';
                      e.currentTarget.style.background = 'var(--surface)';
                    }}
                  >{s.label}</a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="reveal-right">
            {submitted ? (
              <div style={{
                padding: '70px 40px', textAlign: 'center',
                border: '1px solid rgba(0,232,150,0.3)',
                background: 'rgba(0,232,150,0.04)',
                animation: 'fadeUp 0.4s var(--ease)',
              }}>
                <div style={{
                  width: 72, height: 72, borderRadius: '50%',
                  background: 'rgba(0,232,150,0.12)',
                  border: '1px solid rgba(0,232,150,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 28px', fontSize: 30,
                  boxShadow: '0 0 40px rgba(0,232,150,0.2)',
                }}>✓</div>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800,
                  color: '#00E896', marginBottom: 12,
                }}>Message Sent!</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text2)' }}>
                  We'll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>

                {/* Scan line decoration */}
                <div style={{
                  position: 'relative', overflow: 'hidden',
                  padding: '16px 18px',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  marginBottom: 4,
                }}>
                  <div style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '1px',
                    background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
                    animation: 'scan 3s linear infinite',
                  }} />
                  <p style={{
                    fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text3)',
                    letterSpacing: '2px',
                  }}>
                    <span style={{ color: 'var(--accent)' }}>{'>'}</span>
                    {' '}SECURE_CONTACT_FORM_v2.1 — All data encrypted
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                  <FormField label="Name *">
                    <input
                      name="name" value={form.name} onChange={handleChange}
                      className="form-input" placeholder="Jane Smith" required
                      onFocus={() => setFocused('name')} onBlur={() => setFocused('')}
                    />
                  </FormField>
                  <FormField label="Company">
                    <input
                      name="company" value={form.company} onChange={handleChange}
                      className="form-input" placeholder="Acme Inc."
                      onFocus={() => setFocused('company')} onBlur={() => setFocused('')}
                    />
                  </FormField>
                </div>

                <FormField label="Email *">
                  <input
                    type="email" name="email" value={form.email} onChange={handleChange}
                    className="form-input" placeholder="jane@acme.com" required
                    onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
                  />
                </FormField>

                <FormField label="Service Needed">
                  <select
                    name="service" value={form.service} onChange={handleChange}
                    className="form-input" style={{ cursor: 'pointer' }}
                  >
                    <option value="">Select a service...</option>
                    {siteData.services.map(s => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                    <option value="other">Other / Not sure yet</option>
                  </select>
                </FormField>

                <FormField label="Message *">
                  <textarea
                    name="message" value={form.message} onChange={handleChange}
                    className="form-textarea"
                    placeholder="Tell us about your project, timeline, and budget..."
                    required
                    onFocus={() => setFocused('message')} onBlur={() => setFocused('')}
                    style={{ minHeight: 150 }}
                  />
                </FormField>

                <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 4 }}>
                  <button
                    type="submit"
                    disabled={sending}
                    onMouseEnter={() => setBtnHovered(true)}
                    onMouseLeave={() => setBtnHovered(false)}
                    className="btn-primary"
                    style={{
                      position: 'relative', overflow: 'hidden',
                      background: 'var(--accent)',
                      opacity: sending ? 0.7 : 1,
                      transform: btnHovered && !sending ? 'translateY(-3px)' : 'none',
                      boxShadow: btnHovered && !sending ? '0 16px 40px var(--glow)' : 'none',
                      transition: 'transform 0.2s var(--ease), box-shadow 0.3s, opacity 0.2s',
                    }}
                  >
                    {sending ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2"
                          style={{ animation: 'spin 0.8s linear infinite' }}>
                          <path d="M21 12a9 9 0 11-6.219-8.56"/>
                        </svg>
                        Sending...
                      </span>
                    ) : 'Send Message →'}
                  </button>

                  {focused && (
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: 10,
                      color: 'var(--accent)', letterSpacing: '2px',
                      animation: 'fadeUp 0.3s var(--ease)',
                    }}>
                      EDITING: {focused.toUpperCase()}
                    </span>
                  )}
                </div>

              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
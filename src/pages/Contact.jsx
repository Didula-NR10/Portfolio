import { useState } from 'react';
import { COMPANY } from '../data';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const SERVICES_LIST = [
  'Web Application', 'Mobile App', 'POS System',
  'UI/UX Design', 'Cloud / DevOps', 'API Integration', 'Other',
];

const BUDGETS = [
  'Under $10k', '$10k – $25k', '$25k – $50k', '$50k – $100k', '$100k+',
];

export default function Contact() {
  useScrollAnimation();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', company: '', service: '', budget: '', message: '',
  });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace this with your actual form submission logic (e.g., fetch to an API)
    console.log('Form submitted:', form);
    setSubmitted(true);
  };

  return (
    <main className="page">
      <div className="container">
        <p className="section-label animate-up">Get In Touch</p>

        <div className="contact-layout">
          {/* ─── Left info column ────────────────────────────────── */}
          <div className="animate-up">
            <h1 className="contact-info" style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.25rem' }}>
              Let's build<br />
              <span style={{ fontFamily: 'var(--ff-serif)', fontStyle: 'italic', fontWeight: 400, color: 'var(--text-muted)' }}>
                something great
              </span>
            </h1>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.75', marginBottom: '2.5rem', fontSize: '0.95rem' }}>
              Tell us about your project and we'll get back to you within one business
              day. No pushy sales calls — just a straight conversation about whether
              we're a good fit.
            </p>

            <div className="contact-links">
              <a href={`mailto:${COMPANY.email}`} className="contact-link">
                <span className="contact-link-icon">✉</span>
                <span>{COMPANY.email}</span>
              </a>
              <a href={`tel:${COMPANY.phone}`} className="contact-link">
                <span className="contact-link-icon">☏</span>
                <span>{COMPANY.phone}</span>
              </a>
              <div className="contact-link" style={{ cursor: 'default' }}>
                <span className="contact-link-icon">◎</span>
                <span>{COMPANY.address}</span>
              </div>
            </div>

            {/* Office hours */}
            <div
              style={{
                marginTop: '2.5rem',
                padding: '1.5rem',
                background: 'var(--bg-1)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--ff-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--accent)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '0.75rem',
                }}
              >
                Office Hours
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.65' }}>
                Monday – Friday: 9am – 6pm (PST)<br />
                We typically respond within 4 hours.
              </p>
            </div>

            {/* Social links */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem', flexWrap: 'wrap' }}>
              {Object.entries(COMPANY.socials).map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: 'var(--bg-1)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    padding: '0.45rem 0.9rem',
                    fontSize: '0.72rem',
                    fontFamily: 'var(--ff-mono)',
                    color: 'var(--text-dim)',
                    textTransform: 'capitalize',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent)';
                    e.currentTarget.style.color = 'var(--accent)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.color = 'var(--text-dim)';
                  }}
                >
                  {name}
                </a>
              ))}
            </div>
          </div>

          {/* ─── Contact form ─────────────────────────────────────── */}
          <div className="contact-form animate-up">
            {submitted ? (
              <div className="form-success">
                <div className="checkmark">✓</div>
                <h3>Message received!</h3>
                <p>
                  Thanks for reaching out. We'll review your project details and get
                  back to you within one business day.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn btn-outline"
                  style={{ marginTop: '2rem' }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input
                      type="text"
                      placeholder="Jane Smith"
                      required
                      value={form.name}
                      onChange={set('name')}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      placeholder="jane@company.com"
                      required
                      value={form.email}
                      onChange={set('email')}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Company / Project Name</label>
                  <input
                    type="text"
                    placeholder="Acme Corp"
                    value={form.company}
                    onChange={set('company')}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Service Needed *</label>
                    <select required value={form.service} onChange={set('service')}>
                      <option value="">Select a service…</option>
                      {SERVICES_LIST.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Budget Range</label>
                    <select value={form.budget} onChange={set('budget')}>
                      <option value="">Select a range…</option>
                      {BUDGETS.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Tell us about your project *</label>
                  <textarea
                    placeholder="What are you building? What's the timeline? Any specific challenges?"
                    required
                    value={form.message}
                    onChange={set('message')}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.95rem', padding: '1rem' }}>
                  Send Message →
                </button>

                <p style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--ff-mono)' }}>
                  We respond within 1 business day. No spam, ever.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
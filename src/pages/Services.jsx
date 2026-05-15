import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { siteData } from '../data';

// ── Shared theme detection hook ──
function useTheme() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const check = () => {
      setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
    };
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);
  return isDark;
}

const icons = {
  web: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="4" /><path d="M2 8h20M12 20v-4" />
    </svg>
  ),
  mobile: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="2" width="12" height="20" rx="4" /><path d="M12 18h.01" />
    </svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  ),
  design: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 22l10-4 10 4L12 2z" />
    </svg>
  ),
  api: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
};

// ── Animated counter ──
function AnimatedCounter({ target, suffix = '', delay = 0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const num = parseInt(target);
        const steps = 60;
        let step = 0;
        setTimeout(() => {
          const timer = setInterval(() => {
            step++;
            setCount(Math.round((num * step) / steps));
            if (step >= steps) clearInterval(timer);
          }, 1800 / steps);
        }, delay);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, delay]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ── Service Card ──
function ServiceCard({ s, index, isLanded, isDark }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: isDark ? 'rgba(16, 25, 30, 0.35)' : 'rgba(255,255,255,0.45)',
        border: `1px solid ${hovered ? (isDark ? 'rgba(0,200,255,0.4)' : 'rgba(0,144,187,0.4)') : (isDark ? 'rgba(0,200,255,0.09)' : 'rgba(0,144,187,0.13)')}`,
        borderRadius: 16,
        padding: '2.5rem',
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: hovered ? 'blur(24px)' : 'blur(12px)',
        opacity: isLanded ? 1 : 0,
        transform: isLanded
          ? `translateY(0) scale(1)`
          : `translateY(-70px) scale(0.88)`,
        transition: isLanded
          ? `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s, transform 0.7s cubic-bezier(0.34,1.56,0.64,1) ${index * 0.1}s, border-color 0.3s, box-shadow 0.3s, background 0.3s`
          : 'none',
        boxShadow: hovered
          ? (isDark ? '0 24px 80px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,200,255,0.1)' : '0 24px 80px rgba(0,0,0,0.1), inset 0 0 20px rgba(255,255,255,0.8)')
          : (isDark ? '0 10px 30px rgba(0,0,0,0.4)' : '0 10px 30px rgba(21,121,123,0.05)'),
        cursor: 'default',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      {/* Animated top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: '100%', height: 2,
        background: isDark
          ? 'linear-gradient(90deg, #00C8FF, transparent)'
          : 'linear-gradient(90deg, #0090BB, transparent)',
        transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 0.45s cubic-bezier(0.16,1,0.3,1)',
      }} />

      {/* Corner glow blob */}
      <div style={{
        position: 'absolute', top: -40, right: -40,
        width: hovered ? 200 : 160, height: hovered ? 200 : 160,
        background: isDark ? 'rgba(0,200,255,0.15)' : 'rgba(0,144,187,0.12)',
        filter: 'blur(50px)',
        opacity: hovered ? 0.6 : 0.35,
        borderRadius: '50%',
        transition: 'all 0.6s cubic-bezier(0.175,0.885,0.32,1.275)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Shimmer sweep on hover */}
      <div style={{
        position: 'absolute', top: 0, left: hovered ? '200%' : '-150%',
        width: '60%', height: '100%',
        background: isDark
          ? 'linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent)'
          : 'linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)',
        transform: 'skewX(-20deg)',
        transition: 'left 0.6s ease',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Service number */}
      <span style={{
        position: 'absolute', top: 22, right: 22,
        fontFamily: 'var(--font-mono)', fontSize: 11,
        color: 'var(--text3)', letterSpacing: '1px',
        zIndex: 1,
      }}>0{s.id}</span>

      {/* Icon box */}
      <div style={{
        width: 55, height: 55, zIndex: 1,
        background: hovered ? (isDark ? 'rgba(0,200,255,0.18)' : 'rgba(0,144,187,0.1)') : (isDark ? 'rgba(0,200,255,0.08)' : 'rgba(0,144,187,0.08)'),
        borderRadius: 16,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 12, marginBottom: '1.5rem',
        color: 'var(--accent)',
        transition: 'background 0.3s',
      }}>{icons[s.icon]}</div>

      <h3 style={{
        fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700,
        color: 'var(--text)', margin: '0 0 1rem 0', zIndex: 1, position: 'relative',
      }}>{s.title}</h3>

      <p style={{
        fontFamily: 'var(--font-body)', fontSize: '1rem',
        color: 'var(--text-muted, var(--text2))', lineHeight: 1.65,
        margin: '0 0 1.5rem 0', zIndex: 1, position: 'relative',
      }}>{s.desc}</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, zIndex: 1, position: 'relative', marginTop: 'auto' }}>
        {s.tags.map(t => (
          <span key={t} style={{
            fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '1px',
            color: 'var(--text2)', padding: '6px 14px',
            border: `1px solid ${isDark ? 'rgba(0,200,255,0.13)' : 'rgba(0,144,187,0.13)'}`,
            borderRadius: 100,
          }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

// ── Services falling grid ──
function ServicesGrid({ isDark }) {
  const [landed, setLanded] = useState([]);
  const gridRef = useRef(null);
  const triggered = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !triggered.current) {
        triggered.current = true;
        siteData.services.forEach((_, i) => {
          setTimeout(() => setLanded(prev => [...prev, i]), i * 110);
        });
      }
    }, { threshold: 0.05 });
    if (gridRef.current) obs.observe(gridRef.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={gridRef} style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem',
    }}>
      {siteData.services.map((s, i) => (
        <ServiceCard key={s.id} s={s} index={i} isLanded={landed.includes(i)} isDark={isDark} />
      ))}
    </div>
  );
}

// ── Process step ──
function ProcessStep({ step, index, isDark }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setTimeout(() => setVisible(true), index * 120); obs.disconnect(); }
    }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [index]);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textAlign: 'center', padding: '0 20px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(36px)',
        transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${index * 0.14}s, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${index * 0.14}s`,
      }}
    >
      <div style={{
        width: 76, height: 76, borderRadius: '50%',
        border: `1px solid ${hovered ? 'var(--accent)' : (isDark ? 'rgba(0,200,255,0.22)' : 'rgba(0,144,187,0.28)')}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 28px',
        background: hovered
          ? (isDark ? 'rgba(0,200,255,0.08)' : 'rgba(0,144,187,0.08)')
          : 'transparent',
        boxShadow: hovered ? (isDark ? '0 0 30px rgba(0,200,255,0.18)' : '0 0 30px rgba(0,144,187,0.1)') : 'none',
        transform: hovered ? 'scale(1.12)' : 'scale(1)',
        transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 14,
          color: 'var(--accent)', letterSpacing: '1px', fontWeight: 600,
        }}>{step.step}</span>
      </div>
      <h3 style={{
        fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800,
        color: 'var(--text)', marginBottom: 12,
      }}>{step.title}</h3>
      <p style={{
        fontFamily: 'var(--font-body)', fontSize: 14,
        color: 'var(--text2)', lineHeight: 1.7,
      }}>{step.desc}</p>
    </div>
  );
}

export default function Services() {
  const isDark = useTheme();

  const statsData = [
    { num: '40', suffix: '+', label: 'Projects Shipped' },
    { num: '98', suffix: '%', label: 'Client Satisfaction' },
    { num: '6', suffix: '', label: 'Core Services' },
    { num: '3', suffix: 'yrs', label: 'In Business' },
  ];

  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => { setTimeout(() => setHeroVisible(true), 100); }, []);

  return (
    <div style={{
      minHeight: '100vh',
      padding: '100px 24px 24px 24px',
      display: 'flex', justifyContent: 'center',
      backgroundColor: 'var(--bg)',
    }}>
      <div style={{ position: 'relative', width: '100%', maxWidth: 1400, display: 'flex', flexDirection: 'column', gap: '2rem' }}>

        {/* ─── HERO BENTO ─── */}
        <div style={{
          background: isDark
            ? 'linear-gradient(180deg, #122126 0%, #0a1114 100%)'
            : 'linear-gradient(180deg, #d8ebea 0%, #ffffff 100%)',
          borderRadius: 56,
          padding: '70px 60px',
          position: 'relative', overflow: 'hidden',
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}>
          {/* Floating accent blobs */}
          <div style={{
            position: 'absolute', top: '15%', right: '8%',
            width: 280, height: 280,
            background: isDark ? 'rgba(0,200,255,0.07)' : 'rgba(0,144,187,0.06)',
            borderRadius: '50%', filter: 'blur(70px)', pointerEvents: 'none',
            animation: 'auroraRotate 20s linear infinite',
          }} />
          <div style={{
            position: 'absolute', bottom: '10%', left: '5%',
            width: 200, height: 200,
            background: isDark ? 'rgba(0,200,255,0.05)' : 'rgba(0,144,187,0.04)',
            borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', zIndex: 2, maxWidth: 700 }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '4px',
              color: 'var(--accent)', textTransform: 'uppercase', display: 'block', marginBottom: 20,
            }}></span>

            <h1 style={{
              fontFamily: 'Playfair Display, Merriweather, serif',
              fontSize: 'clamp(3.2rem, 5vw, 4.5rem)', fontWeight: 800,
              lineHeight: 1.1, letterSpacing: '-1px',
              color: isDark ? '#f0f4f8' : '#1c2b33',
              marginBottom: '1.5rem',
            }}>
              End-to-End<br /><span style={{ color: 'var(--accent)' }}>Digital Solutions</span>
            </h1>

            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '1.1rem',
              color: isDark ? '#8b9eb0' : '#5e6d75', lineHeight: 1.7,
              maxWidth: 480, marginBottom: '2.5rem',
            }}>
              From concept to launch to scale — we cover the full product lifecycle with deep expertise
              in modern web, mobile, cloud, and AI.
            </p>

            {/* Stats strip */}
            <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
              {statsData.map((s, i) => (
                <div key={i}>
                  <div style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: 38, fontWeight: 800,
                    color: 'var(--accent)', lineHeight: 1,
                  }}>
                    <AnimatedCounter target={s.num} suffix={s.suffix} delay={i * 150} />
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: 10,
                    letterSpacing: '3px', color: 'var(--text3)',
                    textTransform: 'uppercase', marginTop: 6,
                  }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── SERVICES GRID ─── */}
        <div style={{
          background: isDark
            ? 'linear-gradient(180deg, #0a1114 0%, #122126 100%)'
            : 'linear-gradient(180deg, #ffffff 0%, #d8ebea 100%)',
          borderRadius: 56, padding: '60px 52px',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -60, right: -60,
            width: 320, height: 320,
            background: isDark ? 'rgba(0,200,255,0.05)' : 'rgba(0,144,187,0.05)',
            borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none',
          }} />
          <div style={{ textAlign: 'center', marginBottom: '4rem', position: 'relative', zIndex: 2 }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '4px',
              color: 'var(--accent)', textTransform: 'uppercase', display: 'block', marginBottom: 16,
            }}></span>
            <h2 style={{
              fontFamily: 'Playfair Display, Merriweather, serif',
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800,
              color: isDark ? '#f0f4f8' : '#1c2b33', marginBottom: '1rem',
            }}>What We Offer</h2>
            <div style={{
              width: 52, height: 2, background: 'var(--accent)',
              margin: '0 auto', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', inset: 0, background: '#fff',
                animation: 'lineSweep 2.5s ease-in-out infinite',
              }} />
            </div>
          </div>
          <ServicesGrid isDark={isDark} />
        </div>

        {/* ─── PROCESS ─── */}
        <div style={{
          background: isDark
            ? 'linear-gradient(180deg, #122126 0%, #0a1114 100%)'
            : 'linear-gradient(180deg, #d8ebea 0%, #ffffff 100%)',
          borderRadius: 56, padding: '60px 52px',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem', position: 'relative', zIndex: 2 }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '4px',
              color: 'var(--accent)', textTransform: 'uppercase', display: 'block', marginBottom: 16,
            }}></span>
            <h2 style={{
              fontFamily: 'Playfair Display, Merriweather, serif',
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800,
              color: isDark ? '#f0f4f8' : '#1c2b33', marginBottom: '1rem',
            }}>Our Process</h2>
            <div style={{
              width: 52, height: 2, background: 'var(--accent)',
              margin: '0 auto', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', inset: 0, background: '#fff', animation: 'lineSweep 2.5s ease-in-out infinite' }} />
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 0, position: 'relative',
          }}>
            {/* Connector */}
            <div style={{
              position: 'absolute', top: 38, left: '12.5%', right: '12.5%', height: 1,
              background: `linear-gradient(90deg, transparent, ${isDark ? 'rgba(0,200,255,0.3)' : 'rgba(0,144,187,0.3)'}, transparent)`,
              pointerEvents: 'none',
            }} />
            {siteData.process.map((step, i) => (
              <ProcessStep key={i} step={step} index={i} isDark={isDark} />
            ))}
          </div>

          <div style={{ marginTop: '5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text2)', fontSize: 16, marginBottom: 26 }}>
              Ready to bring your project to life?
            </p>
            <Link to="/contact" style={{
              padding: '16px 36px', borderRadius: 16, fontWeight: 700, fontSize: '0.85rem',
              textTransform: 'uppercase', letterSpacing: '2px', textDecoration: 'none',
              color: '#fff',
              background: `linear-gradient(135deg, ${isDark ? '#00C8FF' : '#0090BB'} 0%, ${isDark ? '#0090BB' : '#006A8E'} 100%)`,
              boxShadow: isDark ? '0 8px 20px rgba(0,200,255,0.2)' : '0 8px 20px rgba(0,144,187,0.2)',
              transition: 'all 0.5s cubic-bezier(0.175,0.885,0.32,1.275)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px) scale(1.03)'; e.currentTarget.style.boxShadow = isDark ? '0 20px 40px rgba(0,200,255,0.3)' : '0 20px 40px rgba(0,144,187,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = isDark ? '0 8px 20px rgba(0,200,255,0.2)' : '0 8px 20px rgba(0,144,187,0.2)'; }}
            >Get a Quote →</Link>
          </div>
        </div>

        {/* ─── TECH STACK ─── */}
        <div style={{
          background: isDark
            ? 'linear-gradient(180deg, #0a1114 0%, #122126 100%)'
            : 'linear-gradient(180deg, #ffffff 0%, #d8ebea 100%)',
          borderRadius: 56, padding: '60px 52px', textAlign: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '4px',
            color: 'var(--accent)', textTransform: 'uppercase', display: 'block', marginBottom: 16,
          }}>// technology</span>
          <h2 style={{
            fontFamily: 'Playfair Display, Merriweather, serif',
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800,
            color: isDark ? '#f0f4f8' : '#1c2b33', marginBottom: '1rem',
          }}>Stack We Trust</h2>
          <div style={{
            width: 52, height: 2, background: 'var(--accent)',
            margin: '0 auto 3rem',
          }} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
            {siteData.techStack.map((t, i) => (
              <span
                key={t}
                style={{
                  padding: '8px 16px',
                  background: isDark ? 'rgba(16,25,30,0.5)' : 'rgba(255,255,255,0.7)',
                  border: `1px solid ${isDark ? 'rgba(0,200,255,0.09)' : 'rgba(0,144,187,0.13)'}`,
                  borderRadius: 100,
                  fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '1px',
                  color: 'var(--text2)',
                  opacity: 0,
                  animation: `fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards ${i * 0.04}s`,
                  cursor: 'default',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.color = 'var(--accent)';
                  e.currentTarget.style.background = isDark ? 'rgba(0,200,255,0.08)' : 'rgba(0,144,187,0.08)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = isDark ? 'rgba(0,200,255,0.09)' : 'rgba(0,144,187,0.13)';
                  e.currentTarget.style.color = 'var(--text2)';
                  e.currentTarget.style.background = isDark ? 'rgba(16,25,30,0.5)' : 'rgba(255,255,255,0.7)';
                  e.currentTarget.style.transform = '';
                }}
              >{t}</span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
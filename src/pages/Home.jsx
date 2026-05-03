import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { siteData } from '../data';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

/* ─── Animated counter hook ─── */
function useCounter(target, duration = 1800, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    const isFloat = String(target).includes('.');
    const num = parseFloat(target);
    const suffix = String(target).replace(/[0-9.]/g, '');
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const cur = isFloat ? (eased * num).toFixed(1) : Math.floor(eased * num);
      setVal(cur + suffix);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return val;
}

/* ─── Hero rings ─── */
function HeroRings() {
  return (
    <div style={{ position: 'relative', width: 480, height: 480 }}>
      {[480, 370, 270, 175, 90].map((size, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: size, height: size,
          borderRadius: '50%',
          border: `1px solid var(--border${i < 3 ? '2' : ''})`,
          top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          animation: `ringPulse ${3.5 + i * 0.4}s ease-in-out infinite ${i * 0.5}s`,
          opacity: 0.12 + i * 0.18,
        }} />
      ))}
      {/* Orbiting dot */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        width: 270, height: 270,
        transform: 'translate(-50%,-50%)',
        animation: 'spin 12s linear infinite',
      }}>
        <div style={{
          position: 'absolute', top: -5, left: '50%',
          width: 10, height: 10, borderRadius: '50%',
          background: 'var(--accent)',
          boxShadow: '0 0 12px var(--accent), 0 0 24px var(--glow)',
          transform: 'translateX(-50%)',
        }} />
      </div>
      {/* Second orbiting dot — opposite direction */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        width: 370, height: 370,
        transform: 'translate(-50%,-50%)',
        animation: 'spin 22s linear infinite reverse',
      }}>
        <div style={{
          position: 'absolute', top: -4, left: '50%',
          width: 8, height: 8, borderRadius: '50%',
          background: 'var(--accent2)',
          boxShadow: '0 0 8px var(--accent2)',
          transform: 'translateX(-50%)',
        }} />
      </div>
      {/* Center power icon */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 72, height: 72, borderRadius: '50%',
        background: 'radial-gradient(circle, var(--glow) 0%, transparent 70%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'glowPulse 2.4s ease-in-out infinite',
        border: '1px solid var(--border2)',
      }}>
        <svg width="32" height="32" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="13" fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="66 18"/>
          <line x1="20" y1="7" x2="20" y2="17" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  );
}

/* ─── Floating particles ─── */
function Particles() {
  const particles = useRef(Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: Math.random() < 0.3 ? 3 : 2,
    delay: Math.random() * 10,
    dur: 6 + Math.random() * 10,
  }))).current;
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {particles.map(p => (
        <div key={p.id} className="particle" style={{
          left: `${p.left}%`,
          width: `${p.size}px`, height: `${p.size}px`,
          animationDelay: `${p.delay}s`,
          animationDuration: `${p.dur}s`,
        }} />
      ))}
    </div>
  );
}

/* ─── Animated stat item ─── */
function StatItem({ num, label, delay }) {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const val = useCounter(parseFloat(num), 1600, started);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const suffix = num.replace(/[0-9.]/g, '');

  return (
    <div ref={ref} className="stat-item" style={{ opacity: 0, animation: `fadeUp 0.6s var(--ease) forwards ${delay}s` }}>
      <span className="stat-num">{started ? (val || num) : num}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

/* ─── Home icons ─── */
const icons = {
  web:    <svg viewBox="0 0 24 24" style={{width:22,height:22,stroke:'var(--accent)',fill:'none',strokeWidth:1.5,strokeLinecap:'round'}}><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>,
  mobile: <svg viewBox="0 0 24 24" style={{width:22,height:22,stroke:'var(--accent)',fill:'none',strokeWidth:1.5,strokeLinecap:'round'}}><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
  cloud:  <svg viewBox="0 0 24 24" style={{width:22,height:22,stroke:'var(--accent)',fill:'none',strokeWidth:1.5,strokeLinecap:'round'}}><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>,
  ai:     <svg viewBox="0 0 24 24" style={{width:22,height:22,stroke:'var(--accent)',fill:'none',strokeWidth:1.5,strokeLinecap:'round'}}><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>,
  design: <svg viewBox="0 0 24 24" style={{width:22,height:22,stroke:'var(--accent)',fill:'none',strokeWidth:1.5,strokeLinecap:'round'}}><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><circle cx="11" cy="11" r="2"/></svg>,
  api:    <svg viewBox="0 0 24 24" style={{width:22,height:22,stroke:'var(--accent)',fill:'none',strokeWidth:1.5,strokeLinecap:'round'}}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
};

/* ─── Typewriter words ─── */
function TypedWord() {
  const words = ["Web Apps", "Mobile Apps", "AI Systems", "SaaS Platforms", "Digital Products"];
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[idx];
    let timer;
    if (!deleting && displayed.length < word.length) {
      timer = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === word.length) {
      timer = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIdx((i) => (i + 1) % words.length);
    }
    return () => clearTimeout(timer);
  }, [displayed, deleting, idx]);

  return (
    <span style={{ color: 'var(--accent)', display: 'inline-block', minWidth: 320 }}>
      {displayed}
      <span style={{
        display: 'inline-block', width: 3, height: '0.85em',
        background: 'var(--accent)', marginLeft: 4, verticalAlign: 'text-bottom',
        animation: 'blink 0.8s step-end infinite',
      }} />
    </span>
  );
}

export default function Home() {
  const sectRef = useScrollAnimation();
  const ringsRef = useRef(null);
  const featuredProjects = siteData.projects.filter(p => p.featured);

  useEffect(() => {
    const onScroll = () => {
      if (ringsRef.current)
        ringsRef.current.style.transform = `translateY(calc(-50% + ${window.scrollY * 0.15}px))`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={sectRef}>

      {/* ══════════════════ HERO ══════════════════ */}
      <section style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center',
        padding: '70px 5% 0',
        position: 'relative', overflow: 'hidden',
      }}>
        <Particles />

        {/* Scan line */}
        <div style={{
          position: 'absolute', left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
          opacity: 0.2, animation: 'scan 5s linear infinite', pointerEvents: 'none',
        }} />

        {/* Rings */}
        <div ref={ringsRef} style={{
          position: 'absolute', right: '5%', top: '50%',
          transform: 'translateY(-50%)', pointerEvents: 'none',
          display: 'none',
        }} id="heroRings">
          <HeroRings />
        </div>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 700 }}>
          {/* Eyebrow */}
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '4px', color: 'var(--accent)',
            textTransform: 'uppercase',
            display: 'flex', alignItems: 'center', gap: 14,
            marginBottom: 28,
            opacity: 0, animation: 'fadeUp 0.8s var(--ease) forwards 0.3s',
          }}>
            <span style={{ width: 32, height: 1, background: 'var(--accent)', display: 'block' }} />
            Software & Solutions · Colombo, LK
          </div>

          {/* Main headline */}
          <h1 style={{
            fontSize: 'clamp(50px, 7.5vw, 96px)',
            fontWeight: 800, lineHeight: 0.98,
            letterSpacing: '-3px', marginBottom: 16,
            opacity: 0, animation: 'fadeUp 0.85s var(--ease) forwards 0.5s',
          }}>
            We Build<br />
            <TypedWord />
          </h1>

          {/* Sub tagline */}
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 17, fontWeight: 400,
            color: 'var(--text2)', lineHeight: 1.75,
            maxWidth: 480, marginBottom: 50, marginTop: 24,
            opacity: 0, animation: 'fadeUp 0.85s var(--ease) forwards 0.7s',
          }}>
            Gen O turns ambitious ideas into polished digital products — full‑stack web, mobile, AI, and cloud. Built in Sri Lanka, built for the world.
          </p>

          {/* CTAs */}
          <div style={{
            display: 'flex', gap: 14, flexWrap: 'wrap',
            opacity: 0, animation: 'fadeUp 0.85s var(--ease) forwards 0.9s',
          }}>
            <Link to="/projects" className="btn-primary">View Our Work</Link>
            <Link to="/contact" className="btn-secondary">Start a Project →</Link>
          </div>

          {/* Scroll hint */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12, marginTop: 72,
            opacity: 0, animation: 'fadeUp 0.85s var(--ease) forwards 1.2s',
          }}>
            <div style={{
              width: 1, height: 44,
              background: 'linear-gradient(to bottom, var(--accent), transparent)',
            }} />
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 10,
              letterSpacing: '3px', color: 'var(--text3)', textTransform: 'uppercase',
            }}>Scroll to explore</span>
          </div>
        </div>

        {/* Rings visible on larger screens */}
        <div ref={ringsRef} style={{
          position: 'absolute', right: '6%', top: '50%',
          transform: 'translateY(-50%)', pointerEvents: 'none',
        }}>
          <HeroRings />
        </div>
      </section>

      {/* ══════════════════ STATS ══════════════════ */}
      <div className="stats-bar">
        {siteData.stats.map((s, i) => (
          <StatItem key={i} num={s.num} label={s.label} delay={1.1 + i * 0.1} />
        ))}
      </div>

      {/* ══════════════════ FEATURED PROJECTS ══════════════════ */}
      <section style={{ background: 'var(--bg2)', transition: 'background var(--transition)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 72 }}>
            <span className="section-tag">// selected work</span>
            <h2 className="section-title">Featured Projects</h2>
            <div className="section-line" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            {featuredProjects.map((p, i) => (
              <div key={p.id} className="project-card reveal" style={{
                padding: '34px 30px',
                animationDelay: `${i * 0.12}s`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', letterSpacing: '2px' }}>{p.year}</span>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 10,
                    color: p.color, border: `1px solid ${p.color}33`,
                    padding: '3px 10px', letterSpacing: '1px', textTransform: 'uppercase',
                  }}>{p.category}</span>
                </div>
                <div style={{ width: 36, height: 3, background: p.color, marginBottom: 20, borderRadius: 2 }} />
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800,
                  color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.5px',
                }}>{p.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 22 }}>{p.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 24 }}>
                  {p.tags.map(t => (
                    <span key={t} style={{
                      fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)',
                      background: 'var(--surface2)', border: '1px solid var(--border)',
                      padding: '3px 10px',
                    }}>{t}</span>
                  ))}
                </div>
                <Link to="/projects" style={{
                  fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700,
                  letterSpacing: '2px', color: p.color, textDecoration: 'none',
                  textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 8,
                  transition: 'gap 0.25s',
                }}
                onMouseEnter={e => e.currentTarget.style.gap = '16px'}
                onMouseLeave={e => e.currentTarget.style.gap = '8px'}
                >View Case Study <span>→</span></Link>
              </div>
            ))}
          </div>

          <div className="reveal" style={{ textAlign: 'center', marginTop: 52 }}>
            <Link to="/projects" className="btn-secondary">See All Projects</Link>
          </div>
        </div>
      </section>

      {/* ══════════════════ SERVICES PREVIEW ══════════════════ */}
      <section>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 72 }}>
            <span className="section-tag">// capabilities</span>
            <h2 className="section-title">What We Build</h2>
            <div className="section-line" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {siteData.services.map((s, i) => (
              <div key={s.id} className="service-card reveal" style={{ animationDelay: `${i * 0.08}s` }}>
                <span style={{ position: 'absolute', top: 22, right: 22, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)' }}>0{s.id}</span>
                <div className="service-icon">{icons[s.icon]}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, marginBottom: 10, color: 'var(--text)' }}>{s.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)', lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="reveal" style={{ textAlign: 'center', marginTop: 52 }}>
            <Link to="/services" className="btn-secondary">Explore Services</Link>
          </div>
        </div>
      </section>

      {/* ══════════════════ TECH STACK ══════════════════ */}
      <section style={{ background: 'var(--bg2)', transition: 'background var(--transition)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <div className="reveal" style={{ marginBottom: 52 }}>
            <span className="section-tag">// our stack</span>
            <h2 className="section-title">Technologies We Love</h2>
            <div className="section-line" />
          </div>
          <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
            {siteData.techStack.map(t => (
              <span key={t} className="tech-badge">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ CTA BAND ══════════════════ */}
      <section style={{
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        textAlign: 'center', padding: '90px 5%',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Background grid accent */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 70% at 50% 50%, var(--glow2) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="reveal" style={{ position: 'relative', zIndex: 1 }}>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '4px', color: 'var(--accent)',
            textTransform: 'uppercase', marginBottom: 20,
          }}>// let's build together</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800,
            color: 'var(--text)', letterSpacing: '-1.5px', marginBottom: 22,
          }}>Got an idea? We're ready.</h2>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--text2)',
            maxWidth: 400, margin: '0 auto 40px', lineHeight: 1.75,
          }}>
            Tell us about your project. We respond within 24 hours with a plan and next steps.
          </p>
          <Link to="/contact" className="btn-primary" style={{ fontSize: 12, padding: '16px 40px' }}>
            Start a Conversation →
          </Link>
        </div>
      </section>

    </div>
  );
}

import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { siteData } from '../data';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// ─── Service icons ─────────────────────────────────────────────────
const icons = {
  web: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>,
  mobile: <svg viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
  cloud: <svg viewBox="0 0 24 24"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>,
  ai: <svg viewBox="0 0 24 24"><path d="M12 2a2 2 0 012 2M12 2a2 2 0 00-2 2m2-2v2m0 16v2m0-2a2 2 0 002-2m-2 2a2 2 0 01-2-2M12 20v-2m8-6a2 2 0 01-2 2m2-2a2 2 0 00-2-2m2 2h-2M4 12a2 2 0 012 2M4 12a2 2 0 012-2M4 12H6m12 0h2M9 7l-1-1M16 17l-1-1M17 7l-1 1M8 16l-1 1"/><circle cx="12" cy="12" r="3"/></svg>,
  design: <svg viewBox="0 0 24 24"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>,
  api: <svg viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
};

// ─── Animated rings (hero decoration) ──────────────────────────────
function HeroRings() {
  return (
    <div style={{
      position: 'absolute', right: '6%', top: '50%',
      transform: 'translateY(-50%)',
      width: 480, height: 480,
      pointerEvents: 'none',
    }}>
      {[100, 190, 280, 370, 460].map((size, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: size, height: size,
          borderRadius: '50%',
          border: `1px solid var(--border${i < 2 ? '2' : ''})`,
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          animation: `ringPulse 3.5s ease-in-out infinite ${i * 0.45}s`,
          opacity: 1 - i * 0.15,
        }} />
      ))}
      {/* Center glow */}
      <div style={{
        position: 'absolute',
        width: 70, height: 70,
        borderRadius: '50%',
        background: 'radial-gradient(circle, var(--glow) 0%, transparent 70%)',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        animation: 'glowPulse 2.2s ease-in-out infinite',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Power icon centre */}
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
          stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round">
          <path d="M12 2v6"/>
          <path d="M6.3 6.3A8 8 0 1 0 17.7 6.3"/>
        </svg>
      </div>
    </div>
  );
}

// ─── Floating particles ─────────────────────────────────────────────
function Particles({ count = 28 }) {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="particle" style={{
          left: `${Math.random() * 100}%`,
          width: Math.random() < 0.3 ? '3px' : '2px',
          height: Math.random() < 0.3 ? '3px' : '2px',
          animationDelay: `${Math.random() * 9}s`,
          animationDuration: `${5 + Math.random() * 9}s`,
          opacity: 0.3 + Math.random() * 0.4,
        }} />
      ))}
    </div>
  );
}

// ─── Scan line ──────────────────────────────────────────────────────
function ScanLine() {
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, height: 1,
      background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
      opacity: 0.25,
      animation: 'scan 5s linear infinite',
      pointerEvents: 'none',
    }} />
  );
}

export default function Home() {
  const sectRef = useScrollAnimation();
  const ringsRef = useRef(null);

  // Parallax rings on scroll
  useEffect(() => {
    const onScroll = () => {
      if (ringsRef.current) {
        ringsRef.current.style.transform = `translateY(calc(-50% + ${window.scrollY * 0.18}px))`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const featuredProjects = siteData.projects.filter((p) => p.featured);

  return (
    <div ref={sectRef}>

      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center',
        padding: '68px 5% 0',
        position: 'relative', overflow: 'hidden',
      }}>
        <Particles />
        <ScanLine />
        <div ref={ringsRef} style={{ position: 'absolute', right: '6%', top: '50%', transform: 'translateY(-50%)' }}>
          <HeroRings />
        </div>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 680 }}>
          {/* Eyebrow */}
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11, letterSpacing: '3px', color: 'var(--accent)',
            textTransform: 'uppercase',
            display: 'flex', alignItems: 'center', gap: 12,
            marginBottom: 22,
            opacity: 0, animation: 'fadeUp 0.8s ease forwards 0.3s',
          }}>
            <span style={{ width: 28, height: 1, background: 'var(--accent)', display: 'block' }} />
            Software &amp; Solutions
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: 'clamp(52px, 7vw, 88px)',
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: '-2px',
            marginBottom: 28,
            opacity: 0, animation: 'fadeUp 0.8s ease forwards 0.5s',
          }}>
            We Build<br/>
            <span style={{
              color: 'var(--accent)',
              animation: 'glowPulse 3s ease-in-out infinite 1.3s',
              display: 'inline-block',
            }}>
              What's Next
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 18, fontWeight: 300,
            color: 'var(--text2)', lineHeight: 1.7,
            maxWidth: 460, marginBottom: 48,
            opacity: 0, animation: 'fadeUp 0.8s ease forwards 0.7s',
          }}>
            Gen O is a software development company that turns ambitious ideas into
            polished digital products — web apps, mobile, AI, and everything in between.
          </p>

          {/* CTAs */}
          <div style={{
            display: 'flex', gap: 14, flexWrap: 'wrap',
            opacity: 0, animation: 'fadeUp 0.8s ease forwards 0.9s',
          }}>
            <Link to="/projects" className="btn-primary">View Our Work</Link>
            <Link to="/contact"  className="btn-secondary">Start a Project</Link>
          </div>

          {/* Scroll hint */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            marginTop: 64,
            opacity: 0, animation: 'fadeUp 0.8s ease forwards 1.2s',
          }}>
            <div style={{
              width: 1, height: 40,
              background: 'linear-gradient(to bottom, var(--accent), transparent)',
              marginLeft: 2,
            }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '2px',
              color: 'var(--text3)', textTransform: 'uppercase' }}>Scroll to explore</span>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="stats-bar">
        {siteData.stats.map((s, i) => (
          <div key={i} className="stat-item" style={{
            opacity: 0, animation: `fadeUp 0.6s ease forwards ${1.1 + i * 0.1}s`,
          }}>
            <span className="stat-num">{s.num}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── FEATURED PROJECTS ── */}
      <section style={{ background: 'var(--bg2)', transition: 'background var(--transition)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
            <span className="section-tag">// selected work</span>
            <h2 className="section-title">Featured Projects</h2>
            <div className="section-line" />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 24,
          }}>
            {featuredProjects.map((p, i) => (
              <div key={p.id} className="reveal card" style={{
                padding: '32px 28px',
                animationDelay: `${i * 0.1}s`,
                cursor: 'default',
              }}>
                {/* Top row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10,
                    color: 'var(--text3)', letterSpacing: '2px', textTransform: 'uppercase' }}>
                    {p.year}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 10,
                    color: p.color, letterSpacing: '1px', textTransform: 'uppercase',
                    border: `1px solid ${p.color}33`,
                    padding: '3px 10px', borderRadius: 2,
                  }}>{p.category}</span>
                </div>

                {/* Colored accent bar */}
                <div style={{ width: 36, height: 3, background: p.color, marginBottom: 18, borderRadius: 2 }} />

                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800,
                  color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.5px' }}>{p.title}</h3>

                <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text2)',
                  lineHeight: 1.65, marginBottom: 24 }}>{p.desc}</p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
                  {p.tags.map((t) => (
                    <span key={t} style={{
                      fontFamily: 'var(--font-mono)', fontSize: 11,
                      color: 'var(--text3)', background: 'var(--surface2)',
                      border: '1px solid var(--border)',
                      padding: '4px 10px',
                    }}>{t}</span>
                  ))}
                </div>

                <Link to="/projects" style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 12, fontWeight: 700, letterSpacing: '1.5px',
                  color: p.color, textDecoration: 'none',
                  textTransform: 'uppercase',
                  display: 'flex', alignItems: 'center', gap: 8,
                  transition: 'gap 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.gap = '14px'}
                onMouseLeave={e => e.currentTarget.style.gap = '8px'}
                >
                  View Case Study <span>→</span>
                </Link>
              </div>
            ))}
          </div>

          <div className="reveal" style={{ textAlign: 'center', marginTop: 48 }}>
            <Link to="/projects" className="btn-secondary">See All Projects</Link>
          </div>
        </div>
      </section>

      {/* ── SERVICES PREVIEW ── */}
      <section>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
            <span className="section-tag">// what we do</span>
            <h2 className="section-title">Our Services</h2>
            <div className="section-line" />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 20,
          }}>
            {siteData.services.map((s, i) => (
              <div key={s.id} className="service-card reveal" style={{ animationDelay: `${i * 0.08}s` }}>
                <span style={{
                  position: 'absolute', top: 22, right: 22,
                  fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text3)',
                }}>0{s.id}</span>
                <div className="service-icon">{icons[s.icon]}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700,
                  marginBottom: 10, color: 'var(--text)', letterSpacing: '0.3px' }}>{s.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)',
                  lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="reveal" style={{ textAlign: 'center', marginTop: 48 }}>
            <Link to="/services" className="btn-secondary">Explore Services</Link>
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section style={{ background: 'var(--bg2)', transition: 'background var(--transition)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <div className="reveal" style={{ marginBottom: 48 }}>
            <span className="section-tag">// our stack</span>
            <h2 className="section-title">Technologies We Love</h2>
            <div className="section-line" />
          </div>
          <div className="reveal" style={{
            display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center',
          }}>
            {siteData.techStack.map((t) => (
              <span key={t} className="tech-badge">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section style={{
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        textAlign: 'center',
        padding: '80px 5%',
      }}>
        <div className="reveal">
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '3px',
            color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 16 }}>// let's build together</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 800, color: 'var(--text)', letterSpacing: '-1px', marginBottom: 20 }}>
            Got an idea? We're ready.
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--text2)',
            maxWidth: 420, margin: '0 auto 36px' }}>
            Tell us about your project. We'll respond within 24 hours with a plan and next steps.
          </p>
          <Link to="/contact" className="btn-primary" style={{ fontSize: 14 }}>
            Start a Conversation →
          </Link>
        </div>
      </section>

    </div>
  );
}
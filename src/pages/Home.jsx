<<<<<<< HEAD
import { useEffect, useRef } from 'react';
=======
import React, { useEffect, useState } from 'react';
>>>>>>> origin/linuka_dev
import { Link } from 'react-router-dom';
import { siteData } from '../data';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

<<<<<<< HEAD
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
=======
// ── 3D STACKED BOXES DATA (PERFECT TIGHT PYRAMID) ──
// මෙහි x, y, z අගයන් ඉතා නිවැරදිව සකසා ඇත. පෙට්ටි අතර පරතරය 4px පමණි.
const techStack = [
  // Top Box (Tier 1)
  { 
    name: 'React.js', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', 
    x: 0, y: -115, z: 0, s: 1, zIndex: 10 
  },
  // Middle Row (Tier 2)
  { 
    name: 'Node.js', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', 
    x: -52, y: -10, z: 0, s: 1, zIndex: 9 
  },
  { 
    name: 'Python', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', 
    x: 52, y: -10, z: 0, s: 1, zIndex: 9 
  },
  // Bottom Row (Tier 3)
  { 
    name: 'JavaScript', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', 
    x: -104, y: 95, z: 0, s: 1, zIndex: 8 
  },
  { 
    name: 'AWS', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', 
    x: 0, y: 95, z: 0, s: 1, zIndex: 8 
  },
  { 
    name: 'MySQL', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg', 
    x: 104, y: 95, z: 0, s: 1, zIndex: 8 
  },
];

const icons = {
  web: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="4" ry="4"/><path d="M2 8h20M12 20v-4"/></svg>,
  mobile: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="6" y="2" width="12" height="20" rx="4" ry="4"/><path d="M12 18h.01"/></svg>,
  cloud: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>,
  ai: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>,
  design: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 22l10-4 10 4L12 2z"/></svg>,
  api: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
};

export default function Home() {
  const sectRef = useScrollAnimation();
  const featuredProjects = siteData.projects.filter((p) => p.featured);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const html = document.documentElement;
      const body = document.body;
      const isCurrentlyDark = 
        html.classList.contains('dark') || html.classList.contains('dark-mode') || html.getAttribute('data-theme') === 'dark' ||
        body.classList.contains('dark') || body.classList.contains('dark-mode') || body.getAttribute('data-theme') === 'dark';
      
      setIsDark(isCurrentlyDark);
    };

    checkTheme();
    const observer = new MutationObserver(() => checkTheme());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class', 'data-theme'] });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`home-wrapper ${isDark ? 'dark-mode' : 'light-mode'}`} ref={sectRef}>
      
      <style>{`
        /* ── Oringinal Global Background ── */
        body, html, #root {
          background-image: none !important;
          background-color: var(--page-bg) !important;
          transition: background-color 0.5s ease;
        }

        .home-wrapper {
          min-height: 100vh;
          padding: 100px 24px 24px 24px; 
          display: flex;
          justify-content: center;
          background-color: var(--page-bg);
        }

        .inner-window {
          position: relative; 
          width: 100%;
          max-width: 1600px;
          display: flex; 
          flex-direction: column;
        }

        /* ── EXACT Original Light Mode Variables ── */
        .light-mode {
          --page-bg: #ffffff; 
          --hero-bento-bg: linear-gradient(135deg, #e4f1f0 0%, #d5e9e9 100%);
          --alt-bento-bg: linear-gradient(135deg, #f0f7f7 0%, #e6f2f2 100%);
          
          --text-main: #1c2b33;
          --text-muted: #5e6d75;
          --accent: #15797b; 
          --accent-hover: #105a5c;
          
          --solid-card-bg: #ffffff;
          --card-border: rgba(21, 121, 123, 0.15);
          --card-shadow: 0 10px 40px rgba(21, 121, 123, 0.05);
          --card-shadow-hover: 0 20px 50px rgba(21, 121, 123, 0.12);
          
          --btn-bg: #15797b;
          --btn-bg-hover: #105a5c;
          --btn-text: #ffffff;
          --btn-outline-bg: transparent;
          --btn-outline-border: #15797b;
          --btn-outline-hover: rgba(21, 121, 123, 0.08);
          
          --pill-bg: #e4f1f0;
          --pill-text: #15797b;
          --icon-bg: rgba(21, 121, 123, 0.08);

          /* 3D Box Colors - Light */
          --cube-front: #ffffff;
          --cube-top: #f5f5f5;
          --cube-side: #fafafa;
          --cube-border: rgba(0, 0, 0, 0.05);
        }

        /* ── EXACT Original Dark Mode Variables ── */
        .dark-mode {
          --page-bg: #070b0f; 
          --hero-bento-bg: linear-gradient(135deg, #0e171b 0%, #152229 100%);
          --alt-bento-bg: linear-gradient(135deg, #0a1114 0%, #0d161a 100%);
          
          --text-main: #f0f4f8;
          --text-muted: #8b9eb0;
          --accent: #4ad6e8; 
          --accent-hover: #75e2f0;
          
          --solid-card-bg: #111a20; 
          --card-border: rgba(74, 214, 232, 0.1);
          --card-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
          --card-shadow-hover: 0 20px 50px rgba(74, 214, 232, 0.15);
          
          --btn-bg: #4ad6e8;
          --btn-bg-hover: #75e2f0;
          --btn-text: #050a0f;
          --btn-outline-bg: rgba(255, 255, 255, 0.05);
          --btn-outline-border: #4ad6e8;
          --btn-outline-hover: rgba(74, 214, 232, 0.1);
          
          --pill-bg: rgba(74, 214, 232, 0.1);
          --pill-text: #4ad6e8;
          --icon-bg: rgba(74, 214, 232, 0.1);

          /* 3D Box Colors - Dark Mode FIX */
          --cube-front: #232d3b;  /* Beautiful Slate Grey */
          --cube-top: #303d4f;
          --cube-side: #161e27;
          --cube-border: rgba(255, 255, 255, 0.12);
        }

        .premium-text { font-family: 'Inter', -apple-system, sans-serif; transition: color 0.5s ease; color: var(--text-muted); }
        .serif-heading { font-family: 'Playfair Display', 'Merriweather', serif; transition: color 0.5s ease; color: var(--text-main); }

        /* EXACT Original non-glass Bento Box */
        .hero-bento-box {
          background: var(--hero-bento-bg);
          border-radius: 40px;
          position: relative; 
          z-index: 2;
          overflow: hidden; 
          display: flex;
          min-height: 580px;
        }

        .hero-content { 
          flex: 1; 
          padding: 6rem 4rem; 
          display: flex;
          flex-direction: column;
          justify-content: center; 
          position: relative;
          z-index: 3;
          opacity: 0; 
          animation: revealUp 0.8s ease forwards 0.2s; 
        }

        /* ────────────────────────────────────────── */
        /* ── 3D PHYSICAL PYRAMID CUBES CSS ── */
        /* ────────────────────────────────────────── */
        .tech-stack-container {
          flex: 1; 
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: center;
          align-items: center;
          /* Critical for receding depth */
          perspective: 2000px; 
        }

        .pyramid-container {
          position: relative;
          transform-style: preserve-3d;
          /* Rotate to show Top and Right sides */
          transform: rotateX(-15deg) rotateY(25deg); 
        }

        .position-wrapper {
          position: absolute;
          width: 100px;
          height: 100px;
          margin-top: -50px;
          margin-left: -50px;
          transform-style: preserve-3d;
          transition: transform 0.3s ease;
          cursor: pointer;
        }

        .hover-wrapper {
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .position-wrapper:hover {
          z-index: 999 !important;
        }

        /* On hover, pop out of the stack */
        .position-wrapper:hover .hover-wrapper {
          transform: translateZ(50px) scale(1.15);
        }

        .cube {
          width: 100%;
          height: 100%;
          position: absolute;
          transform-style: preserve-3d;
        }

        .cube-face {
          position: absolute;
          width: 100px;
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          background: #ffffff;
          border: 1px solid var(--cube-border);
          border-radius: 2px;
        }

        .cube-front {
          transform: rotateY(0deg) translateZ(50px);
          background: var(--cube-front);
          box-shadow: 0 5px 15px rgba(0,0,0,0.06);
        }

        .dark-mode .cube-front {
          box-shadow: 0 5px 15px rgba(0,0,0,0.4);
        }
        
        /* Soft white glow so dark logos (AWS, JS) are visible in Dark Mode */
        .dark-mode .cube-front img {
          filter: drop-shadow(0px 0px 5px rgba(255,255,255,0.3));
        }

        .cube-front img {
          max-width: 60%;
          max-height: 60%;
          object-fit: contain;
        }

        .cube-top { transform: rotateX(90deg) translateZ(50px); background: var(--cube-top); }
        .cube-right { transform: rotateY(90deg) translateZ(50px); background: var(--cube-side); }
        .cube-left { transform: rotateY(-90deg) translateZ(50px); background: var(--cube-side); }
        .cube-back { transform: rotateY(180deg) translateZ(50px); background: var(--cube-front); }
        
        .cube-bottom { 
          transform: rotateX(-90deg) translateZ(50px); 
          background: var(--cube-top); 
          box-shadow: 0 20px 30px rgba(0,0,0,0.15); 
        }
        .dark-mode .cube-bottom { box-shadow: 0 20px 30px rgba(0,0,0,0.6); }

        /* ── Floating Abstract Shapes ── */
        .floating-shape-1 { position: absolute; width: 45px; height: 45px; border-radius: 50%; border: 2px solid var(--accent); opacity: 0.3; top: 15%; left: 10%; animation: float 6s ease-in-out infinite; }
        .floating-shape-2 { position: absolute; width: 55px; height: 55px; border-radius: 50%; background: var(--accent); opacity: 0.15; bottom: 12%; left: 28%; animation: float 8s ease-in-out infinite reverse; }

        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes revealUp { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }

        /* ── Buttons ── */
        .btn-group { display: flex; gap: 1rem; flex-wrap: wrap; }
        .btn-new-primary { padding: 12px 32px; border-radius: 6px; font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; text-decoration: none; transition: all 0.3s ease; background-color: var(--btn-bg); color: var(--btn-text); border: 2px solid var(--btn-bg); }
        .btn-new-primary:hover { background-color: var(--btn-bg-hover); border-color: var(--btn-bg-hover); transform: translateY(-2px); }
        .btn-new-outline { padding: 12px 32px; border-radius: 6px; font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; text-decoration: none; transition: all 0.3s ease; background-color: var(--btn-outline-bg); color: var(--accent); border: 2px solid var(--btn-outline-border); }
        .btn-new-outline:hover { background-color: var(--btn-outline-hover); transform: translateY(-2px); }

        /* ── EXACT ORIGINAL SECTIONS ── */
        .plain-section { padding: 4rem 2rem; background: transparent; }
        .stat-item { text-align: center; padding: 1rem; }
        .stat-num { font-size: 3.5rem; font-weight: 800; color: var(--accent); line-height: 1.1; margin-bottom: 0.5rem; }
        
        .clean-card { background: transparent; border: 1px solid var(--card-border); border-radius: 24px; padding: 2.5rem; transition: all 0.4s ease; display: flex; flex-direction: column; align-items: flex-start; }
        .clean-card:hover { background: var(--solid-card-bg); border-color: transparent; box-shadow: var(--card-shadow-hover); transform: translateY(-6px); }
        .service-icon-box { width: 55px; height: 55px; color: var(--accent); margin-bottom: 1.5rem; background: var(--icon-bg); border-radius: 16px; display: flex; align-items: center; justify-content: center; padding: 12px; }
        
        /* EXACT Original Alt Bento Section */
        .alt-bento-section { background: var(--alt-bento-bg); border-radius: 72px; padding: 48px; margin: 2rem 0; }
        
        /* EXACT Original Solid Card */
        .solid-card { background: var(--solid-card-bg); border-radius: 24px; padding: 2.5rem; border: none; box-shadow: var(--card-shadow); transition: all 0.4s ease; display: flex; flex-direction: column; height: 100%; }
        .solid-card:hover { transform: translateY(-8px); box-shadow: var(--card-shadow-hover); }
        .glass-pill { padding: 8px 20px; border-radius: 100px; background: var(--pill-bg); color: var(--pill-text); font-size: 0.8rem; font-weight: 700; transition: all 0.5s ease; z-index: 10;}

        @media (max-width: 900px) {
          .home-wrapper { padding: 90px 16px 24px 16px; }
          .hero-bento-box { flex-direction: column; }
          .hero-content { padding: 3rem 2rem 1rem 2rem; text-align: center; align-items: center; }
          
          .pyramid-container { transform: rotateX(-15deg) rotateY(25deg) scale(0.8); }
          .tech-stack-container { min-height: 400px; }
          
          .alt-bento-section { padding: 32px; border-radius: 56px; }
        }
      `}</style>

      <div className="inner-window">

        {/* ─── HERO SECTION ─── */}
        <div className="hero-bento-box">
          <div className="floating-shape-1"></div>
          <div className="floating-shape-2"></div>

          <div className="hero-content">
            <h1 className="serif-heading" style={{ fontSize: 'clamp(3.2rem, 5vw, 4.5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '10px', letterSpacing: '-1px' }}>
              Hello, I'm <span style={{ color: 'var(--accent)' }}>Tharindu</span>
            </h1>
            <h2 className="serif-heading" style={{ fontSize: 'clamp(2.4rem, 4vw, 3.2rem)', fontWeight: 700, color: 'var(--accent)', marginBottom: '1.5rem', letterSpacing: '-1px' }}>
              Web Developer
            </h2>
            <p className="premium-text" style={{ fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: '480px' }}>
              I am a Full-Stack Web Developer with extensive experience of over 4 years. My expertise is in creating & designing websites, Mobile Apps, and Desktop Applications.
            </p>
            
            <div className="btn-group">
              <Link to="/about" className="btn-new-outline">Learn More</Link>
              <Link to="/contact" className="btn-new-primary">Contact Us</Link>
            </div>
          </div>

          {/* ─── PHYSICAL 3D CUBES (PYRAMID STACK) ─── */}
          <div className="tech-stack-container">
            <div className="pyramid-container">
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="position-wrapper"
                  title={tech.name}
                  style={{
                    transform: `translate3d(${tech.x}px, ${tech.y}px, ${tech.z}px) scale(${tech.s})`,
                    zIndex: tech.zIndex, 
                  }}
                >
                  <div className="hover-wrapper">
                    <div className="cube">
                      {/* Front Face with Logo */}
                      <div className="cube-face cube-front">
                        <img src={tech.icon} alt={tech.name} className="tech-icon-img" />
                      </div>
                      {/* Other Faces */}
                      <div className="cube-face cube-back"></div>
                      <div className="cube-face cube-right"></div>
                      <div className="cube-face cube-left"></div>
                      <div className="cube-face cube-top"></div>
                      <div className="cube-face cube-bottom"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ─── STATS SECTION ─── */}
        <section className="plain-section">
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            {siteData.stats.map((s, i) => (
              <div key={i} className="stat-item">
                <div className="serif-heading stat-num">{s.num}</div>
                <div className="premium-text" style={{ fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── CAPABILITIES ─── */}
        <section className="plain-section" style={{ paddingTop: '0' }}>
          <h2 className="reveal serif-heading" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '3rem', textAlign: 'center' }}>
            Our Capabilities
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {siteData.services.map((s, i) => (
              <div key={s.id} className="clean-card reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="service-icon-box">
                  {icons[s.icon]}
                </div>
                <h3 className="serif-heading" style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 1rem 0' }}>{s.title}</h3>
                <p className="premium-text" style={{ fontSize: '1rem', lineHeight: 1.6, margin: 0 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SELECTED WORK ─── */}
        <div className="alt-bento-section">
          <div className="reveal" style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <h2 className="serif-heading" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-1px', margin: 0 }}>Selected Work.</h2>
              <p className="premium-text" style={{ fontSize: '1.1rem', margin: '10px 0 0 0' }}>Digital transformations that matter.</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {featuredProjects.map((p, i) => (
              <div key={p.id} className="solid-card reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <span className="glass-pill">
                    {p.category}
                  </span>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--icon-bg)' }}></div>
                </div>
                <h3 className="serif-heading" style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 1rem 0' }}>{p.title}</h3>
                <p className="premium-text" style={{ fontSize: '1rem', lineHeight: 1.6, margin: '0 0 2rem 0', flexGrow: 1 }}>
                  {p.desc}
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {p.tags.slice(0, 3).map(t => (
                    <span key={t} className="premium-text" style={{ fontSize: '0.8rem', fontWeight: 600, padding: '6px 14px', border: '1px solid var(--card-border)', borderRadius: '100px' }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
>>>>>>> origin/linuka_dev
}
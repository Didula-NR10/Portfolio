import { useEffect, useRef, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { siteData } from '../data';

const icons = {
  web:    <svg viewBox="0 0 24 24" style={{width:24,height:24,stroke:'var(--accent)',fill:'none',strokeWidth:1.5,strokeLinecap:'round'}}><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>,
  mobile: <svg viewBox="0 0 24 24" style={{width:24,height:24,stroke:'var(--accent)',fill:'none',strokeWidth:1.5,strokeLinecap:'round'}}><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
  cloud:  <svg viewBox="0 0 24 24" style={{width:24,height:24,stroke:'var(--accent)',fill:'none',strokeWidth:1.5,strokeLinecap:'round'}}><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>,
  ai:     <svg viewBox="0 0 24 24" style={{width:24,height:24,stroke:'var(--accent)',fill:'none',strokeWidth:1.5,strokeLinecap:'round'}}><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>,
  design: <svg viewBox="0 0 24 24" style={{width:24,height:24,stroke:'var(--accent)',fill:'none',strokeWidth:1.5,strokeLinecap:'round'}}><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><circle cx="11" cy="11" r="2"/></svg>,
  api:    <svg viewBox="0 0 24 24" style={{width:24,height:24,stroke:'var(--accent)',fill:'none',strokeWidth:1.5,strokeLinecap:'round'}}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
};

/* ─── Falling service cards ─── */
function FallingServiceCards() {
  const [landed, setLanded] = useState([]);
  const gridRef = useRef(null);
  const triggered = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !triggered.current) {
        triggered.current = true;
        siteData.services.forEach((_, i) => {
          setTimeout(() => setLanded(prev => [...prev, i]), i * 140);
        });
      }
    }, { threshold: 0.15 });
    if (gridRef.current) obs.observe(gridRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={gridRef} style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
      gap: 22,
    }}>
      {siteData.services.map((s, i) => {
        const isLanded = landed.includes(i);
        return (
          <div key={s.id} style={{
            background: 'var(--card)',
            border: `1px solid ${isLanded ? 'var(--border)' : 'transparent'}`,
            padding: '36px 30px',
            position: 'relative', overflow: 'hidden',
            backdropFilter: 'blur(14px)',
            opacity: isLanded ? 1 : 0,
            transform: isLanded ? 'translateY(0) scale(1)' : 'translateY(-120px) scale(0.88)',
            transition: isLanded
              ? `opacity 0.55s var(--ease), transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)`
              : 'none',
            cursor: 'default',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--border2)';
            e.currentTarget.style.transform = 'translateY(-7px) scale(1)';
            e.currentTarget.style.boxShadow = 'var(--shadow)';
            e.currentTarget.querySelector('.card-top-bar').style.transform = 'scaleX(1)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.querySelector('.card-top-bar').style.transform = 'scaleX(0)';
          }}
          >
            {/* Top accent bar */}
            <div className="card-top-bar" style={{
              position: 'absolute', top: 0, left: 0,
              width: '100%', height: 2,
              background: 'linear-gradient(90deg, var(--accent), transparent)',
              transform: 'scaleX(0)', transformOrigin: 'left',
              transition: 'transform 0.4s var(--ease)',
            }} />
            {/* Number */}
            <span style={{
              position: 'absolute', top: 22, right: 22,
              fontFamily: 'var(--font-mono)', fontSize: 11,
              color: 'var(--text3)', letterSpacing: '1px',
            }}>0{s.id}</span>

            {/* Icon */}
            <div className="service-icon">{icons[s.icon]}</div>

            <h3 style={{
              fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700,
              color: 'var(--text)', marginBottom: 10,
            }}>{s.title}</h3>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 14,
              color: 'var(--text2)', lineHeight: 1.68, marginBottom: 22,
            }}>{s.desc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
              {s.tags.map(t => (
                <span key={t} className="tech-badge" style={{ fontSize: 10 }}>{t}</span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Services() {
  const sectRef = useScrollAnimation();

  return (
    <div ref={sectRef}>

      {/* ── HERO ── */}
      <section style={{ paddingTop: 148, paddingBottom: 80 }}>
        <div className="reveal">
          <span className="section-tag">// capabilities</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(38px,5.5vw,68px)', maxWidth: 620 }}>
            End-to-End<br/>Digital Solutions
          </h1>
          <div className="section-line" style={{ margin: '18px 0 0' }} />
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: 'var(--text2)', lineHeight: 1.75, maxWidth: 500, marginTop: 26 }}>
            From concept to launch to scale — we cover the full product lifecycle with deep expertise in modern web, mobile, cloud, and AI.
          </p>
        </div>
      </section>

      {/* ── SERVICES FALL-IN GRID ── */}
      <section style={{ background: 'var(--bg2)', transition: 'background var(--transition)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 72 }}>
            <span className="section-tag">// services</span>
            <h2 className="section-title">What We Offer</h2>
            <div className="section-line" />
          </div>
          <FallingServiceCards />
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 80 }}>
            <span className="section-tag">// how we work</span>
            <h2 className="section-title">Our Process</h2>
            <div className="section-line" />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 0, position: 'relative',
          }}>
            {/* Connector line */}
            <div style={{
              position: 'absolute', top: 36, left: '12.5%', right: '12.5%',
              height: 1,
              background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
              opacity: 0.25, pointerEvents: 'none',
            }} />

            {siteData.process.map((step, i) => (
              <div key={i} className="reveal" style={{ textAlign: 'center', padding: '0 28px', animationDelay: `${i * 0.12}s` }}>
                <div style={{
                  width: 72, height: 72, borderRadius: '50%',
                  border: '1px solid var(--border2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 28px',
                  background: 'var(--surface)', position: 'relative', zIndex: 1,
                  transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.boxShadow = '0 0 30px var(--glow)';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border2)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent)', letterSpacing: '1px' }}>{step.step}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: 'var(--text)', marginBottom: 10 }}>{step.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)', lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section style={{ background: 'var(--bg2)', transition: 'background var(--transition)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <div className="reveal" style={{ marginBottom: 52 }}>
            <span className="section-tag">// technology</span>
            <h2 className="section-title">Stack We Trust</h2>
            <div className="section-line" />
          </div>
          <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
            {siteData.techStack.map(t => (
              <span key={t} className="tech-badge">{t}</span>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

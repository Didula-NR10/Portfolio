import { Link } from 'react-router-dom'; // 👈 Meka add kara
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { siteData } from '../data';

const icons = {
  web:     <svg viewBox="0 0 24 24" style={{width:24,height:24,stroke:'var(--accent)',fill:'none',strokeWidth:1.5,strokeLinecap:'round',strokeLinejoin:'round'}}><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>,
  mobile: <svg viewBox="0 0 24 24" style={{width:24,height:24,stroke:'var(--accent)',fill:'none',strokeWidth:1.5,strokeLinecap:'round',strokeLinejoin:'round'}}><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
  cloud:  <svg viewBox="0 0 24 24" style={{width:24,height:24,stroke:'var(--accent)',fill:'none',strokeWidth:1.5,strokeLinecap:'round',strokeLinejoin:'round'}}><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>,
  ai:     <svg viewBox="0 0 24 24" style={{width:24,height:24,stroke:'var(--accent)',fill:'none',strokeWidth:1.5,strokeLinecap:'round',strokeLinejoin:'round'}}><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>,
  design: <svg viewBox="0 0 24 24" style={{width:24,height:24,stroke:'var(--accent)',fill:'none',strokeWidth:1.5,strokeLinecap:'round',strokeLinejoin:'round'}}><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><circle cx="11" cy="11" r="2"/></svg>,
  api:    <svg viewBox="0 0 24 24" style={{width:24,height:24,stroke:'var(--accent)',fill:'none',strokeWidth:1.5,strokeLinecap:'round',strokeLinejoin:'round'}}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
};

export default function Services() {
  const sectRef = useScrollAnimation();

  return (
    <div ref={sectRef}>

      {/* ── HERO ── */}
      <section style={{ paddingTop: 140, paddingBottom: 80 }}>
        <div className="reveal">
          <span className="section-tag">// capabilities</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(38px,5vw,64px)', letterSpacing: '-2px', maxWidth: 600 }}>
            End-to-End Digital Solutions
          </h1>
          <div className="section-line" style={{ margin: '18px 0 0' }} />
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: 'var(--text2)',
            lineHeight: 1.75, maxWidth: 520, marginTop: 24 }}>
            From idea to launch to scale — we cover the full product lifecycle with
            deep expertise in modern web, mobile, cloud, and AI.
          </p>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section style={{ background: 'var(--bg2)', transition: 'background var(--transition)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
            <span className="section-tag">// services</span>
            <h2 className="section-title">What We Offer</h2>
            <div className="section-line" />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: 22,
          }}>
            {siteData.services.map((s, i) => (
              <div key={s.id} className="service-card reveal" style={{ animationDelay: `${i * 0.08}s` }}>
                <span style={{ position: 'absolute', top: 22, right: 22,
                  fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text3)' }}>0{s.id}</span>
                <div className="service-icon">{icons[s.icon]}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700,
                  color: 'var(--text)', marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)',
                  lineHeight: 1.65, marginBottom: 20 }}>{s.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                  {s.tags.map((t) => (
                    <span key={t} className="tech-badge" style={{ fontSize: 11 }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 72 }}>
            <span className="section-tag">// how we work</span>
            <h2 className="section-title">Our Process</h2>
            <div className="section-line" />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 0,
            position: 'relative',
          }}>
            {/* Connector line */}
            <div style={{
              position: 'absolute', top: 36, left: '12.5%', right: '12.5%', height: 1,
              background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
              opacity: 0.3, pointerEvents: 'none',
            }} />

            {siteData.process.map((step, i) => (
              <div key={i} className="reveal" style={{
                textAlign: 'center', padding: '0 24px',
                animationDelay: `${i * 0.12}s`,
              }}>
                {/* Step number circle */}
                <div style={{
                  width: 72, height: 72,
                  border: '1px solid var(--border2)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 24px',
                  background: 'var(--surface)',
                  position: 'relative', zIndex: 1,
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.boxShadow = '0 0 24px var(--glow)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border2)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14,
                    fontWeight: 500, color: 'var(--accent)', letterSpacing: '1px' }}>{step.step}</span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800,
                  color: 'var(--text)', marginBottom: 10 }}>{step.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)',
                  lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            ))}
          </div>

          {/* ── GET A QUOTE BUTTON ── */}
          <div className="reveal" style={{ 
            marginTop: 80, 
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <p style={{ 
              fontFamily: 'var(--font-body)', 
              color: 'var(--text2)', 
              fontSize: 16,
              marginBottom: 24
            }}>
              Ready to bring your project to life?
            </p>
            <Link to="/contact" className="modern-cta-btn" style={{ 
              padding: '14px 40px', 
              fontSize: 15,
              background: 'orange',
              textDecoration: 'none'
            }}>
              Get a Quote 
            </Link>
          </div>

        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section style={{ background: 'var(--bg2)', transition: 'background var(--transition)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <div className="reveal" style={{ marginBottom: 48 }}>
            <span className="section-tag">// technology</span>
            <h2 className="section-title">Stack We Trust</h2>
            <div className="section-line" />
          </div>
          <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
            {siteData.techStack.map((t) => (
              <span key={t} className="tech-badge">{t}</span>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
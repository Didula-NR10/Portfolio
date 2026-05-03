import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { siteData } from '../data';

function HexGrid() {
  const activeIdx = [2, 6, 11, 15];
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 74px)',
      gap: 8,
      justifyContent: 'center',
    }}>
      {Array.from({ length: 20 }).map((_, i) => {
        const isActive = activeIdx.includes(i);
        return (
          <div key={i} style={{
            width: 74, height: 84,
            background: isActive ? 'var(--accent-dim)' : 'var(--surface)',
            border: `1px solid ${isActive ? 'var(--border2)' : 'var(--border)'}`,
            clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.35s',
            animation: `${isActive ? 'glowPulse' : 'ringPulse'} ${3 + (i % 3)}s ease-in-out infinite ${(i % 4) * 0.4}s`,
            cursor: 'default',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--accent)';
            e.currentTarget.style.background = 'var(--glow)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = isActive ? 'var(--border2)' : 'var(--border)';
            e.currentTarget.style.background = isActive ? 'var(--accent-dim)' : 'var(--surface)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
          >
            {isActive && (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function About() {
  const sectRef = useScrollAnimation();

  return (
    <div ref={sectRef}>

      {/* ── HERO ── */}
      <section style={{ paddingTop: 148, paddingBottom: 80 }}>
        <div className="reveal">
          <span className="section-tag">// who we are</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(38px,5.5vw,68px)', maxWidth: 560 }}>
            Built by Builders,<br/>for Builders
          </h1>
          <div className="section-line" style={{ margin: '18px 0 0' }} />
        </div>
      </section>

      {/* ── STORY ── */}
      <section style={{ background: 'var(--bg2)', transition: 'background var(--transition)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

          <div className="reveal-left"><HexGrid /></div>

          <div>
            <div className="reveal" style={{ marginBottom: 32 }}>
              <span className="section-tag">// our story</span>
              <h2 className="section-title" style={{ fontSize: 'clamp(26px,3vw,42px)', textAlign: 'left' }}>The Gen O Story</h2>
              <div className="section-line" style={{ margin: '18px 0 0' }} />
            </div>
            <p className="reveal" style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text2)', lineHeight: 1.85, marginBottom: 20 }}>
              Gen O was born in Colombo out of a simple frustration: great ideas were dying because talented teams lacked the technical execution to bring them to life.
            </p>
            <p className="reveal" style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text2)', lineHeight: 1.85, marginBottom: 36 }}>
              We started as a small team of engineers obsessed with craft. Today we're a full-stack studio — design, development, and delivery — partnering with startups, agencies, and enterprises across South Asia and beyond.
            </p>
            <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                'Full-stack team: design, frontend, backend, cloud',
                'Agile delivery with weekly client check-ins',
                'Post-launch support included in every project',
                'Sri Lanka-based, globally competitive',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)' }}>
                  <span style={{ color: 'var(--accent)', marginTop: 2, flexShrink: 0, fontSize: 12 }}>▹</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 72 }}>
            <span className="section-tag">// what drives us</span>
            <h2 className="section-title">Our Values</h2>
            <div className="section-line" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {siteData.values.map((v, i) => (
              <div key={i} className="card reveal" style={{ padding: '36px 28px', animationDelay: `${i * 0.1}s` }}>
                <div style={{ width: 34, height: 3, background: 'var(--accent)', marginBottom: 24, borderRadius: 2 }} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: 'var(--text)', marginBottom: 12 }}>{v.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)', lineHeight: 1.75 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section style={{ background: 'var(--bg2)', transition: 'background var(--transition)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 72 }}>
            <span className="section-tag">// the people</span>
            <h2 className="section-title">Meet the Team</h2>
            <div className="section-line" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 22 }}>
            {siteData.team.map((m, i) => (
              <div key={i} className="card reveal" style={{ padding: '32px 26px', animationDelay: `${i * 0.1}s` }}>
                <div style={{
                  width: 64, height: 64, border: '1px solid var(--border2)',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 20, background: 'var(--surface2)',
                  animation: 'glowPulse 3.5s ease-in-out infinite',
                }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 800, color: 'var(--accent)', letterSpacing: '1px' }}>{m.initials}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 800, color: 'var(--text)', marginBottom: 5 }}>{m.name}</h3>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 14 }}>{m.role}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

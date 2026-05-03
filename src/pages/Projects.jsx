import { useState, useRef } from 'react';
import { siteData } from '../data';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const ALL = 'All';

/* ─── Tilt card wrapper ─── */
function TiltCard({ children, style, onClick }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    el.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateY(-8px)`;
    el.style.boxShadow = `${-x * 2}px ${y * 2 + 16}px 48px rgba(0,0,0,0.35), 0 0 30px var(--glow2)`;
  };

  const onLeave = (e) => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
    el.style.boxShadow = 'none';
  };

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        ...style,
        transition: 'transform 0.15s ease, box-shadow 0.3s ease, border-color 0.3s',
        cursor: 'pointer',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}

/* ─── Project modal ─── */
function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div style={{
          padding: '22px 28px', borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: project.color }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', letterSpacing: '3px', textTransform: 'uppercase' }}>{project.category}</span>
          </div>
          <button onClick={onClose} style={{
            background: 'none', border: '1px solid var(--border)',
            color: 'var(--text2)', cursor: 'pointer', padding: '5px 12px',
            fontFamily: 'var(--font-mono)', fontSize: 11, borderRadius: 2,
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text2)'; }}
          >✕ Close</button>
        </div>
        <div style={{ padding: '36px 32px' }}>
          <div style={{ width: 42, height: 3, background: project.color, marginBottom: 22, borderRadius: 2 }} />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, color: 'var(--text)', letterSpacing: '-1px', marginBottom: 8 }}>{project.title}</h2>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', letterSpacing: '3px', textTransform: 'uppercase' }}>{project.year}</span>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text2)', lineHeight: 1.8, margin: '26px 0 28px' }}>{project.longDesc}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36 }}>
            {project.tags.map(t => <span key={t} className="tech-badge">{t}</span>)}
          </div>
          <a href={project.live} target="_blank" rel="noreferrer" className="btn-primary" style={{ textDecoration: 'none' }}>View Live →</a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectRef = useScrollAnimation();
  const categories = [ALL, ...Array.from(new Set(siteData.projects.map(p => p.category)))];
  const [active, setActive] = useState(ALL);
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);

  const filtered = active === ALL ? siteData.projects : siteData.projects.filter(p => p.category === active);

  return (
    <div ref={sectRef}>
      <section style={{ paddingTop: 130 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* Header */}
          <div className="reveal" style={{ marginBottom: 64 }}>
            <span className="section-tag">// portfolio</span>
            <h1 className="section-title" style={{ fontSize: 'clamp(38px,5.5vw,68px)' }}>Our Work</h1>
            <div className="section-line" style={{ margin: '18px 0 0' }} />
          </div>

          {/* Filter tabs */}
          <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 56 }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActive(cat)} style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase',
                padding: '9px 20px',
                background: active === cat ? 'var(--accent)' : 'var(--surface)',
                color: active === cat ? '#04060B' : 'var(--text3)',
                border: `1px solid ${active === cat ? 'var(--accent)' : 'var(--border)'}`,
                cursor: 'pointer',
                transition: 'all 0.25s',
                borderRadius: 2,
              }}
              onMouseEnter={e => { if (active !== cat) { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}}
              onMouseLeave={e => { if (active !== cat) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text3)'; }}}
              >{cat}</button>
            ))}
          </div>

          {/* Projects grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
            {filtered.map((p, i) => (
              <TiltCard
                key={p.id}
                onClick={() => setSelected(p)}
                style={{
                  background: 'var(--card)',
                  border: `1px solid ${hovered === p.id ? 'var(--border2)' : 'var(--border)'}`,
                  padding: '30px 28px',
                  backdropFilter: 'blur(14px)',
                  position: 'relative', overflow: 'hidden',
                  opacity: 0,
                  animation: `fadeUp 0.55s var(--ease) forwards ${i * 0.07}s`,
                }}
              >
                {/* Glowing corner */}
                <div style={{
                  position: 'absolute', bottom: -30, right: -30,
                  width: 100, height: 100, borderRadius: '50%',
                  background: `radial-gradient(circle, ${p.color}22 0%, transparent 70%)`,
                  transition: 'all 0.5s',
                  pointerEvents: 'none',
                }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', letterSpacing: '2px' }}>{p.year}</span>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 10, color: p.color,
                    border: `1px solid ${p.color}44`, padding: '3px 10px',
                    textTransform: 'uppercase', letterSpacing: '1px',
                  }}>{p.category}</span>
                </div>

                {/* Animated accent bar */}
                <div style={{
                  width: 32, height: 3, background: p.color, marginBottom: 18, borderRadius: 2,
                  transition: 'width 0.4s var(--ease)',
                }} />

                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800,
                  color: 'var(--text)', marginBottom: 10, letterSpacing: '-0.5px',
                }}>{p.title}</h3>

                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: 14,
                  color: 'var(--text2)', lineHeight: 1.68, marginBottom: 20,
                }}>{p.desc}</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 22 }}>
                  {p.tags.map(t => (
                    <span key={t} style={{
                      fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)',
                      background: 'var(--surface2)', border: '1px solid var(--border)',
                      padding: '3px 9px',
                    }}>{t}</span>
                  ))}
                </div>

                <span style={{
                  fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700,
                  color: p.color, letterSpacing: '2px', textTransform: 'uppercase',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>View Details <span style={{ fontSize: 14 }}>→</span></span>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

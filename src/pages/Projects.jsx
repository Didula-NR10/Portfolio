import { useState, useRef, useEffect } from 'react';
import { siteData } from '../data';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const ALL = 'All';

/* ─── Tilt card ─── */
function TiltCard({ children, style, onClick }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    el.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) translateY(-10px)`;
    el.style.boxShadow = `${-x * 2}px ${y * 2 + 18}px 52px rgba(0,0,0,0.38), 0 0 32px var(--glow2)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)';
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
        transition: 'transform 0.12s ease, box-shadow 0.3s ease, border-color 0.3s, opacity 0.4s, filter 0.4s',
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
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!project) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div style={{
          padding: '22px 28px', borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 10, height: 10, borderRadius: '50%',
              background: project.color, boxShadow: `0 0 10px ${project.color}`,
            }} />
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 10,
              color: 'var(--text3)', letterSpacing: '3px', textTransform: 'uppercase',
            }}>{project.category}</span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: '1px solid var(--border)',
              color: 'var(--text2)', cursor: 'pointer', padding: '5px 14px',
              fontFamily: 'var(--font-mono)', fontSize: 11, borderRadius: 2,
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text2)'; }}
          >✕ Close</button>
        </div>
        <div style={{ padding: '36px 32px' }}>
          <div style={{ width: 44, height: 3, background: project.color, marginBottom: 22, borderRadius: 2 }} />
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800,
            color: 'var(--text)', letterSpacing: '-1px', marginBottom: 8,
          }}>{project.title}</h2>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)',
            letterSpacing: '3px', textTransform: 'uppercase',
          }}>{project.year}</span>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text2)',
            lineHeight: 1.82, margin: '26px 0 28px',
          }}>{project.longDesc}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36 }}>
            {project.tags.map(t => (
              <span key={t} style={{
                fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)',
                background: 'var(--surface2)', border: '1px solid var(--border)',
                padding: '5px 12px',
              }}>{t}</span>
            ))}
          </div>
          <a href={project.live} target="_blank" rel="noreferrer"
            className="btn-primary" style={{ textDecoration: 'none' }}>
            View Live →
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Filter button ─── */
function FilterBtn({ label, active, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase',
        padding: '9px 22px',
        background: active ? 'var(--accent)' : hovered ? 'var(--accent-dim)' : 'var(--surface)',
        color: active ? '#04060B' : hovered ? 'var(--accent)' : 'var(--text3)',
        border: `1px solid ${active ? 'var(--accent)' : hovered ? 'var(--accent)' : 'var(--border)'}`,
        cursor: 'pointer', transition: 'all 0.25s var(--ease)', borderRadius: 2,
      }}
    >{label}</button>
  );
}

export default function Projects() {
  const sectRef = useScrollAnimation();
  const categories = [ALL, ...Array.from(new Set(siteData.projects.map(p => p.category)))];
  const [active, setActive] = useState(ALL);
  const [selected, setSelected] = useState(null);
  const [visible, setVisible] = useState([]);
  const gridRef = useRef(null);
  const triggered = useRef(false);

  const filtered = active === ALL
    ? siteData.projects
    : siteData.projects.filter(p => p.category === active);

  // Stagger cards in on mount / filter change
  useEffect(() => {
    setVisible([]);
    filtered.forEach((_, i) => {
      setTimeout(() => setVisible(prev => [...prev, i]), i * 90 + 50);
    });
  }, [active]);

  // Initial trigger on scroll into view
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !triggered.current) {
        triggered.current = true;
        filtered.forEach((_, i) => {
          setTimeout(() => setVisible(prev => [...prev, i]), i * 90);
        });
      }
    }, { threshold: 0.1 });
    if (gridRef.current) obs.observe(gridRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={sectRef}>
      <section style={{ paddingTop: 130 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* Header */}
          <div className="reveal" style={{ marginBottom: 64 }}>
            <span className="section-tag">// portfolio</span>
            <h1 className="section-title" style={{ fontSize: 'clamp(38px,5.5vw,68px)' }}>Our Work</h1>
            <div className="section-line" style={{ margin: '18px 0 0' }} />
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--text2)',
              lineHeight: 1.75, maxWidth: 440, marginTop: 24,
            }}>
              Handpicked case studies from our most impactful projects across industries.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 56 }}>
            {categories.map(cat => (
              <FilterBtn
                key={cat}
                label={cat}
                active={active === cat}
                onClick={() => setActive(cat)}
              />
            ))}
          </div>

          {/* Projects grid */}
          <div
            ref={gridRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))',
              gap: 26,
            }}
          >
            {filtered.map((p, i) => {
              const isVis = visible.includes(i);
              return (
                <TiltCard
                  key={`${active}-${p.id}`}
                  onClick={() => setSelected(p)}
                  style={{
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                    padding: '30px 28px',
                    backdropFilter: 'blur(14px)',
                    position: 'relative', overflow: 'hidden',
                    opacity: isVis ? 1 : 0,
                    filter: isVis ? 'blur(0px)' : 'blur(8px)',
                    transform: isVis
                      ? 'perspective(900px) rotateX(0deg) translateY(0)'
                      : 'perspective(900px) rotateX(12deg) translateY(40px)',
                  }}
                >
                  {/* Corner glow */}
                  <div style={{
                    position: 'absolute', bottom: -30, right: -30,
                    width: 110, height: 110, borderRadius: '50%',
                    background: `radial-gradient(circle, ${p.color}22 0%, transparent 70%)`,
                    transition: 'all 0.5s', pointerEvents: 'none',
                  }} />

                  {/* Featured badge */}
                  {p.featured && (
                    <div style={{
                      position: 'absolute', top: 0, right: 0,
                      fontFamily: 'var(--font-mono)', fontSize: 9,
                      letterSpacing: '2px', color: '#04060B',
                      background: 'var(--accent)', padding: '4px 10px',
                      textTransform: 'uppercase',
                    }}>Featured</div>
                  )}

                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', marginBottom: 18,
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: 10,
                      color: 'var(--text3)', letterSpacing: '2px',
                    }}>{p.year}</span>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: 10, color: p.color,
                      border: `1px solid ${p.color}44`, padding: '3px 10px',
                      textTransform: 'uppercase', letterSpacing: '1px',
                    }}>{p.category}</span>
                  </div>

                  {/* Accent bar */}
                  <div style={{
                    width: 34, height: 3, background: p.color,
                    marginBottom: 18, borderRadius: 2,
                    boxShadow: `0 0 10px ${p.color}66`,
                  }} />

                  <h3 style={{
                    fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800,
                    color: 'var(--text)', marginBottom: 10, letterSpacing: '-0.5px',
                  }}>{p.title}</h3>

                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: 14,
                    color: 'var(--text2)', lineHeight: 1.7, marginBottom: 20,
                  }}>{p.desc}</p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 24 }}>
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
                  }}>View Details <span style={{ fontSize: 15 }}>→</span></span>
                </TiltCard>
              );
            })}
          </div>

        </div>
      </section>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
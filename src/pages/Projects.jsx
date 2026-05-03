import { useState } from 'react';
import { siteData } from '../data';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const ALL = 'All';

function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Header bar */}
        <div style={{
          padding: '22px 28px',
          borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: project.color }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text3)',
              letterSpacing: '2px', textTransform: 'uppercase' }}>{project.category}</span>
          </div>
          <button onClick={onClose} style={{
            background: 'none', border: '1px solid var(--border)',
            color: 'var(--text2)', cursor: 'pointer', padding: '4px 10px',
            fontFamily: 'var(--font-mono)', fontSize: 12, borderRadius: 2,
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text2)'; }}
          >✕ Close</button>
        </div>

        {/* Content */}
        <div style={{ padding: '32px 28px' }}>
          <div style={{ width: 40, height: 3, background: project.color, marginBottom: 20, borderRadius: 2 }} />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 800,
            color: 'var(--text)', letterSpacing: '-1px', marginBottom: 8 }}>{project.title}</h2>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text3)',
            letterSpacing: '2px', textTransform: 'uppercase' }}>{project.year}</span>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text2)',
            lineHeight: 1.75, margin: '24px 0' }}>{project.longDesc}</p>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
            {project.tags.map((t) => (
              <span key={t} className="tech-badge">{t}</span>
            ))}
          </div>

          <a href={project.live} target="_blank" rel="noreferrer" className="btn-primary"
            style={{ textDecoration: 'none' }}>View Live →</a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectRef = useScrollAnimation();
  const categories = [ALL, ...Array.from(new Set(siteData.projects.map((p) => p.category)))];
  const [active, setActive] = useState(ALL);
  const [selected, setSelected] = useState(null);

  const filtered = active === ALL
    ? siteData.projects
    : siteData.projects.filter((p) => p.category === active);

  return (
    <div ref={sectRef}>
      <section style={{ paddingTop: 120 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* Header */}
          <div className="reveal" style={{ marginBottom: 60 }}>
            <span className="section-tag">// portfolio</span>
            <h1 className="section-title" style={{ fontSize: 'clamp(38px,5vw,64px)', letterSpacing: '-2px' }}>
              Our Work
            </h1>
            <div className="section-line" style={{ margin: '18px 0 0' }} />
          </div>

          {/* Filter tabs */}
          <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 48 }}>
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActive(cat)} style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase',
                padding: '8px 18px',
                background: active === cat ? 'var(--accent)' : 'var(--surface)',
                color: active === cat ? '#07090D' : 'var(--text3)',
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
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 24,
          }}>
            {filtered.map((p, i) => (
              <div key={p.id} className="card reveal" style={{
                padding: '28px 26px', cursor: 'pointer',
                animationDelay: `${i * 0.07}s`,
              }}
              onClick={() => setSelected(p)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)',
                    letterSpacing: '2px', textTransform: 'uppercase' }}>{p.year}</span>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 10,
                    color: p.color, border: `1px solid ${p.color}44`,
                    padding: '3px 10px', textTransform: 'uppercase', letterSpacing: '1px',
                    borderRadius: 2,
                  }}>{p.category}</span>
                </div>

                <div style={{ width: 32, height: 3, background: p.color, marginBottom: 18, borderRadius: 2 }} />

                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800,
                  color: 'var(--text)', marginBottom: 10, letterSpacing: '-0.5px' }}>{p.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)',
                  lineHeight: 1.65, marginBottom: 20 }}>{p.desc}</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 20 }}>
                  {p.tags.map((t) => (
                    <span key={t} style={{
                      fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)',
                      background: 'var(--surface2)', border: '1px solid var(--border)',
                      padding: '3px 8px',
                    }}>{t}</span>
                  ))}
                </div>

                <span style={{
                  fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 700,
                  color: p.color, letterSpacing: '1px', textTransform: 'uppercase',
                }}>View Details →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
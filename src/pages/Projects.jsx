import { useState, useEffect } from 'react';
import { PROJECTS } from '../data';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-color-bar" style={{ background: project.color }} />
        <h2>{project.title}</h2>
        <div className="modal-meta">
          <span className="project-category">{project.category}</span>
          <span className="project-year">{project.year}</span>
          <span className="project-result">{project.result}</span>
        </div>
        <p>{project.description}</p>
        <div className="tech-tags">
          {project.tags.map((t) => (
            <span className="tech-tag" key={t} style={{ color: project.color, borderColor: `${project.color}33` }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('All');
  useScrollAnimation();

  const categories = ['All', ...new Set(PROJECTS.map((p) => p.category))];
  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <main className="page">
      <div className="container">
        <p className="section-label animate-up">Portfolio</p>
        <h1 className="section-title animate-up">
          Work that <span className="serif">speaks</span>
        </h1>

        {/* Filter tabs */}
        <div
          className="animate-up"
          style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '2.5rem' }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                background: filter === cat ? 'var(--accent)' : 'var(--bg-1)',
                color: filter === cat ? 'var(--bg)' : 'var(--text-muted)',
                border: '1px solid',
                borderColor: filter === cat ? 'var(--accent)' : 'var(--border)',
                borderRadius: '100px',
                padding: '0.45rem 1.1rem',
                fontFamily: 'var(--ff-mono)',
                fontSize: '0.75rem',
                cursor: 'pointer',
                letterSpacing: '0.05em',
                transition: 'all 0.2s',
                fontWeight: filter === cat ? 700 : 400,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="projects-list animate-up" style={{ marginTop: '2.5rem' }}>
          {filtered.map((p, i) => (
            <div className="project-row" key={p.id} onClick={() => setSelected(p)}>
              <div>
                <span className="project-num" style={{ color: p.color }}>0{i + 1}</span>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.description.slice(0, 100)}…</p>
                <div className="project-tags-row">
                  {p.tags.slice(0, 3).map((t) => (
                    <span className="tech-tag" key={t}>{t}</span>
                  ))}
                </div>
              </div>
              <span className="project-category">{p.category}</span>
              <span className="project-result">{p.result}</span>
              <span className="project-year">{p.year}</span>
            </div>
          ))}
        </div>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </main>
  );
}
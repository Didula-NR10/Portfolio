import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { COMPANY, PROJECTS, SERVICES, TECH_STACK } from '../data';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// Marquee track (doubled for infinite loop)
const MARQUEE_ITEMS = [
  'Web Apps', 'Mobile Apps', 'POS Systems', 'UI/UX Design',
  'Cloud Infra', 'API Design', 'React', 'Flutter', 'Node.js',
  'PostgreSQL', 'AWS', 'Docker',
];

function Marquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span className="marquee-item" key={i}>{item}</span>
        ))}
      </div>
    </div>
  );
}

function FeaturedProjects() {
  const featured = PROJECTS.slice(0, 3);
  return (
    <section style={{ padding: '0 2rem 6rem' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem' }}>
          <div>
            <p className="section-label">Selected Work</p>
            <h2 className="section-title">
              Projects that <span className="serif">shipped</span>
            </h2>
          </div>
          <Link to="/projects" className="btn btn-outline" style={{ marginBottom: '0.5rem' }}>
            View All →
          </Link>
        </div>
        <div className="projects-list animate-up">
          {featured.map((p, i) => (
            <div className="project-row" key={p.id}>
              <div>
                <span className="project-num">0{i + 1}</span>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.description.slice(0, 90)}…</p>
              </div>
              <span className="project-category">{p.category}</span>
              <span className="project-result">{p.result}</span>
              <span className="project-year">{p.year}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesPreview() {
  return (
    <section style={{ padding: '0 2rem 6rem' }}>
      <div className="container">
        <p className="section-label animate-up">What We Build</p>
        <h2 className="section-title animate-up" style={{ marginBottom: '3rem' }}>
          Our <span className="serif">services</span>
        </h2>
        <div className="services-grid">
          {SERVICES.map((s) => (
            <div className="service-card animate-up" key={s.id}>
              <span className="service-icon">{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <div className="tech-tags">
                {s.tech.map((t) => <span className="tech-tag" key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechCloud() {
  const categories = [...new Set(TECH_STACK.map(t => t.category))];
  return (
    <section style={{ padding: '0 2rem 6rem' }}>
      <div className="container">
        <p className="section-label animate-up">Stack</p>
        <h2 className="section-title animate-up" style={{ marginBottom: '3rem' }}>
          Languages & <span className="serif">tools</span>
        </h2>
        <div className="tech-section">
          {categories.map(cat => (
            <div className="tech-category-group animate-up" key={cat}>
              <p className="tech-category-label">{cat}</p>
              <div className="tech-pills">
                {TECH_STACK.filter(t => t.category === cat).map(t => (
                  <span className="tech-pill" key={t.name}>{t.name}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useScrollAnimation();

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-orb" />
        <div className="hero-content container">
          <div className="hero-badge">Available for new projects · 2025</div>
          <h1 className="hero-title">
            We build<br />
            <span className="italic">digital</span><br />
            <span className="accent">products.</span>
          </h1>
          <p className="hero-sub">{COMPANY.description}</p>
          <div className="hero-actions">
            <Link to="/projects" className="btn btn-primary">See Our Work →</Link>
            <Link to="/contact" className="btn btn-outline">Start a Project</Link>
          </div>
          <div className="hero-stats">
            <div>
              <div className="hero-stat-num">{PROJECTS.length}+</div>
              <div className="hero-stat-label">Projects Shipped</div>
            </div>
            <div>
              <div className="hero-stat-num">8</div>
              <div className="hero-stat-label">Team Members</div>
            </div>
            <div>
              <div className="hero-stat-num">{new Date().getFullYear() - parseInt(COMPANY.founded)}yr</div>
              <div className="hero-stat-label">In Business</div>
            </div>
            <div>
              <div className="hero-stat-num">100%</div>
              <div className="hero-stat-label">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      <Marquee />
      <FeaturedProjects />
      <ServicesPreview />
      <TechCloud />

      {/* ─── CTA BAND ─────────────────────────────────────────── */}
      <section style={{ padding: '0 2rem 8rem' }}>
        <div className="container">
          <div
            className="animate-up"
            style={{
              background: 'linear-gradient(135deg, rgba(79,255,176,0.08), rgba(123,97,255,0.06))',
              border: '1px solid var(--border-hi)',
              borderRadius: '24px',
              padding: '5rem 4rem',
              textAlign: 'center',
            }}
          >
            <p className="section-label" style={{ justifyContent: 'center' }}>Let's Talk</p>
            <h2 style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
              Have a project in mind?
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '480px', margin: '0 auto 2.5rem' }}>
              We'd love to hear about it. Send us a message and we'll get back to you within 24 hours.
            </p>
            <Link to="/contact" className="btn btn-primary" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
              Get in Touch →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
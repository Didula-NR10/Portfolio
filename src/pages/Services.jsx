import { SERVICES, TECH_STACK } from '../data';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Services() {
  useScrollAnimation();
  const categories = [...new Set(TECH_STACK.map((t) => t.category))];

  return (
    <main className="page">
      <div className="container">
        <p className="section-label animate-up">What We Do</p>
        <h1 className="section-title animate-up" style={{ maxWidth: '560px', marginBottom: '1rem' }}>
          Services built for <span className="serif">real business</span>
        </h1>
        <p
          className="animate-up"
          style={{
            color: 'var(--text-muted)',
            fontSize: '1.05rem',
            maxWidth: '540px',
            lineHeight: '1.75',
          }}
        >
          From concept to deployment, we cover every layer of the stack — design,
          development, and delivery.
        </p>

        <div className="services-grid" style={{ marginTop: '4rem' }}>
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

        {/* Process section */}
        <div style={{ marginTop: '7rem' }}>
          <p className="section-label animate-up">How We Work</p>
          <h2 className="section-title animate-up" style={{ marginBottom: '3rem' }}>
            Our <span className="serif">process</span>
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {[
              { num: '01', title: 'Discovery', desc: 'We listen before we build. Deep dive into your goals, users, and constraints.' },
              { num: '02', title: 'Design', desc: 'Wireframes and high-fidelity prototypes before a single line of code is written.' },
              { num: '03', title: 'Build', desc: 'Sprint-based development with weekly demos and continuous feedback loops.' },
              { num: '04', title: 'Ship', desc: 'CI/CD pipelines, thorough QA, and post-launch monitoring baked in.' },
            ].map((step) => (
              <div
                key={step.num}
                className="animate-up"
                style={{
                  background: 'var(--bg-1)',
                  border: '1px solid var(--border)',
                  borderRadius: '16px',
                  padding: '2.5rem 2rem',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--ff-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--accent)',
                    letterSpacing: '0.1em',
                    marginBottom: '1.25rem',
                    display: 'block',
                  }}
                >
                  {step.num}
                </span>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem' }}>{step.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.65' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div style={{ marginTop: '7rem' }}>
          <p className="section-label animate-up">Technologies</p>
          <h2 className="section-title animate-up" style={{ marginBottom: '3rem' }}>
            Our <span className="serif">tech stack</span>
          </h2>
          <div className="tech-section">
            {categories.map((cat) => (
              <div className="tech-category-group animate-up" key={cat}>
                <p className="tech-category-label">{cat}</p>
                <div className="tech-pills">
                  {TECH_STACK.filter((t) => t.category === cat).map((t) => (
                    <span className="tech-pill" key={t.name}>{t.name}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
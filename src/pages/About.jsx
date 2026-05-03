import { COMPANY, TEAM } from '../data';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const VALUES = [
  {
    num: '01',
    title: 'Craft over speed',
    desc: "We'd rather take the extra day than ship something we're not proud of.",
  },
  {
    num: '02',
    title: 'Radical transparency',
    desc: 'No surprises. Weekly updates, honest timelines, and open codebases.',
  },
  {
    num: '03',
    title: 'Outcomes, not output',
    desc: 'We measure success by your metrics, not lines of code or tickets closed.',
  },
  {
    num: '04',
    title: 'Small team, big impact',
    desc: 'Being 8 people is a feature, not a bug. You get senior talent on every project.',
  },
  {
    num: '05',
    title: 'Long-term thinking',
    desc: 'We build for maintainability, not demos. Your codebase is still yours in 5 years.',
  },
  {
    num: '06',
    title: 'Continuous learning',
    desc: 'The stack evolves. So do we — dedicated 20% time for R&D every sprint.',
  },
];

// Subtle gradient per team member
const GRADIENTS = [
  'linear-gradient(135deg, #4FFFB0, #00B4D8)',
  'linear-gradient(135deg, #7B61FF, #FF6B35)',
  'linear-gradient(135deg, #FF3D71, #FF6B35)',
  'linear-gradient(135deg, #00D4AA, #7B61FF)',
  'linear-gradient(135deg, #FFD60A, #FF6B35)',
  'linear-gradient(135deg, #4FFFB0, #7B61FF)',
  'linear-gradient(135deg, #FF6B35, #FF3D71)',
  'linear-gradient(135deg, #00B4D8, #4FFFB0)',
];

export default function About() {
  useScrollAnimation();

  return (
    <main className="page">
      <div className="container">
        {/* ─── Hero copy ─────────────────────────────────────────── */}
        <div className="about-hero animate-up">
          <div>
            <p className="section-label">Who We Are</p>
            <h1 className="about-big-text">
              A studio that<br />
              <span className="serif">loves what</span><br />
              it makes.
            </h1>
          </div>
          <div className="about-right">
            <p>
              Founded in {COMPANY.founded}, {COMPANY.name} started as a two-person freelance
              shop and grew into a focused team of 8 specialists who've shipped products used
              by tens of thousands of people.
            </p>
            <p>
              We're not an agency that hands you off to juniors. Every project is led by a
              senior engineer and a designer who care deeply about the outcome.
            </p>
            <p>
              We keep the team deliberately small — tight communication, zero bureaucracy,
              and direct access to everyone who's building your product.
            </p>
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {Object.entries(COMPANY.socials).map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: 'var(--bg-1)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    padding: '0.5rem 1rem',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--ff-mono)',
                    color: 'var(--text-muted)',
                    textTransform: 'capitalize',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent)';
                    e.currentTarget.style.color = 'var(--accent)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.color = 'var(--text-muted)';
                  }}
                >
                  ↗ {name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Values ────────────────────────────────────────────── */}
        <div style={{ marginBottom: '2rem' }} className="animate-up">
          <p className="section-label">What Drives Us</p>
          <h2 className="section-title" style={{ marginBottom: '2.5rem' }}>
            Our <span className="serif">values</span>
          </h2>
        </div>
        <div className="about-values animate-up">
          {VALUES.map((v) => (
            <div className="value-card" key={v.num}>
              <p className="value-num">{v.num}</p>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>

        {/* ─── Team ──────────────────────────────────────────────── */}
        <p className="section-label animate-up">The People</p>
        <h2 className="section-title animate-up" style={{ marginBottom: '0.5rem' }}>
          Meet the <span className="serif">team</span>
        </h2>
        <p
          className="animate-up"
          style={{
            color: 'var(--text-muted)',
            marginBottom: '1rem',
            fontSize: '0.9rem',
            fontFamily: 'var(--ff-mono)',
          }}
        >
          {TEAM.length} people. No hierarchy. All builders.
        </p>
        <div className="team-grid">
          {TEAM.map((member, i) => (
            <div className="team-card animate-up" key={member.name}>
              <div
                className="team-avatar"
                style={{ background: GRADIENTS[i % GRADIENTS.length] }}
              >
                {member.avatar}
              </div>
              <p className="team-name">{member.name}</p>
              <p className="team-role">{member.role}</p>
            </div>
          ))}
        </div>

        {/* ─── Founded strip ──────────────────────────────────────── */}
        <div
          className="animate-up"
          style={{
            marginTop: '6rem',
            padding: '3rem',
            background: 'var(--bg-1)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            display: 'flex',
            gap: '4rem',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {[
            { label: 'Founded', value: COMPANY.founded },
            { label: 'Team size', value: '8' },
            { label: 'Projects shipped', value: '30+' },
            { label: 'Countries served', value: '12' },
          ].map((stat) => (
            <div key={stat.label}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1 }}>
                {stat.value}
              </div>
              <div style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
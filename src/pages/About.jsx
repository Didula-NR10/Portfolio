import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { siteData } from '../data';
import { useState, useEffect } from 'react';

// ────────────────────────────────────────────────
// GLASS CARD — Apple iOS-style glassmorphism
// ────────────────────────────────────────────────
const glass = {
  background: 'rgba(255, 255, 255, 0.055)',
  backdropFilter: 'blur(28px) saturate(180%)',
  WebkitBackdropFilter: 'blur(28px) saturate(180%)',
  border: '1px solid rgba(255, 255, 255, 0.13)',
  borderRadius: 20,
  boxShadow: '0 8px 32px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.12)',
};

// Hover upgrade — call onMouseEnter/Leave with these
const glassHover = {
  background: 'rgba(255, 255, 255, 0.09)',
  borderColor: 'rgba(255,255,255,0.22)',
  boxShadow: '0 12px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.1)',
};

// ────────────────────────────────────────────────
// HERO RIGHT PANEL — animated stat + editorial block
// ────────────────────────────────────────────────
function HeroVisual() {
  const stats = [
    { value: '50+', label: 'Projects Shipped' },
    { value: '30+', label: 'Clients Served' },
    { value: '98%', label: 'Satisfaction Rate' },
    { value: '5+',  label: 'Years of Craft'  },
  ];

  return (
    <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}>

      {/* Top decorative line */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8,
        fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text2)',
        letterSpacing: '3px', textTransform: 'uppercase', opacity: 0.5,
      }}>
        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        gen·o·studio
        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            ...glass,
            padding: '28px 24px',
            position: 'relative',
            overflow: 'hidden',
            animation: `revealUp 0.6s ease forwards`,
            animationDelay: `${0.1 + i * 0.1}s`,
            opacity: 0,
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => Object.assign(e.currentTarget.style, { background: glassHover.background, borderColor: glassHover.borderColor, boxShadow: glassHover.boxShadow })}
          onMouseLeave={e => Object.assign(e.currentTarget.style, { background: glass.background, borderColor: 'rgba(255,255,255,0.13)', boxShadow: glass.boxShadow })}
          >
            {/* Accent corner */}
            <div style={{
              position: 'absolute', top: 0, left: 0,
              width: 3, height: '100%',
              background: 'linear-gradient(to bottom, var(--accent), transparent)',
              opacity: 0.4,
            }} />
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3vw,38px)',
              fontWeight: 900, color: 'var(--accent)',
              lineHeight: 1, marginBottom: 6,
              textShadow: '0 0 20px var(--accent)',
            }}>{s.value}</div>
            <div style={{
              fontFamily: 'var(--font-body)', fontSize: 12,
              color: 'var(--text2)', letterSpacing: '1px',
              textTransform: 'uppercase',
            }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Bottom quote strip */}
      <div style={{
        ...glass,
        marginTop: 4,
        padding: '20px 24px',
        borderLeft: '3px solid var(--accent)',
        borderRadius: 16,
        animation: 'revealUp 0.6s ease forwards',
        animationDelay: '0.5s',
        opacity: 0,
      }}>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 13, fontStyle: 'italic',
          color: 'var(--text2)', lineHeight: 1.7, margin: 0,
        }}>
          "We don't just write code — we translate vision into experiences that people remember."
        </p>
        <div style={{
          marginTop: 10,
          fontFamily: 'var(--font-body)', fontSize: 11,
          color: 'var(--accent)', letterSpacing: '2px', textTransform: 'uppercase',
        }}>— The Gen O Team</div>
      </div>

      <style>{`
        @keyframes revealUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ────────────────────────────────────────────────
// STORY LEFT PANEL — Studio Timeline / Milestones
// ────────────────────────────────────────────────
function StudioTimeline() {
  const milestones = [
    { year: '2019', title: 'Founded in Colombo', desc: 'Three engineers, one shared frustration, and a relentless belief in craft.' },
    { year: '2020', title: 'First Enterprise Client', desc: 'Scaled from startups to enterprise — delivering under real pressure.' },
    { year: '2022', title: 'Full-Stack Studio', desc: 'Grew into a complete team: design, frontend, backend, and cloud.' },
    { year: '2024', title: 'South Asia & Beyond', desc: 'Partnering with clients across borders. Still obsessed with quality.' },
  ];

  return (
    <div style={{ position: 'relative', paddingLeft: 32 }}>
      {/* Vertical timeline rail */}
      <div style={{
        position: 'absolute', left: 0, top: 8, bottom: 8,
        width: 2,
        background: 'linear-gradient(to bottom, transparent, var(--accent), transparent)',
        opacity: 0.35,
      }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
        {milestones.map((m, i) => (
          <div key={i} style={{
            position: 'relative',
            animation: 'revealUp 0.5s ease forwards',
            animationDelay: `${i * 0.12}s`,
            opacity: 0,
          }}>
            {/* Timeline dot */}
            <div style={{
              position: 'absolute', left: -37, top: 6,
              width: 10, height: 10, borderRadius: '50%',
              background: 'var(--accent)',
              boxShadow: '0 0 10px var(--accent)',
              border: '2px solid var(--bg2)',
            }} />

            {/* Year badge */}
            <div style={{
              fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700,
              color: 'var(--accent)', letterSpacing: '2px',
              textTransform: 'uppercase', marginBottom: 6,
            }}>{m.year}</div>

            {/* Title */}
            <h4 style={{
              fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 800,
              color: 'var(--text)', margin: '0 0 6px',
            }}>{m.title}</h4>

            {/* Desc */}
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 13,
              color: 'var(--text2)', lineHeight: 1.65, margin: 0,
            }}>{m.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// TECH STACK — Glassy category cards with animated bars
// ────────────────────────────────────────────────
const TECH_CATEGORIES = [
  {
    category: 'Frontend',
    color: '#6ee7f7',
    techs: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
  },
  {
    category: 'Backend',
    color: '#a78bfa',
    techs: ['Node.js', 'Python', 'GraphQL', 'REST APIs'],
  },
  {
    category: 'Data & Cloud',
    color: '#34d399',
    techs: ['PostgreSQL', 'MongoDB', 'AWS', 'Docker'],
  },
  {
    category: 'Design & Tools',
    color: '#fb923c',
    techs: ['Figma', 'Framer', 'Git / CI', 'Storybook'],
  },
];

function TechStackGrid() {
  const [hovered, setHovered] = useState(null);

  return (
    <>
      <style>{`
        .tech-card-hover {
          transition: transform 0.35s cubic-bezier(.22,.68,0,1.2),
                      box-shadow 0.35s ease,
                      border-color 0.35s ease,
                      background 0.35s ease;
        }
        .tech-pill {
          transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
        }
      `}</style>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 20,
      }}>
        {TECH_CATEGORIES.map((cat, ci) => {
          const isHov = hovered === ci;
          return (
            <div
              key={ci}
              className="tech-card-hover reveal"
              style={{
                ...glass,
                padding: '28px 26px 26px',
                borderRadius: 22,
                animationDelay: `${ci * 0.1}s`,
                cursor: 'default',
                ...(isHov ? {
                  background: 'rgba(255,255,255,0.09)',
                  borderColor: `${cat.color}55`,
                  boxShadow: `0 20px 60px rgba(0,0,0,0.35), 0 0 0 1px ${cat.color}33, inset 0 1px 0 rgba(255,255,255,0.18)`,
                  transform: 'translateY(-6px) scale(1.015)',
                } : {}),
              }}
              onMouseEnter={() => setHovered(ci)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Category header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: cat.color,
                  boxShadow: isHov ? `0 0 18px ${cat.color}` : `0 0 10px ${cat.color}`,
                  flexShrink: 0,
                  transition: 'box-shadow 0.3s ease',
                }} />
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '2.5px',
                  textTransform: 'uppercase',
                  color: cat.color,
                  opacity: 0.9,
                }}>{cat.category}</span>
              </div>

              {/* Tech pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {cat.techs.map((tech, ti) => (
                  <span
                    key={ti}
                    className="tech-pill"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: '0.3px',
                      padding: '6px 14px',
                      borderRadius: 99,
                      border: `1px solid ${isHov ? cat.color + '55' : 'rgba(255,255,255,0.1)'}`,
                      background: isHov ? `${cat.color}12` : 'rgba(255,255,255,0.04)',
                      color: isHov ? cat.color : 'var(--text2)',
                    }}
                  >{tech}</span>
                ))}
              </div>

              {/* Bottom accent */}
              <div style={{
                marginTop: 22,
                height: 1,
                borderRadius: 99,
                background: `linear-gradient(90deg, ${cat.color}55, transparent)`,
                opacity: isHov ? 1 : 0.3,
                transition: 'opacity 0.3s',
              }} />
            </div>
          );
        })}
      </div>
    </>
  );
}

// ────────────────────────────────────────────────
// SVG Icons
// ────────────────────────────────────────────────
const PartnerIcons = {
  speed: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  ),
  collab: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  target: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  lock: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
};

// ────────────────────────────────────────────────
// PAGE
// ────────────────────────────────────────────────
export default function About() {
  const sectRef = useScrollAnimation();

  return (
    <div ref={sectRef}>

      {/* ── HERO ── */}
      <section style={{ paddingTop: 140, paddingBottom: 80 }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 80, alignItems: 'flex-start',
        }}>
          {/* Left: headline */}
          <div className="reveal">
            <span className="section-tag">// who we are</span>
            <h1 className="section-title" style={{
              fontSize: 'clamp(38px,5vw,64px)', letterSpacing: '-2px',
            }}>
              Built by Builders,<br/>for Builders
            </h1>
            <div className="section-line" style={{ margin: '18px 0 24px' }} />
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 15,
              color: 'var(--text2)', lineHeight: 1.8, maxWidth: 440,
            }}>
              We are Gen O — a full-stack digital studio born in Colombo, obsessed with
              craft, and driven to close the gap between bold ideas and flawless execution.
            </p>
          </div>

          {/* Right: animated stats + quote */}
          <div className="reveal" style={{ animationDelay: '0.2s' }}>
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* ── VISION & MISSION ── */}
      <section>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
            <span className="section-tag">// purpose &amp; direction</span>
            <h2 className="section-title">Vision &amp; Mission</h2>
            <div className="section-line" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>

            {/* Vision */}
            <div className="reveal" style={{ ...glass, padding: '48px 40px', position: 'relative', overflow: 'hidden', transition: 'all 0.3s ease' }}
              onMouseEnter={e => Object.assign(e.currentTarget.style, { background: glassHover.background, borderColor: glassHover.borderColor, boxShadow: glassHover.boxShadow })}
              onMouseLeave={e => Object.assign(e.currentTarget.style, { background: glass.background, borderColor: 'rgba(255,255,255,0.13)', boxShadow: glass.boxShadow })}
            >
              <div style={{
                position: 'absolute', bottom: -20, right: 12,
                fontFamily: 'var(--font-display)', fontSize: 160, fontWeight: 900,
                color: 'var(--border)', opacity: 0.07, lineHeight: 1,
                pointerEvents: 'none', userSelect: 'none',
              }}>V</div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 28 }}>
                <div style={{ width: 3, height: 52, background: 'var(--accent)', borderRadius: 2, flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div style={{
                    fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700,
                    color: 'var(--accent)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 6,
                  }}>Our Vision</div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,2.2vw,26px)',
                    fontWeight: 900, color: 'var(--text)', lineHeight: 1.25, margin: 0,
                  }}>Shape the Digital<br/>Future of South Asia</h3>
                </div>
              </div>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: 15,
                color: 'var(--text2)', lineHeight: 1.85, position: 'relative', zIndex: 1, margin: 0,
              }}>
                To become the most trusted technology studio in South Asia — a place where
                ambitious ideas meet rigorous craft. We envision a future where every great
                business, regardless of size or geography, has access to world-class digital execution.
              </p>
              <div style={{
                position: 'absolute', top: 20, right: 20, width: 36, height: 36,
                borderTop: '1.5px solid var(--accent)', borderRight: '1.5px solid var(--accent)', opacity: 0.25,
              }} />
            </div>

            {/* Mission */}
            <div className="reveal" style={{ ...glass, padding: '48px 40px', position: 'relative', overflow: 'hidden', animationDelay: '0.15s', transition: 'all 0.3s ease' }}
              onMouseEnter={e => Object.assign(e.currentTarget.style, { background: glassHover.background, borderColor: glassHover.borderColor, boxShadow: glassHover.boxShadow })}
              onMouseLeave={e => Object.assign(e.currentTarget.style, { background: glass.background, borderColor: 'rgba(255,255,255,0.13)', boxShadow: glass.boxShadow })}
            >
              <div style={{
                position: 'absolute', bottom: -20, right: 12,
                fontFamily: 'var(--font-display)', fontSize: 160, fontWeight: 900,
                color: 'var(--border)', opacity: 0.07, lineHeight: 1,
                pointerEvents: 'none', userSelect: 'none',
              }}>M</div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 28 }}>
                <div style={{ width: 3, height: 52, background: 'var(--accent)', borderRadius: 2, flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div style={{
                    fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700,
                    color: 'var(--accent)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 6,
                  }}>Our Mission</div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,2.2vw,26px)',
                    fontWeight: 900, color: 'var(--text)', lineHeight: 1.25, margin: 0,
                  }}>Deliver Craft That<br/>Moves Businesses</h3>
                </div>
              </div>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: 15,
                color: 'var(--text2)', lineHeight: 1.85, position: 'relative', zIndex: 1, margin: 0,
              }}>
                To bridge the gap between great ideas and great execution. We partner deeply with
                founders, teams, and enterprises — bringing design precision, engineering rigour,
                and a relentless focus on outcomes that actually move the needle.
              </p>
              <div style={{
                position: 'absolute', top: 20, right: 20, width: 36, height: 36,
                borderTop: '1.5px solid var(--accent)', borderRight: '1.5px solid var(--accent)', opacity: 0.25,
              }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── STORY ── */}
      <section style={{ background: 'var(--bg2)', transition: 'background var(--transition)' }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center',
        }}>

          {/* Left: Studio Timeline */}
          <div className="reveal-left">
            <div style={{ marginBottom: 28 }}>
              <span className="section-tag">// where we started</span>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(18px,2vw,24px)',
                fontWeight: 900, color: 'var(--text)', marginTop: 10, marginBottom: 0,
              }}>The Road That Built Us</h3>
              <div style={{ width: 40, height: 2, background: 'var(--accent)', borderRadius: 2, marginTop: 14 }} />
            </div>
            <StudioTimeline />
          </div>

          {/* Right: Story text */}
          <div>
            <div className="reveal" style={{ marginBottom: 32 }}>
              <span className="section-tag">// our story</span>
              <h2 className="section-title" style={{ fontSize: 'clamp(26px,3vw,40px)', textAlign: 'left' }}>
                The Gen O Story
              </h2>
              <div className="section-line" style={{ margin: '18px 0 0' }} />
            </div>
            <p className="reveal" style={{
              fontFamily: 'var(--font-body)', fontSize: 15,
              color: 'var(--text2)', lineHeight: 1.8, marginBottom: 20,
            }}>
              Gen O was born in Colombo out of a simple frustration: great ideas were dying
              because talented teams lacked the technical execution to bring them to life.
            </p>
            <p className="reveal" style={{
              fontFamily: 'var(--font-body)', fontSize: 15,
              color: 'var(--text2)', lineHeight: 1.8, marginBottom: 32,
            }}>
              We started as a small team of engineers obsessed with craft. Today we're a
              full-stack studio — design, development, and delivery — partnering with
              startups, agencies, and enterprises across South Asia and beyond.
            </p>
            <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                'Full-stack team: design, frontend, backend, cloud',
                'Agile delivery with weekly client check-ins',
                'Post-launch support included in every project',
                'Sri Lanka-based, globally competitive',
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 12,
                  fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)',
                }}>
                  <span style={{ color: 'var(--accent)', marginTop: 2, flexShrink: 0 }}>▹</span>
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
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
            <span className="section-tag">// what drives us</span>
            <h2 className="section-title">Our Values</h2>
            <div className="section-line" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {siteData.values.map((v, i) => (
              <div key={i} className="reveal" style={{ ...glass, padding: '32px 28px', animationDelay: `${i * 0.1}s`, transition: 'all 0.3s ease' }}
                onMouseEnter={e => Object.assign(e.currentTarget.style, { background: glassHover.background, borderColor: glassHover.borderColor, boxShadow: glassHover.boxShadow })}
                onMouseLeave={e => Object.assign(e.currentTarget.style, { background: glass.background, borderColor: 'rgba(255,255,255,0.13)', boxShadow: glass.boxShadow })}
              >
                <div style={{ width: 32, height: 3, background: 'var(--accent)', marginBottom: 22, borderRadius: 2 }} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800,
                  color: 'var(--text)', marginBottom: 12 }}>{v.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)',
                  lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section style={{ background: 'var(--bg2)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
            <span className="section-tag">// the people</span>
            <h2 className="section-title">Meet the Team</h2>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 15,
              color: 'var(--text2)', lineHeight: 1.7,
              maxWidth: 440, margin: '16px auto 0',
            }}>
              The minds behind the craft — passionate, precise, and always shipping.
            </p>
            <div className="section-line" style={{ marginTop: 24 }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 22 }}>
            {siteData.team.map((m, i) => (
              <div
                key={i}
                className="reveal"
                style={{
                  ...glass,
                  borderRadius: 24,
                  overflow: 'hidden',
                  animationDelay: `${i * 0.1}s`,
                  transition: 'transform 0.35s cubic-bezier(.22,.68,0,1.2), box-shadow 0.35s ease, border-color 0.35s ease, background 0.35s ease',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                  e.currentTarget.style.background = glassHover.background;
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.24)';
                  e.currentTarget.style.boxShadow = '0 24px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.background = glass.background;
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.13)';
                  e.currentTarget.style.boxShadow = glass.boxShadow;
                }}
              >
                {/* Photo area */}
                <div style={{
                  width: '100%',
                  aspectRatio: '1 / 1',
                  background: 'rgba(255,255,255,0.04)',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {m.image ? (
                    <img
                      src={m.image}
                      alt={m.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  ) : (
                    /* Fallback initials avatar */
                    <div style={{
                      width: '100%', height: '100%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                    }}>
                      <span style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 52, fontWeight: 900,
                        color: 'var(--accent)',
                        opacity: 0.6,
                        letterSpacing: '-2px',
                        textShadow: '0 0 40px var(--accent)',
                      }}>{m.initials}</span>
                    </div>
                  )}
                  {/* Gradient overlay at bottom of photo */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    height: '40%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent)',
                    pointerEvents: 'none',
                  }} />
                </div>

                {/* Info block */}
                <div style={{ padding: '20px 22px 22px' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 800,
                    color: 'var(--text)', marginBottom: 3, letterSpacing: '-0.3px',
                  }}>{m.name}</h3>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700,
                    color: 'var(--accent)', letterSpacing: '2px',
                    textTransform: 'uppercase', marginBottom: 12,
                  }}>{m.role}</p>

                  {/* Languages / tech pills */}
                  {m.languages && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                      {m.languages.map((lang, li) => (
                        <span key={li} style={{
                          fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 600,
                          letterSpacing: '0.4px',
                          padding: '4px 10px', borderRadius: 99,
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: 'var(--text2)',
                        }}>{lang}</span>
                      ))}
                    </div>
                  )}

                  {/* Divider */}
                  <div style={{
                    height: 1, background: 'rgba(255,255,255,0.07)',
                    marginBottom: 14, borderRadius: 99,
                  }} />

                  {/* LinkedIn link */}
                  <a
                    href={m.linkedin || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 7,
                      fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600,
                      color: 'var(--text2)',
                      textDecoration: 'none',
                      letterSpacing: '0.3px',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--text2)'; }}
                  >
                    {/* LinkedIn icon */}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect x="2" y="9" width="4" height="12"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
            <span className="section-tag">// how we work</span>
            <h2 className="section-title">Our Process</h2>
            <div className="section-line" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {[
              { step: '01', title: 'Discovery', desc: 'Deep dive into your goals, users, and technical requirements' },
              { step: '02', title: 'Design', desc: 'Wireframes, prototypes, and visual design that users love' },
              { step: '03', title: 'Development', desc: 'Clean code, tested features, regular updates' },
              { step: '04', title: 'Launch & Support', desc: 'Smooth deployment and ongoing maintenance' },
            ].map((phase, i) => (
              <div key={i} className="reveal" style={{ ...glass, padding: '28px 24px', position: 'relative',
                overflow: 'hidden', animationDelay: `${i * 0.1}s`, transition: 'all 0.3s ease' }}
                onMouseEnter={e => Object.assign(e.currentTarget.style, { background: glassHover.background, borderColor: glassHover.borderColor, boxShadow: glassHover.boxShadow })}
                onMouseLeave={e => Object.assign(e.currentTarget.style, { background: glass.background, borderColor: 'rgba(255,255,255,0.13)', boxShadow: glass.boxShadow })}
              >
                <div style={{ position: 'absolute', top: 16, right: 16, fontFamily: 'var(--font-display)',
                  fontSize: 48, fontWeight: 900, color: 'var(--border)', opacity: 0.3 }}>{phase.step}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800,
                  color: 'var(--text)', marginBottom: 12, position: 'relative', zIndex: 1 }}>{phase.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)',
                  lineHeight: 1.7, position: 'relative', zIndex: 1 }}>{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section style={{ background: 'var(--bg2)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
            <span className="section-tag">// our toolkit</span>
            <h2 className="section-title">Technologies We Master</h2>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 15,
              color: 'var(--text2)', lineHeight: 1.7,
              maxWidth: 480, margin: '16px auto 0',
            }}>
              Every tool chosen with intent — battle-tested across real projects,
              not just listed on a resume.
            </p>
            <div className="section-line" style={{ marginTop: 24 }} />
          </div>
          <div className="reveal">
            <TechStackGrid />
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
            <span className="section-tag">// who we serve</span>
            <h2 className="section-title">Industries We've Worked With</h2>
            <div className="section-line" />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            {['E-commerce', 'FinTech', 'HealthTech', 'Education', 'Real Estate', 'Hospitality',
              'Logistics', 'Media & Entertainment'].map((industry, i) => (
              <div key={i} className="reveal" style={{
                ...glass,
                padding: '12px 24px', borderRadius: 50,
                fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)',
                transition: 'all 0.3s ease', animationDelay: `${i * 0.05}s`,
              }}
              onMouseEnter={e => Object.assign(e.currentTarget.style, { background: glassHover.background, borderColor: glassHover.borderColor, boxShadow: glassHover.boxShadow, color: 'var(--text)' })}
              onMouseLeave={e => Object.assign(e.currentTarget.style, { background: glass.background, borderColor: 'rgba(255,255,255,0.13)', boxShadow: glass.boxShadow, color: 'var(--text2)' })}>
                {industry}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section style={{ background: 'var(--bg2)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
            <span className="section-tag">// competitive edge</span>
            <h2 className="section-title">Why Partner With Us</h2>
            <div className="section-line" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {[
              { icon: PartnerIcons.speed, title: 'Speed Without Compromise', desc: 'We move fast but never cut corners on quality or security' },
              { icon: PartnerIcons.collab, title: 'True Collaboration', desc: "You're not just a client — you're a partner in the process" },
              { icon: PartnerIcons.target, title: 'Business-First Thinking', desc: 'Beautiful code that actually solves real business problems' },
              { icon: PartnerIcons.lock, title: 'Long-Term Partnership', desc: "We're here after launch — scaling and evolving with you" },
            ].map((item, i) => (
              <div key={i} className="reveal" style={{
                ...glass,
                padding: '28px 32px', display: 'flex', gap: 24, alignItems: 'flex-start',
                animationDelay: `${i * 0.1}s`, transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => Object.assign(e.currentTarget.style, { background: glassHover.background, borderColor: glassHover.borderColor, boxShadow: glassHover.boxShadow })}
              onMouseLeave={e => Object.assign(e.currentTarget.style, { background: glass.background, borderColor: 'rgba(255,255,255,0.13)', boxShadow: glass.boxShadow })}>
                <div style={{
                  ...glass,
                  flexShrink: 0, width: 44, height: 44,
                  borderRadius: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.3s',
                }}>
                  {item.icon}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800,
                    color: 'var(--text)', marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)',
                    lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
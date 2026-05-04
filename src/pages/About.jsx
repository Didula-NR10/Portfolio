import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { siteData } from '../data';
import { useState, useEffect, useRef } from 'react';

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
          <div key={i} className="card" style={{
            padding: '28px 24px',
            position: 'relative',
            overflow: 'hidden',
            animation: `revealUp 0.6s ease forwards`,
            animationDelay: `${0.1 + i * 0.1}s`,
            opacity: 0,
          }}>
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
        marginTop: 4,
        padding: '20px 24px',
        border: '1px solid var(--border)',
        borderLeft: '3px solid var(--accent)',
        background: 'var(--surface)',
        borderRadius: 6,
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
// DIAMOND TECH GRID — pyramid top-to-bottom, slow sequential glow
// Row sizes computed dynamically: starts wide, decreases by 1
// e.g. 12 items → 5, 4, 3 = 12  |  15 items → 6, 5, 4 = 15
// ────────────────────────────────────────────────
const TECHS = [
  'React', 'Next.js', 'Node.js', 'Python',
  'AWS', 'Docker', 'PostgreSQL', 'MongoDB',
  'Figma', 'TypeScript', 'Tailwind', 'GraphQL',
];

function buildPyramidRows(items) {
  // Find the starting row count so that sum of decreasing rows >= items
  // Rows: n, n-1, n-2, ... until we've placed all items (top-heavy pyramid)
  const total = items.length;
  // Find n such that sum from n down to some k covers total
  // We want widest row first (pyramid pointing down)
  let n = 1;
  while ((n * (n + 1)) / 2 < total) n++;
  // n is now the max row count needed for a perfect triangle
  // But we want the widest row at top — so rows go n, n-1, n-2, ...
  const rows = [];
  let placed = 0;
  let rowSize = n;
  while (placed < total) {
    const take = Math.min(rowSize, total - placed);
    if (take > 0) rows.push(items.slice(placed, placed + take));
    placed += take;
    rowSize--;
    if (rowSize < 1) break;
  }
  return rows;
}

function DiamondTechGrid() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    // Each cycle: active for 1.2s, then fade 0.6s, then advance
    const advance = () => {
      setFadingOut(true);
      setTimeout(() => {
        setActiveIdx(prev => (prev + 1) % TECHS.length);
        setFadingOut(false);
      }, 600);
    };
    const interval = setInterval(advance, 1800);
    return () => clearInterval(interval);
  }, []);

  const rows = buildPyramidRows(TECHS);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      {rows.map((row, rowIdx) => (
        <div key={rowIdx} style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          {row.map((tech) => {
            const techIdx = TECHS.indexOf(tech);
            const isActive = techIdx === activeIdx;

            return (
              <div key={tech} style={{ position: 'relative', width: 100, height: 100 }}>
                {/* Glow halo — outside clip so it bleeds */}
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    inset: -8,
                    clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                    background: 'var(--accent)',
                    opacity: fadingOut ? 0 : 0.12,
                    transition: 'opacity 0.6s ease',
                    filter: 'blur(6px)',
                    pointerEvents: 'none',
                    zIndex: 0,
                  }} />
                )}

                {/* Border layer */}
                <div style={{
                  position: 'absolute', inset: 0,
                  clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                  background: isActive
                    ? (fadingOut ? 'var(--border)' : 'var(--accent)')
                    : 'var(--border)',
                  opacity: isActive ? (fadingOut ? 0.2 : 0.55) : 0.2,
                  transition: 'background 0.6s ease, opacity 0.6s ease',
                  zIndex: 1,
                }} />

                {/* Fill layer */}
                <div style={{
                  position: 'absolute', inset: 2,
                  clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                  background: isActive
                    ? (fadingOut ? 'var(--surface)' : 'var(--glow2, rgba(99,102,241,0.12))')
                    : 'var(--surface)',
                  transition: 'background 0.6s ease',
                  zIndex: 2,
                }} />

                {/* Label */}
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  zIndex: 3,
                }}>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.3px',
                    textAlign: 'center',
                    color: isActive
                      ? (fadingOut ? 'var(--text2)' : 'var(--accent)')
                      : 'var(--text2)',
                    transition: 'color 0.6s ease, text-shadow 0.6s ease',
                    textShadow: isActive && !fadingOut ? '0 0 10px var(--accent)' : 'none',
                    maxWidth: 64,
                    lineHeight: 1.3,
                    display: 'block',
                  }}>
                    {tech}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
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
            <div className="card reveal" style={{ padding: '48px 40px', position: 'relative', overflow: 'hidden' }}>
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
            <div className="card reveal" style={{ padding: '48px 40px', position: 'relative', overflow: 'hidden', animationDelay: '0.15s' }}>
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
              We started as a small team of engineers obsessed with craft. Today we&apos;re a
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
              <div key={i} className="card reveal" style={{ padding: '32px 28px', animationDelay: `${i * 0.1}s` }}>
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

      {/* ── METRICS ── */}
      <section style={{ background: 'var(--bg2)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40 }}>
            {[
              { number: '50+', label: 'Projects Delivered' },
              { number: '30+', label: 'Happy Clients' },
              { number: '5+',  label: 'Years Experience' },
              { number: '98%', label: 'Client Satisfaction' },
            ].map((stat, i) => (
              <div key={i} className="reveal" style={{ textAlign: 'center', animationDelay: `${i * 0.1}s` }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,4vw,52px)',
                  fontWeight: 900, color: 'var(--accent)', marginBottom: 8 }}>{stat.number}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)',
                  textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</div>
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
              <div key={i} className="card reveal" style={{ padding: '28px 24px', position: 'relative',
                overflow: 'hidden', animationDelay: `${i * 0.1}s` }}>
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

      {/* ── TECH STACK — Pyramid Diamond Grid ── */}
      <section style={{ background: 'var(--bg2)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
            <span className="section-tag">// our toolkit</span>
            <h2 className="section-title">Technologies We Master</h2>
            <div className="section-line" />
          </div>
          <div className="reveal">
            <DiamondTechGrid />
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
            <span className="section-tag">// who we serve</span>
            <h2 className="section-title">Industries We&apos;ve Worked With</h2>
            <div className="section-line" />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            {['E-commerce', 'FinTech', 'HealthTech', 'Education', 'Real Estate', 'Hospitality',
              'Logistics', 'Media & Entertainment'].map((industry, i) => (
              <div key={i} className="reveal" style={{
                padding: '12px 24px', border: '1px solid var(--border)', borderRadius: 6,
                fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)',
                background: 'var(--surface)', transition: 'all 0.3s', animationDelay: `${i * 0.05}s`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.background = 'var(--glow2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.background = 'var(--surface)';
              }}>
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
              <div key={i} className="card reveal" style={{
                padding: '28px 32px', display: 'flex', gap: 24, alignItems: 'flex-start',
                animationDelay: `${i * 0.1}s`, transition: 'border-color 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}>
                <div style={{
                  flexShrink: 0, width: 44, height: 44,
                  border: '1px solid var(--border)', borderRadius: 8,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'var(--glow)', transition: 'all 0.3s',
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
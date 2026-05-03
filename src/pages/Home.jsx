import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { siteData } from '../data';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// ඔයාගේ 3D Robot පින්තූරෙ 
import robotImg from '../assets/robot.jpg'; 

// ─── Minimal, Razor-thin Icons ─────────────────────────────────────
const icons = {
  web: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="4" ry="4"/><path d="M2 8h20M12 20v-4"/></svg>,
  mobile: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="6" y="2" width="12" height="20" rx="4" ry="4"/><path d="M12 18h.01"/></svg>,
  cloud: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>,
  ai: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>,
  design: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 22l10-4 10 4L12 2z"/></svg>,
  api: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
};

// ─── BACKGROUND 1: LIGHT GLASSMORPHISM (සුදු Theme එකට) ───────────
function LightGlassBackground({ mousePos }) {
  return (
    <div className="glass-wrapper-light" style={{ '--x': `${mousePos.x}px`, '--y': `${mousePos.y}px` }}>
      {/* දැන් Light Theme එකෙත් පේන්නේ ඔයාගේ 3D Robot වමයි! */}
      <img src={robotImg} alt="AI Robot" className="robot-bg-image-light" />
      <div className="frosted-glass-overlay-light"></div>
      <div className="floating-shape shape-1"></div>
      <div className="floating-shape shape-2"></div>
    </div>
  );
}

// ─── BACKGROUND 2: DARK X-RAY ROBOT (කළු Theme එකට) ───────────────
function DarkGlassBackground({ mousePos }) {
  return (
    <div className="glass-wrapper-dark" style={{ '--x': `${mousePos.x}px`, '--y': `${mousePos.y}px` }}>
      <div style={{ position: 'absolute', inset: 0, background: '#020203' }}></div>
      <img src={robotImg} alt="AI Robot" className="robot-bg-image-dark" />
      <div className="dark-frosted-overlay"></div>
      <div className="scanner-glow"></div>
      <div className="film-grain"></div>
    </div>
  );
}

// ─── MAIN HOME COMPONENT ───────────────────────────────────────────
export default function Home() {
  const sectRef = useScrollAnimation();
  const featuredProjects = siteData.projects.filter((p) => p.featured);
  
  // Theme State
  const [isDark, setIsDark] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    // 1. Mouse Tracking
    const handleMouseMove = (e) => requestAnimationFrame(() => setMousePos({ x: e.clientX, y: e.clientY }));
    window.addEventListener('mousemove', handleMouseMove);

    // 2. Bulletproof Theme Detection
    const checkTheme = () => {
      const html = document.documentElement;
      const body = document.body;
      
      const isCurrentlyDark = 
        html.classList.contains('dark') || 
        html.classList.contains('dark-mode') || 
        html.getAttribute('data-theme') === 'dark' ||
        body.classList.contains('dark') || 
        body.classList.contains('dark-mode') || 
        body.getAttribute('data-theme') === 'dark';
        
      setIsDark(isCurrentlyDark);
    };

    checkTheme();

    const observer = new MutationObserver(() => checkTheme());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class', 'data-theme'] });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div className={`home-container ${isDark ? 'dark-mode' : 'light-mode'}`} ref={sectRef}>
      
      {/* ── CSS BLOCK: Magic Variable Switching ── */}
      <style>{`
        body, html, #root { background-color: var(--bg-color) !important; background-image: none !important; transition: background-color 0.5s ease; }

        /* ── LIGHT THEME VARIABLES ── */
        .home-container {
          --bg-color: #f0f3fa;
          --text-main: #0f172a;
          --text-muted: #475569;
          --accent: #4f46e5;
          
          --card-bg: rgba(255, 255, 255, 0.6);
          --card-bg-hover: rgba(255, 255, 255, 0.8);
          --card-border: rgba(255, 255, 255, 1);
          --card-border-hover: rgba(255, 255, 255, 1);
          --card-shadow: 0 15px 35px rgba(30, 41, 59, 0.05);
          --card-shadow-hover: 0 30px 60px rgba(79, 70, 229, 0.12);
          
          --btn-bg: #1e293b;
          --btn-bg-hover: #0f172a;
          --btn-text: #ffffff;
          --btn-outline-bg: rgba(255, 255, 255, 0.7);
          --btn-outline-border: #cbd5e1;
          --btn-outline-hover: #ffffff;
          
          --pill-bg: rgba(255, 255, 255, 0.9);
          --pill-border: #e2e8f0;
          --pill-text: #475569;
          
          --icon-bg: #e0e7ff;
          --icon-border: transparent;
          
          --cta-bg: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.5));
        }

        /* ── DARK THEME VARIABLES ── */
        .home-container.dark-mode {
          --bg-color: #020203;
          --text-main: #ffffff;
          --text-muted: #94a3b8;
          --accent: #00e5ff;
          
          --card-bg: rgba(255, 255, 255, 0.02);
          --card-bg-hover: rgba(255, 255, 255, 0.04);
          --card-border: rgba(255, 255, 255, 0.05);
          --card-border-hover: rgba(0, 229, 255, 0.3);
          --card-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
          --card-shadow-hover: 0 30px 60px rgba(0, 229, 255, 0.1);
          
          --btn-bg: #ffffff;
          --btn-bg-hover: #e0f2fe;
          --btn-text: #000000;
          --btn-outline-bg: rgba(255, 255, 255, 0.05);
          --btn-outline-border: rgba(255, 255, 255, 0.2);
          --btn-outline-hover: rgba(255, 255, 255, 0.1);
          
          --pill-bg: rgba(0, 0, 0, 0.4);
          --pill-border: rgba(255, 255, 255, 0.1);
          --pill-text: #94a3b8;
          
          --icon-bg: rgba(0, 229, 255, 0.1);
          --icon-border: 1px solid rgba(0, 229, 255, 0.2);
          
          --cta-bg: linear-gradient(135deg, rgba(0, 229, 255, 0.05), rgba(0, 0, 0, 0.5));
        }

        /* ── BASE STYLES ── */
        .home-container { background-color: var(--bg-color); color: var(--text-main); min-height: 100vh; overflow-x: hidden; position: relative; transition: all 0.5s ease; }
        .premium-text { font-family: 'Inter', -apple-system, sans-serif; letter-spacing: -0.02em; transition: color 0.5s ease; }
        .accent-color { color: var(--accent); transition: color 0.5s ease; }
        
        /* ── LIGHT BACKGROUND CSS ── */
        .glass-wrapper-light { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; background: #f0f3fa; }
        /* Light Theme එකේදී Robot ව ටිකක් ලා කරලා තියෙනවා සුදු මීදුමට ගැලපෙන්න */
        .robot-bg-image-light { position: absolute; inset: 0; width: 100vw; height: 100vh; object-fit: cover; object-position: center 20%; opacity: 0.9; filter: contrast(1.1) brightness(1.2); }
        .frosted-glass-overlay-light { position: absolute; inset: 0; background: rgba(240, 243, 250, 0.88); backdrop-filter: blur(40px); -webkit-backdrop-filter: blur(40px); mask-image: radial-gradient(500px circle at var(--x) var(--y), transparent 0%, rgba(0,0,0,0.5) 40%, black 100%); -webkit-mask-image: radial-gradient(500px circle at var(--x) var(--y), transparent 0%, rgba(0,0,0,0.5) 40%, black 100%); transition: mask-position 0.1s ease-out; }
        .floating-shape { position: absolute; border-radius: 20px; background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.2)); border: 1px solid rgba(255,255,255,0.8); box-shadow: 0 20px 40px rgba(79, 70, 229, 0.15); backdrop-filter: blur(10px); }
        .shape-1 { width: 120px; height: 120px; top: 15%; right: 10%; animation: float 6s ease-in-out infinite; transform: rotate(15deg); }
        .shape-2 { width: 80px; height: 80px; bottom: 20%; left: 10%; animation: float 8s ease-in-out infinite reverse; transform: rotate(-10deg); border-radius: 50%; }

        /* ── DARK BACKGROUND CSS ── */
        .glass-wrapper-dark { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
        .robot-bg-image-dark { position: absolute; inset: 0; width: 100vw; height: 100vh; object-fit: cover; object-position: center 20%; opacity: 0.9; filter: contrast(1.1) brightness(0.9); }
        .dark-frosted-overlay { position: absolute; inset: 0; background: rgba(3, 3, 5, 0.95); backdrop-filter: blur(40px); -webkit-backdrop-filter: blur(40px); mask-image: radial-gradient(700px circle at var(--x) var(--y), transparent 0%, rgba(0,0,0,0.6) 40%, black 100%); -webkit-mask-image: radial-gradient(700px circle at var(--x) var(--y), transparent 0%, rgba(0,0,0,0.6) 40%, black 100%); transition: mask-position 0.1s ease-out; }
        .scanner-glow { position: absolute; inset: 0; background: radial-gradient(600px circle at var(--x) var(--y), rgba(0, 229, 255, 0.15) 0%, transparent 60%); mix-blend-mode: screen; }
        .film-grain { position: absolute; inset: 0; opacity: 0.05; mix-blend-mode: overlay; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"); }

        @keyframes float { 0%, 100% { transform: translateY(0) rotate(15deg); } 50% { transform: translateY(-20px) rotate(20deg); } }
        @keyframes revealUp { 0% { opacity: 0; transform: translateY(40px); } 100% { opacity: 1; transform: translateY(0); } }

        /* ── ADAPTIVE UI CARDS & BUTTONS ── */
        .glass-card { position: relative; border-radius: 24px; overflow: hidden; background: var(--card-bg); border: 1px solid var(--card-border); box-shadow: var(--card-shadow); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); cursor: pointer; }
        .glass-card:hover { transform: translateY(-8px); box-shadow: var(--card-shadow-hover); border-color: var(--card-border-hover); background: var(--card-bg-hover); }
        .glass-card-content { position: relative; z-index: 2; padding: 2.5rem; display: flex; flex-direction: column; justify-content: flex-start; height: 100%; }
        
        .btn-magnetic { position: relative; display: inline-flex; align-items: center; gap: 12px; padding: 16px 36px; border-radius: 100px; background: var(--btn-bg); color: var(--btn-text); font-weight: 700; text-decoration: none; overflow: hidden; transition: all 0.3s; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15); }
        .btn-magnetic:hover { transform: translateY(-3px) scale(1.02); background: var(--btn-bg-hover); box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2); }
        
        .btn-outline { background: var(--btn-outline-bg); border: 1px solid var(--btn-outline-border); color: var(--text-main); box-shadow: none; backdrop-filter: blur(10px); font-weight: 600; }
        .btn-outline:hover { background: var(--btn-outline-hover); border-color: var(--text-main); }
        
        .glass-pill { padding: 8px 20px; border-radius: 100px; background: var(--pill-bg); border: 1px solid var(--pill-border); color: var(--pill-text); font-size: 0.85rem; font-weight: 600; transition: all 0.5s ease; }
        
        .service-icon-box { width: 48px; height: 48px; color: var(--accent); margin-bottom: 1.5rem; background: var(--icon-bg); border-radius: 12px; display: flex; align-items: center; justify-content: center; padding: 10px; border: var(--icon-border); transition: all 0.5s ease; }
      `}</style>

      {/* ── මෙතනින් තමයි THEME එකට අදාළව BACKGROUND එක මාරු කරන්නේ ── */}
      {isDark ? <DarkGlassBackground mousePos={mousePos} /> : <LightGlassBackground mousePos={mousePos} />}

      {/* ── HERO SECTION ── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 5%', maxWidth: 1100 }}>
          
          <div className="glass-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: '2.5rem', opacity: 0, animation: 'revealUp 0.8s ease forwards 0.2s' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }}></span>
            <span className="premium-text" style={{ textTransform: 'uppercase', letterSpacing: '2px' }}>Next-Gen Tech Partners</span>
          </div>

          <h1 className="premium-text" style={{ 
            fontSize: 'clamp(3.5rem, 8vw, 6.5rem)', 
            fontWeight: 800, 
            lineHeight: 1.1,
            color: 'var(--text-main)',
            margin: '0 0 1.5rem 0',
            letterSpacing: '-2px',
            opacity: 0, animation: 'revealUp 0.8s ease forwards 0.4s'
          }}>
            Grow your business <br/>
            with <span className="accent-color">Gen O.</span>
          </h1>

          <p className="premium-text" style={{ 
            fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', 
            color: 'var(--text-muted)', 
            maxWidth: 650, 
            margin: '0 auto 3rem', 
            lineHeight: 1.6,
            fontWeight: 400,
            opacity: 0, animation: 'revealUp 0.8s ease forwards 0.6s'
          }}>
            We engineer high-performance web, mobile, and AI solutions. 
            Move your mouse to reveal the core intelligence powering our infrastructure.
          </p>

          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', opacity: 0, animation: 'revealUp 0.8s ease forwards 0.8s' }}>
            <Link to="/projects" className="btn-magnetic premium-text">
              Explore Work
            </Link>
            <Link to="/contact" className="btn-magnetic btn-outline premium-text">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS CARDS ── */}
      <section style={{ padding: '2rem 5%', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          {siteData.stats.map((s, i) => (
            <div key={i} className="glass-card reveal" style={{ animationDelay: `${i * 0.1}s`, padding: '2rem', textAlign: 'center' }}>
              <div className="premium-text" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-1px' }}>{s.num}</div>
              <div className="premium-text" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROJECTS GRID ── */}
      <section style={{ padding: '8rem 5%', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <h2 className="premium-text" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-1px', margin: 0 }}>Selected Work.</h2>
              <p className="premium-text" style={{ fontSize: '1.1rem', color: 'var(--text-muted)', margin: '10px 0 0 0' }}>Digital transformations that matter.</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {featuredProjects.map((p, i) => (
              <div key={p.id} className="glass-card reveal" style={{ minHeight: '400px', animationDelay: `${i * 0.1}s` }}>
                <div className="glass-card-content">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <span className="glass-pill" style={{ color: p.color, border: `1px solid ${p.color}40`, background: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.9)' }}>
                      {p.category}
                    </span>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: p.color, opacity: 0.15 }}></div>
                  </div>
                  <h3 className="premium-text" style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 1rem 0' }}>{p.title}</h3>
                  <p className="premium-text" style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                    {p.desc}
                  </p>
                  <div style={{ marginTop: 'auto', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {p.tags.slice(0, 3).map(t => (
                      <span key={t} style={{ fontSize: '0.8rem', fontWeight: 600, padding: '6px 14px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f1f5f9', borderRadius: '100px', color: isDark ? '#cbd5e1' : '#475569', transition: 'all 0.5s ease' }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section style={{ padding: '6rem 5%', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 className="reveal premium-text" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4rem', textAlign: 'center' }}>
            Capabilities.
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {siteData.services.map((s, i) => (
              <div key={s.id} className="glass-card reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="glass-card-content" style={{ padding: '2rem' }}>
                  <div className="service-icon-box">
                    {icons[s.icon]}
                  </div>
                  <h3 className="premium-text" style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)', margin: '0 0 0.75rem 0' }}>{s.title}</h3>
                  <p className="premium-text" style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOLD CTA ── */}
      <section style={{ padding: '8rem 5%', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <div className="glass-card reveal" style={{ maxWidth: 900, margin: '0 auto', padding: '5rem 2rem', background: 'var(--cta-bg)' }}>
          <h2 className="premium-text" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-1.5px', marginBottom: '1.5rem', lineHeight: 1.1 }}>
            Ready to build <br/> something amazing?
          </h2>
          <p className="premium-text" style={{ color: 'var(--text-muted)', fontSize: '1.15rem', marginBottom: '3rem', maxWidth: 500, margin: '0 auto 3rem' }}>
            Let's engineer your next big idea with smart digital solutions.
          </p>
          <Link to="/contact" className="btn-magnetic premium-text" style={{ background: 'var(--accent)', color: isDark ? '#000000' : '#ffffff', padding: '18px 44px', fontSize: '1.1rem' }}>
            Start the Conversation
          </Link>
        </div>
      </section>

    </div>
  );
}
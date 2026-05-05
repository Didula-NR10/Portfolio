import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { siteData } from '../data';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// ── SELECTED TECH STACK WITH ORIGINAL LOGOS ──
const techStack = [
  { 
    name: 'React.js', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', 
    // Spaced out nicely to fill the empty area
    style: { top: '5%', left: '10%', animation: 'float1 8s ease-in-out infinite' } 
  },
  { 
    name: 'Node.js', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', 
    style: { top: '25%', right: '5%', animation: 'float2 10s ease-in-out infinite reverse' } 
  },
  { 
    name: 'Python', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', 
    style: { bottom: '15%', left: '20%', animation: 'float3 9s ease-in-out infinite' } 
  },
  { 
    name: 'AWS', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', 
    style: { bottom: '30%', right: '15%', animation: 'float4 11s ease-in-out infinite reverse' } 
  },
];

const icons = {
  web: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="4" ry="4"/><path d="M2 8h20M12 20v-4"/></svg>,
  mobile: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="6" y="2" width="12" height="20" rx="4" ry="4"/><path d="M12 18h.01"/></svg>,
  cloud: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>,
  ai: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>,
  design: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 22l10-4 10 4L12 2z"/></svg>,
  api: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
};

export default function Home() {
  const sectRef = useScrollAnimation();
  const featuredProjects = siteData.projects.filter((p) => p.featured);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const html = document.documentElement;
      const body = document.body;
      const isCurrentlyDark = 
        html.classList.contains('dark') || html.classList.contains('dark-mode') || html.getAttribute('data-theme') === 'dark' ||
        body.classList.contains('dark') || body.classList.contains('dark-mode') || body.getAttribute('data-theme') === 'dark';
      
      setIsDark(isCurrentlyDark);
    };

    checkTheme();
    const observer = new MutationObserver(() => checkTheme());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class', 'data-theme'] });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`home-wrapper ${isDark ? 'dark-mode' : 'light-mode'}`} ref={sectRef}>
      
      <style>{`
        body, html, #root {
          background-image: none !important;
          background-color: var(--page-bg) !important;
          transition: background-color 0.5s ease;
        }

        .home-wrapper {
          min-height: 100vh;
          padding: 100px 24px 24px 24px; 
          display: flex;
          justify-content: center;
          background-color: var(--page-bg);
        }

        .inner-window {
          position: relative; 
          width: 100%;
          max-width: 1600px;
          display: flex; 
          flex-direction: column;
        }

        .light-mode {
          --page-bg: #ffffff; 
          --hero-bento-bg: linear-gradient(135deg, #e4f1f0 0%, #d5e9e9 100%);
          --alt-bento-bg: linear-gradient(135deg, #f0f7f7 0%, #e6f2f2 100%);
          
          --text-main: #1c2b33;
          --text-muted: #5e6d75;
          --accent: #15797b; 
          --accent-hover: #105a5c;
          
          --solid-card-bg: #ffffff;
          --card-border: rgba(21, 121, 123, 0.15);
          --card-shadow: 0 10px 40px rgba(21, 121, 123, 0.05);
          --card-shadow-hover: 0 20px 50px rgba(21, 121, 123, 0.12);
          
          --btn-bg: #15797b;
          --btn-bg-hover: #105a5c;
          --btn-text: #ffffff;
          --btn-outline-bg: transparent;
          --btn-outline-border: #15797b;
          --btn-outline-hover: rgba(21, 121, 123, 0.08);
          
          --pill-bg: #e4f1f0;
          --pill-text: #15797b;
          --icon-bg: rgba(21, 121, 123, 0.08);
        }

        .dark-mode {
          --page-bg: #070b0f; 
          --hero-bento-bg: linear-gradient(135deg, #0e171b 0%, #152229 100%);
          --alt-bento-bg: linear-gradient(135deg, #0a1114 0%, #0d161a 100%);
          
          --text-main: #f0f4f8;
          --text-muted: #8b9eb0;
          --accent: #4ad6e8; 
          --accent-hover: #75e2f0;
          
          --solid-card-bg: #111a20; 
          --card-border: rgba(74, 214, 232, 0.1);
          --card-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
          --card-shadow-hover: 0 20px 50px rgba(74, 214, 232, 0.15);
          
          --btn-bg: #4ad6e8;
          --btn-bg-hover: #75e2f0;
          --btn-text: #050a0f;
          --btn-outline-bg: rgba(255, 255, 255, 0.05);
          --btn-outline-border: #4ad6e8;
          --btn-outline-hover: rgba(74, 214, 232, 0.1);
          
          --pill-bg: rgba(74, 214, 232, 0.1);
          --pill-text: #4ad6e8;
          --icon-bg: rgba(74, 214, 232, 0.1);
        }

        .premium-text { font-family: 'Inter', -apple-system, sans-serif; transition: color 0.5s ease; color: var(--text-muted); }
        .serif-heading { font-family: 'Playfair Display', 'Merriweather', serif; transition: color 0.5s ease; color: var(--text-main); }

        .hero-bento-box {
          background: var(--hero-bento-bg);
          border-radius: 40px;
          position: relative; 
          z-index: 2;
          overflow: hidden; 
          display: flex;
          min-height: 580px;
        }

        .hero-content { 
          flex: 1; 
          padding: 6rem 4rem; 
          display: flex;
          flex-direction: column;
          justify-content: center; 
          position: relative;
          z-index: 3;
          opacity: 0; 
          animation: revealUp 0.8s ease forwards 0.2s; 
        }

        /* ────────────────────────────────────────── */
        /* ── HUGE 3D TECH LOGOS NO BACKGROUND ── */
        /* ────────────────────────────────────────── */
        .tech-stack-container {
          flex: 1; 
          position: relative;
          z-index: 2;
        }

        .tech-logo-item {
          position: absolute; 
          display: flex;
          align-items: center;
          justify-content: center;
          /* ගොඩක් ලොකු සයිස් එකක් දුන්නා Space එක පිරෙන්න */
          width: clamp(100px, 12vw, 180px);  
          height: clamp(100px, 12vw, 180px); 
          /* කිසිම Background එකක් නෑ, Border නෑ */
          background: transparent; 
          border: none;
          cursor: pointer;
          transition: transform 0.3s ease;
          /* Logo එකටම ලස්සන 3D Shadow එකක් දාලා තියෙනවා පාවෙනවා වගේ පේන්න */
          filter: drop-shadow(0 15px 25px rgba(0,0,0,0.15));
        }

        .tech-logo-item:hover {
          transform: scale(1.15) !important; /* Hover කරද්දී තවත් ලොකු වෙනවා */
        }

        .dark-mode .tech-logo-item {
          filter: drop-shadow(0 15px 25px rgba(0,0,0,0.5));
        }

        .tech-icon-img {
          /* Image එක මුළු Size එකම ගන්න හැදුවා */
          width: 100%; 
          height: 100%;
          object-fit: contain;
        }

        /* 4 Different Floating Animations */
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -25px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-25px, 20px); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, 15px); }
        }
        @keyframes float4 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, -30px); }
        }

        /* ── Floating Abstract Shapes ── */
        .floating-shape-1 { position: absolute; width: 45px; height: 45px; border-radius: 50%; border: 2px solid var(--accent); opacity: 0.3; top: 15%; left: 10%; animation: float 6s ease-in-out infinite; }
        .floating-shape-2 { position: absolute; width: 55px; height: 55px; border-radius: 50%; background: var(--accent); opacity: 0.15; bottom: 12%; left: 28%; animation: float 8s ease-in-out infinite reverse; }

        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes revealUp { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }

        /* ── Buttons ── */
        .btn-group { display: flex; gap: 1rem; flex-wrap: wrap; }
        .btn-new-primary { padding: 12px 32px; border-radius: 6px; font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; text-decoration: none; transition: all 0.3s ease; background-color: var(--btn-bg); color: var(--btn-text); border: 2px solid var(--btn-bg); }
        .btn-new-primary:hover { background-color: var(--btn-bg-hover); border-color: var(--btn-bg-hover); transform: translateY(-2px); }
        .btn-new-outline { padding: 12px 32px; border-radius: 6px; font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; text-decoration: none; transition: all 0.3s ease; background-color: var(--btn-outline-bg); color: var(--accent); border: 2px solid var(--btn-outline-border); }
        .btn-new-outline:hover { background-color: var(--btn-outline-hover); transform: translateY(-2px); }

        /* ── SECTIONS ── */
        .plain-section { padding: 4rem 2rem; background: transparent; }
        .stat-item { text-align: center; padding: 1rem; }
        .stat-num { font-size: 3.5rem; font-weight: 800; color: var(--accent); line-height: 1.1; margin-bottom: 0.5rem; }
        .clean-card { background: transparent; border: 1px solid var(--card-border); border-radius: 24px; padding: 2.5rem; transition: all 0.4s ease; display: flex; flex-direction: column; align-items: flex-start; }
        .clean-card:hover { background: var(--solid-card-bg); border-color: transparent; box-shadow: var(--card-shadow-hover); transform: translateY(-6px); }
        .service-icon-box { width: 55px; height: 55px; color: var(--accent); margin-bottom: 1.5rem; background: var(--icon-bg); border-radius: 16px; display: flex; align-items: center; justify-content: center; padding: 12px; }
        .alt-bento-section { background: var(--alt-bento-bg); border-radius: 40px; padding: 6rem 4rem; margin: 2rem 0; }
        .solid-card { background: var(--solid-card-bg); border-radius: 24px; padding: 2.5rem; border: none; box-shadow: var(--card-shadow); transition: all 0.4s ease; display: flex; flex-direction: column; height: 100%; }
        .solid-card:hover { transform: translateY(-8px); box-shadow: var(--card-shadow-hover); }
        .glass-pill { padding: 8px 20px; border-radius: 100px; background: var(--pill-bg); color: var(--pill-text); font-size: 0.8rem; font-weight: 700; transition: all 0.5s ease; z-index: 10;}

        @media (max-width: 900px) {
          .home-wrapper { padding: 90px 16px 24px 16px; }
          .hero-bento-box { flex-direction: column; }
          .hero-content { padding: 3rem 2rem 1rem 2rem; text-align: center; align-items: center; }
          .tech-stack-container { min-height: 400px; }
          .alt-bento-section { padding: 4rem 2rem; border-radius: 30px; }
        }
      `}</style>

      <div className="inner-window">

        {/* ─── HERO SECTION ─── */}
        <div className="hero-bento-box">
          <div className="floating-shape-1"></div>
          <div className="floating-shape-2"></div>

          <div className="hero-content">
            <h1 className="serif-heading" style={{ fontSize: 'clamp(3.2rem, 5vw, 4.5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '10px', letterSpacing: '-1px' }}>
              Hello, I'm <span style={{ color: 'var(--accent)' }}>Tharindu</span>
            </h1>
            <h2 className="serif-heading" style={{ fontSize: 'clamp(2.4rem, 4vw, 3.2rem)', fontWeight: 700, color: 'var(--accent)', marginBottom: '1.5rem', letterSpacing: '-1px' }}>
              Web Developer
            </h2>
            <p className="premium-text" style={{ fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: '480px' }}>
              I am a Full-Stack Web Developer with extensive experience of over 4 years. My expertise is in creating & designing websites, Mobile Apps, and Desktop Applications.
            </p>
            
            <div className="btn-group">
              <Link to="/about" className="btn-new-outline">Learn More</Link>
              <Link to="/contact" className="btn-new-primary">Contact Us</Link>
            </div>
          </div>

          {/* ─── HUGE 3D LOGO ANIMATION ─── */}
          <div className="tech-stack-container">
            {techStack.map((tech) => (
              <div 
                key={tech.name} 
                className="tech-logo-item"
                style={{ 
                  top: tech.style.top,
                  bottom: tech.style.bottom,
                  left: tech.style.left,
                  right: tech.style.right,
                  animation: tech.style.animation
                }}
                title={tech.name}
              >
                {/* ── Original Logos taking 100% size ── */}
                <img src={tech.icon} alt={tech.name} className="tech-icon-img" />
              </div>
            ))}
          </div>

        </div>

        {/* ─── STATS SECTION ─── */}
        <section className="plain-section">
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            {siteData.stats.map((s, i) => (
              <div key={i} className="stat-item">
                <div className="serif-heading stat-num">{s.num}</div>
                <div className="premium-text" style={{ fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── CAPABILITIES ─── */}
        <section className="plain-section" style={{ paddingTop: '0' }}>
          <h2 className="reveal serif-heading" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '3rem', textAlign: 'center' }}>
            Our Capabilities
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {siteData.services.map((s, i) => (
              <div key={s.id} className="clean-card reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="service-icon-box">
                  {icons[s.icon]}
                </div>
                <h3 className="serif-heading" style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 1rem 0' }}>{s.title}</h3>
                <p className="premium-text" style={{ fontSize: '1rem', lineHeight: 1.6, margin: 0 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SELECTED WORK ─── */}
        <div className="alt-bento-section">
          <div className="reveal" style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <h2 className="serif-heading" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-1px', margin: 0 }}>Selected Work.</h2>
              <p className="premium-text" style={{ fontSize: '1.1rem', margin: '10px 0 0 0' }}>Digital transformations that matter.</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {featuredProjects.map((p, i) => (
              <div key={p.id} className="solid-card reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <span className="glass-pill">
                    {p.category}
                  </span>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--icon-bg)' }}></div>
                </div>
                <h3 className="serif-heading" style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 1rem 0' }}>{p.title}</h3>
                <p className="premium-text" style={{ fontSize: '1rem', lineHeight: 1.6, margin: '0 0 2rem 0', flexGrow: 1 }}>
                  {p.desc}
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {p.tags.slice(0, 3).map(t => (
                    <span key={t} className="premium-text" style={{ fontSize: '0.8rem', fontWeight: 600, padding: '6px 14px', border: '1px solid var(--card-border)', borderRadius: '100px' }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
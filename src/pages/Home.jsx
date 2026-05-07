import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { siteData } from '../data';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// ── GLASS COLORS (LIGHT BLUE THEME - Optimized for 3D) ──
const glassColors = {
  light: { 
    front: 'rgba(230, 247, 255, 0.85)', 
    top: 'rgba(230, 247, 255, 0.65)', 
    side: 'rgba(230, 247, 255, 0.65)',
    border: 'rgba(255, 255, 255, 0.8)',
    shadow: 'inset 0 0 15px rgba(255, 255, 255, 0.6)'
  },
  dark: { 
    front: 'rgba(16, 45, 65, 0.8)', 
    top: 'rgba(16, 45, 65, 0.6)', 
    side: 'rgba(16, 45, 65, 0.6)',
    border: 'rgba(74, 214, 232, 0.25)',
    shadow: 'inset 0 0 15px rgba(74, 214, 232, 0.05)'
  }
};

// ── 3D STACKED BOXES DATA (SCATTERED & PERFORMANCE OPTIMIZED) ──
const techStack = [
  { 
    name: 'React.js', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', 
    x: 5, y: -110, z: -10, s: 1, zIndex: 11, ...glassColors 
  },
  { 
    name: 'Node.js', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', 
    x: -65, y: -5, z: 10, s: 1, zIndex: 14, ...glassColors 
  },
  { 
    name: 'Python', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', 
    x: 85, y: -20, z: -70, s: 1, zIndex: 9, ...glassColors 
  },
  { 
    name: 'Next.js', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg', 
    x: -110, y: 100, z: 0, s: 1, zIndex: 10, ...glassColors 
  },
  { 
    name: 'Firebase', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg', 
    x: 15, y: 110, z: 15, s: 1, zIndex: 15, ...glassColors 
  },
  { 
    name: 'MySQL', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg', 
    x: 125, y: 85, z: -60, s: 1, zIndex: 8, ...glassColors 
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
        /* ── Oringinal Global Background ── */
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

        /* ── Light Mode Variables ── */
        .light-mode {
          --page-bg: #ffffff; 
          --hero-bento-bg: linear-gradient(180deg, #d8ebea 0%, #ffffff 100%);
          --alt-bento-bg: linear-gradient(180deg, #ffffff 0%, #d8ebea 100%);
          
          --text-main: #1c2b33;
          --text-muted: #5e6d75;
          --accent: #15797b; 
          --accent-hover: #105a5c;
          
          /* Cards are now more transparent so the glow shows through perfectly */
          --card-base-bg: rgba(255, 255, 255, 0.45);
          --card-border: rgba(21, 121, 123, 0.2);
          --card-shadow: 0 10px 30px rgba(21, 121, 123, 0.05);
          
          --glass-hover-bg: rgba(255, 255, 255, 0.15);
          --glass-hover-border: rgba(255, 255, 255, 0.8);
          --glass-inset-shadow: inset 0 0 20px rgba(255, 255, 255, 0.8), 0 20px 40px rgba(21, 121, 123, 0.12);

          --btn-bg: #15797b;
          --btn-bg-hover: #105a5c;
          --btn-text: #ffffff;
          --btn-outline-bg: transparent;
          --btn-outline-border: #15797b;
          --btn-outline-hover: rgba(21, 121, 123, 0.08);
          
          --pill-bg: #e4f1f0;
          --pill-text: #15797b;
          --icon-bg: rgba(21, 121, 123, 0.08);

          --cube-border: rgba(0, 0, 0, 0.05);
        }

        /* ── Dark Mode Variables ── */
        .dark-mode {
          --page-bg: #070b0f; 
          --hero-bento-bg: linear-gradient(180deg, #122126 0%, #0a1114 100%);
          --alt-bento-bg: linear-gradient(180deg, #0a1114 0%, #122126 100%);
          
          --text-main: #f0f4f8;
          --text-muted: #8b9eb0;
          --accent: #4ad6e8; 
          --accent-hover: #75e2f0;
          
          /* Cards are now more transparent so the glow shows through perfectly */
          --card-base-bg: rgba(16, 25, 30, 0.35); 
          --card-border: rgba(74, 214, 232, 0.15);
          --card-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
          
          --glass-hover-bg: rgba(16, 25, 30, 0.1);
          --glass-hover-border: rgba(74, 214, 232, 0.4);
          --glass-inset-shadow: inset 0 0 20px rgba(74, 214, 232, 0.1), 0 20px 40px rgba(0, 0, 0, 0.6);

          --btn-bg: #4ad6e8;
          --btn-bg-hover: #75e2f0;
          --btn-text: #050a0f;
          --btn-outline-bg: rgba(255, 255, 255, 0.05);
          --btn-outline-border: #4ad6e8;
          --btn-outline-hover: rgba(74, 214, 232, 0.1);
          
          --pill-bg: rgba(74, 214, 232, 0.1);
          --pill-text: #4ad6e8;
          --icon-bg: rgba(74, 214, 232, 0.1);

          --cube-border: rgba(255, 255, 255, 0.12);
        }

        .premium-text { 
          font-family: 'Inter', -apple-system, sans-serif; 
          transition: color 0.5s ease; 
          color: var(--text-muted); 
        }

        .serif-heading { 
          font-family: 'Playfair Display', 'Merriweather', serif; 
          transition: color 0.5s ease; 
          color: var(--text-main); 
        }

        /* ── HERO BENTO BOX & HEIGHT FIX ── */
        .hero-bento-box {
          background: var(--hero-bento-bg);
          border-radius: 56px; 
          position: relative; 
          z-index: 2;
          overflow: hidden; 
          display: flex;
          min-height: 540px; 
        }

        .hero-content { 
          flex: 1; 
          padding: 60px 48px; 
          display: flex;
          flex-direction: column;
          justify-content: center; 
          position: relative;
          z-index: 3;
          opacity: 0; 
          animation: revealUp 0.8s ease forwards 0.2s; 
        }

        /* ────────────────────────────────────────── */
        /* ── 3D PHYSICAL PYRAMID CUBES CSS ── */
        /* ────────────────────────────────────────── */
        .tech-stack-container { 
          flex: 1; 
          position: relative; 
          z-index: 2; 
          display: flex; 
          justify-content: center; 
          align-items: center; 
          perspective: 2000px; 
        }

        .pyramid-container { 
          position: relative; 
          transform-style: preserve-3d; 
          transform: rotateX(-15deg) rotateY(25deg); 
        }

        .position-wrapper { 
          position: absolute; 
          width: 100px; 
          height: 100px; 
          margin-top: -50px; 
          margin-left: -50px; 
          transform-style: preserve-3d; 
          transition: transform 0.3s ease; 
          cursor: pointer; 
        }

        .hover-wrapper { 
          width: 100%; 
          height: 100%; 
          transform-style: preserve-3d; 
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
        }

        .position-wrapper:hover .hover-wrapper { 
          transform: translateZ(50px) scale(1.15); 
        }

        .cube { 
          width: 100%; 
          height: 100%; 
          position: absolute; 
          transform-style: preserve-3d; 
        }

        .cube-face { 
          position: absolute; 
          width: 100px; 
          height: 100px; 
          display: flex; 
          justify-content: center; 
          align-items: center; 
          box-sizing: border-box; 
          border-radius: 12px; 
          border: 1px solid var(--cb); 
          box-shadow: var(--cs-inner); 
          transition: background 0.5s ease, border-color 0.5s ease;
        }

        .cube-front { 
          transform: rotateY(0deg) translateZ(50px); 
          background: var(--cf); 
        }

        .dark-mode .cube-front img { 
          filter: drop-shadow(0px 0px 8px rgba(255,255,255,0.4)); 
        }

        .cube-front img { 
          max-width: 60%; 
          max-height: 60%; 
          object-fit: contain; 
        }

        .cube-top { 
          transform: rotateX(90deg) translateZ(50px); 
          background: var(--ct); 
        }

        .cube-right { 
          transform: rotateY(90deg) translateZ(50px); 
          background: var(--cs); 
        }

        .cube-left { 
          transform: rotateY(-90deg) translateZ(50px); 
          background: var(--cs); 
        }

        .cube-back { 
          transform: rotateY(180deg) translateZ(50px); 
          background: var(--cf); 
        }

        .cube-bottom { 
          transform: rotateX(-90deg) translateZ(50px); 
          background: var(--ct); 
          box-shadow: 0 30px 40px rgba(0,0,0,0.1); 
        }

        .dark-mode .cube-bottom { 
          box-shadow: 0 30px 40px rgba(0,0,0,0.5); 
        }

        /* ── Floating Abstract Shapes ── */
        .floating-shape-1 { 
          position: absolute; 
          width: 45px; 
          height: 45px; 
          border-radius: 50%; 
          border: 2px solid var(--accent); 
          opacity: 0.3; 
          top: 15%; 
          left: 10%; 
          animation: float 6s ease-in-out infinite; 
        }

        .floating-shape-2 { 
          position: absolute; 
          width: 55px; 
          height: 55px; 
          border-radius: 50%; 
          background: var(--accent); 
          opacity: 0.15; 
          bottom: 12%; 
          left: 28%; 
          animation: float 8s ease-in-out infinite reverse; 
        }

        @keyframes float { 
          0%, 100% { transform: translateY(0); } 
          50% { transform: translateY(-10px); } 
        }

        @keyframes revealUp { 
          0% { opacity: 0; transform: translateY(30px); } 
          100% { opacity: 1; transform: translateY(0); } 
        }

        /* ────────────────────────────────────────── */
        /* ── SUPERB PREMIUM BUTTONS ── */
        /* ────────────────────────────────────────── */
        .btn-group { 
          display: flex; 
          gap: 1rem; 
          flex-wrap: wrap; 
          margin-top: 1rem; 
        }
        
        .btn-new-primary { 
          position: relative;
          padding: 16px 36px; 
          border-radius: 16px; 
          font-weight: 700; 
          font-size: 0.85rem; 
          text-transform: uppercase; 
          letter-spacing: 2px; 
          text-decoration: none; 
          color: #ffffff !important;
          background: linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%);
          background-size: 200% 200%;
          border: none;
          z-index: 1;
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 8px 20px var(--accent-dim);
          overflow: hidden;
        }

        .btn-new-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 16px; 
          box-shadow: inset 0 0 20px rgba(255,255,255,0.3);
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 2;
        }

        .btn-new-primary::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
          transform: skewX(-25deg);
          transition: left 0.7s ease;
          z-index: 3;
        }

        .btn-new-primary:hover { 
          transform: translateY(-6px) scale(1.03); 
          box-shadow: 0 20px 40px var(--accent-dim), 0 0 20px var(--accent-hover);
          background-position: 100% 100%;
        }

        .btn-new-primary:hover::after { 
          opacity: 1; 
        }

        .btn-new-primary:hover::before { 
          left: 200%; 
        }

        .btn-new-outline { 
          position: relative;
          padding: 16px 36px; 
          border-radius: 16px; 
          font-weight: 700; 
          font-size: 0.85rem; 
          text-transform: uppercase; 
          letter-spacing: 2px; 
          text-decoration: none; 
          color: var(--text-main); 
          background: var(--card-base-bg);
          border: 1px solid var(--accent); 
          z-index: 1;
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          overflow: hidden;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .btn-new-outline::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: var(--accent);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.5s cubic-bezier(0.86, 0, 0.07, 1);
          z-index: -1;
        }

        .btn-new-outline:hover { 
          color: #ffffff !important;
          border-color: transparent;
          transform: translateY(-6px) scale(1.03);
          box-shadow: 0 15px 35px var(--accent-dim);
        }

        .btn-new-outline:hover::before { 
          transform: scaleX(1); 
          transform-origin: left; 
        }

        /* ── SECTIONS ── */
        .plain-section { 
          padding: 4rem 2rem; 
          background: transparent; 
        }

        .stat-item { 
          text-align: center; 
          padding: 1rem; 
        }

        .stat-num { 
          font-size: 3.5rem; 
          font-weight: 800; 
          color: var(--accent); 
          line-height: 1.1; 
          margin-bottom: 0.5rem; 
        }
        
        /* ────────────────────────────────────────── */
        /* ── CARDS (ELEVATED + CORNER GLOW) ── */
        /* ────────────────────────────────────────── */
        .clean-card, .solid-card { 
          background: var(--card-base-bg); 
          border: 1px solid var(--card-border); 
          border-radius: 16px; 
          padding: 2.5rem; 
          box-shadow: var(--card-shadow);
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
          display: flex; 
          flex-direction: column; 
          position: relative;
          overflow: hidden;
          /* Base glass effect so the glow shows through nicely */
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        
        .clean-card { 
          align-items: flex-start; 
        }

        .solid-card { 
          height: 100%; 
        }

        /* 2. The Glowing Corner Effect (Top-Right) */
        .clean-card::after, .solid-card::after {
          content: '';
          position: absolute;
          top: -40px;
          right: -40px;
          width: 160px;
          height: 160px;
          background: var(--accent);
          filter: blur(50px);
          /* Now clearly visible even without hovering */
          opacity: 0.35; 
          border-radius: 50%;
          z-index: 0;
          transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          pointer-events: none;
        }

        .clean-card::before, .solid-card::before {
          content: '';
          position: absolute;
          top: 0; left: -150%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
          transform: skewX(-20deg);
          transition: left 0.6s ease;
          z-index: 0;
          pointer-events: none;
        }

        .dark-mode .clean-card::before, .dark-mode .solid-card::before {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
        }

        .clean-card > *, .solid-card > * { 
          position: relative; 
          z-index: 1; 
        }

        /* 3. Glass Hover Effect */
        .clean-card:hover, .solid-card:hover { 
          background: var(--glass-hover-bg); 
          border-color: var(--glass-hover-border); 
          box-shadow: var(--glass-inset-shadow); 
          transform: translateY(-8px); 
          /* Stronger blur on hover */
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }

        /* The glowing corner pops beautifully under the frosted glass */
        .clean-card:hover::after, .solid-card:hover::after {
          opacity: 0.6; /* Brighter glow */
          transform: scale(1.6); /* Glow spreads out more */
        }

        .clean-card:hover::before, .solid-card:hover::before { 
          left: 200%; 
        }

        .service-icon-box { 
          width: 55px; 
          height: 55px; 
          color: var(--accent); 
          margin-bottom: 1.5rem; 
          background: var(--icon-bg); 
          border-radius: 16px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          padding: 12px; 
        }
        
        /* ── SELECTED WORK SECTION ── */
        .alt-bento-section { 
          background: var(--alt-bento-bg); 
          border-radius: 56px; 
          padding: 40px; 
          margin: 2rem 0; 
        }
        
        .glass-pill { 
          padding: 8px 20px; 
          border-radius: 100px; 
          background: var(--pill-bg); 
          color: var(--pill-text); 
          font-size: 0.8rem; 
          font-weight: 700; 
          transition: all 0.5s ease; 
          z-index: 10;
        }

        @media (max-width: 900px) {
          .home-wrapper { 
            padding: 90px 16px 24px 16px; 
          }
          .hero-bento-box { 
            flex-direction: column; 
            border-radius: 48px; 
            min-height: auto; 
          }
          .hero-content { 
            padding: 40px 24px; 
            text-align: center; 
            align-items: center; 
          }
          .pyramid-container { 
            transform: rotateX(-15deg) rotateY(25deg) scale(0.8); 
          }
          .tech-stack-container { 
            min-height: 400px; 
          }
          .alt-bento-section { 
            padding: 24px; 
            border-radius: 40px; 
          } 
        }
      `}</style>

      <div className="inner-window">

        {/* ─── HERO SECTION ─── */}
        <div className="hero-bento-box">
          <div className="floating-shape-1"></div>
          <div className="floating-shape-2"></div>

          <div className="hero-content">
            <h1 className="serif-heading" style={{ fontSize: 'clamp(3.2rem, 5vw, 4.5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '10px', letterSpacing: '-1px' }}>
              Build Your <span style={{ color: 'var(--accent)' }}>Digital</span> Future
            </h1>
            <h2 className="serif-heading" style={{ fontSize: 'clamp(2.4rem, 4vw, 3.2rem)', fontWeight: 700, color: 'var(--accent)', marginBottom: '1.5rem', letterSpacing: '-1px' }}>
              Expert Development Agency
            </h2>
            <p className="premium-text" style={{ fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: '480px' }}>
              We are a team of passionate developers crafting scalable, high-performance web and mobile solutions for businesses worldwide.
            </p>
            
            <div className="btn-group">
              <Link to="/about" className="btn-new-outline">Learn More</Link>
              <Link to="/contact" className="btn-new-primary">Contact Us</Link>
            </div>
          </div>

          {/* ─── PHYSICAL 3D CUBES (GLASS EFFECT) ─── */}
          <div className="tech-stack-container">
            <div className="pyramid-container">
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="position-wrapper"
                  title={tech.name}
                  style={{
                    transform: `translate3d(${tech.x}px, ${tech.y}px, ${tech.z}px) scale(${tech.s})`,
                    zIndex: tech.zIndex, 
                  }}
                >
                  <div className="hover-wrapper">
                    <div className="cube" style={{
                      '--cf': isDark ? tech.dark.front : tech.light.front,
                      '--ct': isDark ? tech.dark.top : tech.light.top,
                      '--cs': isDark ? tech.dark.side : tech.light.side,
                      '--cb': isDark ? tech.dark.border : tech.light.border,
                      '--cs-inner': isDark ? tech.dark.shadow : tech.light.shadow,
                    }}>
                      {/* Front Face with Logo */}
                      <div className="cube-face cube-front">
                        <img src={tech.icon} alt={tech.name} className="tech-icon-img" />
                      </div>
                      {/* Other Faces */}
                      <div className="cube-face cube-back"></div>
                      <div className="cube-face cube-right"></div>
                      <div className="cube-face cube-left"></div>
                      <div className="cube-face cube-top"></div>
                      <div className="cube-face cube-bottom"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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

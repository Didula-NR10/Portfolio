import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { siteData } from '../data';

<<<<<<< HEAD
// ─── Gen O SVG Logo ───────────────────────────────────────────────
const GenoLogo = () => (
  <svg width="110" height="36" viewBox="0 0 110 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* GEN letters */}
    <text
      x="0" y="30"
      fontFamily="'Syne', sans-serif"
      fontSize="32"
      fontWeight="800"
      letterSpacing="2"
      fill="var(--logo-dark)"
    >GEN</text>
    {/* Power-button O */}
    <g transform="translate(84, 4)">
      {/* Circle */}
      <circle cx="13" cy="14" r="11.5" stroke="var(--accent)" strokeWidth="2.2" fill="none" />
      {/* Power icon */}
      <path d="M13 4 L13 10" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M8 7.5 A8.5 8.5 0 1 0 18 7.5" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    </g>
  </svg>
);

// ─── Theme toggle icon ─────────────────────────────────────────────
const SunIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);
const MoonIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

// ─── Hamburger / X ────────────────────────────────────────────────
const MenuIcon = ({ open }) =>
  open ? (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ) : (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="8" x2="21" y2="8"/><line x1="3" y1="16" x2="21" y2="16"/>
=======
// ─── Electric Gen O Logo (Outer circle removed & Sized perfectly) ──
const GenoLogo = () => (
  <div className="nav-electric-logo" style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
    <span className="nav-electric-text" style={{
      fontFamily: "var(--font-display, 'Syne', sans-serif)",
      fontSize: '28px',
      fontWeight: '800',
      letterSpacing: '3px',
      color: 'var(--text)',
      lineHeight: '1'
    }}>
      GEN
    </span>
    {/* SVG Width and Height increased to 28 to match the 28px font size exactly */}
    <svg className="nav-electric-svg" width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginTop: '-4px', overflow: 'visible' }}>
      <path d="M12 4 L12 10" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M7 7.5 A7.5 7.5 0 1 0 17 7.5" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  </div>
);

// ─── Icons ────────────────────────────────────────────
const SunIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const MenuIcon = ({ open }) =>
  open ? (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ) : (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
>>>>>>> origin/linuka_dev
    </svg>
  );

export default function Nav({ theme, onToggleTheme }) {
<<<<<<< HEAD
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const location                  = useLocation();
=======
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true); 
  const location = useLocation();
>>>>>>> origin/linuka_dev

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setScrolled(currentScrollY > 20);
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY = currentScrollY;

      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolledPercentage = (currentScrollY / height) * 100;
      setScrollProgress(scrolledPercentage);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

<<<<<<< HEAD
  // Close menu on route change
=======
>>>>>>> origin/linuka_dev
  useEffect(() => { setMenuOpen(false); }, [location]);

  const isActive = useCallback((path) => location.pathname === path, [location]);

  return (
    <>
<<<<<<< HEAD
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(22px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        padding: '0 5%',
        height: 68,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'background 0.4s, backdrop-filter 0.4s, border-color 0.4s',
      }}>

        {/* Logo */}
=======
      <nav className={theme === 'dark' ? 'nav-dark' : 'nav-light'} style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'var(--nav-bg, rgba(15, 15, 15, 0.75))' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        padding: '0 5%',
        height: 80, 
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.4s, backdrop-filter 0.4s, border-color 0.4s',
      }}>

        {/* --- Neon Scroll Progress Bar --- */}
        <div style={{
          position: 'absolute',
          bottom: 0, 
          left: 0,
          height: '2px',
          background: 'var(--accent, #00e5ff)',
          width: `${scrollProgress}%`,
          boxShadow: theme === 'dark' ? '0 0 10px var(--accent, #00e5ff), 0 0 5px #fff' : 'none',
          zIndex: 101,
          transition: 'width 0.1s ease-out'
        }} />

>>>>>>> origin/linuka_dev
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <GenoLogo />
        </Link>

<<<<<<< HEAD
        {/* Desktop Nav Links */}
        <ul style={{
          display: 'flex', gap: 36, listStyle: 'none',
          margin: 0, padding: 0,
        }} className="nav-desktop">
          {siteData.nav.map((item) => (
            <li key={item.path}>
              <Link to={item.path} style={{
                fontFamily: 'var(--font-display)',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: isActive(item.path) ? 'var(--accent)' : 'var(--text2)',
                textDecoration: 'none',
                position: 'relative',
                transition: 'color 0.3s',
                paddingBottom: 2,
              }}
              className="nav-link"
              onMouseEnter={e => e.target.style.color = 'var(--accent)'}
              onMouseLeave={e => e.target.style.color = isActive(item.path) ? 'var(--accent)' : 'var(--text2)'}
              >
                {item.label}
                {isActive(item.path) && (
                  <span style={{
                    position: 'absolute', bottom: -2, left: 0,
                    width: '100%', height: 1,
                    background: 'var(--accent)',
                  }} />
                )}
=======
        <ul className="nav-desktop" style={{
          display: 'flex', gap: 40, listStyle: 'none', margin: 0, padding: 0,
        }}>
          {siteData.nav.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={`modern-nav-link ${isActive(item.path) ? 'active' : ''}`}
              >
                {item.label}
>>>>>>> origin/linuka_dev
              </Link>
            </li>
          ))}
        </ul>

<<<<<<< HEAD
        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {/* Theme toggle */}
          <button onClick={onToggleTheme} style={{
            width: 50, height: 27,
            background: 'var(--surface2)',
            border: '1px solid var(--border2)',
            borderRadius: 14,
            cursor: 'pointer',
            position: 'relative',
            display: 'flex', alignItems: 'center', padding: '3px 3px',
            transition: 'border-color 0.3s',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border2)'}
          title={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
          >
            <span style={{
              width: 20, height: 20,
              background: 'var(--accent)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#07090D',
              transform: theme === 'light' ? 'translateX(22px)' : 'translateX(0)',
              transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
              boxShadow: '0 0 8px var(--glow)',
            }}>
=======
        {/* Original Theme Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          
          <button 
            className="theme-toggle-btn"
            onClick={onToggleTheme} 
            title={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
          >
            <span className={`theme-toggle-circle ${theme === 'light' ? 'light-mode' : ''}`}>
>>>>>>> origin/linuka_dev
              {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
            </span>
          </button>

<<<<<<< HEAD
          {/* CTA */}
          <Link to="/contact" className="btn-primary"
            style={{ padding: '10px 22px', fontSize: 12, display: 'none' }}
            id="nav-cta">
            Let's Talk
          </Link>

          {/* Hamburger (mobile) */}
          <button onClick={() => setMenuOpen(o => !o)}
            style={{
              background: 'none', border: '1px solid var(--border)',
              color: 'var(--text)', cursor: 'pointer',
              padding: '6px 8px', display: 'none', borderRadius: 2,
              transition: 'border-color 0.2s',
            }}
            id="hamburger"
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
=======
          <Link to="/contact" className="modern-cta-btn" id="nav-cta">
            Let's Talk
          </Link>

          <button 
            onClick={() => setMenuOpen(o => !o)}
            className="hamburger-btn"
            id="hamburger"
>>>>>>> origin/linuka_dev
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </nav>

<<<<<<< HEAD
      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 68, left: 0, right: 0, bottom: 0,
          background: 'var(--bg)',
          zIndex: 99,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: 36,
          animation: 'fadeIn 0.2s ease',
          borderTop: '1px solid var(--border)',
        }}>
          {siteData.nav.map((item) => (
            <Link key={item.path} to={item.path} style={{
              fontFamily: 'var(--font-display)',
              fontSize: 28, fontWeight: 800,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: isActive(item.path) ? 'var(--accent)' : 'var(--text)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--accent)'}
            onMouseLeave={e => e.target.style.color = isActive(item.path) ? 'var(--accent)' : 'var(--text)'}
=======
      {/* --- MOBILE MENU OVERLAY --- */}
      {menuOpen && (
        <div className={`mobile-menu-overlay ${theme === 'dark' ? 'menu-dark' : 'menu-light'}`}>
          {siteData.nav.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`mobile-nav-link ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)} 
>>>>>>> origin/linuka_dev
            >
              {item.label}
            </Link>
          ))}
<<<<<<< HEAD
          <Link to="/contact" className="btn-primary" style={{ marginTop: 12 }}>
=======
          <Link 
            to="/contact" 
            className="modern-cta-btn" 
            style={{ marginTop: 20, fontSize: 16 }}
            onClick={() => setMenuOpen(false)} 
          >
>>>>>>> origin/linuka_dev
            Let's Talk
          </Link>
        </div>
      )}

<<<<<<< HEAD
      {/* Inject responsive styles */}
      <style>{`
        @media (max-width: 820px) {
          .nav-desktop { display: none !important; }
          #hamburger { display: flex !important; }
        }
        @media (min-width: 820px) {
          #nav-cta { display: inline-flex !important; }
=======
      <style>{`
        /* --- DYNAMIC THEME CSS LOGIC --- */
        
        .nav-dark .nav-electric-text { animation: nav-text-flicker 3s infinite; }
        .nav-dark .nav-electric-svg { animation: nav-svg-flicker 3s infinite; }
        
        .nav-dark .nav-electric-logo:hover .nav-electric-text { animation: nav-text-flicker-fast 0.5s infinite; }
        .nav-dark .nav-electric-logo:hover .nav-electric-svg { animation: nav-svg-flicker-fast 0.5s infinite; }
        
        .nav-light .nav-electric-text, .nav-light .nav-electric-svg { transition: all 0.3s ease; }

        @keyframes nav-text-flicker {
          0%, 100% { filter: drop-shadow(0 0 8px var(--accent)); color: var(--text); }
          5% { filter: drop-shadow(0 0 2px var(--accent)); color: rgba(255,255,255,0.7); }
          6% { filter: drop-shadow(0 0 10px var(--accent)); color: var(--text); }
          7% { filter: drop-shadow(0 0 2px var(--accent)); }
          8% { filter: drop-shadow(0 0 12px var(--accent)); }
          9% { filter: drop-shadow(0 0 1px var(--accent)); opacity: 0.8; }
          10% { filter: drop-shadow(0 0 8px var(--accent)); opacity: 1; }
        }

        @keyframes nav-svg-flicker {
          0%, 100% { filter: drop-shadow(0 0 5px var(--accent)); opacity: 1; }
          5% { filter: drop-shadow(0 0 1px var(--accent)); opacity: 0.6; }
          6% { filter: drop-shadow(0 0 8px var(--accent)); opacity: 1; }
          7% { opacity: 0.5; }
          8% { filter: drop-shadow(0 0 10px var(--accent)); opacity: 1; }
          9% { opacity: 0.8; }
          10% { opacity: 1; }
        }

        @keyframes nav-text-flicker-fast {
          0%, 100% { filter: drop-shadow(0 0 15px var(--accent)); color: #fff; }
          50% { filter: drop-shadow(0 0 2px var(--accent)); color: rgba(255,255,255,0.8); }
        }
        @keyframes nav-svg-flicker-fast {
          0%, 100% { filter: drop-shadow(0 0 15px var(--accent)); opacity: 1; }
          50% { filter: drop-shadow(0 0 2px var(--accent)); opacity: 0.5; }
        }

        /* Nav Links */
        .modern-nav-link {
          font-family: var(--font-display, 'Syne', sans-serif);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--text2, #a0a0a0);
          text-decoration: none;
          position: relative;
          padding: 8px 0;
          transition: color 0.3s ease;
        }

        .modern-nav-link:hover, .modern-nav-link.active {
          color: var(--accent, #00e5ff);
        }
        
        .nav-dark .modern-nav-link:hover, .nav-dark .modern-nav-link.active {
          text-shadow: 0 0 8px rgba(0, 229, 255, 0.4);
        }
        .nav-light .modern-nav-link:hover, .nav-light .modern-nav-link.active {
          text-shadow: none;
        }

        .modern-nav-link::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: var(--accent, #00e5ff);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
        }

        .modern-nav-link:hover::after, .modern-nav-link.active::after {
          transform: scaleX(1);
          transform-origin: left;
        }
        
        .nav-dark .modern-nav-link::after { box-shadow: 0 0 8px var(--accent, #00e5ff); }
        .nav-light .modern-nav-link::after { box-shadow: none; }

        /* Theme Toggle Button */
        .theme-toggle-btn {
          width: 56px;
          height: 32px;
          background: var(--surface2, rgba(255,255,255,0.05));
          border: 1px solid var(--border, rgba(255,255,255,0.1));
          border-radius: 30px;
          cursor: pointer;
          position: relative;
          display: flex;
          align-items: center;
          padding: 0 4px;
          transition: all 0.3s ease;
        }
        
        .theme-toggle-btn:hover {
          border-color: var(--accent, #00e5ff);
        }
        
        .nav-dark .theme-toggle-btn:hover { box-shadow: 0 0 10px rgba(0, 229, 255, 0.2); }
        .nav-light .theme-toggle-btn:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.08); }

        .theme-toggle-circle {
          width: 24px;
          height: 24px;
          background: var(--accent, #00e5ff);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #000;
          transform: translateX(0);
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
        }

        .theme-toggle-circle.light-mode {
          transform: translateX(22px);
        }
        
        .nav-dark .theme-toggle-circle { box-shadow: 0 0 10px var(--accent, #00e5ff); }
        .nav-light .theme-toggle-circle { box-shadow: 0 2px 6px rgba(0,0,0,0.15); }

        /* Shining CTA Button */
        .modern-cta-btn {
          padding: 10px 24px;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #000 !important;
          background: var(--accent, #00e5ff);
          border-radius: 30px;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-flex; 
          position: relative;
          overflow: hidden;
        }
        
        .nav-dark .modern-cta-btn { box-shadow: 0 4px 15px rgba(0, 229, 255, 0.2); }
        .nav-light .modern-cta-btn { box-shadow: 0 4px 10px rgba(0,0,0,0.1); }

        .modern-cta-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
          transform: skewX(-20deg);
          animation: button-shine 3s infinite;
        }

        @keyframes button-shine {
          0% { left: -100%; }
          20% { left: 200%; }
          100% { left: 200%; }
        }

        .modern-cta-btn:hover {
          transform: translateY(-2px);
          background: #fff;
        }
        
        .nav-dark .modern-cta-btn:hover { box-shadow: 0 6px 20px rgba(0, 229, 255, 0.4); }
        .nav-light .modern-cta-btn:hover { box-shadow: 0 6px 15px rgba(0,0,0,0.15); }

        /* Mobile Menu Elements */
        .hamburger-btn {
          background: none;
          border: none;
          color: var(--text, #fff);
          cursor: pointer;
          display: none;
          transition: color 0.3s ease;
        }
        
        .hamburger-btn:hover {
          color: var(--accent, #00e5ff);
        }

        .mobile-menu-overlay {
          position: fixed;
          top: 0; 
          left: 0;
          right: 0;
          bottom: 0;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 99;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 30px;
          animation: slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          transition: background 0.4s ease;
        }
        
        /* THEME-SPECIFIC OVERLAY BACKGROUNDS */
        .menu-dark { background: rgba(10, 10, 10, 0.95); }
        .menu-light { background: rgba(250, 250, 250, 0.95); }

        .mobile-nav-link {
          font-family: var(--font-display, 'Syne', sans-serif);
          font-size: 28px;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--text, #fff);
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .mobile-nav-link:hover, .mobile-nav-link.active {
          color: var(--accent, #00e5ff);
          transform: scale(1.05);
        }
        
        .menu-dark .mobile-nav-link:hover, .menu-dark .mobile-nav-link.active {
           text-shadow: 0 0 15px rgba(0, 229, 255, 0.4);
        }
        .menu-light .mobile-nav-link:hover, .menu-light .mobile-nav-link.active {
           text-shadow: none;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* --- RESPONSIVE BREAKPOINTS --- */
        @media (max-width: 820px) {
          .nav-desktop { display: none !important; }
          #nav-cta { display: none !important; } 
          #hamburger { display: flex !important; z-index: 102; }
>>>>>>> origin/linuka_dev
        }
      `}</style>
    </>
  );
}
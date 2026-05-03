import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { siteData } from '../data';

/// ─── Gen O Logo (Refactored using Flexbox for perfect alignment) ──
const GenoLogo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
    {/* Text part outside of SVG for consistent rendering across browsers */}
    <span style={{
      fontFamily: "var(--font-display, 'Syne', sans-serif)",
      fontSize: '28px',
      fontWeight: '800',
      letterSpacing: '3px',
      color: 'var(--text)',
      transition: 'color 0.3s ease',
      lineHeight: '1'
    }}>
      GEN
    </span>
    {/* Icon part as a separate standalone SVG */}
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginTop: '-4px' }}>
      {/* Outer Circle */}
      <circle cx="12" cy="12" r="10" stroke="var(--accent)" strokeWidth="2.5" fill="none" />
      {/* Power line */}
      <path d="M12 4 L12 10" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
      {/* Power arc */}
      <path d="M7 7.5 A7.5 7.5 0 1 0 17 7.5" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  </div>
);

// ─── Theme toggle icons ────────────────────────────────────────────
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

// ─── Hamburger / X ────────────────────────────────────────────────
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
    </svg>
  );

export default function Nav({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const isActive = useCallback((path) => location.pathname === path, [location]);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'var(--nav-bg, rgba(15, 15, 15, 0.75))' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid transparent',
        padding: '0 5%',
        height: 80, 
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>

        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <GenoLogo />
        </Link>

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
              </Link>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          
          <button 
            className="theme-toggle-btn"
            onClick={onToggleTheme} 
            title={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
          >
            <span className={`theme-toggle-circle ${theme === 'light' ? 'light-mode' : ''}`}>
              {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
            </span>
          </button>

          <Link to="/contact" className="modern-cta-btn" id="nav-cta">
            Let's Talk
          </Link>

          <button 
            onClick={() => setMenuOpen(o => !o)}
            className="hamburger-btn"
            id="hamburger"
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu-overlay">
          {siteData.nav.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`mobile-nav-link ${isActive(item.path) ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/contact" className="modern-cta-btn" style={{ marginTop: 20, fontSize: 16 }}>
            Let's Talk
          </Link>
        </div>
      )}

      <style>{`
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

        .theme-toggle-btn {
          width: 56px;
          height: 30px;
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
          box-shadow: 0 0 10px rgba(0, 229, 255, 0.2);
        }

        .theme-toggle-circle {
          width: 22px;
          height: 22px;
          background: var(--accent, #00e5ff);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #000;
          transform: translateX(0);
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 0 10px var(--accent, #00e5ff);
        }

        .theme-toggle-circle.light-mode {
          transform: translateX(24px);
        }

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
          box-shadow: 0 4px 15px rgba(0, 229, 255, 0.2);
          display: none; 
        }

        .modern-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 229, 255, 0.4);
          background: #fff;
        }

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
          top: 80px;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(10, 10, 10, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 99;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 30px;
          animation: slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

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

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 820px) {
          .nav-desktop { display: none !important; }
          #hamburger { display: flex !important; }
        }
        @media (min-width: 821px) {
          #nav-cta { display: inline-flex !important; }
        }
      `}</style>
    </>
  );
}
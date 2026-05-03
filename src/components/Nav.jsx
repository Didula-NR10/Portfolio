import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { siteData } from '../data';

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
    </svg>
  );

export default function Nav({ theme, onToggleTheme }) {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const location                  = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  const isActive = useCallback((path) => location.pathname === path, [location]);

  return (
    <>
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
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <GenoLogo />
        </Link>

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
              </Link>
            </li>
          ))}
        </ul>

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
              {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
            </span>
          </button>

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
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </nav>

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
            >
              {item.label}
            </Link>
          ))}
          <Link to="/contact" className="btn-primary" style={{ marginTop: 12 }}>
            Let's Talk
          </Link>
        </div>
      )}

      {/* Inject responsive styles */}
      <style>{`
        @media (max-width: 820px) {
          .nav-desktop { display: none !important; }
          #hamburger { display: flex !important; }
        }
        @media (min-width: 820px) {
          #nav-cta { display: inline-flex !important; }
        }
      `}</style>
    </>
  );
}
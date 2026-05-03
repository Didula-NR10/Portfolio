import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { COMPANY } from '../data';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact', cta: true },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <Link to="/" className="nav-logo">
          {COMPANY.name}
          <span className="dot" />
        </Link>

        <ul className="nav-links">
          {LINKS.map(({ to, label, cta }) => (
            <li key={to}>
              <Link
                to={to}
                className={`${cta ? 'nav-cta' : ''} ${location.pathname === to ? 'active' : ''}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {LINKS.map(({ to, label }) => (
          <Link key={to} to={to}>{label}</Link>
        ))}
      </div>
    </>
  );
}
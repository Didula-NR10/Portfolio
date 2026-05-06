import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { siteData } from '../data';
<<<<<<< HEAD

const GenoLogoSmall = () => (
  <svg width="90" height="30" viewBox="0 0 110 36" fill="none">
    <text x="0" y="30" fontFamily="'Syne', sans-serif" fontSize="32" fontWeight="800"
      letterSpacing="2" fill="var(--logo-dark)">GEN</text>
    <g transform="translate(84, 4)">
      <circle cx="13" cy="14" r="11.5" stroke="var(--accent)" strokeWidth="2.2" fill="none" />
      <path d="M13 4 L13 10" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M8 7.5 A8.5 8.5 0 1 0 18 7.5" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    </g>
  </svg>
);

export default function Footer() {
  const { company, footer } = siteData;

  return (
    <footer style={{
      background: 'var(--bg2)',
      borderTop: '1px solid var(--border)',
      padding: '60px 5% 32px',
      position: 'relative',
      zIndex: 2,
    }}>
      {/* Top row */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 40,
        flexWrap: 'wrap',
        marginBottom: 48,
      }}>
        {/* Brand */}
        <div style={{ maxWidth: 280 }}>
          <GenoLogoSmall />
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            color: 'var(--text2)',
            lineHeight: 1.7,
            marginTop: 14,
          }}>
            {company.description}
          </p>
          {/* Socials */}
          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            {footer.socials.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noreferrer"
                style={{
                  width: 34, height: 34,
                  border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text3)',
                  textDecoration: 'none',
                  fontSize: 11,
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '1px',
                  transition: 'all 0.25s',
                  borderRadius: 2,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.color = 'var(--accent)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.color = 'var(--text3)';
                }}
              >
                {s.label.slice(0, 2).toUpperCase()}
              </a>
            ))}
          </div>
        </div>

        {/* Nav links */}
        <div style={{ display: 'flex', gap: 60, flexWrap: 'wrap' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '2px',
              color: 'var(--accent)', marginBottom: 16, textTransform: 'uppercase' }}>Navigation</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {siteData.nav.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} style={{
                    fontFamily: 'var(--font-body)', fontSize: 14,
                    color: 'var(--text2)', textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text2)'}
                  >{item.label}</Link>
=======

// ─── Animated Electric Gen O Logo (Outer circle removed) ──────────
const GenoLogoSmall = ({ animStage, theme }) => {
  return (
    <div 
      // Add theme-specific class and only apply stage animation if dark mode
      className={`electric-logo-container ${theme === 'dark' ? `stage-${animStage}` : 'light-mode-logo'}`}
      style={{ display: 'flex', alignItems: 'center', gap: '2px' }} 
    >
      <span className="electric-text" style={{
        fontFamily: "var(--font-display, 'Syne', sans-serif)",
        fontSize: '26px',
        fontWeight: '800',
        letterSpacing: '3px',
        color: 'var(--text)',
        lineHeight: '1',
      }}>GEN</span>
      <svg 
        className="electric-svg-icon"
        width="26" height="26" viewBox="0 0 24 24" fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        style={{ marginTop: '-4px', overflow: 'visible' }}
      >
        {/* Outer circle removed. Only the power icon lines remain */}
        <path className="electric-svg-path" d="M12 4 L12 10" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
        <path className="electric-svg-path" d="M7 7.5 A7.5 7.5 0 1 0 17 7.5" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
};

// Accept 'theme' as a prop
export default function Footer({ theme }) {
  const { company, footer } = siteData;
  const [localTime, setLocalTime] = useState('');
  
  const [animStage, setAnimStage] = useState(0); 
  const footerRef = useRef(null);

  // Auto-updating live clock for Colombo Time
  useEffect(() => {
    const updateTime = () => {
      const timeString = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Colombo',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      setLocalTime(`${timeString} (LK)`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for the Epic Lightning Strike
  useEffect(() => {
    // Only run lightning observer if in dark mode
    if (theme !== 'dark') {
       setAnimStage(0);
       return;
    }

    let strikeTimer;
    let settleTimer;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setAnimStage(0); 
        
        strikeTimer = setTimeout(() => {
          setAnimStage(1); 
          
          settleTimer = setTimeout(() => {
            setAnimStage(2); 
          }, 1000);

        }, 2500); 

      } else {
        clearTimeout(strikeTimer);
        clearTimeout(settleTimer);
        setAnimStage(0);
      }
    }, { threshold: 0.2 });

    if (footerRef.current) observer.observe(footerRef.current);
    
    return () => {
      observer.disconnect();
      clearTimeout(strikeTimer);
      clearTimeout(settleTimer);
    };
  }, [theme]); // Re-run effect when theme changes

  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer 
        ref={footerRef} 
        // Dynamic class based on theme
        className={`modern-footer ${theme === 'dark' ? 'footer-dark' : 'footer-light'} ${animStage === 1 && theme === 'dark' ? 'footer-lightning-strike' : ''}`}
      >
        <div className="footer-grid-bg"></div>
        <div className="footer-glow-line"></div>

        <div style={{
          padding: '80px 5% 40px',
          position: 'relative',
          zIndex: 2,
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {/* Top row */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 60,
            flexWrap: 'wrap',
            marginBottom: 60,
          }}>
            
            {/* Brand Section */}
            <div style={{ maxWidth: 320, position: 'relative' }}>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <GenoLogoSmall animStage={animStage} theme={theme} />
              </Link>
              
              <div className="availability-badge">
                <span className="pulse-dot"></span>
                Available for Freelance
              </div>

              <p style={{
                fontFamily: 'var(--font-body, sans-serif)',
                fontSize: 15,
                color: 'var(--text2, #9ca3af)',
                lineHeight: 1.8,
                marginTop: 20,
              }}>
                {company.description}
              </p>
              
              <div style={{ display: 'flex', gap: 16, marginTop: 32 }}>
                {footer.socials.map((s) => (
                  <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="social-glass-btn" title={s.label}>
                    {s.label.slice(0, 2).toUpperCase()}
                  </a>
                ))}
              </div>
            </div>

            {/* Nav links & Contact */}
            <div style={{ display: 'flex', gap: 80, flexWrap: 'wrap' }}>
              <div>
                <p className="footer-heading">Navigation</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16, padding: 0 }}>
                  {siteData.nav.map((item) => (
                    <li key={item.path}>
                      <Link to={item.path} className="footer-animated-link">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="footer-heading">Contact</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16, padding: 0 }}>
                  <li>
                    <a href={`mailto:${company.email}`} className="footer-animated-link" style={{ textTransform: 'none' }}>
                      {company.email}
                    </a>
                  </li>
                  <li className="footer-contact-text">{company.phone}</li>
                  <li className="footer-time-widget">
                    <span style={{ color: 'var(--text3)' }}>Local Time: </span>
                    <span style={{ color: 'var(--accent)', fontWeight: '600', letterSpacing: '1px' }}>{localTime}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Divider */}
          <div className="footer-bottom-bar">
            <p style={{ 
              fontFamily: 'var(--font-mono, monospace)', 
              fontSize: 12, 
              color: 'var(--text3, #6b7280)', 
              letterSpacing: '1px' 
            }}>
              © {currentYear} {company.name}. Crafted with intent.
            </p>
            
            <ul style={{ listStyle: 'none', display: 'flex', gap: 30, padding: 0, margin: 0, flexWrap: 'wrap' }}>
              {footer.links.map((l) => (
                <li key={l.label}>
                  <a href={l.path} className="footer-bottom-link">
                    {l.label}
                  </a>
>>>>>>> origin/linuka_dev
                </li>
              ))}
            </ul>
          </div>
<<<<<<< HEAD

          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '2px',
              color: 'var(--accent)', marginBottom: 16, textTransform: 'uppercase' }}>Contact</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <li style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)' }}>{company.email}</li>
              <li style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)' }}>{company.phone}</li>
              <li style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)' }}>{company.address}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text3)', letterSpacing: '1px' }}>
          © {company.year} {company.name}. Crafted with intent.
        </p>
        <ul style={{ listStyle: 'none', display: 'flex', gap: 24 }}>
          {footer.links.map((l) => (
            <li key={l.label}>
              <a href={l.path} style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '1px',
                color: 'var(--text3)', textDecoration: 'none', transition: 'color 0.2s',
                textTransform: 'uppercase',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--accent)'}
              onMouseLeave={e => e.target.style.color = 'var(--text3)'}
              >{l.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
=======
        </div>
      </footer>

      {/* Modern CSS Animations & Effects */}
      <style>{`
        /* --- DYNAMIC THEME CSS --- */
        .modern-footer {
          position: relative;
          overflow: hidden;
          transition: background 0.4s ease;
        }
        
        .footer-dark {
          background: linear-gradient(180deg, var(--bg, #07090D) 0%, var(--bg2, #0A0C10) 100%);
        }
        .footer-light {
           background: var(--bg2); /* Clean solid background for light mode */
        }

        /* Top Line / Glow */
        .footer-glow-line {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 80%;
          height: 1px;
          z-index: 2;
          transition: all 0.4s ease;
        }
        
        .footer-dark .footer-glow-line {
          background: linear-gradient(90deg, transparent, var(--accent, #00e5ff), transparent);
          opacity: 0.4;
          box-shadow: 0 0 20px 2px var(--accent, #00e5ff);
        }
        
        .footer-light .footer-glow-line {
          background: var(--border);
          opacity: 1;
          box-shadow: none;
          width: 100%;
        }

        /* --- THE MASSIVE FOOTER LIGHTNING STRIKE (DARK ONLY) --- */
        .footer-lightning-strike::after {
          content: '';
          position: absolute;
          inset: 0;
          background: #fff;
          pointer-events: none;
          z-index: 99;
          animation: massive-sky-flash 1s ease-out forwards;
        }

        .footer-lightning-strike::before {
          content: '';
          position: absolute;
          top: 90px;
          left: 0; right: 0;
          height: 2px;
          background: #fff;
          box-shadow: 0 0 20px 10px #00e5ff, 0 0 50px 20px #fff;
          pointer-events: none;
          z-index: 100;
          animation: lightning-beam 1s forwards;
        }

        @keyframes massive-sky-flash {
          0% { background: rgba(255,255,255,0); }
          5% { background: rgba(0, 229, 255, 0.4); }
          10% { background: rgba(255,255,255,0.9); }
          15% { background: rgba(255,255,255,0); }
          20% { background: rgba(0, 229, 255, 0.8); }
          25% { background: rgba(255,255,255,0); }
          30% { background: rgba(255,255,255,0.2); }
          100% { background: rgba(255,255,255,0); }
        }

        @keyframes lightning-beam {
          0% { transform: scaleX(0); opacity: 0; }
          5% { transform: scaleX(1); opacity: 1; }
          10% { opacity: 0; }
          15% { opacity: 1; }
          20% { opacity: 0; }
          100% { opacity: 0; }
        }

        /* --- LOGO STAGES (DARK ONLY) --- */
        .electric-logo-container.stage-0 {
          opacity: 0;
          visibility: hidden;
        }

        .electric-logo-container.stage-1 {
          opacity: 1;
          visibility: visible;
          animation: logo-epic-strike 1s forwards;
        }
        .electric-logo-container.stage-1 .electric-text {
          color: #fff;
        }
        .electric-logo-container.stage-1 .electric-svg-path {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: epic-svg-draw 1s ease-out forwards;
        }

        @keyframes logo-epic-strike {
          0% { transform: scale(0.8) skewX(10deg); filter: drop-shadow(0 0 0px #fff); }
          5% { transform: scale(1.1) skewX(-10deg); filter: drop-shadow(0 0 60px #00e5ff) drop-shadow(0 0 100px #fff); }
          15% { transform: scale(1) skewX(0); filter: drop-shadow(0 0 0px #fff); }
          20% { filter: drop-shadow(0 0 40px #00e5ff); }
          100% { filter: drop-shadow(0 0 8px #00e5ff); }
        }

        @keyframes epic-svg-draw {
          0% { stroke-dashoffset: 100; stroke: #fff; }
          5% { stroke-dashoffset: 0; stroke: #fff; }
          100% { stroke-dashoffset: 0; stroke: var(--accent); }
        }

        .electric-logo-container.stage-2 {
          opacity: 1;
          visibility: visible;
        }
        .electric-logo-container.stage-2 .electric-text {
          animation: text-flicker 3s infinite;
        }
        .electric-logo-container.stage-2 .electric-svg-icon {
          animation: svg-flicker 3s infinite;
        }

        @keyframes text-flicker {
          0%, 100% { filter: drop-shadow(0 0 8px var(--accent)); color: var(--text); }
          5% { filter: drop-shadow(0 0 2px var(--accent)); color: rgba(255,255,255,0.7); }
          6% { filter: drop-shadow(0 0 10px var(--accent)); color: var(--text); }
          7% { filter: drop-shadow(0 0 2px var(--accent)); }
          8% { filter: drop-shadow(0 0 12px var(--accent)); }
          9% { filter: drop-shadow(0 0 1px var(--accent)); opacity: 0.8; }
          10% { filter: drop-shadow(0 0 8px var(--accent)); opacity: 1; }
        }

        @keyframes svg-flicker {
          0%, 100% { filter: drop-shadow(0 0 5px var(--accent)); opacity: 1; }
          5% { filter: drop-shadow(0 0 1px var(--accent)); opacity: 0.6; }
          6% { filter: drop-shadow(0 0 8px var(--accent)); opacity: 1; }
          7% { opacity: 0.5; }
          8% { filter: drop-shadow(0 0 10px var(--accent)); opacity: 1; }
          9% { opacity: 0.8; }
          10% { opacity: 1; }
        }

        /* --- LOGO (LIGHT MODE) --- */
        .electric-logo-container.light-mode-logo {
           opacity: 1;
           visibility: visible;
        }
        .light-mode-logo .electric-text {
           color: var(--text);
           transition: color 0.3s ease;
        }
        /* Clean transitions, no glowing */
        .light-mode-logo .electric-svg-icon {
           transition: all 0.3s ease;
        }


        /* -------------------------------------- */

        .footer-grid-bg {
          position: absolute;
          inset: 0;
          background-size: 40px 40px;
          background-image: 
            linear-gradient(to right, rgba(128, 128, 128, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(128, 128, 128, 0.05) 1px, transparent 1px);
          mask-image: linear-gradient(to bottom, transparent, black 10%, transparent 90%);
          -webkit-mask-image: linear-gradient(to bottom, transparent, black 10%, transparent 90%);
          z-index: 1;
          pointer-events: none;
        }

        .availability-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 16px;
          padding: 6px 14px;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 30px;
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          color: #10b981;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .pulse-dot {
          width: 8px;
          height: 8px;
          background-color: #10b981;
          border-radius: 50%;
          position: relative;
        }

        .pulse-dot::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background-color: #10b981;
          border-radius: 50%;
          animation: pulse-animation 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse-animation {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(3); opacity: 0; }
        }

        /* Time Widget Dynamic Theming */
        .footer-time-widget {
          font-family: var(--font-mono, monospace);
          font-size: 13px;
          padding: 8px 12px;
          border-radius: 6px;
          border-left: 2px solid var(--accent, #00e5ff);
          display: inline-block;
          margin-top: 4px;
          transition: background 0.3s ease;
        }
        .footer-dark .footer-time-widget { background: rgba(255,255,255,0.03); }
        .footer-light .footer-time-widget { background: rgba(0,0,0,0.03); }

        .footer-heading {
          font-family: var(--font-display, 'Syne', sans-serif);
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          margin-bottom: 24px;
          background: linear-gradient(90deg, var(--text) 0%, var(--accent) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .footer-animated-link {
          font-family: var(--font-body, sans-serif);
          font-size: 15px;
          color: var(--text2, #9ca3af);
          text-decoration: none;
          display: inline-block;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-transform: capitalize;
        }

        .footer-animated-link:hover {
          color: var(--accent, #00e5ff);
          transform: translateX(8px);
        }

        .footer-contact-text {
          font-family: var(--font-body, sans-serif);
          font-size: 15px;
          color: var(--text2, #9ca3af);
        }

        /* Social Buttons Dynamic Theming */
        .social-glass-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(128, 128, 128, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text);
          text-decoration: none;
          font-size: 12px;
          font-family: var(--font-mono, monospace);
          font-weight: 600;
          letter-spacing: 1px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          backdrop-filter: blur(10px);
        }
        
        .footer-dark .social-glass-btn { background: rgba(255, 255, 255, 0.03); }
        .footer-light .social-glass-btn { background: var(--surface); }

        .social-glass-btn:hover {
          background: var(--accent, #00e5ff);
          color: #000;
          border-color: var(--accent, #00e5ff);
          transform: translateY(-5px);
        }
        .footer-dark .social-glass-btn:hover { box-shadow: 0 10px 20px -5px rgba(0, 229, 255, 0.4); }
        .footer-light .social-glass-btn:hover { box-shadow: 0 10px 15px -5px rgba(0, 0, 0, 0.1); }

        .footer-bottom-bar {
          border-top: 1px solid var(--border);
          padding-top: 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
        }

        .footer-bottom-link {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 1.5px;
          color: var(--text3, #6b7280);
          text-decoration: none;
          text-transform: uppercase;
          transition: color 0.3s ease;
        }

        .footer-bottom-link:hover {
          color: var(--accent, #00e5ff);
        }

        @media (max-width: 768px) {
          .footer-glow-line { width: 100%; }
          .footer-bottom-bar { flex-direction: column; text-align: center; justify-content: center; }
          .footer-bottom-bar ul { justify-content: center; }
        }
      `}</style>
    </>
>>>>>>> origin/linuka_dev
  );
}
import { Link } from 'react-router-dom';
import { siteData } from '../data';

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
                </li>
              ))}
            </ul>
          </div>

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
  );
}
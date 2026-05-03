import { Link } from 'react-router-dom';
import { COMPANY } from '../data';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-copy">
          © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
        </p>
        <nav className="footer-links">
          <Link to="/projects">Projects</Link>
          <Link to="/services">Services</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
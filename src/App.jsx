import { useState, useEffect, useRef, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Nav     from './components/Nav';
import Footer  from './components/Footer';
import Home    from './pages/Home';
import Projects from './pages/Projects';
import Services from './pages/Services';
import About   from './pages/About';
import Contact  from './pages/Contact';
import './index.css';

// ─── Custom Cursor ──────────────────────────────────────────────────
function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const posRef  = useRef({ mx: 0, my: 0, rx: 0, ry: 0 });

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e) => {
      posRef.current.mx = e.clientX;
      posRef.current.my = e.clientY;
      dot.style.left = e.clientX + 'px';
      dot.style.top  = e.clientY + 'px';
    };

    let raf;
    const animate = () => {
      const { mx, my, rx, ry } = posRef.current;
      posRef.current.rx = rx + (mx - rx) * 0.11;
      posRef.current.ry = ry + (my - ry) * 0.11;
      ring.style.left = posRef.current.rx + 'px';
      ring.style.top  = posRef.current.ry + 'px';
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const expand = () => { dot.classList.add('expand'); ring.classList.add('expand'); };
    const shrink = () => { dot.classList.remove('expand'); ring.classList.remove('expand'); };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
      el.addEventListener('mouseenter', expand);
      el.addEventListener('mouseleave', shrink);
    });

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

// ─── Scroll to top on route change ─────────────────────────────────
function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
  return null;
}

// ─── Page transition wrapper ────────────────────────────────────────
function PageWrapper({ children }) {
  const { pathname } = useLocation();
  return (
    <div key={pathname} style={{ animation: 'fadeUp 0.45s cubic-bezier(0.16,1,0.3,1)' }}>
      {children}
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────
function AppInner() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('geno-theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const toggleTheme = useCallback(() => {
    setTheme((t) => {
      const next = t === 'dark' ? 'light' : 'dark';
      localStorage.setItem('geno-theme', next);
      return next;
    });
  }, []);

  // Apply theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <>
      <CustomCursor />
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <PageWrapper>
          <Routes>
            <Route path="/"        element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about"    element={<About />} />
            <Route path="/contact"  element={<Contact />} />
          </Routes>
        </PageWrapper>
      </main>
      {/* Theme prop passed to Footer here */}
      <Footer theme={theme} />
      <ScrollReset />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppInner />
    </Router>
  );
}
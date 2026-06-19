import { lazy, Suspense, useEffect } from 'react';
import { usePortfolio } from './context/PortfolioContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SmoothScroll from './components/SmoothScroll';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import MouseGlow from './components/MouseGlow';
import DynamicBackground from './components/DynamicBackground';

const CustomCursor = lazy(() => import('./components/CustomCursor'));

const isMobileTouch = typeof window !== 'undefined' && window.innerWidth <= 768 && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function applyColors(colors) {
  const root = document.documentElement;
  const theme = root.getAttribute('data-theme') || 'dark';
  const p = colors[`${theme}_accent_primary`];
  const s = colors[`${theme}_accent_secondary`];
  const t = colors[`${theme}_accent_tertiary`];
  if (!p) return;
  root.style.setProperty('--accent-primary', p);
  root.style.setProperty('--accent-secondary', s);
  root.style.setProperty('--accent-tertiary', t);
  root.style.setProperty('--gradient-main', `linear-gradient(135deg, ${p}, ${s})`);
  root.style.setProperty('--gradient-warm', `linear-gradient(135deg, ${p}, ${t})`);
  root.style.setProperty('--border-color', hexToRgba(p, 0.12));
  root.style.setProperty('--border-hover', hexToRgba(p, 0.25));
  root.style.setProperty('--glass-border', hexToRgba(p, 0.08));
  root.style.setProperty('--glass-bg', theme === 'dark' ? hexToRgba(p, 0.06) : 'rgba(255,255,255,0.7)');
}

export default function App() {
  const { colors } = usePortfolio();

  useEffect(() => {
    applyColors(colors);
    const observer = new MutationObserver(() => applyColors(colors));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, [colors]);

  return (
    <SmoothScroll>
      <ScrollProgress />
      <Suspense fallback={null}>
        <CustomCursor />
      </Suspense>
      {!isMobileTouch && <MouseGlow />}
      {!isMobileTouch && <DynamicBackground />}
      <BackToTop />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX, HiSun, HiMoon } from 'react-icons/hi';
import { useTheme } from '../context/ThemeContext';
import ScrollProgress from './ScrollProgress';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

function scrollWithOffset(href) {
  const id = href.replace('#', '');
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileOpen]);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    scrollWithOffset(href);
  }, []);

  const handleLogoClick = useCallback((e) => {
    e.preventDefault();
    setMobileOpen(false);
    scrollWithOffset('#hero');
  }, []);

  return (
    <>
      <ScrollProgress />
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: 'var(--nav-height, 72px)',
          display: 'flex',
          alignItems: 'center',
          background: scrolled ? 'var(--nav-bg)' : 'transparent',
          backdropFilter: 'blur(24px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
          borderBottom: '1px solid var(--border-color)',
          borderBottomColor: scrolled ? 'var(--border-color)' : 'transparent',
          transition: 'background 0.35s ease, border-bottom-color 0.35s ease',
          willChange: 'background',
        }}
      >
        <div className="container" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <motion.a
            href="#hero"
            onClick={handleLogoClick}
            whileHover={{ scale: 1.02 }}
            style={{ fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.03em', cursor: 'pointer' }}
          >
            <span className="gradient-text">Nishanth</span>
            <span style={{ color: 'var(--accent-primary)' }}>.</span>
          </motion.a>

          <nav style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <ul style={{ display: 'flex', gap: 4, alignItems: 'center' }} className="desktop-nav">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    style={{
                      padding: '8px 18px',
                      borderRadius: '9999px',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      color: activeSection === link.href.slice(1) ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      background: activeSection === link.href.slice(1) ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
                      transition: 'color 0.25s ease, background 0.25s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      if (activeSection !== link.href.slice(1)) {
                        e.currentTarget.style.color = 'var(--text-primary)';
                        e.currentTarget.style.background = 'rgba(99, 102, 241, 0.04)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeSection !== link.href.slice(1)) {
                        e.currentTarget.style.color = 'var(--text-secondary)';
                        e.currentTarget.style.background = 'transparent';
                      }
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              style={{
                padding: 8,
                borderRadius: 9999,
                background: 'rgba(99, 102, 241, 0.06)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-secondary)',
                fontSize: '1.1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'border-color 0.25s ease, color 0.25s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent-primary)'; e.currentTarget.style.borderColor = 'var(--accent-primary)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
            >
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{ display: 'flex' }}
              >
                {theme === 'dark' ? <HiSun /> : <HiMoon />}
              </motion.div>
            </motion.button>

            <button
              onClick={() => setMobileOpen(true)}
              className="mobile-menu-btn"
              aria-label="Open menu"
              style={{
                display: 'none',
                background: 'none',
                color: 'var(--text-primary)',
                fontSize: '1.4rem',
                padding: 8,
                cursor: 'pointer',
              }}
            >
              <HiMenuAlt3 />
            </button>
          </nav>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .desktop-nav { display: none !important; }
            .mobile-menu-btn { display: flex !important; }
          }
        `}</style>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1001,
              background: 'var(--mobile-overlay)',
              backdropFilter: 'blur(32px)',
              WebkitBackdropFilter: 'blur(32px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              style={{
                position: 'absolute',
                top: 24,
                right: 24,
                background: 'none',
                color: 'var(--text-primary)',
                fontSize: '1.6rem',
                padding: 8,
                cursor: 'pointer',
              }}
            >
              <HiX />
            </button>
            <nav>
              <ul style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.3, ease: 'easeOut' }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      style={{
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        color: activeSection === link.href.slice(1) ? 'var(--accent-primary)' : 'var(--text-muted)',
                        transition: 'color 0.2s',
                        cursor: 'pointer',
                        textDecoration: 'none',
                      }}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.07, duration: 0.3 }}
                >
                  <motion.button
                    onClick={() => { toggleTheme(); setMobileOpen(false); }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      padding: '12px 24px',
                      borderRadius: 9999,
                      background: 'var(--gradient-main)',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      cursor: 'pointer',
                      border: 'none',
                    }}
                  >
                    {theme === 'dark' ? <HiSun /> : <HiMoon />}
                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                  </motion.button>
                </motion.li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

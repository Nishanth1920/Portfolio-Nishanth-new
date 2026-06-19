import { useCallback, useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { HiArrowRight } from 'react-icons/hi';
import { personalInfo } from '../data/portfolioData';

function AnimatedStat({ value, label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const target = parseInt(value);
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    if (!isInView) return;
    let start = null;
    const duration = 1500;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);

  return (
    <div ref={ref}>
      <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4, fontWeight: 500 }}>
        {label}
      </div>
    </div>
  );
}

export default function Hero() {

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 'var(--nav-height, 72px)',
      }}
    >
      {/* Aurora Background */}
      <div className="aurora-bg">
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="aurora aurora-3" />
        <div className="aurora-overlay" />
      </div>

      {/* Particle Network */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1,
        }}
        options={{
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: 'grab',
              },
            },
            modes: {
              grab: {
                distance: 140,
                links: {
                  opacity: 0.3,
                },
              },
            },
          },
          particles: {
            color: { value: '#6366f1' },
            links: {
              color: '#6366f1',
              distance: 120,
              enable: true,
              opacity: 0.12,
              width: 1,
            },
            move: {
              enable: true,
              speed: 0.6,
              direction: 'none',
              random: true,
              straight: false,
            },
            number: {
              density: { enable: true },
              value: 80,
            },
            opacity: {
              value: 0.3,
            },
            size: {
              value: { min: 1, max: 2.5 },
            },
          },
          detectRetina: true,
        }}
      />

      {/* Content */}
      <div className="container" style={{ width: '100%', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 80, justifyContent: 'space-between' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ maxWidth: 620 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '5px 16px 5px 5px',
                borderRadius: '9999px',
                background: 'rgba(99, 102, 241, 0.08)',
                border: '1px solid rgba(99, 102, 241, 0.12)',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                marginBottom: 36,
              }}
            >
              <span
                style={{
                  padding: '2px 10px',
                  borderRadius: '9999px',
                  background: 'var(--gradient-main)',
                  color: 'white',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  letterSpacing: 0.5,
                }}
              >
                OPEN
              </span>
              Available for new opportunities
            </motion.div>

            <h1
              style={{
                fontSize: 'clamp(2.2rem, 5.2vw, 4rem)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.04em',
                marginBottom: 16,
              }}
            >
              <span style={{ display: 'block' }}>
                Hi, I'm{' '}
                <motion.span
                  className="gradient-text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: 'inline-block' }}
                >
                  {personalInfo.name}
                </motion.span>
              </span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                color: 'var(--accent-primary)',
                fontWeight: 600,
                marginBottom: 12,
                letterSpacing: '-0.01em',
              }}
            >
              {personalInfo.title}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: '1.1rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                maxWidth: 500,
                marginBottom: 20,
              }}
            >
              {personalInfo.tagline}
            </motion.p>

            <motion.div
              className="marquee-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              style={{ marginBottom: 32, maxWidth: 500 }}
            >
              <div className="marquee-track">
                <div className="marquee-content">
                  <span>API Integration</span><span className="dot">•</span>
                  <span>System Design</span><span className="dot">•</span>
                  <span>Product Building</span><span className="dot">•</span>
                  <span>Workflow Automation</span><span className="dot">•</span>
                  <span>Scalable Architecture</span><span className="dot">•</span>
                  <span>Payment Integrations</span><span className="dot">•</span>
                  <span>Database Optimization</span><span className="dot">•</span>
                  <span>SaaS Development</span><span className="dot">•</span>
                  <span>Performance Engineering</span><span className="dot">•</span>
                </div>
                <div className="marquee-content" aria-hidden="true">
                  <span>API Integration</span><span className="dot">•</span>
                  <span>System Design</span><span className="dot">•</span>
                  <span>Product Building</span><span className="dot">•</span>
                  <span>Workflow Automation</span><span className="dot">•</span>
                  <span>Scalable Architecture</span><span className="dot">•</span>
                  <span>Payment Integrations</span><span className="dot">•</span>
                  <span>Database Optimization</span><span className="dot">•</span>
                  <span>SaaS Development</span><span className="dot">•</span>
                  <span>Performance Engineering</span><span className="dot">•</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="hero-stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', gap: 36, marginBottom: 40 }}
            >
              {[
                { label: 'Years Exp', value: '4+' },
                { label: 'Projects', value: '15+' },
                { label: 'Clients', value: '20+' },
              ].map((s) => (
                <AnimatedStat key={s.label} value={s.value} label={s.label} />
              ))}
            </motion.div>

            <motion.div
              className="hero-btns"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}
            >
              <a
                href="#projects"
                className="btn-primary"
                style={{ padding: '14px 32px', fontSize: '0.95rem' }}
              >
                View My Work <HiArrowRight />
              </a>
              <a
                href="#contact"
                className="btn-secondary"
                style={{ padding: '14px 32px', fontSize: '0.95rem' }}
              >
                Get in Touch
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hero-avatar"
            style={{ position: 'relative' }}
          >
            <div className="avatar-blob" />
            <div
              style={{
                width: 280,
                height: 280,
                borderRadius: '50%',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  filter: 'grayscale(0.3) contrast(1.05)',
                  transition: 'filter 0.4s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.filter = 'grayscale(0) contrast(1)' }}
                onMouseLeave={(e) => { e.currentTarget.style.filter = 'grayscale(0.3) contrast(1.05)' }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement.style.background = 'var(--bg-tertiary)';
                  e.currentTarget.parentElement.innerHTML = `<span style="font-size:5rem;color:var(--text-muted);font-weight:800;display:flex;align-items:center;justify-content:center;height:100%">${personalInfo.name.charAt(0)}</span>`;
                }}
              />
            </div>
            <div className="avatar-ring" />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          color: 'var(--text-muted)',
          fontSize: '0.7rem',
          fontWeight: 500,
          letterSpacing: 2,
          textTransform: 'uppercase',
          zIndex: 2,
        }}
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: 24, background: 'var(--text-muted)', opacity: 0.4 }}
        />
      </motion.div>

      <style>{`
        .aurora-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }
        .aurora {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.4;
          animation: aurora-drift 60s ease-in-out infinite alternate;
        }
        .aurora-1 {
          width: 700px;
          height: 700px;
          background: radial-gradient(circle, rgba(139,92,246,0.3), transparent 70%);
          top: -200px;
          left: -200px;
          animation-duration: 55s;
        }
        .aurora-2 {
          width: 550px;
          height: 550px;
          background: radial-gradient(circle, rgba(59,130,246,0.25), transparent 70%);
          bottom: -180px;
          right: -120px;
          animation-duration: 65s;
          animation-delay: -10s;
        }
        .aurora-3 {
          width: 450px;
          height: 450px;
          background: radial-gradient(circle, rgba(6,182,212,0.2), transparent 70%);
          top: 30%;
          left: 40%;
          animation-duration: 50s;
          animation-delay: -20s;
        }
        .aurora-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 50%, transparent 30%, var(--bg-primary) 80%);
        }
        @keyframes aurora-drift {
          0% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(80px, -60px) scale(1.1); }
          50% { transform: translate(-60px, 80px) scale(0.95); }
          75% { transform: translate(60px, 40px) scale(1.05); }
          100% { transform: translate(-40px, -30px) scale(1); }
        }
        @media (max-width: 900px) {
          .hero-avatar { display: none; }
        }
        .avatar-ring {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: conic-gradient(from 0deg, #6366f1, #8b5cf6, #06b6d4, #a78bfa, #6366f1);
          mask: radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px));
          -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px));
          animation: ring-spin 25s linear infinite;
          pointer-events: none;
          z-index: 1;
        }
        .avatar-blob {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 340px;
          height: 340px;
          transform: translate(-50%, -50%);
          border-radius: 60% 40% 70% 30% / 45% 55% 45% 55%;
          background: linear-gradient(135deg, rgba(139,92,246,0.25), rgba(99,102,241,0.15));
          filter: blur(60px);
          animation: blob-morph 12s ease-in-out infinite alternate;
          pointer-events: none;
          z-index: 0;
        }
        @keyframes blob-morph {
          0% { border-radius: 60% 40% 70% 30% / 45% 55% 45% 55%; transform: translate(-50%, -50%) scale(1) rotate(0deg); }
          33% { border-radius: 40% 60% 30% 70% / 55% 45% 55% 45%; transform: translate(-50%, -50%) scale(1.08) rotate(5deg); }
          66% { border-radius: 70% 30% 50% 50% / 30% 60% 40% 70%; transform: translate(-50%, -50%) scale(0.95) rotate(-3deg); }
          100% { border-radius: 30% 70% 40% 60% / 60% 40% 70% 30%; transform: translate(-50%, -50%) scale(1.05) rotate(4deg); }
        }
        @keyframes ring-spin {
          to { transform: rotate(360deg); }
        }
        .marquee-wrap {
          width: 100%;
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%);
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
        }
        .marquee-wrap:hover .marquee-track {
          animation-play-state: paused;
        }
        .marquee-content {
          display: flex;
          align-items: center;
          gap: 0;
          white-space: nowrap;
        }
        .marquee-content span {
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.3px;
          color: var(--accent);
          opacity: 0.7;
          transition: opacity 0.2s ease;
        }
        .marquee-track:hover span {
          opacity: 1;
        }
        .marquee-content .dot {
          margin: 0 10px;
          font-size: 0.65rem;
          color: var(--accent);
          opacity: 0.35;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (max-width: 768px) {
          .hero-inner { flex-direction: column; gap: 32px !important; text-align: center; }
          .hero-content { max-width: 100% !important; }
          .hero-text { margin-left: auto; margin-right: auto; }
          .hero-btns { justify-content: center; }
          .hero-stats { justify-content: center; gap: 32px !important; margin-top: 48px !important; }
          .hero-stats div { font-size: 1.6rem !important; }
          .marquee-content span { font-size: 0.75rem; }
        }
      `}</style>
    </section>
  );
}

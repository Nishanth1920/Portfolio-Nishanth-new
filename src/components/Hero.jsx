import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
import { personalInfo } from '../data/portfolioData';

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 'var(--nav-height, 72px)',
      }}
    >
      <div className="hero-bg">
        <div
          className="hero-glow glow-1"
          style={{
            position: 'absolute',
            width: 700, height: 700,
            borderRadius: '50%',
            filter: 'blur(80px)',
            background: 'radial-gradient(circle at 40% 40%, rgba(99,102,241,0.3), transparent 70%)',
            top: -200, left: -200,
          }}
        />
        <div
          className="hero-glow glow-2"
          style={{
            position: 'absolute',
            width: 500, height: 500,
            borderRadius: '50%',
            filter: 'blur(80px)',
            background: 'radial-gradient(circle at 60% 60%, rgba(6,182,212,0.2), transparent 70%)',
            bottom: -150, right: -100,
          }}
        />
        <div
          className="hero-glow glow-3"
          style={{
            position: 'absolute',
            width: 400, height: 400,
            borderRadius: '50%',
            filter: 'blur(80px)',
            background: 'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.18), transparent 70%)',
            top: '40%', left: '50%',
          }}
        />
        <div className="hero-storm">
          {[
            [5, 10, 2, '#6366f1', 18, 0.4],
            [15, 30, 3, '#8b5cf6', 22, 0.3],
            [25, 50, 1.5, '#06b6d4', 14, 0.5],
            [35, 20, 2.5, '#a855f7', 20, 0.4],
            [45, 70, 2, '#6366f1', 16, 0.6],
            [55, 40, 3, '#06b6d4', 25, 0.3],
            [65, 80, 1.5, '#8b5cf6', 19, 0.5],
            [75, 15, 2, '#6366f1', 15, 0.4],
            [85, 60, 2.5, '#a855f7', 21, 0.3],
            [10, 85, 3, '#06b6d4', 23, 0.4],
            [30, 5, 1.5, '#6366f1', 17, 0.5],
            [50, 90, 2, '#8b5cf6', 14, 0.6],
            [70, 35, 2.5, '#a855f7', 20, 0.3],
            [90, 55, 1.5, '#6366f1', 18, 0.5],
            [20, 75, 3, '#06b6d4', 22, 0.4],
            [40, 95, 2, '#8b5cf6', 16, 0.3],
            [60, 25, 1.5, '#6366f1', 24, 0.5],
            [80, 65, 2.5, '#a855f7', 15, 0.4],
            [5, 45, 2, '#06b6d4', 20, 0.6],
            [95, 5, 3, '#6366f1', 25, 0.3],
            [22, 88, 1.5, '#8b5cf6', 13, 0.5],
            [48, 12, 2.5, '#a855f7', 19, 0.4],
            [72, 72, 2, '#06b6d4', 21, 0.3],
            [88, 42, 1.5, '#6366f1', 17, 0.5],
            [12, 60, 3, '#8b5cf6', 23, 0.4],
            [38, 82, 2, '#a855f7', 14, 0.6],
            [62, 18, 2.5, '#6366f1', 18, 0.3],
            [82, 48, 1.5, '#06b6d4', 22, 0.5],
            [18, 35, 2, '#8b5cf6', 16, 0.4],
            [92, 78, 3, '#6366f1', 24, 0.3],
            [42, 52, 2, '#06b6d4', 15, 0.5],
            [68, 8, 1.5, '#a855f7', 20, 0.4],
            [8, 92, 2.5, '#6366f1', 19, 0.6],
            [78, 30, 2, '#8b5cf6', 21, 0.3],
            [52, 68, 3, '#06b6d4', 17, 0.5],
            [32, 15, 1.5, '#6366f1', 23, 0.4],
          ].map((p, i) => (
            <div
              key={i}
              className="storm-particle"
              style={{
                left: `${p[0]}%`,
                top: `${p[1]}%`,
                width: p[2],
                height: p[2],
                background: p[3],
                boxShadow: `0 0 ${p[2] * 6}px ${p[3]}`,
                opacity: p[5],
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${p[4]}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container" style={{ width: '100%', position: 'relative', zIndex: 1 }}>
        <div className="hero-inner" style={{ display: 'flex', alignItems: 'center', gap: 80, justifyContent: 'space-between' }}>
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ maxWidth: 620, flex: 1 }}
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
                marginBottom: 20,
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
              <span style={{ display: 'block', color: 'var(--text-secondary)', fontWeight: 600, fontSize: 'clamp(1.4rem, 4vw, 2.4rem)', marginTop: 10 }}>
                {personalInfo.title}
              </span>
            </h1>

            <motion.p
              className="hero-text"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: '1.1rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                maxWidth: 500,
                marginBottom: 44,
              }}
            >
              {personalInfo.tagline}
            </motion.p>

            <motion.div
              className="hero-btns"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
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

            <motion.div
              className="hero-stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', gap: 48, marginTop: 64 }}
            >
              {[
                { label: 'Years Exp', value: '4+' },
                { label: 'Projects', value: '15+' },
                { label: 'Clients', value: '20+' },
              ].map((s) => (
                <div key={s.label}>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4, fontWeight: 500 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hero-avatar"
            style={{ position: 'relative' }}
          >
            <div
              style={{
                width: 280,
                height: 280,
                borderRadius: '50%',
                overflow: 'hidden',
                position: 'relative',
                border: '2.5px solid var(--accent-primary)',
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
        .hero-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .hero-glow {
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-direction: alternate;
        }
        .glow-1 {
          animation-name: glow-1-move;
          animation-duration: 20s;
        }
        .glow-2 {
          animation-name: glow-2-move;
          animation-duration: 25s;
        }
        .glow-3 {
          animation-name: glow-3-move;
          animation-duration: 22s;
        }
        @keyframes glow-1-move {
          0% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(80px, 60px) scale(1.1); }
          50% { transform: translate(-40px, 120px) scale(0.95); }
          75% { transform: translate(60px, -30px) scale(1.05); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes glow-2-move {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-100px, -80px) scale(1.1); }
          66% { transform: translate(50px, -40px) scale(0.95); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes glow-3-move {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(60px, 40px) scale(1.08); }
          66% { transform: translate(-80px, 60px) scale(0.92); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .hero-storm {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .storm-particle {
          position: absolute;
          border-radius: 50%;
          animation: storm-drift linear infinite;
        }
        @keyframes storm-drift {
          0% { transform: translate(0, 0) scale(1); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(100px, -200px) scale(0.2); opacity: 0; }
        }
        @media (max-width: 900px) {
          .hero-avatar { display: none; }
        }
        @media (max-width: 768px) {
          .hero-inner { flex-direction: column; gap: 32px !important; text-align: center; }
          .hero-content { max-width: 100% !important; }
          .hero-text { margin-left: auto; margin-right: auto; }
          .hero-btns { justify-content: center; }
          .hero-stats { justify-content: center; gap: 32px !important; margin-top: 48px !important; }
          .hero-stats div { font-size: 1.6rem !important; }
        }
      `}</style>
    </section>
  );
}

import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { HiCode, HiLightningBolt, HiCube } from 'react-icons/hi';

const highlights = [
  { icon: HiCode, title: 'Clean Architecture', desc: 'Writing maintainable, scalable code that stands up to production demands.' },
  { icon: HiLightningBolt, title: 'Performance First', desc: 'Optimized for speed with sub-100ms response times and best-in-class Lighthouse scores.' },
  { icon: HiCube, title: 'End to End Delivery', desc: 'From concept to deployment — owning the full lifecycle of every project.' },
];

export default function About() {
  const { personalInfo, siteTexts, t } = usePortfolio();
  const highlights = siteTexts['about.highlights'] || [];
  return (
    <section id="about" className="section" style={{ overflow: 'hidden' }}>
      <div className="container">
        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="section-label">{t('about', 'label')}</span>
            <h2 className="section-title" style={{ textAlign: 'left', maxWidth: 500 }}>
              {t('about', 'title')}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {personalInfo.bio.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem' }}
                >
                  {p}
                </motion.p>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{ marginTop: 32, display: 'flex', gap: 12 }}
            >
              <a href={personalInfo.resumeUrl} className="btn-primary">
                {t('about', 'resume_btn')}
              </a>
              <a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                {t('about', 'linkedin_btn')}
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
          >
            <div
              className="glass-card"
              style={{ padding: 32, display: 'flex', alignItems: 'center', gap: 28 }}
            >
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  flexShrink: 0,
                  border: '2px solid var(--accent-primary)',
                }}
              >
                <img
                  src={personalInfo.avatarUrl}
                  alt={personalInfo.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement.style.background = 'var(--gradient-main)';
                    e.currentTarget.parentElement.innerHTML = `<span style="font-size:3rem;color:white;font-weight:800;display:flex;align-items:center;justify-content:center;height:100%">${personalInfo.name.charAt(0)}</span>`;
                  }}
                />
              </div>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {personalInfo.name}
                </h3>
                <p style={{ color: 'var(--accent-primary)', fontSize: '0.9rem', fontWeight: 500, marginTop: 2 }}>
                  {personalInfo.title}
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: 8, lineHeight: 1.6 }}>
                  {t('about', 'side_text')}
                </p>
              </div>
            </div>

            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                className="glass-card"
                style={{ padding: 24 }}
              >
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: 'rgba(99, 102, 241, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      color: 'var(--accent-primary)',
                      flexShrink: 0,
                    }}
                  >
                    {item.icon ? <item.icon /> : <span style={{fontSize:'0.9rem',opacity:0.5}}>✦</span>}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 4, color: 'var(--text-primary)' }}>
                      {item.title}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.7 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .about-grid .section-title { text-align: center !important; margin: 0 auto; }
        }
      `}</style>
    </section>
  );
}

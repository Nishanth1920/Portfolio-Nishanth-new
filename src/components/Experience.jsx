import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

function ExperienceCard({ exp, index, total }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        position: 'relative',
        paddingLeft: 40,
        paddingBottom: index < total - 1 ? 48 : 0,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 15,
          top: 8,
          bottom: index < total - 1 ? 0 : 8,
          width: 2,
          background: 'linear-gradient(180deg, var(--accent-primary), var(--accent-secondary))',
          opacity: 0.15,
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: 8,
          top: 8,
          width: 16,
          height: 16,
          borderRadius: '50%',
          background: 'var(--accent-primary)',
          zIndex: 1,
        }}
      />

      <div
        className="glass-card exp-card"
        style={{ padding: '28px 32px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap', marginBottom: 14 }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {exp.role}
            </h3>
            <span style={{ color: 'var(--accent-primary)', fontSize: '0.9rem', fontWeight: 500 }}>
              {exp.company}
            </span>
          </div>
          <span className="tag" style={{ whiteSpace: 'nowrap' }}>
            {exp.period}
          </span>
        </div>

        <ul style={{ marginBottom: 14 }}>
          {exp.description.map((item, j) => (
            <motion.li
              key={j}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.25 + j * 0.06 }}
              style={{
                color: 'var(--text-secondary)',
                fontSize: '0.88rem',
                lineHeight: 1.75,
                paddingLeft: 20,
                position: 'relative',
                marginBottom: 4,
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  left: 4,
                  top: 10,
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: 'var(--accent-primary)',
                  opacity: 0.5,
                }}
              />
              {item}
            </motion.li>
          ))}
        </ul>

      </div>
    </motion.div>
  );
}

export default function Experience() {
  const { experiences, t } = usePortfolio();
  return (
    <section id="experience" className="section" style={{ overflow: 'hidden' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-header"
        >
          <span className="section-label">{t('experience', 'label')}</span>
          <h2 className="section-title">{t('experience', 'title')}</h2>
          <p className="section-subtitle">
            {t('experience', 'subtitle')}
          </p>
        </motion.div>

        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} total={experiences.length} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .exp-card { padding: 24px 20px !important; }
          .exp-card h3 { font-size: 1rem !important; }
        }
      `}</style>
    </section>
  );
}

import { motion } from 'framer-motion';
import { projects } from '../data/portfolioData';

const gradients = [
  'linear-gradient(180deg, #6366f1, #06b6d4)',
  'linear-gradient(180deg, #8b5cf6, #ec4899)',
  'linear-gradient(180deg, #06b6d4, #10b981)',
  'linear-gradient(180deg, #f59e0b, #ef4444)',
  'linear-gradient(180deg, #6366f1, #8b5cf6)',
  'linear-gradient(180deg, #f97316, #06b6d4)',
];

const titles = [
  'HR & Payroll',
  'Employee Lifecycle',
  'Education Suite',
  'Travel Booking',
  'AI CRM',
  'API Clients',
];

function ProjectCard({ project, index }) {
  const gradient = gradients[index % gradients.length];
  const shortTitle = titles[index % titles.length];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="project-row"
      style={{
        position: 'relative',
        paddingLeft: 28,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 2,
          background: gradient,
          borderRadius: 2,
          opacity: 0.4,
        }}
      />

      <div style={{ paddingBottom: 8 }}>
        <span
          style={{
            fontSize: '0.65rem',
            fontWeight: 600,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: 2,
            fontFeatureSettings: '"tnum"',
          }}
        >
          Project {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <h3
        style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          letterSpacing: '-0.02em',
          marginBottom: 8,
          lineHeight: 1.3,
        }}
      >
        {shortTitle}
      </h3>

      <p
        style={{
          color: 'var(--text-muted)',
          fontSize: '0.88rem',
          lineHeight: 1.75,
          margin: 0,
        }}
      >
        {project.description}
      </p>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section" style={{ background: 'var(--bg-secondary)', overflow: 'hidden' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-header"
        >
          <span className="section-label">Projects</span>
          <h2 className="section-title">Featured work</h2>
          <p className="section-subtitle">
            Real-world projects showcasing architecture, performance, and user experience.
          </p>
        </motion.div>

        <div className="projects-list">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .projects-list {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 44px;
        }
      `}</style>
    </section>
  );
}

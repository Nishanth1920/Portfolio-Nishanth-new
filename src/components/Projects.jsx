import { motion } from 'framer-motion';
import { projects } from '../data/portfolioData';
import ImageReveal from './ImageReveal';

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

const images = [
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=280&fit=crop',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=280&fit=crop',
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=280&fit=crop',
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=280&fit=crop',
  'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=280&fit=crop',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=280&fit=crop',
];

function ProjectCard({ project, index }) {
  const gradient = gradients[index % gradients.length];
  const shortTitle = titles[index % titles.length];
  const imgSrc = images[index % images.length];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="project-row"
      style={{
        display: 'flex',
        gap: 32,
        alignItems: 'center',
      }}
    >
      <div
        style={{
          position: 'relative',
          flex: 1,
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
      </div>

      <div className="project-img" style={{ flexShrink: 0, borderRadius: 14, overflow: 'hidden', width: 200, height: 140 }}>
        <ImageReveal
          src={imgSrc}
          alt={shortTitle}
        />
      </div>
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
        @media (max-width: 640px) {
          .project-row { flex-direction: column !important; gap: 20px !important; align-items: stretch !important; }
          .project-img { width: 100% !important; height: 180px !important; }
        }
      `}</style>
    </section>
  );
}

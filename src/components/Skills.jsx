import { useState } from 'react';
import { motion } from 'framer-motion';
import { skills } from '../data/portfolioData';

const groups = [
  {
    key: 'frontend',
    label: 'Frontend',
    gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
    color: '#06b6d4',
    match: (s) => s.category === 'frontend',
  },
  {
    key: 'backend',
    label: 'Backend',
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: '#6366f1',
    match: (s) => ['PHP', 'CodeIgniter', 'MySQL', 'MSSQL', 'Node.js', 'PostgreSQL', 'Redis'].includes(s.name),
  },
  {
    key: 'payments',
    label: 'Payments',
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    color: '#f59e0b',
    match: (s) => ['Stripe', 'Razorpay', 'PayPal', 'Iveri PG', 'Nexi Xpay', 'N-genius'].includes(s.name),
  },
  {
    key: 'apis',
    label: 'APIs',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
    color: '#10b981',
    match: (s) => s.name.startsWith('API Integration'),
  },
  {
    key: 'tools',
    label: 'Tools',
    gradient: 'linear-gradient(135deg, #f97316, #ea580c)',
    color: '#f97316',
    match: (s) => ['Postman', 'VS Code', 'Insomnia', 'Docker', 'Works well with AI', 'Git', 'Ubuntu', 'Word', 'Excel'].includes(s.name),
  },
];

const allGroups = [
  { key: 'all', label: 'All', gradient: 'var(--gradient-main)', color: 'var(--accent-primary)' },
  ...groups,
];

function SkillCard({ skill, group }) {
  const Icon = skill.icon;
  return (
    <div
      style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(24px) saturate(1.5)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
        border: '1px solid var(--glass-border)',
        borderRadius: 14,
        padding: '22px 18px',
        textAlign: 'center',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2.5,
          background: group.gradient,
          opacity: 0.7,
        }}
      />

      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 14,
          background: `${group.color}14`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.45rem',
          color: group.color,
          margin: '0 auto 14px',
          boxShadow: `0 0 20px ${group.color}0c`,
        }}
      >
        <Icon />
      </div>

      <h4 style={{ fontSize: '0.9rem', fontWeight: 650, color: 'var(--text-primary)', marginBottom: 8, letterSpacing: '-0.01em' }}>
        {skill.name}
      </h4>

      <span
        style={{
          display: 'inline-block',
          padding: '3px 12px',
          borderRadius: 9999,
          fontSize: '0.6rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: 1.2,
          background: `${group.color}10`,
          color: group.color,
          border: `1px solid ${group.color}18`,
        }}
      >
        {group.label}
      </span>
    </div>
  );
}

export default function Skills() {
  const [active, setActive] = useState('all');

  const filtered = active === 'all'
    ? skills
    : skills.filter((s) => groups.find((g) => g.key === active)?.match(s));

  return (
    <section id="skills" className="section" style={{ background: 'var(--bg-secondary)', overflow: 'hidden', position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(600px circle at 50% 0%, rgba(99,102,241,0.04), transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-header"
        >
          <span className="section-label">Expertise</span>
          <h2 className="section-title">Technical proficiency</h2>
          <p className="section-subtitle">
            <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>{skills.length}</span> technologies across{' '}
            <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>{groups.length}</span> domains
          </p>
        </motion.div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 44, flexWrap: 'wrap' }}>
          {allGroups.map((g) => {
            const isActive = active === g.key;
            return (
              <motion.button
                key={g.key}
                onClick={() => setActive(g.key)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '10px 24px',
                  borderRadius: 9999,
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  background: isActive ? g.gradient : 'var(--glass-bg)',
                  color: isActive ? '#fff' : 'var(--text-secondary)',
                  border: isActive ? 'none' : '1px solid var(--glass-border)',
                  cursor: 'pointer',
                  backdropFilter: isActive ? 'none' : 'blur(12px)',
                  WebkitBackdropFilter: isActive ? 'none' : 'blur(12px)',
                  transition: 'background 0.3s ease, color 0.3s ease, border-color 0.3s ease',
                }}
              >
                {g.label}
              </motion.button>
            );
          })}
        </div>

        <div
          className="skills-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: 16,
            maxWidth: 760,
            margin: '0 auto',
          }}
        >
          {filtered.map((skill) => {
            const group = groups.find((g) => g.match(skill)) || groups[0];
            return (
              <SkillCard key={skill.name} skill={skill} group={group} />
            );
          })}
        </div>
      </div>

      <style>{`
        .skills-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); }
        @media (max-width: 600px) {
          .skills-grid { grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)) !important; gap: 12px !important; }
        }
      `}</style>
    </section>
  );
}

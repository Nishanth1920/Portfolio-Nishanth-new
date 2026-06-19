import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{
        borderTop: '1px solid var(--border-color)',
        padding: '32px 0',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <motion.div
            style={{ display: 'flex', alignItems: 'center', gap: 8 }}
            whileHover={{ x: 4 }}
          >
            <span style={{ fontSize: '1.05rem', fontWeight: 700 }} className="gradient-text">
              {personalInfo.name}
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              &copy; {new Date().getFullYear()}
            </span>
          </motion.div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              Built with React
            </span>
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { href: personalInfo.social.github, icon: FaGithub },
                { href: personalInfo.social.linkedin, icon: FaLinkedin },
              ].map(({ href, icon: Icon }) => (
                <motion.a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, color: 'var(--accent-primary)', y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  style={{ color: 'var(--text-muted)', fontSize: '1.1rem', transition: 'color 0.2s' }}
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

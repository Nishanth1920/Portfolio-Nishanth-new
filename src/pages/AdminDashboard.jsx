import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const sections = [
  { path: '/admin/personal-info', label: 'Personal Info', desc: 'Name, title, tagline, bio, social links', icon: '👤' },
  { path: '/admin/skills', label: 'Skills', desc: 'Technical skills and proficiency levels', icon: '⚡' },
  { path: '/admin/experience', label: 'Experience', desc: 'Work history and job descriptions', icon: '💼' },
  { path: '/admin/projects', label: 'Projects', desc: 'Portfolio projects and case studies', icon: '📁' },
  { path: '/admin/site-content', label: 'Site Content', desc: 'Marquee, stats, headings, buttons, text', icon: '✏️' },
  { path: '/admin/colors', label: 'Site Colors', desc: 'Accent color palette for dark and light themes', icon: '🎨' },
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      padding: '32px 24px',
    }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 40,
        }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Dashboard
            </h1>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 4 }}>
              Manage your portfolio content
            </p>
          </div>
          <button
            onClick={handleLogout}
            style={{
              padding: '8px 18px',
              borderRadius: 9999,
              border: '1px solid var(--border-color)',
              background: 'transparent',
              color: 'var(--text-secondary)',
              fontSize: '0.82rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Sign Out
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {sections.map((s) => (
            <Link
              key={s.path}
              to={s.path}
              className="dash-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '20px 24px',
                borderRadius: 14,
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
            >
              <span style={{
                fontSize: '1.5rem', width: 44, height: 44, borderRadius: 12,
                background: 'var(--bg-primary)', display: 'flex', alignItems: 'center',
                justifyContent: 'center', flexShrink: 0,
              }}>{s.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>
                  {s.label}
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                  {s.desc}
                </p>
              </div>
              <span style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>→</span>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .dash-card:hover {
          border-color: var(--accent-primary) !important;
        }
        .dash-card:active {
          transform: scale(0.99);
        }
        @media (max-width: 480px) {
          .dash-card { padding: 16px 18px !important; gap: 12px !important; }
          .dash-card span:first-child { font-size: 1.3rem !important; width: 38px !important; height: 38px !important; }
          div[style*="min-height: 100vh"] { padding: 24px 16px !important; }
          div[style*="margin-bottom: 40"] { margin-bottom: 28px !important; }
        }
        @media (max-width: 360px) {
          .dash-card { padding: 14px 14px !important; }
          .dash-card h3 { font-size: 0.9rem !important; }
        }
      `}</style>
    </div>
  );
}

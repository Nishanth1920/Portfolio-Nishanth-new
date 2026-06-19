import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { usePortfolio } from '../context/PortfolioContext';

export default function EditPersonalInfo() {
  const navigate = useNavigate();
  const { personalInfo, personalInfoId, refresh } = usePortfolio();
  const [form, setForm] = useState({
    name: '', title: '', avatar_url: '', tagline: '',
    bio: '', location: '', email: '', resume_url: '',
    github: '', linkedin: '',
  });
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    setForm({
      name: personalInfo.name,
      title: personalInfo.title,
      avatar_url: personalInfo.avatarUrl,
      tagline: personalInfo.tagline,
      bio: Array.isArray(personalInfo.bio) ? personalInfo.bio.join('\n') : personalInfo.bio,
      location: personalInfo.location,
      email: personalInfo.email,
      resume_url: personalInfo.resumeUrl,
      github: personalInfo.social.github,
      linkedin: personalInfo.social.linkedin,
    });
  }, [personalInfo]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveError(null);
    const record = {
      name: form.name,
      title: form.title,
      avatar_url: form.avatar_url,
      tagline: form.tagline,
      bio: form.bio.split('\n').filter(Boolean),
      location: form.location,
      email: form.email,
      resume_url: form.resume_url,
      github: form.github,
      linkedin: form.linkedin,
    };
    const { error } = personalInfoId
      ? await supabase.from('personal_info').update(record).eq('id', personalInfoId)
      : await supabase.from('personal_info').upsert(record, { onConflict: 'id' });
    setSaving(false);
    if (error) { setSaveError(error); }
    else {
      setSaveError(null);
      refresh();
      setDone(true);
      setTimeout(() => setDone(false), 2500);
    }
  };

  const field = (label, key, opts = {}) => (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>
        {label}
      </label>
      {opts.textarea ? (
        <textarea
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          rows={opts.rows || 3}
          style={{ ...inputStyle, resize: 'vertical', minHeight: 80 }}
        />
      ) : (
        <input
          type={opts.type || 'text'}
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          inputMode={opts.inputMode || (opts.type === 'email' ? 'email' : opts.type === 'url' ? 'url' : 'text')}
          style={inputStyle}
        />
      )}
    </div>
  );

  return (
    <PageShell title="Personal Info" onBack={() => navigate('/admin/dashboard')}>
      <form onSubmit={handleSave}>
        {field('Name', 'name')}
        {field('Title', 'title')}
        {field('Avatar URL', 'avatar_url', { type: 'url' })}
        {field('Tagline', 'tagline')}
        {field('Bio (one paragraph per line)', 'bio', { textarea: true, rows: 4 })}
        {field('Location', 'location')}
        {field('Email', 'email', { type: 'email' })}
        {field('Resume URL', 'resume_url', { type: 'url' })}
        {field('GitHub URL', 'github', { type: 'url' })}
        {field('LinkedIn URL', 'linkedin', { type: 'url' })}

        <SaveButton saving={saving} done={done} error={saveError} />
      </form>
    </PageShell>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: 10,
  background: 'var(--bg-primary)',
  border: '1px solid var(--border-color)',
  color: 'var(--text-primary)',
  fontSize: '0.9rem',
  fontFamily: 'inherit',
  outline: 'none',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box',
};

function PageShell({ title, onBack, children }) {
  return (
    <div className="admin-shell" style={{ minHeight: '100vh', background: 'var(--bg-primary)', padding: '32px 20px' }}>
      <div className="admin-shell-inner" style={{ maxWidth: 640, margin: '0 auto' }}>
        <div className="admin-header" style={{
          display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32,
          paddingBottom: 16, borderBottom: '1px solid var(--border-color)',
        }}>
          <button onClick={onBack} style={{
            padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)',
            background: 'transparent', color: 'var(--text-secondary)', fontSize: '0.85rem',
            cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap',
          }}>&larr; Back</button>
          <h1 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)' }}>{title}</h1>
        </div>
        {children}
      </div>
      <style>{`
        input:focus, textarea:focus, select:focus {
          border-color: var(--accent-primary) !important;
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-primary) 12%, transparent) !important;
        }
        select:focus option {
          background: var(--bg-primary);
          color: var(--text-primary);
        }
        @media (max-width: 480px) {
          .admin-shell { padding: 20px 12px !important; }
          .admin-shell .admin-header { margin-bottom: 24px !important; padding-bottom: 12px !important; }
          .admin-header h1 { font-size: 1.15rem !important; }
        }
        @media (max-width: 360px) {
          .admin-shell { padding: 16px 10px !important; }
        }
      `}</style>
    </div>
  );
}

function SaveButton({ saving, done, error }) {
  return (
    <>
      <button
        type="submit"
        disabled={saving}
        style={{
          width: '100%',
          padding: '14px 24px',
          borderRadius: 9999,
          border: 'none',
          background: done ? 'var(--success)' : 'var(--gradient-main)',
          color: '#fff',
          fontSize: '0.95rem',
          fontWeight: 600,
          cursor: 'pointer',
          marginTop: 12,
          transition: 'background 0.3s, transform 0.15s, opacity 0.15s',
          opacity: saving ? 0.7 : 1,
        }}
      >
        {saving ? 'Saving...' : done ? 'Saved!' : 'Save Changes'}
      </button>
      {error && (
        <div style={{
          marginTop: 14, padding: '12px 16px', borderRadius: 10,
          background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)',
          color: '#ef4444', fontSize: '0.85rem', lineHeight: 1.5,
        }}>
          {error.message || error}
        </div>
      )}
    </>
  );
}

export { PageShell, SaveButton, inputStyle };

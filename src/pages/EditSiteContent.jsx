import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { usePortfolio } from '../context/PortfolioContext';
import { PageShell, SaveButton, inputStyle } from './EditPersonalInfo';

const sectionLabels = {
  navbar: 'Navigation',
  hero: 'Hero Section',
  about: 'About Section',
  skills: 'Skills Section',
  experience: 'Experience Section',
  projects: 'Projects Section',
  contact: 'Contact Section',
  footer: 'Footer',
};

const sectionIcons = {
  navbar: '🔗',
  hero: '🖥️',
  about: '👤',
  skills: '⚡',
  experience: '💼',
  projects: '📁',
  contact: '📬',
  footer: '📄',
};

function isListKey(section, key) {
  return ['marquee_items', 'stats', 'highlights', 'links'].includes(key);
}

function formatForEdit(value, section, key) {
  if (isListKey(section, key)) {
    try {
      const arr = typeof value === 'string' ? JSON.parse(value) : value;
      if (Array.isArray(arr)) {
        if (key === 'marquee_items' || key === 'links') {
          return arr.map((item) => typeof item === 'string' ? item : JSON.stringify(item)).join('\n');
        }
        if (key === 'stats') {
          return arr.map((s) => `${s.label}||${s.value}`).join('\n');
        }
        if (key === 'highlights') {
          return arr.map((h) => `${h.title}||${h.desc}`).join('\n');
        }
      }
    } catch {}
    return String(value);
  }
  return value;
}

function parseFromEdit(raw, section, key) {
  if (isListKey(section, key)) {
    const lines = raw.split('\n').filter(Boolean);
    if (key === 'marquee_items' || key === 'links') {
      return lines.map((l) => {
        try { return JSON.parse(l); } catch { return l; }
      });
    }
    if (key === 'stats') {
      return lines.map((l) => {
        const [label, value] = l.split('||');
        return { label: label?.trim() || '', value: value?.trim() || '' };
      });
    }
    if (key === 'highlights') {
      return lines.map((l) => {
        const [title, ...rest] = l.split('||');
        return { title: title?.trim() || '', desc: rest.join('||').trim() || '' };
      });
    }
    return lines;
  }
  return raw;
}

export default function EditSiteContent() {
  const navigate = useNavigate();
  const { siteTexts, refresh } = usePortfolio();
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    const f = {};
    for (const key of Object.keys(siteTexts)) {
      const [section, ...rest] = key.split('.');
      const k = rest.join('.');
      f[key] = formatForEdit(siteTexts[key], section, k);
    }
    setForm(f);
  }, [siteTexts]);

  const update = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveError(null);

    const upserts = Object.entries(form).map(([key, value]) => {
      const [section, ...rest] = key.split('.');
      const k = rest.join('.');
      return {
        section,
        key: k,
        value: isListKey(section, k) ? JSON.stringify(parseFromEdit(value, section, k)) : value,
        type: isListKey(section, k) ? 'list' : 'text',
      };
    });

    const { error } = await supabase.from('site_texts').upsert(upserts, { onConflict: 'section,key' });
    setSaving(false);
    if (error) { setSaveError(error); }
    else {
      refresh();
      setDone(true);
      setTimeout(() => setDone(false), 2500);
    }
  };

  const sections = {};
  for (const key of Object.keys(form)) {
    const [section] = key.split('.');
    if (!sections[section]) sections[section] = [];
    sections[section].push(key);
  }

  return (
    <PageShell title="Site Content" onBack={() => navigate('/admin/dashboard')}>
      <form onSubmit={handleSave}>
        {Object.entries(sections).map(([section, keys]) => (
          <div key={section} style={{ marginBottom: 32 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              fontSize: '1rem', fontWeight: 600, color: 'var(--accent-primary)',
              marginBottom: 16, paddingBottom: 8, borderBottom: '1px solid var(--border-color)',
            }}>
              <span style={{ fontSize: '1.15rem' }}>{sectionIcons[section] || '📝'}</span>
              {sectionLabels[section] || section}
            </div>
            {keys.map((key) => {
              const [, ...rest] = key.split('.');
              const k = rest.join('.');
              const isList = isListKey(section, k);

              return (
                <div key={key} style={{ marginBottom: 14 }}>
                  <label style={{
                    display: 'block', fontSize: '0.82rem', fontWeight: 500,
                    color: 'var(--text-secondary)', marginBottom: 6, textTransform: 'capitalize',
                  }}>
                    {k.replace(/_/g, ' ')}
                    {isList && (
                      <span style={{ color: 'var(--text-muted)', fontWeight: 400, marginLeft: 6, fontSize: '0.75rem' }}>
                        (one per line{section === 'stats' ? ', format: Label||value' : section === 'highlights' ? ', format: Title||description' : ''})
                      </span>
                    )}
                  </label>
                  {isList ? (
                    <textarea
                      value={form[key]}
                      onChange={(e) => update(key, e.target.value)}
                      rows={Math.max(3, form[key]?.split('\n').length || 3)}
                      style={{ ...inputStyle, fontFamily: 'monospace', fontSize: '0.82rem', resize: 'vertical' }}
                    />
                  ) : (
                    <input
                      type="text"
                      value={form[key]}
                      onChange={(e) => update(key, e.target.value)}
                      style={inputStyle}
                    />
                  )}
                </div>
              );
            })}
          </div>
        ))}

        <SaveButton saving={saving} done={done} error={saveError} />
      </form>

      <style>{`
        @media (max-width: 480px) {
          textarea { font-size: 0.78rem !important; }
          label span { display: block !important; margin-left: 0 !important; margin-top: 2px !important; }
        }
      `}</style>
    </PageShell>
  );
}

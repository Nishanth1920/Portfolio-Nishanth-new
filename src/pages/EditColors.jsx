import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { usePortfolio } from '../context/PortfolioContext';
import { PageShell, SaveButton, inputStyle } from './EditPersonalInfo';

const themes = {
  indigo: { label: 'Indigo (Default)', colors: { dark_accent_primary: '#6366f1', dark_accent_secondary: '#06b6d4', dark_accent_tertiary: '#8b5cf6', light_accent_primary: '#4f46e5', light_accent_secondary: '#0891b2', light_accent_tertiary: '#7c3aed' } },
  sapphire: { label: 'Sapphire', colors: { dark_accent_primary: '#3b82f6', dark_accent_secondary: '#60a5fa', dark_accent_tertiary: '#2563eb', light_accent_primary: '#2563eb', light_accent_secondary: '#3b82f6', light_accent_tertiary: '#1d4ed8' } },
  navy: { label: 'Navy', colors: { dark_accent_primary: '#475569', dark_accent_secondary: '#64748b', dark_accent_tertiary: '#334155', light_accent_primary: '#334155', light_accent_secondary: '#475569', light_accent_tertiary: '#1e293b' } },
  emerald: { label: 'Emerald', colors: { dark_accent_primary: '#10b981', dark_accent_secondary: '#34d399', dark_accent_tertiary: '#059669', light_accent_primary: '#059669', light_accent_secondary: '#10b981', light_accent_tertiary: '#047857' } },
  obsidian: { label: 'Obsidian', colors: { dark_accent_primary: '#e2e8f0', dark_accent_secondary: '#94a3b8', dark_accent_tertiary: '#cbd5e1', light_accent_primary: '#1e293b', light_accent_secondary: '#334155', light_accent_tertiary: '#0f172a' } },
  bronze: { label: 'Bronze', colors: { dark_accent_primary: '#d97706', dark_accent_secondary: '#f59e0b', dark_accent_tertiary: '#b45309', light_accent_primary: '#b45309', light_accent_secondary: '#d97706', light_accent_tertiary: '#92400e' } },
  steel: { label: 'Steel', colors: { dark_accent_primary: '#64748b', dark_accent_secondary: '#94a3b8', dark_accent_tertiary: '#475569', light_accent_primary: '#475569', light_accent_secondary: '#64748b', light_accent_tertiary: '#334155' } },
  ruby: { label: 'Ruby', colors: { dark_accent_primary: '#e11d48', dark_accent_secondary: '#fb7185', dark_accent_tertiary: '#be123c', light_accent_primary: '#be123c', light_accent_secondary: '#e11d48', light_accent_tertiary: '#9f1239' } },
  amber: { label: 'Amber', colors: { dark_accent_primary: '#f59e0b', dark_accent_secondary: '#fbbf24', dark_accent_tertiary: '#d97706', light_accent_primary: '#d97706', light_accent_secondary: '#f59e0b', light_accent_tertiary: '#b45309' } },
  teal: { label: 'Teal', colors: { dark_accent_primary: '#14b8a6', dark_accent_secondary: '#2dd4bf', dark_accent_tertiary: '#0d9488', light_accent_primary: '#0d9488', light_accent_secondary: '#14b8a6', light_accent_tertiary: '#0f766e' } },
  plum: { label: 'Plum', colors: { dark_accent_primary: '#a855f7', dark_accent_secondary: '#c084fc', dark_accent_tertiary: '#9333ea', light_accent_primary: '#9333ea', light_accent_secondary: '#a855f7', light_accent_tertiary: '#7e22ce' } },
  cobalt: { label: 'Cobalt', colors: { dark_accent_primary: '#1d4ed8', dark_accent_secondary: '#3b82f6', dark_accent_tertiary: '#1e40af', light_accent_primary: '#1e40af', light_accent_secondary: '#1d4ed8', light_accent_tertiary: '#1e3a8a' } },
  sage: { label: 'Sage', colors: { dark_accent_primary: '#84cc16', dark_accent_secondary: '#a3e635', dark_accent_tertiary: '#65a30d', light_accent_primary: '#4d7c0f', light_accent_secondary: '#65a30d', light_accent_tertiary: '#3f6212' } },
  coral: { label: 'Coral', colors: { dark_accent_primary: '#f97316', dark_accent_secondary: '#fb923c', dark_accent_tertiary: '#ea580c', light_accent_primary: '#ea580c', light_accent_secondary: '#f97316', light_accent_tertiary: '#c2410c' } },
  frost: { label: 'Frost', colors: { dark_accent_primary: '#38bdf8', dark_accent_secondary: '#7dd3fc', dark_accent_tertiary: '#0284c7', light_accent_primary: '#0284c7', light_accent_secondary: '#38bdf8', light_accent_tertiary: '#0369a1' } },
  copper: { label: 'Copper', colors: { dark_accent_primary: '#d97706', dark_accent_secondary: '#fbbf24', dark_accent_tertiary: '#b45309', light_accent_primary: '#b45309', light_accent_secondary: '#d97706', light_accent_tertiary: '#92400e' } },
};

const defaults = { ...themes.indigo.colors };

const colorMeta = {
  dark_accent_primary: { label: 'Dark — Primary Accent', desc: 'Primary brand color' },
  dark_accent_secondary: { label: 'Dark — Secondary Accent', desc: 'Secondary brand color' },
  dark_accent_tertiary: { label: 'Dark — Tertiary Accent', desc: 'Tertiary accent color' },
  light_accent_primary: { label: 'Light — Primary Accent', desc: 'Primary brand color' },
  light_accent_secondary: { label: 'Light — Secondary Accent', desc: 'Secondary brand color' },
  light_accent_tertiary: { label: 'Light — Tertiary Accent', desc: 'Tertiary accent color' },
};

export default function EditColors() {
  const navigate = useNavigate();
  const { colors, refresh } = usePortfolio();
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    setForm({ ...colors });
    const match = Object.entries(themes).find(([, t]) =>
      Object.keys(t.colors).every((k) => colors[k] === t.colors[k])
    );
    setSelectedTheme(match ? match[0] : '');
  }, [colors]);

  const [selectedTheme, setSelectedTheme] = useState('');

  const applyTheme = (name) => {
    setSelectedTheme(name);
    setForm({ ...themes[name].colors });
  };

  const update = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleReset = () => {
    if (!confirm('Reset all colors to their original defaults?')) return;
    setSelectedTheme('indigo');
    setForm({ ...defaults });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveError(null);

    const upserts = Object.entries(form).map(([key, value]) => ({
      section: 'colors',
      key,
      value,
      type: 'color',
    }));

    const { error } = await supabase.from('site_texts').upsert(upserts, { onConflict: 'section,key' });
    setSaving(false);
    if (error) { setSaveError(error); }
    else {
      refresh();
      setDone(true);
      setTimeout(() => setDone(false), 2500);
    }
  };

  return (
    <PageShell title="Site Colors" onBack={() => navigate('/admin/dashboard')}>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 28, lineHeight: 1.5 }}>
        Choose accent colors for dark and light themes. Changes apply site-wide.
      </p>
      <form onSubmit={handleSave}>
        <div style={{ marginBottom: 28 }}>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 10 }}>
            Preset Theme
          </label>
          <div className="theme-grid" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {Object.entries(themes).map(([name, t]) => (
              <button
                key={name}
                type="button"
                onClick={() => applyTheme(name)}
                className={`theme-chip${selectedTheme === name ? ' active' : ''}`}
                style={{
                  padding: '8px 16px', borderRadius: 9999, fontSize: '0.8rem', fontWeight: 500,
                  border: `2px solid ${selectedTheme === name ? t.colors.dark_accent_primary : 'var(--border-color)'}`,
                  background: selectedTheme === name ? `${t.colors.dark_accent_primary}18` : 'transparent',
                  color: selectedTheme === name ? t.colors.dark_accent_primary : 'var(--text-secondary)',
                  cursor: 'pointer', transition: 'all 0.15s',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}
              >
                <span style={{
                  display: 'inline-block', width: 10, height: 10, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${t.colors.dark_accent_primary}, ${t.colors.dark_accent_secondary})`,
                  flexShrink: 0,
                }} />
                {t.label.replace(' (Default)', '')}
              </button>
            ))}
          </div>
        </div>

        <div className="color-pickers">
          {Object.keys(colorMeta).map((key) => (
            <div key={key} style={{ marginBottom: 18 }}>
              <label className="color-label" style={{
                display: 'flex', alignItems: 'center', gap: 12, fontSize: '0.88rem',
                fontWeight: 500, color: 'var(--text-primary)', marginBottom: 2,
              }}>
                <input
                  type="color"
                  value={form[key] || '#6366f1'}
                  onChange={(e) => update(key, e.target.value)}
                  style={{
                    width: 44, height: 44, borderRadius: 10, border: '1px solid var(--border-color)',
                    background: 'none', cursor: 'pointer', padding: 2, flexShrink: 0,
                  }}
                />
                <span>{colorMeta[key].label}</span>
              </label>
              <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginLeft: 56, marginTop: 0 }}>
                {colorMeta[key].desc}
              </p>
            </div>
          ))}
        </div>

        <div className="btn-row" style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <SaveButton saving={saving} done={done} error={saveError} />
          <button type="button" onClick={handleReset} style={{
            padding: '14px 24px', borderRadius: 9999, border: '1px solid var(--border-color)',
            background: 'transparent', color: 'var(--text-secondary)', fontSize: '0.85rem',
            fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap',
          }}>
            Reset
          </button>
        </div>
      </form>

      <style>{`
        .theme-chip:hover {
          border-color: var(--accent-primary) !important;
          color: var(--accent-primary) !important;
        }
        .btn-row button:last-child:hover {
          border-color: #ef4444 !important;
          color: #ef4444 !important;
        }
        @media (max-width: 600px) {
          .theme-grid { gap: 6px !important; }
          .theme-chip { padding: 6px 12px !important; font-size: 0.75rem !important; }
          .color-label { font-size: 0.82rem !important; }
          .color-label input { width: 38px !important; height: 38px !important; }
        }
        @media (max-width: 480px) {
          .btn-row { flex-direction: column !important; }
          .btn-row button { width: 100% !important; }
          .color-pickers > div { margin-bottom: 14px !important; }
        }
      `}</style>
    </PageShell>
  );
}

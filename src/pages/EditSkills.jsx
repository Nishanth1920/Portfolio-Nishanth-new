import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { usePortfolio } from '../context/PortfolioContext';
import { PageShell, SaveButton, inputStyle } from './EditPersonalInfo';

export default function EditSkills() {
  const navigate = useNavigate();
  const { skills, refresh } = usePortfolio();
  const [items, setItems] = useState([]);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    setItems(skills.map((s) => ({ ...s })));
  }, [skills]);

  const update = (i, field, value) => {
    const next = [...items];
    next[i] = { ...next[i], [field]: value };
    setItems(next);
  };

  const addItem = () => {
    setItems([...items, { name: '', category: 'backend', level: 80 }]);
  };

  const removeItem = (i) => {
    setItems(items.filter((_, idx) => idx !== i));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveError(null);

    const filtered = items.filter((s) => s.name);
    const keptIds = filtered.map((s) => s.id).filter(Boolean);
    let error = null;

    if (keptIds.length) {
      const { error: delErr } = await supabase.from('skills').delete().not('id', 'in', `(${keptIds.join(',')})`);
      if (delErr) error = delErr;
    } else {
      const { error: delErr } = await supabase.from('skills').delete().neq('id', 0);
      if (delErr) error = delErr;
    }

    if (!error) {
      const { data: maxData } = await supabase.from('skills').select('id').order('id', { ascending: false }).limit(1).maybeSingle();
      let nextId = (maxData?.id || 0) + 1;

      for (let i = 0; i < filtered.length; i++) {
        const s = filtered[i];
        const rec = { name: s.name, category: s.category, level: s.level, order: i };
        if (s.id) { rec.id = s.id; }
        else { rec.id = nextId++; }
        const { error: e2 } = await supabase.from('skills').upsert(rec, { onConflict: 'id' });
        if (e2) { error = e2; break; }
      }
    }

    setSaving(false);
    if (error) { setSaveError(error); }
    else {
      setSaveError(null);
      refresh();
      setDone(true);
      setTimeout(() => setDone(false), 2500);
    }
  };

  return (
    <PageShell title="Skills" onBack={() => navigate('/admin/dashboard')}>
      <form onSubmit={handleSave}>
        {items.map((s, i) => (
          <div key={i} className="edit-card" style={{
            padding: 16, marginBottom: 12, borderRadius: 12,
            background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
            transition: 'border-color 0.2s',
          }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <input value={s.name} onChange={(e) => update(i, 'name', e.target.value)}
                placeholder="Skill name" style={{ ...inputStyle, flex: 1 }} />
              <button type="button" onClick={() => removeItem(i)} style={{
                padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(239,68,68,0.3)',
                background: 'rgba(239,68,68,0.1)', color: '#ef4444', cursor: 'pointer', fontSize: '0.85rem',
                flexShrink: 0,
              }}>X</button>
            </div>
            <div className="skill-row" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <select value={s.category} onChange={(e) => update(i, 'category', e.target.value)}
                style={{ ...inputStyle, flex: 1, padding: '10px 12px' }}>
                <option value="backend">Backend</option>
                <option value="frontend">Frontend</option>
                <option value="tools">Tools</option>
                <option value="devops">DevOps</option>
              </select>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                <input type="range" value={s.level} onChange={(e) => update(i, 'level', parseInt(e.target.value))}
                  min={0} max={100} style={{ width: 80, accentColor: 'var(--accent-primary)' }} />
                <input type="number" value={s.level} onChange={(e) => update(i, 'level', parseInt(e.target.value))}
                  min={0} max={100} style={{ ...inputStyle, width: 56, textAlign: 'center', padding: '8px 4px' }} />
              </div>
            </div>
          </div>
        ))}

        <button type="button" onClick={addItem} className="add-btn" style={{
          width: '100%', padding: 12, borderRadius: 10, border: '1px dashed var(--border-color)',
          background: 'transparent', color: 'var(--text-muted)', fontSize: '0.9rem', cursor: 'pointer',
          marginBottom: 16, transition: 'all 0.2s',
        }}>
          + Add Skill
        </button>

        <SaveButton saving={saving} done={done} error={saveError} />
      </form>

      <style>{`
        .edit-card:hover { border-color: var(--accent-primary) !important; }
        .add-btn:hover { border-color: var(--accent-primary) !important; color: var(--accent-primary) !important; }
        @media (max-width: 600px) {
          .skill-row { flex-direction: column !important; align-items: stretch !important; }
          .skill-row > div { justify-content: flex-start !important; }
          .skill-row input[type=range] { flex: 1 !important; width: auto !important; }
        }
        @media (max-width: 480px) {
          .edit-card { padding: 12px !important; }
        }
      `}</style>
    </PageShell>
  );
}

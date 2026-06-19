import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { usePortfolio } from '../context/PortfolioContext';
import { PageShell, SaveButton, inputStyle } from './EditPersonalInfo';

export default function EditExperience() {
  const navigate = useNavigate();
  const { experiences, refresh } = usePortfolio();
  const [items, setItems] = useState([]);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    setItems(experiences.map((e) => ({
      ...e,
      description: Array.isArray(e.description) ? e.description.join('\n') : e.description,

    })));
  }, [experiences]);

  const update = (i, field, value) => {
    const next = [...items];
    next[i] = { ...next[i], [field]: value };
    setItems(next);
  };

  const addItem = () => {
    setItems([...items, { role: '', company: '', period: '', description: '' }]);
  };

  const removeItem = (i) => setItems(items.filter((_, idx) => idx !== i));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveError(null);

    const filtered = items.filter((r) => r.role);
    const keptIds = filtered.map((r) => r.id).filter(Boolean);
    let error = null;

    if (keptIds.length) {
      const { error: delErr } = await supabase.from('experiences').delete().not('id', 'in', `(${keptIds.join(',')})`);
      if (delErr) error = delErr;
    } else {
      const { error: delErr } = await supabase.from('experiences').delete().neq('id', 0);
      if (delErr) error = delErr;
    }

    if (!error) {
      const { data: maxData } = await supabase.from('experiences').select('id').order('id', { ascending: false }).limit(1).maybeSingle();
      let nextId = (maxData?.id || 0) + 1;

      for (let i = 0; i < filtered.length; i++) {
        const r = filtered[i];
        const rec = {
          role: r.role, company: r.company, period: r.period,
          description: r.description.split('\n').filter(Boolean),
          order: i,
        };
        if (r.id) { rec.id = r.id; }
        else { rec.id = nextId++; }
        const { error: e2 } = await supabase.from('experiences').upsert(rec, { onConflict: 'id' });
        if (e2) { error = e2; break; }
      }
    }

    setSaving(false);
    if (error) { setSaveError(error); }
    else {
      refresh();
      setDone(true);
      setTimeout(() => setDone(false), 2500);
    }
  };

  return (
    <PageShell title="Experience" onBack={() => navigate('/admin/dashboard')}>
      <form onSubmit={handleSave}>
        {items.map((exp, i) => (
          <div key={i} className="edit-card" style={{
            padding: 16, marginBottom: 12, borderRadius: 12,
            background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
            transition: 'border-color 0.2s',
          }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <input value={exp.role} onChange={(e) => update(i, 'role', e.target.value)}
                placeholder="Role" style={{ ...inputStyle, flex: 1 }} />
              <button type="button" onClick={() => removeItem(i)} style={{
                padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(239,68,68,0.3)',
                background: 'rgba(239,68,68,0.1)', color: '#ef4444', cursor: 'pointer', fontSize: '0.85rem',
                flexShrink: 0,
              }}>X</button>
            </div>
            <div className="exp-row" style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <input value={exp.company} onChange={(e) => update(i, 'company', e.target.value)}
                placeholder="Company" style={{ ...inputStyle, flex: 1 }} />
              <input value={exp.period} onChange={(e) => update(i, 'period', e.target.value)}
                placeholder="Period" style={{ ...inputStyle, width: 140, flexShrink: 0 }} />
            </div>
            <textarea value={exp.description} onChange={(e) => update(i, 'description', e.target.value)}
              placeholder="Description (one line per bullet)" rows={3}
              style={{ ...inputStyle, marginBottom: 8, resize: 'vertical' }} />
          </div>
        ))}

        <button type="button" onClick={addItem} className="add-btn" style={{
          width: '100%', padding: 12, borderRadius: 10, border: '1px dashed var(--border-color)',
          background: 'transparent', color: 'var(--text-muted)', fontSize: '0.9rem', cursor: 'pointer',
          marginBottom: 16, transition: 'all 0.2s',
        }}>
          + Add Experience
        </button>

        <SaveButton saving={saving} done={done} error={saveError} />
      </form>

      <style>{`
        .edit-card:hover { border-color: var(--accent-primary) !important; }
        .add-btn:hover { border-color: var(--accent-primary) !important; color: var(--accent-primary) !important; }
        @media (max-width: 600px) {
          .exp-row { flex-direction: column !important; }
          .exp-row input[placeholder="Period"] { width: 100% !important; }
        }
        @media (max-width: 480px) {
          .edit-card { padding: 12px !important; }
        }
      `}</style>
    </PageShell>
  );
}

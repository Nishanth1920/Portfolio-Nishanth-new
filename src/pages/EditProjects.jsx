import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { usePortfolio } from '../context/PortfolioContext';
import { PageShell, SaveButton, inputStyle } from './EditPersonalInfo';

export default function EditProjects() {
  const navigate = useNavigate();
  const { projects, refresh } = usePortfolio();
  const [items, setItems] = useState([]);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const dragIdx = useRef(null);
  const [overIdx, setOverIdx] = useState(null);

  useEffect(() => {
    setItems(projects.map((p) => ({
      ...p,
      title: p.title || '',
      description: p.description || '',
    })));
  }, [projects]);

  const update = (i, field, value) => {
    const next = [...items];
    next[i] = { ...next[i], [field]: value };
    setItems(next);
  };

  const addItem = () => {
    setItems([...items, { title: '', description: '' }]);
  };

  const removeItem = (i) => setItems(items.filter((_, idx) => idx !== i));

  const moveItem = (i, dir) => {
    const to = i + dir;
    if (to < 0 || to >= items.length) return;
    const next = [...items];
    [next[i], next[to]] = [next[to], next[i]];
    setItems(next);
  };

  const handleDragStart = (i) => { dragIdx.current = i; };

  const handleDragOver = (e, i) => {
    e.preventDefault();
    setOverIdx(i);
  };

  const handleDrop = (i) => {
    const from = dragIdx.current;
    if (from === null || from === i) return;
    const next = [...items];
    const [removed] = next.splice(from, 1);
    next.splice(i, 0, removed);
    setItems(next);
    dragIdx.current = null;
    setOverIdx(null);
  };

  const handleDragEnd = () => {
    dragIdx.current = null;
    setOverIdx(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveError(null);

    const filtered = items.filter((p) => p.title);
    const keptIds = filtered.map((p) => p.id).filter(Boolean);
    let error = null;

    if (keptIds.length) {
      const { error: delErr } = await supabase.from('projects').delete().not('id', 'in', `(${keptIds.join(',')})`);
      if (delErr) error = delErr;
    } else {
      const { error: delErr } = await supabase.from('projects').delete().neq('id', 0);
      if (delErr) error = delErr;
    }

    if (!error) {
      const { data: maxData } = await supabase.from('projects').select('id').order('id', { ascending: false }).limit(1).maybeSingle();
      let nextId = (maxData?.id || 0) + 1;

      for (let i = 0; i < filtered.length; i++) {
        const p = filtered[i];
        const rec = { title: p.title, description: p.description, order: i };
        if (p.id) { rec.id = p.id; }
        else { rec.id = nextId++; }
        const { error: e2 } = await supabase.from('projects').upsert(rec, { onConflict: 'id' });
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
    <PageShell title="Projects" onBack={() => navigate('/admin/dashboard')}>
      <form onSubmit={handleSave}>
        {items.map((proj, i) => (
          <div
            key={i}
            draggable
            onDragStart={() => handleDragStart(i)}
            onDragOver={(e) => handleDragOver(e, i)}
            onDrop={() => handleDrop(i)}
            onDragEnd={handleDragEnd}
            className="edit-card"
            style={{
              padding: 16, marginBottom: 12, borderRadius: 12,
              background: 'var(--bg-secondary)',
              border: overIdx === i ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
              opacity: dragIdx.current === i ? 0.4 : 1,
              transition: 'border 0.15s, opacity 0.15s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span className="drag-handle" style={{
                width: 28, height: 28, borderRadius: '50%', background: 'var(--accent-primary)',
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.78rem', fontWeight: 700, flexShrink: 0, cursor: 'grab',
              }}>{i + 1}</span>
              <input value={proj.title} onChange={(e) => update(i, 'title', e.target.value)}
                placeholder="Project title" style={{ ...inputStyle, flex: 1 }} />
              <div className="move-btns" style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                <button type="button" onClick={() => moveItem(i, -1)} disabled={i === 0}
                  style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-muted)', cursor: i === 0 ? 'default' : 'pointer', fontSize: '0.75rem', opacity: i === 0 ? 0.3 : 1, lineHeight: 1 }}>▲</button>
                <button type="button" onClick={() => moveItem(i, 1)} disabled={i === items.length - 1}
                  style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-muted)', cursor: i === items.length - 1 ? 'default' : 'pointer', fontSize: '0.75rem', opacity: i === items.length - 1 ? 0.3 : 1, lineHeight: 1 }}>▼</button>
              </div>
              <button type="button" onClick={() => removeItem(i)} style={{
                padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(239,68,68,0.3)',
                background: 'rgba(239,68,68,0.1)', color: '#ef4444', cursor: 'pointer', fontSize: '0.85rem',
                flexShrink: 0,
              }}>X</button>
            </div>
            <textarea value={proj.description} onChange={(e) => update(i, 'description', e.target.value)}
              placeholder="Description" rows={2} style={{ ...inputStyle, marginBottom: 0, resize: 'vertical' }} />
          </div>
        ))}

        <button type="button" onClick={addItem} className="add-btn" style={{
          width: '100%', padding: 12, borderRadius: 10, border: '1px dashed var(--border-color)',
          background: 'transparent', color: 'var(--text-muted)', fontSize: '0.9rem', cursor: 'pointer',
          marginBottom: 16, transition: 'all 0.2s',
        }}>
          + Add Project
        </button>

        <SaveButton saving={saving} done={done} error={saveError} />
      </form>

      <style>{`
        .edit-card:hover {
          border-color: var(--accent-primary) !important;
        }
        .add-btn:hover {
          border-color: var(--accent-primary) !important;
          color: var(--accent-primary) !important;
        }
        @media (max-width: 600px) {
          .drag-handle { display: none !important; }
          .move-btns { display: none !important; }
        }
        @media (max-width: 480px) {
          .edit-card { padding: 12px !important; }
          .edit-card input { font-size: 0.85rem !important; }
          .edit-card textarea { font-size: 0.85rem !important; }
        }
      `}</style>
    </PageShell>
  );
}

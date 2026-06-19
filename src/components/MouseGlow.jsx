import { useState, useEffect, useCallback } from 'react';

export default function MouseGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });

  const onMove = useCallback((e) => {
    setPos({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [onMove]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 999,
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, color-mix(in srgb, var(--accent-tertiary) 12%, transparent), color-mix(in srgb, var(--accent-primary) 6%, transparent), transparent 60%)',
          transform: `translate(${pos.x - 250}px, ${pos.y - 250}px)`,
          willChange: 'transform',
        }}
      />
    </div>
  );
}

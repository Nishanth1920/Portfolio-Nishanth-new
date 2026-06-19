import { useState, useEffect, useCallback, useRef } from 'react';

export default function DynamicBackground() {
  const posRef = useRef({ x: 0.5, y: 0.5 });
  const layer1Ref = useRef(null);
  const layer2Ref = useRef(null);

  const onMove = useCallback((e) => {
    posRef.current = {
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    };
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [onMove]);

  useEffect(() => {
    let rafId;
    const tick = () => {
      const p = posRef.current;
      const x = (p.x - 0.5) * 30;
      const y = (p.y - 0.5) * 30;
      if (layer1Ref.current) {
        layer1Ref.current.style.transform = `translate(${x}px, ${y}px)`;
      }
      if (layer2Ref.current) {
        layer2Ref.current.style.transform = `translate(${y * 0.5}px, ${x * 0.5}px)`;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      <div
        ref={layer1Ref}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          willChange: 'transform',
          background: 'radial-gradient(800px circle at 50% 50%, rgba(99,102,241,0.04), transparent 60%)',
        }}
      />
      <div
        ref={layer2Ref}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          willChange: 'transform',
          background: 'radial-gradient(600px circle at 50% 50%, rgba(139,92,246,0.025), transparent 50%)',
        }}
      />
    </div>
  );
}

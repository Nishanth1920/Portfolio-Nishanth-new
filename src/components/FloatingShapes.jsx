import { useEffect, useRef } from 'react';

export default function FloatingShapes() {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const shapes = [];
    const colors = ['rgba(99,102,241,0.08)', 'rgba(6,182,212,0.06)', 'rgba(139,92,246,0.06)'];

    for (let i = 0; i < 6; i++) {
      const el = document.createElement('div');
      const size = 40 + Math.random() * 80;
      const isCircle = Math.random() > 0.5;
      el.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: ${isCircle ? '50%' : '8px'};
        background: ${colors[i % colors.length]};
        border: 1px solid rgba(99,102,241,0.06);
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        pointer-events: none;
        animation: floatShape ${12 + Math.random() * 16}s ease-in-out infinite;
        animation-delay: ${Math.random() * -10}s;
        opacity: 0.6;
      `;
      container.appendChild(el);
      shapes.push(el);
    }

    const style = document.createElement('style');
    style.textContent = `
      @keyframes floatShape {
        0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
        25% { transform: translate(${10 + Math.random() * 20}px, ${-10 - Math.random() * 20}px) rotate(${Math.random() * 90}deg) scale(1.1); }
        50% { transform: translate(${-5 - Math.random() * 15}px, ${10 + Math.random() * 20}px) rotate(${Math.random() * 180}deg) scale(0.9); }
        75% { transform: translate(${10 + Math.random() * 15}px, ${-5 - Math.random() * 15}px) rotate(${Math.random() * 270}deg) scale(1.05); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      shapes.forEach((el) => el.remove());
      style.remove();
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}

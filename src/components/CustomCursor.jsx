import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    document.body.style.cursor = 'none';
    setVisible(true);

    const onMouseMove = (e) => setPos({ x: e.clientX, y: e.clientY });

    const onHoverIn = () => setHovering(true);
    const onHoverOut = () => setHovering(false);

    document.querySelectorAll('a, button, input, textarea, [data-cursor]').forEach((el) => {
      el.addEventListener('mouseenter', onHoverIn);
      el.addEventListener('mouseleave', onHoverOut);
    });

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, input, textarea, [data-cursor]').forEach((el) => {
        el.removeEventListener('mouseenter', onHoverIn);
        el.removeEventListener('mouseleave', onHoverOut);
        el.addEventListener('mouseenter', onHoverIn);
        el.addEventListener('mouseleave', onHoverOut);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
      document.querySelectorAll('a, button, input, textarea, [data-cursor]').forEach((el) => {
        el.removeEventListener('mouseenter', onHoverIn);
        el.removeEventListener('mouseleave', onHoverOut);
      });
    };
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      animate={{
        x: pos.x - 4,
        y: pos.y - 4,
        scale: hovering ? 2.5 : 1,
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: 'spring', stiffness: 350, damping: 25, mass: 0.5 }}
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 9999,
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: 'var(--gradient-main)',
        boxShadow: hovering ? '0 0 24px rgba(99,102,241,0.5)' : '0 0 12px rgba(99,102,241,0.35)',
      }}
    />
  );
}

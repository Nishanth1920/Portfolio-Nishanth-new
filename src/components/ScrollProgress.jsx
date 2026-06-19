import { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const [scrollY, setScrollY] = useState(0);
  const [max, setMax] = useState(1);

  const scaleX = useSpring(0, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollY(current);
      setMax(total || 1);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    scaleX.set(max > 0 ? scrollY / max : 0);
  }, [scrollY, max, scaleX]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 1001,
        transformOrigin: '0% 50%',
        background: 'var(--gradient-main)',
        scaleX,
      }}
    />
  );
}

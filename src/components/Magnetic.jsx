import { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function Magnetic({ children, strength = 0.3, style, className }) {
  const ref = useRef(null);

  const handleMouse = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  }, [strength]);

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate(0px, 0px)';
  }, []);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ ...style, transition: 'transform 0.4s cubic-bezier(0.33, 1, 0.68, 1)', willChange: 'transform' }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
}

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ScrollZoomSection({ children, style, className, zoomRange = [1, 1.15], opacityRange = [0, 1] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], zoomRange);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [opacityRange[0], opacityRange[1], opacityRange[1], opacityRange[0]]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ ...style, scale, opacity, transformOrigin: 'center center' }}
    >
      {children}
    </motion.div>
  );
}

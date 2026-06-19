import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function RevealText({ children, as: Tag = 'span', delay = 0, style, className }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', '0.7 start'],
  });
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (typeof children !== 'string') {
    return (
      <motion.span
        ref={ref}
        style={{ ...style, display: 'inline-block' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay, ease: [0.33, 1, 0.68, 1] }}
      >
        {children}
      </motion.span>
    );
  }

  return (
    <Tag ref={ref} className={className} style={{ ...style, position: 'relative', overflow: 'hidden', display: 'inline-block' }}>
      <motion.span style={{ display: 'inline-block' }}>
        {children}
      </motion.span>
      <motion.span
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--accent-primary)',
          transformOrigin: 'left',
        }}
        initial={{ scaleX: 1 }}
        whileInView={{ scaleX: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: [0.33, 1, 0.68, 1] }}
      />
    </Tag>
  );
}

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function TypeWriter({ texts, period = 2000, className }) {
  const [displayed, setDisplayed] = useState('');
  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[i];
    let timer;

    if (!isDeleting && j < current.length) {
      timer = setTimeout(() => {
        setDisplayed(current.slice(0, j + 1));
        setJ(j + 1);
      }, 60 + Math.random() * 80);
    } else if (!isDeleting && j === current.length) {
      timer = setTimeout(() => setIsDeleting(true), period);
    } else if (isDeleting && j > 0) {
      timer = setTimeout(() => {
        setDisplayed(current.slice(0, j - 1));
        setJ(j - 1);
      }, 30 + Math.random() * 40);
    } else if (isDeleting && j === 0) {
      setIsDeleting(false);
      setI((i + 1) % texts.length);
    }

    return () => clearTimeout(timer);
  }, [j, i, isDeleting, texts, period]);

  return (
    <span className={className}>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.6, ease: 'easeInOut' }}
        style={{ color: 'var(--accent-primary)', fontWeight: 300, marginLeft: 2 }}
      >
        |
      </motion.span>
    </span>
  );
}

import { motion } from 'framer-motion';

export default function WordReveal({ text, as: Tag = 'span', style, className }) {
  const words = text.split(' ');

  return (
    <Tag style={style} className={className}>
      <motion.span
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.03, delayChildren: 0.25 } },
        }}
        style={{ display: 'inline-flex', flexWrap: 'wrap' }}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0, y: 24, rotateX: -20 },
              visible: {
                opacity: 1,
                y: 0,
                rotateX: 0,
                transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            style={{ display: 'inline-block', marginRight: '0.25em', perspective: 600 }}
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}

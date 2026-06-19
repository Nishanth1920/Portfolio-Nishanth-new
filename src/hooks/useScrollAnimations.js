import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function useScrollScale(options = {}) {
  const { range = [0, 1], outputRange = [1, 1.2] } = options;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const scale = useTransform(scrollYProgress, range, outputRange);
  return { ref, scale };
}

export function useScrollParallax(options = { speed: 0.3 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [options.speed * 100, options.speed * -100]);
  return { ref, y };
}

export function useScrollRotate(options = { range: [0, 1], outputRange: [0, 15] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const rotate = useTransform(scrollYProgress, options.range, options.outputRange);
  return { ref, rotate };
}

export function useScrollReveal() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [60, 0, 0, -60]);
  return { ref, opacity, y };
}

export function usePerspectiveScroll() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.3], ['8px', '0px']);
  return { ref, scale, y, blur };
}

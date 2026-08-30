import { useEffect, useRef, useState } from 'react';
import usePrefersReducedMotion from './usePrefersReducedMotion.js';

/**
 * Single-fire reveal on scroll.
 *
 * Under reduced motion this returns true immediately, so content is
 * never gated behind an animation that will not run. The CSS still
 * fades — reduce, not remove — it just does not translate.
 */
export default function useReveal() {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (reduced || shown) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -12%' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced, shown]);

  return [ref, reduced || shown];
}

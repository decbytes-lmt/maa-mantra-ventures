import { useEffect, useRef, useState } from 'react';

export default function useReveal(threshold = 0.08) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  // Persist across StrictMode double-mount
  const seen = useRef(false);

  useEffect(() => {
    // Already triggered in a previous mount cycle — restore immediately
    if (seen.current) {
      setInView(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    // Small rAF delay so DOM is painted before we measure
    const raf = requestAnimationFrame(() => {
      const rect = node.getBoundingClientRect();
      const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (alreadyVisible) {
        seen.current = true;
        setInView(true);
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            seen.current = true;
            setInView(true);
            observer.disconnect();
          }
        },
        { threshold, rootMargin: '0px 0px -30px 0px' }
      );

      observer.observe(node);
      // Cleanup on unmount — observer disconnects but seen.current stays true
      return () => observer.disconnect();
    });

    return () => cancelAnimationFrame(raf);
  }, [threshold]);

  return [ref, inView];
}

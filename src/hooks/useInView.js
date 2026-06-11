import { useEffect, useRef, useState } from 'react';

export function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  const { once = true, threshold = 0.15, ...observerOptions } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (once) obs.unobserve(el);
      }
    }, { threshold, ...observerOptions });

    obs.observe(el);

    return () => obs.disconnect();
  }, [once, threshold, observerOptions]);

  return [ref, inView];
}
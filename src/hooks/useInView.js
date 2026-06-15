import { useEffect, useRef, useState } from 'react';

export function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  const { once = true, threshold = 0.15, ...observerOptions } = options;
  const { root = null, rootMargin = '0px' } = observerOptions;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (once) obs.unobserve(el);
      }
    }, { threshold, root, rootMargin });

    obs.observe(el);

    return () => obs.disconnect();
  }, [once, threshold, root, rootMargin]);

  return [ref, inView];
}

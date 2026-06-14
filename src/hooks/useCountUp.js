import { useEffect, useRef, useState } from 'react';

export function useCountUp(target, duration = 2000, inView = false) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return undefined;

    started.current = true;
    let frameId = 0;
    const start = performance.now();

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - ((1 - progress) ** 3);
      setCount(Math.floor(ease * target));

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [duration, inView, target]);

  return count;
}

import React, { useEffect, useRef, useState } from 'react';

function GoldDustInner() {
  const [enabled, setEnabled] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setEnabled(window.innerWidth >= 768 && !media.matches);
    update();
    media.addEventListener('change', update);
    window.addEventListener('resize', update);
    return () => {
      media.removeEventListener('change', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const particles = [];
    let width = 0;
    let height = 0;
    let rafId = 0;
    let running = document.visibilityState === 'visible';

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1) * 0.75;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const seedParticles = () => {
      particles.length = 0;
      for (let i = 0; i < 40; i += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.4 + 0.3,
          vx: (Math.random() - 0.5) * 0.15,
          vy: -Math.random() * 0.22 - 0.04,
          alpha: Math.random() * 0.38 + 0.08,
          fadeDir: Math.random() > 0.5 ? 1 : -1,
          fadeSpeed: Math.random() * 0.0025 + 0.001,
        });
      }
    };

    const draw = () => {
      if (!running) return;

      ctx.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.alpha += particle.fadeDir * particle.fadeSpeed;

        if (particle.alpha > 0.5) particle.fadeDir = -1;
        if (particle.alpha < 0.04) particle.fadeDir = 1;
        if (particle.y < -10) {
          particle.y = height + 10;
          particle.x = Math.random() * width;
        }
        if (particle.x < -10) particle.x = width + 10;
        if (particle.x > width + 10) particle.x = -10;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${particle.alpha})`;
        ctx.fill();
      });

      rafId = window.requestAnimationFrame(draw);
    };

    const onVisibility = () => {
      running = document.visibilityState === 'visible';
      if (running) {
        cancelAnimationFrame(rafId);
        draw();
      } else {
        cancelAnimationFrame(rafId);
      }
    };

    resize();
    seedParticles();
    draw();

    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 3,
        opacity: 0.52,
      }}
    />
  );
}

export default function GoldDust() {
  if (typeof window !== 'undefined' && (window.innerWidth < 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches)) return null;
  return <GoldDustInner />;
}

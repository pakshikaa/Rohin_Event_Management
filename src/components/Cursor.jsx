import React, { useEffect, useRef, useState } from 'react';

function CursorInner() {
  const [isTouch, setIsTouch] = useState(true);
  const dotRef = useRef(null);
  const followerRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const followerPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);

  useEffect(() => {
    const media = window.matchMedia('(hover: none)');
    const update = () => setIsTouch(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (isTouch) return undefined;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onEnter = () => {
      dotRef.current?.classList.add('expanded');
      followerRef.current?.classList.add('expanded');
    };

    const onLeave = () => {
      dotRef.current?.classList.remove('expanded');
      followerRef.current?.classList.remove('expanded');
    };

    const animate = () => {
      followerPos.current.x += (pos.current.x - followerPos.current.x) * 0.12;
      followerPos.current.y += (pos.current.y - followerPos.current.y) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${followerPos.current.x - 16}px, ${followerPos.current.y - 16}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseenter', onEnter, true);
    document.addEventListener('mouseleave', onLeave, true);
    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseenter', onEnter, true);
      document.removeEventListener('mouseleave', onLeave, true);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      <div ref={dotRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  );
}

export default function Cursor() {
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return null;
  return <CursorInner />;
}

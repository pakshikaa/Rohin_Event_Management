import React, { useEffect, useState } from 'react';
import './Loader.css';

export default function Loader({ onDone }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t1 = window.setTimeout(() => setFading(true), 1800);
    const t2 = window.setTimeout(() => onDone(), 2400);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [onDone]);

  return (
    <div className={`loader ${fading ? 'loader--out' : ''}`} aria-hidden="true">
      <div className="loader__inner">
        <p className="loader__name">ROHIN</p>
        <div className="loader__line" />
        <p className="loader__sub">EVENT MANAGEMENT</p>
      </div>
    </div>
  );
}

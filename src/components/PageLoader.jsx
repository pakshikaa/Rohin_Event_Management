import React, { useEffect, useState } from 'react';

export default function PageLoader() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setLoaded(true), 2000);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <div className={`page-loader ${loaded ? 'page-loader--hidden' : ''}`} aria-hidden={loaded}>
      <div className="page-loader__content">
        <span className="page-loader__name">ROHIN</span>
        <span className="page-loader__line" />
        <span className="page-loader__tag">EVENT MANAGEMENT</span>
      </div>
    </div>
  );
}

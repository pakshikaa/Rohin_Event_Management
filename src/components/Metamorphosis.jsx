import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CONTACT, trackWhatsAppClick } from '../content/site';
import { useInView } from '../hooks/useInView';
import './Metamorphosis.css';

const SCENARIOS = [
  {
    id: 1,
    label: 'Wedding Signature',
    title: 'Luxury Wedding Reception',
    beforeImage: '/images/transformation/wedding-before.png',
    afterImage: '/images/transformation/wedding-after.png',
    accent: '#dcb79b',
    requirements: [
      'Floral stage styling',
      'Elegant seating layout',
      'Romantic lighting',
      'Premium photo backdrop',
    ],
  },
  {
    id: 2,
    label: 'Birthday Signature',
    title: 'Luxury Birthday Celebration',
    beforeImage: '/images/transformation/birthday-before.png',
    afterImage: '/images/transformation/birthday-after.png',
    accent: '#e7c1cb',
    requirements: [
      'Balloon installation',
      'LED number display',
      'Premium backdrop',
      'Photo corner setup',
    ],
  },
];

function Slider({ scenario }) {
  const trackRef = useRef(null);
  const [position, setPosition] = useState(() => (typeof window !== 'undefined' && window.innerWidth < 768 ? 35 : 50));
  const dragging = useRef(false);

  useEffect(() => {
    const onResize = () => setPosition(window.innerWidth < 768 ? 35 : 50);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const getPercent = useCallback((clientX) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return 50;
    return Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
  }, []);

  const startDrag = () => { dragging.current = true; };
  const stopDrag = () => { dragging.current = false; };
  const onMouseMove = (event) => dragging.current && setPosition(getPercent(event.clientX));
  const onTouchMove = (event) => dragging.current && setPosition(getPercent(event.touches[0].clientX));
  const onKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      setPosition((current) => Math.max(0, current - 5));
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      setPosition((current) => Math.min(100, current + 5));
    }
  };

  return (
    <div
      className="meta__slider"
      ref={trackRef}
      tabIndex={0}
      role="slider"
      aria-label={`${scenario.title} reveal slider`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      onMouseDown={startDrag}
      onMouseMove={onMouseMove}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      onTouchStart={() => { dragging.current = true; }}
      onTouchMove={onTouchMove}
      onTouchEnd={() => { dragging.current = false; }}
      onKeyDown={onKeyDown}
      style={{ touchAction: 'none' }}
    >
      <div className="meta__scene meta__scene--before">
        <img
          className="meta__image meta__image--before"
          src={scenario.beforeImage}
          alt={`${scenario.title} before decoration view`}
          draggable="false"
        />
        <div className="meta__dust" />
        <span className="meta__label meta__label--before">Before Decoration</span>
        <div className="meta__brief-card">
          <span className="meta__brief-label">Client Requirements</span>
          <h3>{scenario.title}</h3>
          <p className="meta__brief-room">Empty Venue</p>
          <ul className="meta__brief-list">
            {scenario.requirements.map((requirement) => (
              <li key={requirement}>{requirement}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="meta__scene meta__scene--after" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <img
          className="meta__image meta__image--after"
          src={scenario.afterImage}
          alt={`${scenario.title} after Rohin decoration`}
          draggable="false"
        />
        <div className="meta__lights" style={{ '--meta-accent': scenario.accent }} />
        <span className="meta__label meta__label--after">After Rohin Styling</span>
      </div>

      <div className="meta__handle" style={{ left: `${position}%` }}>
        <span className="meta__handle-line" />
        <span className="meta__handle-knob" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M8 6 4 10l4 4M12 6l4 4-4 4" stroke="#0B0B0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </div>
  );
}

export default function Metamorphosis() {
  const [active, setActive] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.1 });
  const scenario = SCENARIOS[active];

  return (
    <section className="meta" id="metamorphosis" ref={ref}>
      <div className={`meta__inner ${inView ? 'visible' : ''}`}>
        <div className="meta__header">
          <p className="meta__eyebrow">See the Transformation</p>
          <h2 className="meta__headline">From Venue to Experience</h2>
          <p className="meta__sub">Drag the slider to compare the venue before decoration and after ROHIN styling.</p>
        </div>

        <div className="meta__tabs">
          {SCENARIOS.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`meta__tab ${index === active ? 'active' : ''}`}
              onClick={() => setActive(index)}
              aria-pressed={index === active}
            >
              {item.label}
            </button>
          ))}
        </div>

        <Slider scenario={scenario} />
        <p className="meta__drag-hint">&larr; Drag to reveal &rarr;</p>

        <div className="meta__footnote">
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('metamorphosis')}
          >
            See how ordinary spaces become memorable celebrations. <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}

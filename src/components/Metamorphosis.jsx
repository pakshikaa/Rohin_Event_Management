import React, { useRef, useState, useCallback } from 'react';
import { useInView } from '../hooks/useInView';
import './Metamorphosis.css';

const PAIRS = [
  {
    id: 1,
    label: 'Wedding Signature',
    title: 'Luxury Wedding Reception',
    beforeImage: '/images/transformation/wedding-before.png',
    afterImage: '/images/transformation/wedding-after.png',
    beforeImagePosition: 'center center',
    afterImagePosition: 'center center',
    beforeTitle: 'Client Requirements',
    brief: 'Planned for a premium wedding reception atmosphere with floral detail, guest comfort, and a polished visual finish.',
    beforeLabel: 'BEFORE DECORATION',
    afterLabel: 'Final Result',
    notes: ['Floral stage styling', 'Elegant seating layout', 'Romantic lighting', 'Premium photo backdrop'],
    proof: 'ROHIN transformed the empty ballroom into a full wedding reception setup with floral styling, warm light, and a luxury ceremony mood.',
    resultPoints: ['Floral styling', 'Premium lighting', 'Luxury atmosphere'],
    accent: '#dcb79b',
  },
  {
    id: 2,
    label: 'Birthday Signature',
    title: 'Luxury Birthday Celebration',
    beforeImage: '/images/transformation/birthday-before.png',
    afterImage: '/images/transformation/birthday-after.png',
    beforeImagePosition: 'center center',
    afterImagePosition: 'center center',
    beforeTitle: 'Client Requirements',
    brief: 'Planned for a premium milestone celebration with a clear focal point, elegant styling, and a strong family photo area.',
    beforeLabel: 'BEFORE DECORATION',
    afterLabel: 'Final Result',
    notes: ['Balloon installation', 'LED number display', 'Premium backdrop', 'Photo corner setup'],
    proof: 'ROHIN turned the empty function hall into a premium birthday setup with balloon styling, gold detailing, and a complete celebration backdrop.',
    resultPoints: ['Balloon styling', 'Backdrop installation', 'Premium celebration environment'],
    accent: '#e7c1cb',
  },
];

function Slider({ pair }) {
  const trackRef = useRef(null);
  const [pos, setPos] = useState(54);
  const dragging = useRef(false);

  const getPercent = useCallback((clientX) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return 54;
    return Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
  }, []);

  const onMouseDown = () => { dragging.current = true; };
  const onMouseMove = (e) => { if (dragging.current) setPos(getPercent(e.clientX)); };
  const onMouseUp = () => { dragging.current = false; };
  const onTouchStart = () => { dragging.current = true; };
  const onTouchMove = (e) => {
    if (dragging.current) setPos(getPercent(e.touches[0].clientX));
  };
  const onTouchEnd = () => { dragging.current = false; };

  return (
    <div
      className="meta__slider"
      ref={trackRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="meta__layer meta__layer--before">
        <img
          className="meta__image meta__image--before"
          src={pair.beforeImage}
          alt={`${pair.title} before styling concept view`}
          style={{ objectPosition: pair.beforeImagePosition }}
          draggable="false"
        />
        <div className="meta__image-wash meta__image-wash--before" />
        <div className="meta__side meta__side--before">
          <span className="meta__corner-label">{pair.beforeLabel}</span>
          <div className="meta__brief-card">
            <span className="meta__brief-kicker">{pair.beforeTitle}</span>
            <h3>{pair.title}</h3>
            <p>{pair.brief}</p>
            <span className="meta__brief-list-label">Requirements</span>
            <ul className="meta__brief-list">
              {pair.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
          <span className="meta__side-label">EMPTY VENUE</span>
        </div>
      </div>

      <div className="meta__layer meta__layer--after" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img
          className="meta__image meta__image--after"
          src={pair.afterImage}
          alt={`${pair.title} final decorated result`}
          style={{ objectPosition: pair.afterImagePosition }}
          draggable="false"
        />
        <div className="meta__image-wash meta__image-wash--after" style={{ '--meta-accent': pair.accent }} />
        <div className="meta__side meta__side--after">
          <span className="meta__corner-label meta__corner-label--gold">{pair.afterLabel}</span>
          <div className="meta__proof-card">
            <span className="meta__proof-badge">ROHIN Transformation</span>
            <h3>{pair.title}</h3>
            <p>{pair.proof}</p>
            <div className="meta__result-list">
              {pair.resultPoints.map((point) => (
                <span key={point} className="meta__result-pill">{point}</span>
              ))}
            </div>
          </div>
          <span className="meta__side-label meta__side-label--gold">Decorated and event-ready final setup</span>
        </div>
      </div>

      <div className="meta__handle" style={{ left: `${pos}%` }}>
        <div className="meta__handle-line" />
        <div className="meta__handle-knob">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M6 10l-4 0M14 10l4 0M8 7l-2 3 2 3M12 7l2 3-2 3" stroke="#0B0B0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function Metamorphosis() {
  const [active, setActive] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <section className="meta" id="metamorphosis" ref={ref}>
      <div className={`meta__inner ${inView ? 'visible' : ''}`}>
        <div className="meta__header">
          <p className="meta__eyebrow">Transformation Showcase</p>
          <h2 className="meta__headline">
            See the <em>Transformation</em>
          </h2>
          <p className="meta__sub">
            Drag the slider to compare the venue before decoration and after ROHIN styling.
          </p>
        </div>

        <div className="meta__tabs">
          {PAIRS.map((pair, index) => (
            <button
              key={pair.id}
              className={`meta__tab ${active === index ? 'active' : ''}`}
              onClick={() => setActive(index)}
            >
              {pair.label}
            </button>
          ))}
        </div>

        <Slider pair={PAIRS[active]} />

        <div className="meta__mobile-details" aria-hidden="true">
          <div className="meta__mobile-card">
            <span className="meta__brief-kicker">{PAIRS[active].beforeTitle}</span>
            <h3>{PAIRS[active].title}</h3>
            <p>{PAIRS[active].brief}</p>
            <ul className="meta__brief-list">
              {PAIRS[active].notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>

          <div className="meta__mobile-card meta__mobile-card--gold">
            <span className="meta__proof-badge">ROHIN Transformation</span>
            <h3>{PAIRS[active].afterLabel}</h3>
            <p>{PAIRS[active].proof}</p>
            <div className="meta__result-list">
              {PAIRS[active].resultPoints.map((point) => (
                <span key={point} className="meta__result-pill">{point}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="meta__footnote">
          <span>Left shows the idea before styling. Right shows the final decorated result.</span>
          <a
            href="https://wa.me/94767171454?text=Hello%20Rohin,%20I%27d%20like%20to%20check%20event%20availability%20for%20my%20date%2C%20venue%2C%20and%20celebration."
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="meta__footnote-cta">Check Event Availability</span>
            <span className="meta__footnote-note">Tell us your event date, venue, and celebration type.</span>
          </a>
        </div>
      </div>
    </section>
  );
}

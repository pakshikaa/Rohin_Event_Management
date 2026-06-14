import React, { useEffect, useRef, useState } from 'react';
import { useInView } from '../hooks/useInView';
import './Testimonials.css';

const TESTIMONIALS = [
  {
    type: 'Wedding',
    quote: 'The venue felt elevated the moment guests walked in. Every floral and lighting detail felt composed.',
    name: 'K & T',
    label: 'Wedding Reception, Jaffna',
    initials: 'KT',
    icon: 'floral',
  },
  {
    type: 'Corporate',
    quote: 'Rohin gave the stage presence and polish we needed without making the room feel cold or generic.',
    name: 'Brand Team',
    label: 'Corporate Launch, Jaffna',
    initials: 'BT',
    icon: 'building',
  },
  {
    type: 'Celebration',
    quote: 'The setup felt premium in person and photographed beautifully from every corner of the room.',
    name: 'A & S',
    label: 'Milestone Evening, Kokkuvil',
    initials: 'AS',
    icon: 'floral',
  },
];

function TypeIcon({ type }) {
  const paths = {
    floral: <path d="M12 5c-2.2 0-4 1.7-4 3.8 0 2.3 1.8 4.2 4.1 4.2 2.1 0 3.9-1.6 3.9-3.7C16 7.1 14.4 5 12 5Zm-3 3.7c-1.9 0-3.5 1.5-3.5 3.3 0 1.8 1.4 3.3 3.2 3.3 1.8 0 3.3-1.5 3.3-3.5 0-1.7-1.3-3.1-3-3.1Z" />,
    building: <path d="M5 19V7l7-3 7 3v12M9 19v-4h6v4M9 9h.01M15 9h.01M9 12h.01M15 12h.01" />,
  };

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {paths[type]}
    </svg>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [display, setDisplay] = useState(0);
  const [fading, setFading] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.15 });
  const timerRef = useRef(null);
  const timeoutRef = useRef(null);

  const changeQuote = (index) => {
    setFading(true);
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setActive(index);
      setDisplay(index);
      setFading(false);
    }, 220);
  };

  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      changeQuote((active + 1) % TESTIMONIALS.length);
    }, 5500);

    return () => {
      window.clearInterval(timerRef.current);
      window.clearTimeout(timeoutRef.current);
    };
  }, [active]);

  const current = TESTIMONIALS[display];

  return (
    <section className="testimonials" id="testimonials" ref={ref}>
      <div className={`testimonials__inner ${inView ? 'visible' : ''}`}>
        <p className="testimonials__eyebrow">Client Trust</p>
        <div className="testimonials__divider">
          <TypeIcon type={current.icon} />
          <span>{current.type}</span>
        </div>
        <div className="testimonials__quote-mark">&ldquo;</div>
        <blockquote className={`testimonials__quote ${fading ? 'fading' : ''}`}>
          {current.quote}
        </blockquote>

        <div className="testimonials__author">
          <span className="testimonials__avatar">{current.initials}</span>
          <div>
            <p className="testimonials__name">{current.name}</p>
            <p className="testimonials__event">{current.label}</p>
          </div>
        </div>

        <div className="testimonials__dots" role="tablist" aria-label="Testimonials">
          {TESTIMONIALS.map((item, index) => (
            <button
              key={item.name}
              type="button"
              className={`testimonials__dot ${index === active ? 'active' : ''}`}
              onClick={() => changeQuote(index)}
              aria-label={`Show testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

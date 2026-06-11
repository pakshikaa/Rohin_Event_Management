import React from 'react';
import './TrustStrip.css';

const ITEMS = [
  '100+ Events Styled',
  'Weddings & Birthdays',
  'Serving Jaffna & Northern Province',
  'Fast WhatsApp Response',
];

export default function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Trust indicators">
      <div className="trust-strip__inner">
        {ITEMS.map((item) => (
          <div className="trust-strip__item" key={item}>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

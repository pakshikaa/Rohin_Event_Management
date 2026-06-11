import React from 'react';
import { useInView } from '../hooks/useInView';
import './Philosophy.css';

const PRINCIPLES = [
  {
    num: '01',
    title: 'We Understand Your Event',
    desc: 'We begin by understanding your event type, venue, guest flow, and preferred mood.',
  },
  {
    num: '02',
    title: 'We Design the Complete Look',
    desc: 'Flowers, stage setup, lighting, seating, and photo areas are planned together for one elegant atmosphere.',
  },
  {
    num: '03',
    title: 'We Keep It Refined',
    desc: 'Our style is premium, clean, and balanced - never overcrowded, never random.',
  },
];

export default function Philosophy() {
  const [ref, inView] = useInView();

  return (
    <section className="philosophy" id="philosophy" ref={ref}>
      <div className={`philosophy__inner ${inView ? 'visible' : ''}`}>
        <div className="philosophy__left">
          <p className="philosophy__eyebrow">Why Clients Choose ROHIN</p>
          <h2 className="philosophy__headline">
            Every event is designed with care,
            <br />
            <em>balance, and attention to detail.</em>
          </h2>
          <div className="philosophy__divider" />
          <p className="philosophy__body">
            Our work is not about adding random decoration. It is about creating a complete event
            environment that feels elegant, personal, and well planned.
          </p>
          <div className="philosophy__quote">
            <span className="philosophy__quote-mark">"</span>
            <p>
              From the first discussion to the final setup, our goal is to make your event feel
              beautifully planned, personal, and memorable.
            </p>
          </div>
        </div>

        <div className="philosophy__right">
          <div className="philosophy__pillars">
            {PRINCIPLES.map((p, i) => (
              <div className="philosophy__pillar" key={p.num} style={{ transitionDelay: `${0.2 + i * 0.15}s` }}>
                <span className="philosophy__pillar-num">{p.num}</span>
                <div className="philosophy__pillar-content">
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { useInView } from '../hooks/useInView';
import './Philosophy.css';

const PILLARS = [
  {
    num: '01',
    title: 'We study the room first',
    desc: 'Guest movement, sight-lines, focal moments, and venue proportion guide every styling decision.',
  },
  {
    num: '02',
    title: 'We shape atmosphere, not clutter',
    desc: 'Florals, lighting, textiles, and staging are composed together so the room feels intentional.',
  },
  {
    num: '03',
    title: 'We leave a memory in the space',
    desc: 'The final environment should feel cinematic in person, not only in photographs.',
  },
];

export default function Philosophy() {
  const [ref, inView] = useInView({ threshold: 0.15 });

  return (
    <section className="philosophy" id="philosophy" ref={ref}>
      <div className={`philosophy__inner ${inView ? 'visible' : ''}`}>
        <div className="philosophy__left">
          <p className="philosophy__eyebrow">Our Philosophy</p>
          <h2 className="philosophy__headline">
            We do not decorate a venue.
            <br />
            <em>We tell it.</em>
          </h2>
          <div className="philosophy__divider" />
          <p className="philosophy__body">
            Every Rohin installation is built to feel composed, elegant, and emotionally legible.
            We translate a brief into a full guest experience through staging, balance, lighting,
            and visual rhythm.
          </p>
        </div>

        <div className="philosophy__right">
          {PILLARS.map((pillar, index) => (
            <article
              key={pillar.num}
              className="philosophy__pillar"
              style={{ transitionDelay: `${0.15 + (index * 0.15)}s` }}
            >
              <span className="philosophy__pillar-num">{pillar.num}</span>
              <div className="philosophy__pillar-copy">
                <h3>{pillar.title}</h3>
                <p>{pillar.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

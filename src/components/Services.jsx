import React from 'react';
import { useInView } from '../hooks/useInView';
import { CONTACT } from '../content/site';
import './Services.css';

const PHASES = [
  {
    number: '01',
    title: 'Tell us about your event',
    desc: 'Share your event type, venue, date, and budget. We first understand what you need before suggesting any setup.',
    detail: 'wedding, birthday, engagement, private celebration',
  },
  {
    number: '02',
    title: 'We plan the decoration',
    desc: 'We organize the stage, entrance, flowers, lighting, and photo areas into one clear design that suits your event.',
    detail: 'stage setup, entrance decor, floral work, lighting design',
  },
  {
    number: '03',
    title: 'We set it up on the day',
    desc: 'Our team completes the work at the venue and checks the final look properly before guests arrive.',
    detail: 'venue setup, final checks, on-time delivery, ready for guests',
  },
];

const DISCIPLINES = [
  'Wedding decoration',
  'Birthday setups',
  'Engagement stages',
  'Entrance decoration',
  'Flower and lighting work',
  'Theme-based event styling',
];

export default function Services() {
  const [ref, inView] = useInView({ threshold: 0.05 });

  return (
    <section className="services" id="services" ref={ref}>
      <div className="services__header">
        <p className="services__eyebrow">How Rohin Works</p>
        <h2 className="services__headline">
          Easy to understand,
          <br />
          <em>clear from start to finish.</em>
        </h2>
        <p className="services__intro">
          You tell us the event idea. We plan the decoration and complete the setup properly at
          your venue.
        </p>
      </div>

      <div className={`services__flow ${inView ? 'visible' : ''}`}>
        <div className="services__timeline">
          {PHASES.map((phase, i) => (
            <article className="services__phase" key={phase.number} style={{ transitionDelay: `${i * 0.12}s` }}>
              <span className="services__phase-number">{phase.number}</span>
              <div className="services__phase-body">
                <h3 className="services__phase-title">{phase.title}</h3>
                <p className="services__phase-desc">{phase.desc}</p>
                <p className="services__phase-detail">{phase.detail}</p>
              </div>
            </article>
          ))}
        </div>

        <aside className="services__rail">
          <span className="services__rail-label">What We Handle</span>
          <div className="services__rail-list">
            {DISCIPLINES.map((item) => (
              <span className="services__rail-item" key={item}>{item}</span>
            ))}
          </div>
          <p className="services__rail-note">
            You do not need to coordinate separate vendors for every visual part. Rohin handles
            the full decoration direction.
          </p>

          <div className="services__contact">
            <span className="services__contact-label">Contact Rohin</span>
            <a className="services__contact-link" href={`mailto:${CONTACT.email}`}>
              {CONTACT.email}
            </a>
            <a className="services__contact-link" href="tel:+94767171454">
              +94 76 717 1454
            </a>
            <a
              className="services__contact-link"
              href={CONTACT.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}

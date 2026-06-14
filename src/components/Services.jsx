import React from 'react';
import { useInView } from '../hooks/useInView';
import './Services.css';

const SERVICES = [
  {
    title: 'Wedding Atmospheres',
    tag: 'Ceremony Direction',
    desc: 'Grand reception rooms, mandap focus, aisle styling, and guest-facing floral composition.',
    icon: 'floral',
  },
  {
    title: 'Corporate Staging',
    tag: 'Brand Presence',
    desc: 'Statement backdrops, presentation environments, and polished stage architecture for formal events.',
    icon: 'building',
  },
  {
    title: 'Birthday Worlds',
    tag: 'Family Celebrations',
    desc: 'Theme-led installations, focal cake moments, and layered decor for intimate or large birthday rooms.',
    icon: 'balloon',
  },
  {
    title: 'Entrance Installations',
    tag: 'Arrival Moment',
    desc: 'Arches, tunnels, and floral thresholds that establish the mood from the first guest arrival.',
    icon: 'arch',
  },
  {
    title: 'Lighting & Texture',
    tag: 'Spatial Finish',
    desc: 'Warm fairy-light systems, fabric drape, glow control, and elegant finishing touches across the venue.',
    icon: 'spark',
  },
  {
    title: 'Private Celebrations',
    tag: 'Refined Gatherings',
    desc: 'Curated styling for milestones, proposal settings, and intimate high-touch occasions.',
    icon: 'gem',
  },
];

function ServiceIcon({ type }) {
  const paths = {
    floral: <path d="M14 5c-2.4 0-4 1.7-4 4.2 0 2.6 2.1 4.7 4.7 4.7 2.3 0 4.3-1.7 4.3-4.1 0-2.5-1.8-4.8-5-4.8ZM10 9C7.3 9 5 11 5 13.7 5 16 6.8 18 9 18c2.2 0 4-1.7 4-4.1C13 11.4 11.6 9 10 9Zm2 5c0 3.3-2.7 6-6 6" />,
    building: <path d="M5 19V7l7-3 7 3v12M9 19v-4h6v4M9 9h.01M15 9h.01M9 12h.01M15 12h.01" />,
    balloon: <path d="M12 4c-3.3 0-6 2.5-6 5.7 0 2.1 1.2 4.1 3 5.2V17c0 1.7 1.3 3 3 3s3-1.3 3-3v-2.1c1.8-1.1 3-3.1 3-5.2C18 6.5 15.3 4 12 4Zm0 16-1.2 1.5M12 20l1.2 1.5" />,
    arch: <path d="M5 19V9a7 7 0 0 1 14 0v10M9 19v-6h6v6M7 11h10" />,
    spark: <path d="m12 4 1.7 4.3L18 10l-4.3 1.7L12 16l-1.7-4.3L6 10l4.3-1.7L12 4Zm6 10 .8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8L18 14ZM6 14l.8 2.2L9 17l-2.2.8L6 20l-.8-2.2L3 17l2.2-.8L6 14Z" />,
    gem: <path d="m7 6 5-2 5 2 2 4-7 10L5 10l2-4Zm0 0h10M9 10h6" />,
  };

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {paths[type]}
    </svg>
  );
}

export default function Services() {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <section className="services" id="services" ref={ref}>
      <div className="services__header">
        <p className="services__eyebrow">Signature Services</p>
        <h2 className="services__headline">Celebration styling offered through one <em>refined direction.</em></h2>
      </div>

      <div className={`services__grid ${inView ? 'visible' : ''}`}>
        {SERVICES.map((service, index) => (
          <article
            key={service.title}
            className="services__card"
            style={{ transitionDelay: `${index * 0.08}s` }}
          >
            <ServiceIcon type={service.icon} />
            <span className="services__tag services__card-anchor">{service.tag}</span>
            <h3 className="services__card-title">{service.title}</h3>
            <p className="services__card-desc">{service.desc}</p>
            <span className="services__line" />
          </article>
        ))}
      </div>
    </section>
  );
}

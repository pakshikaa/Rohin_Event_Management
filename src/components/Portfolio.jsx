import React, { useMemo, useState } from 'react';
import { CONTACT, trackWhatsAppClick } from '../content/site';
import { useInView } from '../hooks/useInView';
import './Portfolio.css';

export const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: 'Floral Stage Styling',
    tag: 'Wedding Reception · Jaffna',
    label: 'Real event decoration setup',
    filters: ['Wedding'],
    size: 'large',
    imageSrc: '/images/weddings/wedding-romantic-arch.jpeg',
    objectPosition: 'center 58%',
    bg: 'linear-gradient(135deg,#1a3a2a,#2a5a3a)',
  },
  {
    id: 2,
    title: 'Gold & Ivory Backdrop',
    tag: 'Engagement · Nallur',
    label: 'Selected engagement styling',
    filters: ['Engagement'],
    size: 'small',
    imageSrc: '/images/weddings/engagement-monogram-stage.jpeg',
    objectPosition: 'center center',
    bg: 'linear-gradient(160deg,#0d1a0d,#1a2a1a)',
  },
  {
    id: 3,
    title: 'Bride-to-Be Sunset Setup',
    tag: 'Bride to Be · Jaffna',
    label: 'Premium bridal photo area',
    filters: ['Bride to Be'],
    size: 'small',
    imageSrc: '/images/weddings/bride-to-be-sunset.jpeg',
    objectPosition: 'center center',
    bg: 'linear-gradient(120deg,#2a1a1a,#3a1f1f)',
  },
  {
    id: 4,
    title: 'Mandap Floral Work',
    tag: 'Hindu Wedding · Chavakachcheri',
    label: 'Traditional stage styling',
    filters: ['Hindu Wedding'],
    size: 'medium',
    imageSrc: '/images/weddings/hindu-wedding-stage.jpeg',
    objectPosition: 'center 52%',
    bg: 'linear-gradient(145deg,#1a1500,#2a2000)',
  },
  {
    id: 5,
    title: 'Mehndi Colour Wall',
    tag: 'Mehndi · Jaffna',
    label: 'Color-led celebration setup',
    filters: ['Mehndi'],
    size: 'medium',
    imageSrc: '/images/weddings/mehndi-colour-wall.jpeg',
    objectPosition: 'center center',
    bg: 'linear-gradient(135deg,#0d2318,#1a3a2a)',
  },
  {
    id: 6,
    title: 'Beach Ceremony Design',
    tag: 'Destination Wedding · Northern Coast',
    label: 'Destination ceremony styling',
    filters: ['Destination', 'Wedding'],
    size: 'large',
    imageSrc: '/images/weddings/destination-beach-aisle.jpeg',
    objectPosition: 'center center',
    bg: 'linear-gradient(160deg,#0d0d20,#1a1a3a)',
  },
  {
    id: 7,
    title: 'Iyer Ritual Styling',
    tag: 'Iyer Wedding · Jaffna',
    label: 'Sacred ritual-focused setup',
    filters: ['Iyer Wedding'],
    size: 'medium',
    imageSrc: '/images/weddings/iyer-wedding-ritual.jpeg',
    objectPosition: 'center center',
    bg: 'linear-gradient(150deg,#261a0d,#3b2a13)',
  },
  {
    id: 8,
    title: 'Neon Couple Lounge',
    tag: 'Wedding Lounge · Jaffna',
    label: 'Modern reception photo corner',
    filters: ['Wedding', 'Engagement'],
    size: 'small',
    imageSrc: '/images/weddings/engagement-neon-signature.jpeg',
    objectPosition: 'center 40%',
    bg: 'linear-gradient(135deg,#1d1821,#34263b)',
  },
];

const FILTERS = ['All', 'Wedding', 'Hindu Wedding', 'Engagement', 'Mehndi', 'Bride to Be', 'Iyer Wedding', 'Destination'];

export default function Portfolio() {
  const [active, setActive] = useState('All');
  const [ref, inView] = useInView({ threshold: 0.1 });

  const items = useMemo(() => {
    if (active === 'All') return PORTFOLIO_ITEMS;
    return PORTFOLIO_ITEMS.filter((item) => item.filters.includes(active));
  }, [active]);

  return (
    <section className="portfolio" id="portfolio" ref={ref}>
      <div className="portfolio__header">
        <div className="portfolio__copy">
          <p className="portfolio__eyebrow">Wedding Collections</p>
          <h2 className="portfolio__headline">
            Wedding Decoration
            {' '}
            <em>Portfolio</em>
          </h2>
          <p className="portfolio__sub">
            Explore our selected wedding setups, from mandap styling and engagement stages to mehndi,
            bridal, and destination wedding concepts.
          </p>
        </div>

        <aside className="portfolio__proof">
          <span className="portfolio__proof-label">Selected Wedding Work</span>
          <p>
            Mandap, engagement, mehndi, bridal, and reception decoration concepts styled for premium celebrations.
          </p>
        </aside>
      </div>

      <div className="portfolio__filters">
        {FILTERS.map((category) => (
          <button
            key={category}
            type="button"
            className={`portfolio__filter ${active === category ? 'active' : ''}`}
            onClick={() => setActive(category)}
            aria-pressed={active === category}
          >
            {category}
          </button>
        ))}
      </div>

      <div className={`portfolio__grid ${inView ? 'visible' : ''}`}>
        {items.map((item, index) => (
          <article
            key={item.id}
            className={`portfolio__item portfolio__item--${item.size}`}
            style={{ transitionDelay: `${index * 0.1}s` }}
          >
            <div className="portfolio__frame" style={{ background: item.bg }}>
              {item.imageSrc ? (
                <img
                  src={item.imageSrc}
                  alt={`${item.tag} featuring ${item.title.toLowerCase()} by Rohin Event Management`}
                  loading="lazy"
                  className="portfolio__image"
                  style={{ objectPosition: item.objectPosition || 'center center' }}
                />
              ) : (
                <div className="portfolio__item-bg" style={{ background: item.bg }} />
              )}
              <div className="portfolio__item-overlay" />
              <div className="portfolio__bloom" />
              <div className="portfolio__item-info">
                <span className="portfolio__item-tag">{item.tag}</span>
                <h3 className="portfolio__item-title">{item.title}</h3>
                <p className="portfolio__item-cat">{item.label}</p>
                <span className="portfolio__line" />
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="portfolio__footer">
        <a
          href={CONTACT.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="portfolio__cta"
          onClick={() => trackWhatsAppClick('portfolio')}
        >
          Send Your Date &amp; Venue
        </a>
      </div>
    </section>
  );
}

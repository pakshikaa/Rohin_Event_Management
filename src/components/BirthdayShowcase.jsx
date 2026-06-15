import React, { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { CTA_SUPPORT, CONTACT, trackWhatsAppClick } from '../content/site';
import './BirthdayShowcase.css';

const CATEGORIES = ['All', 'First Birthday', 'Kids Birthday', 'Milestone Birthday', 'Luxury Birthday Celebration'];

const ITEMS = [
  {
    id: 1,
    title: 'Midnight Luxe Stage',
    category: 'Luxury Birthday Celebration',
    tag: 'Black and silver statement styling with candlelit cake staging.',
    size: 'large',
    image: '/images/birthdays/birthday-black-silver.jpeg',
    accent: '#d0d0d0',
    objectPosition: 'center center',
  },
  {
    id: 2,
    title: 'Bunny Garden Party',
    category: 'Kids Birthday',
    tag: 'Storybook garden setup for a playful kids celebration.',
    size: 'wide',
    image: '/images/birthdays/birthday-bunny-garden.jpeg',
    accent: '#9abf7a',
    objectPosition: 'center center',
  },
  {
    id: 3,
    title: 'Pastel Fairy First Birthday',
    category: 'First Birthday',
    tag: 'Pink balloon styling with a soft dessert-table focal point.',
    size: 'medium',
    image: '/images/birthdays/birthday-pink-fairy.jpeg',
    accent: '#f2b7c8',
    objectPosition: 'center center',
  },
  {
    id: 4,
    title: 'Ocean Adventure Setup',
    category: 'Kids Birthday',
    tag: 'Underwater-inspired styling with layered balloon depth.',
    size: 'medium',
    image: '/images/birthdays/birthday-ocean-theme.jpeg',
    accent: '#9fd5ef',
    objectPosition: 'center center',
  },
  {
    id: 5,
    title: 'Mickey First Birthday',
    category: 'First Birthday',
    tag: 'Character-led stage with soft blue layering and clean framing.',
    size: 'medium',
    image: '/images/birthdays/birthday-mickey-blue.jpeg',
    accent: '#b8d2f2',
    objectPosition: 'center center',
  },
  {
    id: 6,
    title: 'Garden Number One',
    category: 'First Birthday',
    tag: 'Green wall styling with florals and crisp photo framing.',
    size: 'small',
    image: '/images/birthdays/birthday-garden-one.jpeg',
    accent: '#c9e2b5',
    objectPosition: 'center center',
  },
  {
    id: 7,
    title: 'Wild Safari Setup',
    category: 'Kids Birthday',
    tag: 'Safari palette with layered animals, balloons, and stage depth.',
    size: 'large',
    image: '/images/birthdays/birthday-safari.jpeg',
    accent: '#d7b46c',
    objectPosition: 'center center',
  },
  {
    id: 8,
    title: 'Jungle Luxe Cake Stage',
    category: 'Luxury Birthday Celebration',
    tag: 'Statement balloons, foliage, and premium staging.',
    size: 'medium',
    image: '/images/birthdays/birthday-jungle-luxe.jpeg',
    accent: '#8ab073',
    objectPosition: 'center center',
  },
  {
    id: 9,
    title: 'Glow 21 Celebration',
    category: 'Milestone Birthday',
    tag: 'Milestone birthday styling with illuminated numerals and warm glow.',
    size: 'medium',
    image: '/images/birthdays/birthday-21-glow.jpeg',
    accent: '#f1c58e',
    objectPosition: 'center center',
  },
  {
    id: 10,
    title: 'Beach Birthday Arch',
    category: 'Luxury Birthday Celebration',
    tag: 'Sunset portrait-point styling set directly by the shore.',
    size: 'wide',
    image: '/images/birthdays/birthday-beach-arch.jpeg',
    accent: '#efc39b',
    objectPosition: 'center center',
  },
];

const LANDING_ITEMS = ITEMS.filter((item) => item.image !== '/images/birthdays/birthday-pink-fairy.jpeg')
  .filter((item) => item.image !== '/images/birthdays/birthday-garden-one.jpeg');

export default function BirthdayShowcase() {
  const [active, setActive] = useState('All');
  const [ref, inView] = useInView({ threshold: 0.05 });

  const filtered = active === 'All'
    ? LANDING_ITEMS
    : LANDING_ITEMS.filter((item) => item.category === active);
  const highlight = filtered[0];
  const supportingItems = filtered.slice(1);

  return (
    <section className="birthday-showcase" id="birthdays" ref={ref}>
      <div className="birthday-showcase__header">
        <div className="birthday-showcase__copy">
          <p className="birthday-showcase__eyebrow">Birthday Collections</p>
          <h2 className="birthday-showcase__headline">
            Birthday Decoration
            {' '}
            <em>Portfolio</em>
          </h2>
          <p className="birthday-showcase__sub">
            Explore selected birthday setups for first birthdays, kids parties, and milestone celebrations,
            with premium backdrops, balloon styling, and photo-ready focal setups.
          </p>
        </div>

        <aside className="birthday-showcase__proof">
          <span className="birthday-showcase__proof-label">Selected Birthday Work</span>
          <p>
            First birthday, kids theme, milestone, and luxury celebration concepts styled for memorable family events.
          </p>
        </aside>
      </div>

      <div className="birthday-showcase__filters" role="tablist" aria-label="Birthday portfolio filters">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            className={`birthday-showcase__filter ${active === category ? 'active' : ''}`}
            onClick={() => setActive(category)}
            aria-pressed={active === category}
          >
            {category}
          </button>
        ))}
      </div>

      {highlight ? (
        <article className="birthday-showcase__highlight">
          <div className="birthday-showcase__highlight-media">
            <img
              src={highlight.image}
              alt={`${highlight.title} birthday decoration setup with premium backdrop, lighting, and celebration styling by Rohin Event Management`}
              loading="eager"
              style={{ objectPosition: highlight.objectPosition }}
            />
          </div>

          <div className="birthday-showcase__highlight-copy">
            <span className="birthday-showcase__highlight-label">Featured setup</span>
            <h3>{highlight.title}</h3>
            <p>{highlight.tag}</p>
          </div>
        </article>
      ) : null}

      <div className={`birthday-showcase__grid ${inView ? 'visible' : ''}`}>
        {supportingItems.map((item, index) => (
          <article
            key={item.id}
            className={`birthday-showcase__card birthday-showcase__card--${item.size}`}
            style={{ transitionDelay: `${index * 0.08}s` }}
          >
            <div className="birthday-showcase__frame">
              <img
                className="birthday-showcase__image"
                src={item.image}
                alt={`${item.title} birthday setup styled by Rohin Event Management with balloon work, backdrop design, and photo-ready staging`}
                loading="lazy"
                style={{ objectPosition: item.objectPosition }}
              />
              <div className="birthday-showcase__wash" style={{ '--accent': item.accent }} />
              <div className="birthday-showcase__content">
                <span className="birthday-showcase__category">{item.category}</span>
                <h3>{item.title}</h3>
                <p className="birthday-showcase__tag">{item.tag}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="birthday-showcase__footer">
        <p>
          Need a custom birthday setup for a child, teen, or milestone celebration? We can build
          around your venue, theme direction, and cake moment.
        </p>
        <a
          href={CONTACT.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="birthday-showcase__cta"
          onClick={() => trackWhatsAppClick('birthdays')}
        >
          <span className="birthday-showcase__cta-copy">
            <span>Check Event Availability</span>
            <span className="birthday-showcase__cta-note">{CTA_SUPPORT}</span>
          </span>
        </a>
      </div>
    </section>
  );
}

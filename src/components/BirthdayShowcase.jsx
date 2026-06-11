import React, { useState } from 'react';
import { useInView } from '../hooks/useInView';
import './BirthdayShowcase.css';

const CATEGORIES = ['All', 'First Birthday', 'Kids Theme', 'Luxury', 'Outdoor'];

const ITEMS = [
  {
    id: 1,
    title: 'Midnight Luxe Stage',
    category: 'Luxury',
    tag: 'Black, silver, candles, mirrored cake wall',
    size: 'large',
    image: '/images/birthdays/birthday-black-silver.jpeg',
    accent: '#d0d0d0',
    objectPosition: 'center center',
  },
  {
    id: 2,
    title: 'Bunny Garden World',
    category: 'Kids Theme',
    tag: 'Storybook setup for a soft first birthday',
    size: 'wide',
    image: '/images/birthdays/birthday-bunny-garden.jpeg',
    accent: '#9abf7a',
    objectPosition: 'center center',
  },
  {
    id: 3,
    title: 'Pastel Fairy One',
    category: 'First Birthday',
    tag: 'Pink balloon styling with dessert tables',
    size: 'medium',
    image: '/images/birthdays/birthday-pink-fairy.jpeg',
    accent: '#f2b7c8',
    objectPosition: 'center center',
  },
  {
    id: 4,
    title: 'Ocean Blue Birthday',
    category: 'Kids Theme',
    tag: 'Underwater styling with cake islands',
    size: 'medium',
    image: '/images/birthdays/birthday-ocean-theme.jpeg',
    accent: '#9fd5ef',
    objectPosition: 'center center',
  },
  {
    id: 5,
    title: 'Mickey First Birthday',
    category: 'First Birthday',
    tag: 'Character-led stage with soft blue layering',
    size: 'medium',
    image: '/images/birthdays/birthday-mickey-blue.jpeg',
    accent: '#b8d2f2',
    objectPosition: 'center center',
  },
  {
    id: 6,
    title: 'Garden Number One',
    category: 'First Birthday',
    tag: 'Green wall, florals, and clean photo framing',
    size: 'small',
    image: '/images/birthdays/birthday-garden-one.jpeg',
    accent: '#c9e2b5',
    objectPosition: 'center center',
  },
  {
    id: 7,
    title: 'Wild Safari Setup',
    category: 'Kids Theme',
    tag: 'Lion king palette with layered cut-outs',
    size: 'large',
    image: '/images/birthdays/birthday-safari.jpeg',
    accent: '#d7b46c',
    objectPosition: 'center center',
  },
  {
    id: 8,
    title: 'Jungle Luxe Cake Stage',
    category: 'Luxury',
    tag: 'Statement balloons, foliage, and premium staging',
    size: 'medium',
    image: '/images/birthdays/birthday-jungle-luxe.jpeg',
    accent: '#8ab073',
    objectPosition: 'center center',
  },
  {
    id: 9,
    title: 'Glow 21 Celebration',
    category: 'Luxury',
    tag: 'Milestone birthday with illuminated numerals',
    size: 'medium',
    image: '/images/birthdays/birthday-21-glow.jpeg',
    accent: '#f1c58e',
    objectPosition: 'center center',
  },
  {
    id: 10,
    title: 'Beach Birthday Arch',
    category: 'Outdoor',
    tag: 'Sunset birthday portrait point by the shore',
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
      <div className="birthday-showcase__intro">
        <div className="birthday-showcase__copy">
          <p className="birthday-showcase__eyebrow">Birthday Collections</p>
          <h2 className="birthday-showcase__headline">
            Birthday setups selected
            <br />
            <em>for a balanced landing page view.</em>
          </h2>
          <p className="birthday-showcase__sub">
            We are showing a focused birthday selection on the landing page so clients get variety,
            theme range, and stronger visual proof without repeated images.
          </p>
        </div>

        <div className="birthday-showcase__summary">
          <span>{filtered.length} birthday visuals on landing</span>
          <span>{active === 'All' ? 'First birthdays to milestone nights' : active}</span>
        </div>
      </div>

      <div className="birthday-showcase__filters">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            className={`birthday-showcase__filter ${active === category ? 'active' : ''}`}
            onClick={() => setActive(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {highlight ? (
        <article className="birthday-showcase__highlight">
          <div className="birthday-showcase__highlight-copy">
            <span className="birthday-showcase__highlight-label">Featured mood</span>
            <h3>{highlight.title}</h3>
            <p>{highlight.tag}</p>
          </div>

          <div className="birthday-showcase__highlight-media">
            <img
              src={highlight.image}
              alt={highlight.title}
              loading="eager"
              style={{ objectPosition: highlight.objectPosition }}
            />
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
                alt={item.title}
                loading="lazy"
                style={{ objectPosition: item.objectPosition }}
              />
              <div className="birthday-showcase__wash" style={{ '--accent': item.accent }} />
            </div>
            <div className="birthday-showcase__content">
              <span className="birthday-showcase__category">{item.category}</span>
              <h3>{item.title}</h3>
              <span className="birthday-showcase__tag">{item.tag}</span>
            </div>
          </article>
        ))}
      </div>

      <div className="birthday-showcase__footer">
        <p>
          Need a custom birthday concept for a child, teen, or milestone celebration? We can
          build around a theme, venue size, and cake moment.
        </p>
        <a
          href="https://wa.me/94767171454?text=I%27d%20like%20to%20discuss%20a%20custom%20birthday%20concept."
          target="_blank"
          rel="noopener noreferrer"
          className="birthday-showcase__cta"
        >
          Plan a Birthday Setup
        </a>
      </div>
    </section>
  );
}

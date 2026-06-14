import React, { useMemo, useState } from 'react';
import { useInView } from '../hooks/useInView';
import './Portfolio.css';

export const PORTFOLIO_ITEMS = [
  { id: 1, title: 'Ivory & Jasmine', category: 'Weddings', tag: 'Grand Ballroom', size: 'large', imageSrc: '/images/weddings/wedding-romantic-arch.jpeg', objectPosition: 'center 58%', bg: 'linear-gradient(135deg,#1a3a2a,#2a5a3a)' },
  { id: 2, title: 'Obsidian Gala', category: 'Corporate', tag: 'Stage Architecture', size: 'small', imageSrc: '/images/weddings/engagement-monogram-stage.jpeg', objectPosition: 'center center', bg: 'linear-gradient(160deg,#0d1a0d,#1a2a1a)' },
  { id: 3, title: 'Rose Reverie', category: 'Floral', tag: 'Ceremony Arch', size: 'small', imageSrc: '/images/weddings/wedding-floral-lounge.jpeg', objectPosition: 'center 45%', bg: 'linear-gradient(120deg,#2a1a1a,#3a1f1f)' },
  { id: 4, title: 'Golden Thread', category: 'Weddings', tag: 'Reception Hall', size: 'medium', imageSrc: '/images/weddings/hindu-wedding-stage.jpeg', objectPosition: 'center 52%', bg: 'linear-gradient(145deg,#1a1500,#2a2000)' },
  { id: 5, title: 'Emerald Pavilion', category: 'Stage', tag: 'LED Environment', size: 'medium', imageSrc: '/images/weddings/engagement-neon-signature.jpeg', objectPosition: 'center 40%', bg: 'linear-gradient(135deg,#0d2318,#1a3a2a)' },
  { id: 6, title: 'Celestial Arc', category: 'Weddings', tag: 'Outdoor Ceremony', size: 'large', imageSrc: '/images/weddings/destination-beach-ceremony.jpeg', objectPosition: 'center 62%', bg: 'linear-gradient(160deg,#0d0d20,#1a1a3a)' },
];

export default function Portfolio() {
  const [active, setActive] = useState('All');
  const [ref, inView] = useInView({ threshold: 0.1 });

  const categories = useMemo(
    () => ['All', ...new Set(PORTFOLIO_ITEMS.map((item) => item.category))],
    []
  );

  const items = active === 'All'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === active);

  return (
    <section className="portfolio" id="portfolio" ref={ref}>
      <div className="portfolio__header">
        <p className="portfolio__eyebrow">Selected Portfolio</p>
        <h2 className="portfolio__headline">Luxury environments shaped with light, texture, and focal drama.</h2>
      </div>

      <div className="portfolio__filters">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`portfolio__filter ${active === category ? 'active' : ''}`}
            onClick={() => setActive(category)}
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
              {item.imageSrc
                ? (
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    loading="lazy"
                    className="portfolio__image"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: item.objectPosition || 'center center' }}
                  />
                )
                : <div className="portfolio__item-bg" style={{ background: item.bg }} />}
              <div className="portfolio__item-overlay" />
              <div className="portfolio__bloom" />
              <div className="portfolio__item-info">
                <span className="portfolio__item-tag">{item.tag}</span>
                <h3 className="portfolio__item-title">{item.title}</h3>
                <p className="portfolio__item-cat">{item.category}</p>
                <span className="portfolio__line" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

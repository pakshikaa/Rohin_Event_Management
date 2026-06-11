import React, { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { CTA_SUPPORT, CONTACT } from '../content/site';
import './Portfolio.css';

const CATEGORIES = [
  'All',
  'Wedding',
  'Hindu Wedding',
  'Engagement',
  'Mehndi',
  'Bride to Be',
  'Iyer Wedding',
  'Destination',
];

const ITEMS = [
  {
    id: 1,
    title: 'Floral Stage Styling',
    category: 'Wedding',
    venueLabel: 'Wedding Reception • Jaffna',
    goal: 'Elegant floral stage with a warm reception focal point.',
    result: 'Romantic wedding atmosphere with stronger ceremony depth and guest-facing styling.',
    size: 'large',
    image: '/images/weddings/wedding-romantic-arch.jpeg',
    accent: '#f1c1d6',
    objectPosition: 'center center',
  },
  {
    id: 2,
    title: 'Gold & Ivory Backdrop',
    category: 'Engagement',
    venueLabel: 'Engagement • Nallur',
    goal: 'Modern couple stage with a clean photo-ready backdrop.',
    result: 'A polished engagement stage that looked balanced in both photos and wide venue shots.',
    size: 'medium',
    image: '/images/weddings/engagement-neon-signature.jpeg',
    accent: '#f4d5e5',
    objectPosition: 'center center',
  },
  {
    id: 3,
    title: 'Colour Wall Setup',
    category: 'Mehndi',
    venueLabel: 'Mehndi • Chavakachcheri',
    goal: 'Colour-rich mehndi styling without visual clutter.',
    result: 'A more vibrant celebration zone with stronger portrait and guest-photo moments.',
    size: 'small',
    image: '/images/weddings/mehndi-colour-wall.jpeg',
    accent: '#f4c430',
    objectPosition: 'center center',
  },
  {
    id: 4,
    title: 'Temple Stage Styling',
    category: 'Hindu Wedding',
    venueLabel: 'Hindu Wedding • Jaffna',
    goal: 'Traditional stage styling with ceremonial focus.',
    result: 'A richer mandap atmosphere with layered floral framing and cleaner focal balance.',
    size: 'medium',
    image: '/images/weddings/hindu-wedding-stage.jpeg',
    accent: '#d4af37',
    objectPosition: 'center center',
  },
  {
    id: 5,
    title: 'Ritual Mandap Design',
    category: 'Iyer Wedding',
    venueLabel: 'Iyer Wedding • Kokkuvil',
    goal: 'Classic ritual mandap with a refined sacred-space layout.',
    result: 'A composed setup that kept the ceremony central while elevating the visual finish.',
    size: 'medium',
    image: '/images/weddings/iyer-wedding-ritual.jpeg',
    accent: '#d7c16f',
    objectPosition: 'center center',
  },
  {
    id: 7,
    title: 'Statement Monogram Stage',
    category: 'Engagement',
    venueLabel: 'Engagement • Chunnakam',
    goal: 'Signature monogram stage with a luxury focal point.',
    result: 'A stronger engagement identity with elegant couple seating and coordinated styling.',
    size: 'large',
    image: '/images/weddings/engagement-monogram-stage.jpeg',
    accent: '#d8cdb1',
    objectPosition: 'center center',
  },
  {
    id: 8,
    title: 'Beach Bridal Styling',
    category: 'Bride to Be',
    venueLabel: 'Bride to Be • Jaffna Coast',
    goal: 'Sunset celebration corner with a soft bridal mood.',
    result: 'A cleaner photo area that worked naturally with the coastal light and backdrop.',
    size: 'small',
    image: '/images/weddings/bride-to-be-sunset.jpeg',
    accent: '#e5b78c',
    objectPosition: 'center center',
  },
  {
    id: 9,
    title: 'Destination Ceremony Setup',
    category: 'Destination',
    venueLabel: 'Destination Wedding • Northern Coast',
    goal: 'Oceanfront ceremony with a premium aisle experience.',
    result: 'A destination-ready setup with stronger ceremony focus and coordinated seating rhythm.',
    size: 'large',
    image: '/images/weddings/destination-beach-ceremony.jpeg',
    accent: '#d9e5ef',
    objectPosition: 'center center',
  },
];

export default function Portfolio() {
  const [active, setActive] = useState('All');
  const [ref, inView] = useInView({ threshold: 0.05 });

  const filtered = active === 'All'
    ? ITEMS
    : ITEMS.filter((item) => item.category === active);

  return (
    <section className="portfolio" id="portfolio" ref={ref}>
      <div className="portfolio__header">
        <div className="portfolio__header-copy">
          <p className="portfolio__eyebrow">Wedding Collections</p>
          <h2 className="portfolio__headline">
            Wedding Decoration
            <br />
            <em>Portfolio</em>
          </h2>
          <p className="portfolio__sub">
            Browse selected wedding case studies from Jaffna and nearby venues, with each setup
            showing the client goal and the result ROHIN delivered.
          </p>
        </div>

        <aside className="portfolio__summary">
          <span className="portfolio__summary-label">Selected Wedding Work</span>
          <p>
            Mandap, engagement, mehndi, bridal, and reception decoration concepts styled for
            premium celebrations.
          </p>
        </aside>
      </div>

      <div className="portfolio__filters">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            className={`portfolio__filter ${active === category ? 'active' : ''}`}
            onClick={() => setActive(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className={`portfolio__grid ${inView ? 'visible' : ''}`}>
        {filtered.map((item, index) => (
          <article
            key={item.id}
            className={`portfolio__item portfolio__item--${item.size}`}
            style={{ transitionDelay: `${index * 0.08}s` }}
          >
            <div className="portfolio__item-frame">
              <img
                className="portfolio__item-image"
                src={item.image}
                alt={item.title}
                loading={index < 2 ? 'eager' : 'lazy'}
                style={{ objectPosition: item.objectPosition }}
              />
              <div className="portfolio__item-tint" style={{ '--accent': item.accent }} />
              <div className="portfolio__item-overlay" />
              <div className="portfolio__item-info">
                <span className="portfolio__item-cat">{item.venueLabel}</span>
                <h3 className="portfolio__item-title">{item.title}</h3>
                <div className="portfolio__item-proof">
                  <span className="portfolio__item-proof-label">Goal</span>
                  <span className="portfolio__item-tag">{item.goal}</span>
                </div>
                <div className="portfolio__item-proof">
                  <span className="portfolio__item-proof-label">Result</span>
                  <span className="portfolio__item-tag">{item.result}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="portfolio__cta-row">
        <a
          href={CONTACT.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="portfolio__cta"
        >
          <span className="portfolio__cta-copy">
            <span>Check Event Availability</span>
            <span className="portfolio__cta-note">{CTA_SUPPORT}</span>
          </span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}

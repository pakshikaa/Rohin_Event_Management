import React, { useEffect, useRef } from 'react';
import WebGLHero from './WebGLHero';
import { CTA_SUPPORT, CONTACT } from '../content/site';
import './Hero.css';

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    const onScroll = () => {
      const y = window.scrollY;
      if (el) el.style.transform = `translateY(${y * 0.12}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="hero">
      <WebGLHero />
      <div className="hero__overlay" />

      <div className="hero__content" ref={heroRef}>
        <p className="hero__eyebrow">ROHIN Event Management • Jaffna, Sri Lanka</p>

        <h1 className="hero__headline">
          <span className="hero__line">Luxury Event Decoration</span>
          <span className="hero__line hero__line--gold">for Weddings, Birthdays</span>
          <span className="hero__line">&amp; Private Celebrations</span>
        </h1>

        <p className="hero__sub">
          ROHIN handles luxury wedding decoration, birthday setups, and private celebration styling
          across Jaffna and Northern Sri Lanka with real venue experience, floral staging, lighting,
          and complete event atmosphere planning.
        </p>

        <div className="hero__actions">
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hero__btn hero__btn--primary"
          >
            <span className="hero__btn-copy">
              <span>Check Event Availability</span>
              <span className="hero__btn-note">{CTA_SUPPORT}</span>
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <button className="hero__btn hero__btn--ghost" onClick={scrollToPortfolio}>
            View Portfolio
          </button>
        </div>

        <div className="hero__ledger" aria-label="Studio profile">
          <div className="hero__ledger-item">
            <span className="hero__ledger-label">What We Style</span>
            <span className="hero__ledger-value">Wedding receptions, birthdays, and private celebrations</span>
          </div>
          <div className="hero__ledger-item">
            <span className="hero__ledger-label">Why Clients Book</span>
            <span className="hero__ledger-value">One team for floral styling, stage concepts, lighting, and event-ready setup</span>
          </div>
          <div className="hero__ledger-item">
            <span className="hero__ledger-label">Where We Work</span>
            <span className="hero__ledger-value">Serving Jaffna and the wider Northern Province with celebration-focused event styling</span>
          </div>
        </div>
      </div>

      <div className="hero__scroll-cue">
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}

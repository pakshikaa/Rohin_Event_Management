import React, { useEffect, useRef } from 'react';
import WebGLHero from './WebGLHero';
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
          We design elegant event spaces in Jaffna with refined floral styling, stage concepts,
          lighting, and complete event atmosphere.
        </p>

        <div className="hero__actions">
          <a
            href="https://wa.me/94767171454?text=Hello%20Rohin,%20I%27d%20like%20to%20start%20my%20event%20inquiry."
            target="_blank"
            rel="noopener noreferrer"
            className="hero__btn hero__btn--primary"
          >
            <span>Start Your Event Inquiry</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <button className="hero__btn hero__btn--ghost" onClick={scrollToPortfolio}>
            View Portfolio
          </button>
        </div>

        <div className="hero__ledger" aria-label="Studio profile">
          <div className="hero__ledger-item">
            <span className="hero__ledger-label">Services</span>
            <span className="hero__ledger-value">Wedding, birthday, and private event decoration</span>
          </div>
          <div className="hero__ledger-item">
            <span className="hero__ledger-label">Speciality</span>
            <span className="hero__ledger-value">Floral styling, stage concepts, lighting, and full event atmosphere</span>
          </div>
          <div className="hero__ledger-item">
            <span className="hero__ledger-label">Location</span>
            <span className="hero__ledger-value">Premium event decoration in Jaffna and nearby areas</span>
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

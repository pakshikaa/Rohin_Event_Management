import React, { useEffect, useMemo, useRef, useState } from 'react';
import WebGLHero from './WebGLHero';
import { CONTACT, trackWhatsAppClick } from '../content/site';
import { useInView } from '../hooks/useInView';
import { useCountUp } from '../hooks/useCountUp';
import './Hero.css';

const WORDS = ['Weddings', 'Galas', 'Ceremonies', 'Experiences', 'Moments'];

export default function Hero() {
  const [activeWord, setActiveWord] = useState(0);
  const [statsRef, statsInView] = useInView({ threshold: 0.5 });
  const count1 = useCountUp(6, 1800, statsInView);
  const count2 = useCountUp(100, 2200, statsInView);
  const heroRef = useRef(null);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveWord((current) => (current + 1) % WORDS.length);
    }, 2800);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (el) el.style.transform = `translateY(${window.scrollY * 0.22}px)`;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const ctaCopy = useMemo(
    () => ({
      primary: 'Send Your Date & Venue',
      ghost: 'View Portfolio',
    }),
    []
  );

  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="hero">
      <WebGLHero />
      <div className="hero__overlay" />

      <div className="hero__content" ref={heroRef}>
        <p className="hero__eyebrow">Chavakachcheri&apos;s Premier Event Atelier</p>

        <h1 className="hero__headline">
          <span className="hero__line">We Sculpt</span>
          <span className="hero__line hero__line--animated-wrap" aria-live="polite">
            <span key={WORDS[activeWord]} className="hero__line hero__line--gold hero__line--animated">
              {WORDS[activeWord]}
            </span>
          </span>
          <span className="hero__line">Into Art.</span>
        </h1>

        <p className="hero__sub">
          Rohin composes wedding environments, elevated celebrations, and guest-facing moments with
          floral architecture, layered lighting, and a refined sense of atmosphere for celebrations across Jaffna.
        </p>

        <div className="hero__actions">
          <a
            href={CONTACT.vipConciergeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hero__btn hero__btn--primary"
            onClick={() => trackWhatsAppClick('hero')}
          >
            <span>{ctaCopy.primary}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <button type="button" className="hero__btn hero__btn--ghost" onClick={scrollToPortfolio}>
            {ctaCopy.ghost}
          </button>
        </div>

        <div className="hero__stats" ref={statsRef}>
          <div className="hero__stat">
            <span className="hero__stat-num">{count1}+</span>
            <span className="hero__stat-label">Years of Excellence</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-num">{count2}+</span>
            <span className="hero__stat-label">Events Crafted</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-num">100%</span>
            <span className="hero__stat-label">Bespoke Designs</span>
          </div>
        </div>
      </div>

      <div className="hero__scroll-cue" aria-hidden="true">
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}

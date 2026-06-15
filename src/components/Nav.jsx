import React, { useEffect, useMemo, useState } from 'react';
import { CONTACT, trackWhatsAppClick } from '../content/site';
import './Nav.css';

const LINKS = [
  { label: 'Home', id: 'hero' },
  { label: 'Philosophy', id: 'philosophy' },
  { label: 'Portfolio', id: 'portfolio' },
  { label: 'Services', id: 'services' },
  { label: 'Testimonials', id: 'testimonials' },
  { label: 'Contact', id: 'contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const ids = ['hero', 'philosophy', 'portfolio', 'metamorphosis', 'services', 'testimonials', 'contact'];
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveSection(entry.target.id);
          });
        },
        { threshold: 0.35 }
      );

      observer.observe(el);
      return observer;
    });

    return () => observers.forEach((observer) => observer?.disconnect());
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  const renderedLinks = useMemo(
    () => LINKS.map((link) => (
      <li key={link.id}>
        <button
          onClick={() => scrollTo(link.id)}
          className={`nav__link ${activeSection === link.id ? 'active' : ''}`}
        >
          {link.label}
        </button>
      </li>
    )),
    [activeSection]
  );

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`} aria-label="Primary">
      <div className="nav__inner">
        <a
          className="nav__logo"
          href="#hero"
          onClick={(event) => {
            event.preventDefault();
            scrollTo('hero');
          }}
        >
          <span className="nav__logo-main">ROHIN</span>
          <span className="nav__logo-sub">EVENT MANAGEMENT</span>
        </a>

        <ul className="nav__links">{renderedLinks}</ul>

        <div className="nav__cta-wrap">
          <a
            href={CONTACT.vipConciergeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="nav__cta"
            onClick={() => trackWhatsAppClick('nav')}
            title="Opens WhatsApp with a pre-filled VIP concierge planning inquiry."
          >
            VIP Concierge
          </a>
          <span className="nav__cta-note">Opens WhatsApp with a priority planning message.</span>
        </div>

        <button
          type="button"
          className={`nav__burger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen((current) => !current)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`nav__mobile ${menuOpen ? 'open' : ''}`} id="mobile-navigation">
        <div className="nav__mobile-panel">
          {LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`nav__mobile-link ${activeSection === link.id ? 'nav__mobile-link--active' : ''}`}
            >
              {link.label}
            </button>
          ))}
        </div>

        <a
          href={CONTACT.vipConciergeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="nav__mobile-cta"
          onClick={() => trackWhatsAppClick('nav_mobile')}
        >
          <span className="nav__mobile-cta-main">VIP Concierge</span>
          <span className="nav__mobile-cta-note">Opens WhatsApp with a pre-filled VIP concierge planning inquiry.</span>
        </a>
      </div>
    </nav>
  );
}

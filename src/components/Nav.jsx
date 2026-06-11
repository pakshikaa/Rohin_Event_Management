import React, { useState, useEffect } from 'react';
import { CTA_SUPPORT, CONTACT } from '../content/site';
import './Nav.css';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
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
    const onResize = () => {
      if (window.innerWidth > 900) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const links = [
    { label: 'Home', id: 'hero' },
    { label: 'Weddings', id: 'portfolio' },
    { label: 'Birthdays', id: 'birthdays' },
    { label: 'Transformations', id: 'metamorphosis' },
    { label: 'Testimonials', id: 'testimonials' },
    { label: 'Contact', id: 'contact' },
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <a className="nav__logo" href="#hero" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <img
            src="/images/brand/rohin-logo-web-optimized.png"
            alt="ROHIN Event Management"
            className="nav__logo-mark"
          />
          <span className="nav__logo-copy">
            <span className="nav__logo-rohin">ROHIN</span>
            <span className="nav__logo-sub">EVENT MANAGEMENT</span>
          </span>
        </a>

        <ul className="nav__links">
          {links.map((link) => (
            <li key={link.id}>
              <button onClick={() => scrollTo(link.id)} className="nav__link">{link.label}</button>
            </li>
          ))}
        </ul>

        <a
          href={CONTACT.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="nav__cta"
        >
          <span className="nav__cta-copy">
            <span>Check Event Availability</span>
            <span className="nav__cta-note">{CTA_SUPPORT}</span>
          </span>
        </a>

        <button
          className={`nav__burger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          <span /><span /><span />
        </button>
      </div>

      <div className={`nav__mobile ${menuOpen ? 'open' : ''}`} id="mobile-navigation">
        {links.map((link) => (
          <button key={link.id} onClick={() => scrollTo(link.id)} className="nav__mobile-link">{link.label}</button>
        ))}
        <a
          href={CONTACT.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="nav__mobile-cta"
        >
          <span className="nav__mobile-cta-main">Check Event Availability</span>
          <span className="nav__mobile-cta-note">{CTA_SUPPORT}</span>
        </a>
      </div>
    </nav>
  );
}

import React, { useState, useEffect } from 'react';
import './Nav.css';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Home', id: 'hero' },
    { label: 'Services', id: 'services' },
    { label: 'Weddings', id: 'portfolio' },
    { label: 'Birthdays', id: 'birthdays' },
    { label: 'Portfolio', id: 'metamorphosis' },
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
          href="https://wa.me/94767171454?text=Hello%20Rohin,%20I%27d%20like%20to%20start%20my%20event%20inquiry."
          target="_blank"
          rel="noopener noreferrer"
          className="nav__cta"
        >
          <span>Start Inquiry</span>
        </a>

        <button className={`nav__burger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>

      <div className={`nav__mobile ${menuOpen ? 'open' : ''}`}>
        {links.map((link) => (
          <button key={link.id} onClick={() => scrollTo(link.id)} className="nav__mobile-link">{link.label}</button>
        ))}
        <a
          href="https://wa.me/94767171454?text=Hello%20Rohin,%20I%27d%20like%20to%20start%20my%20event%20inquiry."
          target="_blank"
          rel="noopener noreferrer"
          className="nav__mobile-cta"
        >
          Start Inquiry ->
        </a>
      </div>
    </nav>
  );
}

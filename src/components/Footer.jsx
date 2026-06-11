import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <div className="footer__brand-head">
            <img
              src="/images/brand/rohin-logo-web-optimized.png"
              alt="ROHIN Event Management"
              className="footer__brand-mark"
            />
            <div className="footer__brand-copy">
              <span className="footer__name">ROHIN</span>
              <span className="footer__tagline">EVENT MANAGEMENT</span>
            </div>
          </div>
          <p className="footer__copy-brand">Sculpting environments since 2012.</p>
        </div>

        <div className="footer__nav">
          {['Philosophy', 'Portfolio', 'Metamorphosis', 'Services', 'Contact'].map(l => (
            <button
              key={l}
              className="footer__link"
              onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
            >
              {l}
            </button>
          ))}
        </div>

        <div className="footer__social">
          <p className="footer__social-label">Contact Rohin</p>
          <div className="footer__social-links">
            <a href="mailto:eventbyrohinprivateltd@gmail.com" className="footer__social-link">
              eventbyrohinprivateltd@gmail.com
            </a>
            <a href="tel:+94767171454" className="footer__social-link">
              +94 76 717 1454
            </a>
            <a href="https://www.facebook.com/search/top/?q=Event%20by%20Rohin%20at%20jaffna" target="_blank" rel="noopener noreferrer" className="footer__social-link">
              Event by Rohin at jaffna
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Rohin Event Management. All rights reserved.</p>
        <p>Jaffna, Sri Lanka</p>
      </div>
    </footer>
  );
}

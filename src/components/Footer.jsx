import React from 'react';
import { CONTACT } from '../content/site';
import './Footer.css';

export default function Footer() {
  const links = [
    ['Home', 'hero'],
    ['Philosophy', 'philosophy'],
    ['Portfolio', 'portfolio'],
    ['Services', 'services'],
    ['Testimonials', 'testimonials'],
    ['Contact', 'contact'],
  ];

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <div className="footer__brand-copy">
            <span className="footer__name">ROHIN</span>
            <span className="footer__sub">EVENT MANAGEMENT</span>
          </div>
          <p className="footer__tagline">Luxury event environments designed for weddings, stages, and private celebrations.</p>
        </div>

        <div className="footer__nav">
          {links.map(([label, id]) => (
            <button
              key={id}
              type="button"
              className="footer__link"
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="footer__social">
          <span className="footer__social-label">Social</span>
          <a href={CONTACT.facebookUrl} target="_blank" rel="noopener noreferrer" className="footer__social-link">Facebook</a>
          <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="footer__social-link">WhatsApp</a>
        </div>
      </div>

      <div className="footer__bottom">
        <span>&copy; {new Date().getFullYear()} Rohin Event Management. All rights reserved.</span>
        <span>Sangaththanai, Kandy Road, Chavakachcheri, Jaffna</span>
      </div>
    </footer>
  );
}

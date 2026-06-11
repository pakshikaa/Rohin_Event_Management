import React from 'react';
import { CONTACT } from '../content/site';
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
          <p className="footer__copy-brand">Creating memorable celebrations across Jaffna and Northern Sri Lanka.</p>
        </div>

        <div className="footer__nav">
          {['Philosophy', 'Portfolio', 'Metamorphosis', 'Testimonials', 'Contact'].map((label) => (
            <button
              key={label}
              className="footer__link"
              onClick={() => document.getElementById(label.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="footer__social">
          <p className="footer__social-label">Location</p>
          <p className="footer__social-copy">{CONTACT.location}</p>

          <p className="footer__social-label footer__social-label--spaced">Services</p>
          <div className="footer__service-list">
            <span>Wedding Decoration</span>
            <span>Birthday Decoration</span>
            <span>Private Celebrations</span>
          </div>

          <p className="footer__social-label footer__social-label--spaced">Contact</p>
          <div className="footer__social-links">
            <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="footer__social-link">
              WhatsApp
            </a>
            <a href={CONTACT.facebookUrl} target="_blank" rel="noopener noreferrer" className="footer__social-link">
              Facebook
            </a>
            <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer" className="footer__social-link">
              Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>Copyright {new Date().getFullYear()} Rohin Event Management. All rights reserved.</p>
        <p>{CONTACT.location}</p>
      </div>
    </footer>
  );
}

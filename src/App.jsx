import React from 'react';
import Cursor from './components/Cursor';
import GoldDust from './components/GoldDust';
import Nav from './components/Nav';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import Philosophy from './components/Philosophy';
import Portfolio from './components/Portfolio';
import BirthdayShowcase from './components/BirthdayShowcase';
import Metamorphosis from './components/Metamorphosis';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';

export default function App() {
  return (
    <>
      {/* Custom cursor — desktop only */}
      <Cursor />

      {/* Ambient gold dust particles */}
      <GoldDust />

      {/* Navigation */}
      <Nav />

      {/* Main content */}
      <main>
        <Hero />
        <TrustStrip />
        <Portfolio />
        <Testimonials />
        <BirthdayShowcase />
        <Metamorphosis />
        <Services />
        <Philosophy />
        <Contact />
      </main>

      <Footer />

      {/* Persistent WhatsApp CTA */}
      <WhatsAppFloat />
    </>
  );
}

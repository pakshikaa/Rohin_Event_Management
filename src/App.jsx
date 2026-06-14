import React, { Suspense, lazy } from 'react';
import Cursor from './components/Cursor';
import GoldDust from './components/GoldDust';
import Nav from './components/Nav';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import Philosophy from './components/Philosophy';
import Testimonials from './components/Testimonials';
import BirthdayShowcase from './components/BirthdayShowcase';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';

const Portfolio = lazy(() => import('./components/Portfolio'));
const Metamorphosis = lazy(() => import('./components/Metamorphosis'));
const Services = lazy(() => import('./components/Services'));

function SectionFallback() {
  return <div className="section-fallback" aria-hidden="true" />;
}

export default function App() {
  return (
    <>
      <Cursor />
      <GoldDust />
      <Nav />

      <main>
        <Hero />
        <TrustStrip />
        <Suspense fallback={<SectionFallback />}>
          <Portfolio />
        </Suspense>
        <Testimonials />
        <BirthdayShowcase />
        <Suspense fallback={<SectionFallback />}>
          <Metamorphosis />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Services />
        </Suspense>
        <Philosophy />
        <Contact />
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}

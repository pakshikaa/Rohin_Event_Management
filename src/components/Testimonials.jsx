import React from 'react';
import { useInView } from '../hooks/useInView';
import './Testimonials.css';

const TESTIMONIALS = [
  {
    type: 'Wedding Reception',
    quote: 'Guests still talk about the floral stage and how polished the whole venue felt.',
    name: 'K & T',
    event: 'Nallur',
    initials: 'KT',
    image: '/images/weddings/engagement-monogram-stage.jpeg',
  },
  {
    type: 'Wedding Reception',
    quote: 'The lighting, floral framing, and seating layout made the venue feel complete before guests arrived.',
    name: 'S & M',
    event: 'Jaffna',
    initials: 'SM',
    image: '/images/weddings/wedding-romantic-arch.jpeg',
  },
  {
    type: 'First Birthday',
    quote: 'The backdrop looked beautiful in photos and the setup felt neat from every angle.',
    name: 'P & R Family',
    event: 'Jaffna',
    initials: 'PR',
    image: '/images/birthdays/birthday-bunny-garden.jpeg',
  },
  {
    type: 'Milestone Birthday',
    quote: 'We wanted something stylish and premium, and the finished setup felt exactly right for the celebration.',
    name: 'A & S',
    event: 'Kokkuvil',
    initials: 'AS',
    image: '/images/birthdays/birthday-21-glow.jpeg',
  },
];

export default function Testimonials() {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <section className="testimonials" id="testimonials" ref={ref}>
      <div className={`testimonials__inner ${inView ? 'visible' : ''}`}>
        <div className="testimonials__header">
          <p className="testimonials__eyebrow">Client Voices</p>
          <h2 className="testimonials__headline">What clients say after the event</h2>
          <p className="testimonials__sub">
            Each testimonial is paired with the event type, location, and a setup image so visitors
            can quickly judge the kind of celebrations ROHIN handles.
          </p>
        </div>

        <div className="testimonials__grid">
          {TESTIMONIALS.map((item, index) => (
            <article className="testimonials__card" key={item.name} style={{ transitionDelay: `${index * 0.08}s` }}>
              <div className="testimonials__card-top">
                <img className="testimonials__thumb" src={item.image} alt={`${item.type} setup in ${item.event}`} />
                <div className="testimonials__avatar">{item.initials}</div>
                <div>
                  <span className="testimonials__type">{item.type}</span>
                  <p className="testimonials__name">{item.name}</p>
                  <p className="testimonials__event">{item.event}</p>
                </div>
              </div>
              <blockquote className="testimonials__quote">{item.quote}</blockquote>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

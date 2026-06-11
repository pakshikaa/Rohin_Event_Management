import React from 'react';
import { useInView } from '../hooks/useInView';
import './Testimonials.css';

const TESTIMONIALS = [
  {
    type: 'Wedding',
    quote: 'ROHIN transformed our wedding venue beautifully. Every detail, from the flowers to the stage lighting, felt elegant and well planned.',
    name: 'Kavishan & Tharshini',
    event: 'Wedding Reception, Jaffna',
    initials: 'KT',
  },
  {
    type: 'Wedding',
    quote: 'Our guests kept talking about the decoration. The setup looked premium, calm, and exactly like the mood we wanted.',
    name: 'Suresh & Meena',
    event: 'Homecoming Celebration, Nallur',
    initials: 'SM',
  },
  {
    type: 'Birthday',
    quote: 'The birthday backdrop was beautiful and very neat. The colours, balloons, and photo area were perfect for our family celebration.',
    name: 'Priyanka Rajan',
    event: '1st Birthday Celebration, Jaffna',
    initials: 'PR',
  },
  {
    type: 'Birthday',
    quote: 'ROHIN created a stylish birthday setup that looked modern and classy. The whole decoration felt special without being overdone.',
    name: 'Abinaya Suthakaran',
    event: '21st Birthday Celebration, Kokkuvil',
    initials: 'AS',
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
            Real feedback from wedding and birthday clients who wanted a decoration style that felt
            premium, calm, and memorable.
          </p>
        </div>

        <div className="testimonials__grid">
          {TESTIMONIALS.map((item, index) => (
            <article className="testimonials__card" key={item.name} style={{ transitionDelay: `${index * 0.08}s` }}>
              <div className="testimonials__card-top">
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

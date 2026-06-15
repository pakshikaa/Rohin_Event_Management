export const CONTACT = {
  whatsappNumber: '94767171454',
  whatsappUrl:
    'https://wa.me/94767171454?text=Hello%20Rohin%2C%20I%27d%20like%20to%20enquire%20about%20your%20event%20services%20in%20Jaffna.',
  vipConciergeUrl:
    'https://wa.me/94767171454?text=Hello%20Rohin%2C%20I%27d%20like%20to%20enquire%20about%20your%20VIP%20Concierge%20event%20planning%20service%20in%20Jaffna.',
  email: 'eventbyrohinprivateltd@gmail.com',
  location: 'Sangaththanai, Kandy Road, Chavakachcheri, Jaffna',
  serviceArea: 'Sangaththanai, Kandy Road, Chavakachcheri, Jaffna',
  facebookUrl: 'https://www.facebook.com/share/17sE2FmnDh/',
};

export const CTA_SUPPORT = 'Tell us your event date, venue, and celebration type.';

export function trackWhatsAppClick(section) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'whatsapp_click', { section });
  }
}

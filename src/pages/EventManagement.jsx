import ServiceDetail from './ServiceDetail';
import { autoplayMedia, gridMedia } from '../data/eventManagementMedia';

const heroIcon = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.2" />
    <path d="M3 9.5h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const data = {
  eyebrow: 'Event Management',
  title: 'Events Designed to Be',
  accent: 'Unforgettable',
  intro:
    'From intimate weddings to large-scale corporate conferences, we manage every detail so your event runs flawlessly — and feels effortless.',
  heroIcon,
  features: [
    {
      icon: <svg viewBox="0 0 24 24" fill="none"><path d="M12 2C8 6 6 10 6 13a6 6 0 0012 0c0-3-2-7-6-11z" stroke="currentColor" strokeWidth="1.5" /></svg>,
      title: 'Concept & Theme Design',
      desc: 'A unique visual identity for your event, from decor to invites.',
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none"><path d="M3 21h18M5 21V10l7-6 7 6v11" stroke="currentColor" strokeWidth="1.5" /></svg>,
      title: 'Venue & Vendor Sourcing',
      desc: 'We negotiate and coordinate with trusted venues and vendors.',
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M12 7v5l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
      title: 'On-Day Coordination',
      desc: 'A dedicated team running timelines so nothing is left to chance.',
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none"><path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="1.5" /><circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.5" /><circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" /></svg>,
      title: 'Entertainment & Production',
      desc: 'Sound, lighting, stage and talent booked and managed end-to-end.',
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
      title: 'Guest & Logistics Management',
      desc: 'RSVPs, travel, hospitality and on-ground guest experience.',
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" strokeWidth="1.5" /></svg>,
      title: 'Budget Management',
      desc: 'Transparent planning that keeps every rupee accounted for.',
    },
  ],
  process: [
    { title: 'Vision Consultation', desc: 'We listen to your goals, style and budget for the event.' },
    { title: 'Concept & Proposal', desc: 'A complete theme, layout and vendor proposal for your approval.' },
    { title: 'Vendor & Venue Lockdown', desc: 'Contracts, bookings and logistics confirmed well ahead of time.' },
    { title: 'Rehearsal & Final Checks', desc: 'Run-throughs and contingency plans before the big day.' },
    { title: 'Live Execution', desc: 'On-ground team manages every moment so you can enjoy the event.' },
  ],
  gallery: [
    { title: 'Astra Group CPL Trophy Reveal' },
    { title: 'Independence Day Mall Activation' },
    { title: 'Tengina Habba Kids Stage' },
    { title: 'Wedding Stage Decoration' },
    { title: 'Event Table Decoration' },
    { title: 'Kudla Kapi Habba Coffee Corner' },
  ],
  mediaAutoplay: autoplayMedia,
  mediaGrid: gridMedia,
  faqs: [
    { q: 'What kind of events do you manage?', a: 'Weddings, corporate conferences, product launches, brand activations and private celebrations.' },
    { q: 'How far in advance should we book?', a: 'We recommend 2-3 months for most events, and 6+ months for large weddings or conferences.' },
    { q: 'Do you handle events outside Bangalore?', a: 'Yes, our team travels across India for the right event.' },
    { q: 'Can you work within a fixed budget?', a: 'Yes — we build the entire plan around your budget and prioritize what matters most to you.' },
  ],
  otherServices: [
    { title: 'Advertising Agency', path: '/services/advertising-agency' },
    { title: 'Photography & Videography', path: '/services/ad-films' },
    { title: 'Brand Promotions', path: '/services/social-media-marketing' },
    { title: 'Film Production', path: '/services/film-production' },
  ],
};

export default function EventManagement() {
  return <ServiceDetail data={data} />;
}

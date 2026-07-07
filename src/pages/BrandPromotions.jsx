import ServiceDetail from './ServiceDetail';
import { autoplayMedia, gridMedia } from '../data/brandPromotionsMedia';


const heroIcon = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M3 10v4h3l6 4V6L6 10H3z" stroke="currentColor" strokeWidth="1.2" />
    <path d="M14 9a4 4 0 010 6M17 6a8 8 0 010 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const data = {
  eyebrow: 'Social Media Marketing',
  title: 'Content That Builds',
  accent: 'Real Brand Presence',
  intro:
    'Strategy-led social media management — content, ads and community growth — built to turn followers into customers.',
  heroIcon,
  features: [
    {
      icon: <svg viewBox="0 0 24 24" fill="none"><path d="M4 19V5h16v14l-4-3H4z" stroke="currentColor" strokeWidth="1.5" /></svg>,
      title: 'Content Strategy',
      desc: 'Monthly calendars built around platform trends and brand voice.',
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" /></svg>,
      title: 'Creative Production',
      desc: 'Reels, carousels and graphics designed to stop the scroll.',
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none"><path d="M3 12a9 9 0 1018 0 9 9 0 00-18 0z" stroke="currentColor" strokeWidth="1.5" /><path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
      title: 'Paid Advertising',
      desc: 'Meta & Google ad campaigns optimized for conversions, not just clicks.',
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none"><path d="M17 8a5 5 0 11-10 0 5 5 0 0110 0zM3 21a7 7 0 0114 0" stroke="currentColor" strokeWidth="1.5" /></svg>,
      title: 'Community Management',
      desc: 'Timely replies and engagement that build a loyal audience.',
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none"><path d="M4 19l5-6 4 3 7-9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>,
      title: 'Analytics & Reporting',
      desc: 'Clear monthly reports tying content to actual business results.',
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" fill="currentColor" /></svg>,
      title: 'Influencer Collabs',
      desc: 'Curated creator partnerships matched to your brand and budget.',
    },
  ],
  process: [
    { title: 'Audit & Research', desc: 'We assess your current presence, audience and competitors.' },
    { title: 'Strategy & Calendar', desc: 'Goals, pillars and a content calendar tailored to your brand.' },
    { title: 'Create & Schedule', desc: 'Design, copywriting and scheduling across all your platforms.' },
    { title: 'Run & Optimize Ads', desc: 'Paid campaigns launched, tested and refined for performance.' },
    { title: 'Report & Iterate', desc: 'Monthly insights that shape next month\u2019s strategy.' },
  ],
  mediaAutoplay: autoplayMedia,
  mediaGrid: gridMedia,
  faqs: [
    { q: 'Which platforms do you manage?', a: 'Instagram, Facebook, LinkedIn, YouTube and X — tailored to where your audience actually is.' },
    { q: 'Do you handle ad spend separately?', a: 'Yes, ad spend is billed directly to your account; our fee covers strategy, creative and management.' },
    { q: 'How soon will I see results?', a: 'Engagement shifts are visible within weeks; meaningful growth typically builds over 2-3 months.' },
    { q: 'Can you work with our in-house design team?', a: 'Yes, we frequently collaborate with in-house teams on strategy and execution.' },
  ],
  otherServices: [
    { title: 'Event Management', path: '/services/event-management' },
    { title: 'Advertising Agency', path: '/services/advertising-agency' },
    { title: 'Photography & Videography', path: '/services/ad-films' },
    { title: 'Film Production', path: '/services/film-production' },
  ],
};

export default function BrandPromotions() {
  return <ServiceDetail data={data} />;
}

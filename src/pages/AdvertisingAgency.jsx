import ServiceDetail from './ServiceDetail';
import { autoplayMedia, gridMedia } from '../data/advertisingAgencyMedia';

const heroIcon = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M3 10v4h3l6 4V6L6 10H3z" stroke="currentColor" strokeWidth="1.2" />
    <path d="M19 5l-5 3M19 19l-5-3M21 12h-7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const data = {
  eyebrow: 'Advertising Agency',
  title: 'Campaigns Built to',
  accent: 'Move the Market',
  seoTitle: 'Best Advertising Agency in Mangalore | Maa Mantra Ventures',
  seoDescription: 'Maa Mantra Ventures is a full-service advertising agency in Mangalore — strategy, creative and media buying built into one connected campaign.',
  intro:
    'Full-service advertising — strategy, creative and media buying — built as one connected campaign that gets your brand seen, remembered and chosen.',
  heroIcon,
  features: [
    {
      icon: <svg viewBox="0 0 24 24" fill="none"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" fill="currentColor" /></svg>,
      title: 'Creative Strategy',
      desc: 'Big ideas rooted in insight, built to make a brand impossible to ignore.',
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M3 9h18" stroke="currentColor" strokeWidth="1.5" /></svg>,
      title: 'Brand Positioning',
      desc: 'A clear, distinctive market position that sets a brand apart.',
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none"><path d="M4 19V5h16v14l-4-3H4z" stroke="currentColor" strokeWidth="1.5" /></svg>,
      title: 'Campaign Creative',
      desc: 'Print, digital, film and OOH creative built from one central idea.',
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
      title: 'Media Planning & Buying',
      desc: 'Right channels, right budget split, right timing for maximum reach.',
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none"><path d="M3 12a9 9 0 1018 0 9 9 0 00-18 0z" stroke="currentColor" strokeWidth="1.5" /><path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
      title: 'Digital Advertising',
      desc: 'Meta, Google and programmatic campaigns optimized for conversions.',
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none"><path d="M4 19l5-6 4 3 7-9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>,
      title: 'Performance Reporting',
      desc: 'Clear reach, engagement and ROI numbers behind every campaign.',
    },
  ],
  process: [
    { title: 'Brief & Research', desc: 'We study the brand, market and audience before anything is proposed.' },
    { title: 'Strategy & Big Idea', desc: 'One central concept that every campaign asset builds from.' },
    { title: 'Creative Production', desc: 'Copy, design, film and digital assets produced across formats.' },
    { title: 'Media Launch', desc: 'Campaign goes live across the planned channel mix.' },
    { title: 'Optimize & Report', desc: 'Ongoing tracking and adjustments to keep performance climbing.' },
  ],
  gallery: [
    { title: 'KIA Product Launch Campaign' },
    { title: 'Retail Brand Activation' },
    { title: 'Caratlane Golden Bond Campaign' },
    { title: 'TVS Ronin Bike Launch' },
    { title: 'SUN Simulation User Network Event' },
    { title: 'Snow Man Icecreams Campaign' },
  ],
  mediaAutoplay: autoplayMedia,
  mediaGrid: gridMedia,
  faqs: [
    { q: 'What does a full-service agency include?', a: 'Strategy, creative production and media planning/buying, all managed under one team.' },
    { q: 'Do you handle media spend and negotiation?', a: 'Yes — we plan, negotiate and manage media buys across print, digital and OOH.' },
    { q: 'Can you work on a single campaign, not a retainer?', a: 'Yes, we take on standalone campaigns as well as ongoing brand retainers.' },
    { q: 'How do you measure campaign success?', a: 'Through reach, engagement and conversion metrics tied to the goals set at brief stage.' },
  ],
  otherServices: [
    { title: 'Event Management', path: '/services/event-management' },
    { title: 'Photography & Videography', path: '/services/ad-films' },
    { title: 'Brand Promotions', path: '/services/social-media-marketing' },
    { title: 'Film Production', path: '/services/film-production' },
  ],
};

export default function AdvertisingAgency() {
  return <ServiceDetail data={data} />;
}

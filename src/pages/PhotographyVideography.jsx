import ServiceDetail from './ServiceDetail';
import { autoplayMedia, gridMedia } from '../data/photographyMedia';


const heroIcon = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M3 7h18v12H3V7z" stroke="currentColor" strokeWidth="1.2" />
    <path d="M3 7l2-4h3l-2 4M9 7l2-4h3l-2 4M15 7l2-4h3l-2 4" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

const data = {
  eyebrow: 'Ad Films',
  title: 'Cinematic Films That',
  accent: 'Sell the Story',
  intro:
    'From concept to final cut, we produce ad films that turn brand messages into visual experiences audiences remember — and act on.',
  heroIcon,
  features: [
    {
      icon: <svg viewBox="0 0 24 24" fill="none"><path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="1.5" /><path d="M9 9l6 3-6 3V9z" fill="currentColor" /></svg>,
      title: 'Concept & Scripting',
      desc: 'Story-first scripts built around what makes your brand worth watching.',
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" /><path d="M3 12c2-4 6-6 9-6s7 2 9 6c-2 4-6 6-9 6s-7-2-9-6z" stroke="currentColor" strokeWidth="1.5" /></svg>,
      title: 'Cinematography',
      desc: 'Professional camera, lighting and color grading for a premium look.',
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none"><path d="M9 18V6l8 6-8 6z" fill="currentColor" /></svg>,
      title: 'Sound & Music',
      desc: 'Original scoring and sound design that elevates every frame.',
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M3 9h18" stroke="currentColor" strokeWidth="1.5" /></svg>,
      title: 'Editing & VFX',
      desc: 'Sharp edits and motion graphics that keep viewers locked in.',
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none"><path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="1.5" /></svg>,
      title: 'Multi-Format Delivery',
      desc: 'Cuts optimized for TV, YouTube, Instagram Reels and OTT.',
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>,
      title: 'Performance Tracking',
      desc: 'View-through and engagement reporting after launch.',
    },
  ],
  process: [
    { title: 'Discovery Call', desc: 'We learn your brand, audience and campaign goal.' },
    { title: 'Script & Storyboard', desc: 'A tight narrative mapped shot-by-shot before we shoot.' },
    { title: 'Production', desc: 'On-location or studio shoot with full creative and technical crew.' },
    { title: 'Post-Production', desc: 'Edit, grade, sound mix and motion graphics polish.' },
    { title: 'Delivery & Launch Support', desc: 'Platform-ready exports and a rollout plan.' },
  ],
  mediaAutoplay: autoplayMedia,
  mediaGrid: gridMedia,
  faqs: [
    { q: 'How long does an ad film take to produce?', a: 'Most projects take 3-5 weeks from script approval to final delivery, depending on shoot complexity.' },
    { q: 'Do you write the script too?', a: 'Yes — our team handles concept, scripting and storyboarding as part of the package.' },
    { q: 'Can you shoot on location outside Bangalore?', a: 'Absolutely. We travel for production across India for the right project.' },
    { q: 'What formats do you deliver?', a: 'We deliver vertical, square and widescreen cuts optimized for every platform you need.' },
  ],
  otherServices: [
    { title: 'Brand Promotions', path: '/services/social-media-marketing' },
    { title: 'Event Management', path: '/services/event-management' },
  ],
};

export default function PhotographyVideography() {
  return <ServiceDetail data={data} />;
}

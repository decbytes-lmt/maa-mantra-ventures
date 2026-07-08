import ServiceDetail from './ServiceDetail';
import { autoplayMedia, gridMedia } from '../data/filmProductionMedia';


const heroIcon = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="2.5" y="6" width="14" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
    <path d="M16.5 10l5-3v10l-5-3" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
);

const data = {
  eyebrow: 'Film Production',
  title: 'Films Crafted to',
  accent: 'Hold the Frame',
  intro:
    'End-to-end film production — from script and set to final grade — for brand films, documentaries and cinematic campaigns that hold an audience.',
  heroIcon,
  features: [
    {
      icon: <svg viewBox="0 0 24 24" fill="none"><path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="1.5" /><path d="M9 9l6 3-6 3V9z" fill="currentColor" /></svg>,
      title: 'Story & Direction',
      desc: 'A director-led vision shaping every scene before the camera rolls.',
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" /><path d="M3 12c2-4 6-6 9-6s7 2 9 6c-2 4-6 6-9 6s-7-2-9-6z" stroke="currentColor" strokeWidth="1.5" /></svg>,
      title: 'Cinematography',
      desc: 'Full camera, lighting and grip crew for a true cinematic look.',
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M8 5v14M16 5v14" stroke="currentColor" strokeWidth="1.5" /></svg>,
      title: 'Production Design',
      desc: 'Sets, locations and art direction built to match the story.',
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none"><path d="M9 18V6l8 6-8 6z" fill="currentColor" /></svg>,
      title: 'Sound Design & Score',
      desc: 'Original music and location sound mixed for a full theatrical feel.',
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none"><path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="1.5" /></svg>,
      title: 'Editing & VFX',
      desc: 'Color grading, visual effects and edit pacing that hold attention.',
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>,
      title: 'Distribution Ready',
      desc: 'Festival, OTT and broadcast-spec masters delivered on schedule.',
    },
  ],
  process: [
    { title: 'Story Development', desc: 'Concept, script and treatment locked before any planning begins.' },
    { title: 'Pre-Production', desc: 'Casting, locations, crew and schedule mapped in full detail.' },
    { title: 'Principal Photography', desc: 'On-location or studio shoot with a complete production crew.' },
    { title: 'Post-Production', desc: 'Edit, color grade, sound mix and VFX brought together.' },
    { title: 'Final Delivery', desc: 'Master files exported to the specs your platform requires.' },
  ],
  gallery: [
    { title: 'Snow Man Icecreams Film' },
    { title: 'Bridal Jewelry Cinematic Shoot' },
    { title: 'Dessert Product Film' },
    { title: 'Diamond Necklace Campaign Film' },
    { title: 'Statement Jewelry Film' },
    { title: 'Jewelry Collection Film' },
  ],
  mediaAutoplay: autoplayMedia,
  mediaGrid: gridMedia,
  faqs: [
    { q: 'What kind of films do you produce?', a: 'Brand films, documentaries, product films and cinematic campaign content.' },
    { q: 'Do you handle casting and locations?', a: 'Yes — casting, location scouting and permits are managed as part of pre-production.' },
    { q: 'How long does a production take?', a: 'Typically 4-6 weeks from script lock to final delivery, depending on scope.' },
    { q: 'Can you deliver for both OTT and broadcast?', a: 'Yes, we export masters to festival, OTT and broadcast specifications.' },
  ],
  otherServices: [
    { title: 'Event Management', path: '/services/event-management' },
    { title: 'Advertising Agency', path: '/services/advertising-agency' },
    { title: 'Photography & Videography', path: '/services/ad-films' },
    { title: 'Brand Promotions', path: '/services/social-media-marketing' },
  ],
};

export default function FilmProduction() {
  return <ServiceDetail data={data} />;
}

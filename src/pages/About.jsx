import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import useSEO from '../hooks/useSEO';
import './About.css';

const stats = [
  { num: '17+', label: 'Years in Digital Marketing' },
  { num: '4+', label: 'Years in Event Marketing' },
  { num: '500+', label: 'Projects Delivered' },
  { num: '100+', label: 'Happy Clients' },
];

const values = [
  { title: 'Creative First', desc: 'Every project starts with an idea worth telling, not a template.' },
  { title: 'Detail Obsessed', desc: 'We sweat the small things so your event or campaign never has to.' },
  { title: 'Results Driven', desc: 'Beautiful work that is also measured against real business outcomes.' },
  { title: 'Always On Time', desc: 'Deadlines and event dates are non-negotiable — we plan around them.' },
];

const milestones = [
  { year: '2009', title: 'Founded in Mangalore', desc: 'Started as a digital marketing consultancy serving local businesses.' },
  { year: '2022', title: 'Event Division Launched', desc: 'Expanded into full-scale event management and stage productions.' },
  { year: '2023', title: 'Kudla Kapi Habba', desc: 'Managed one of Mangalore\'s most celebrated cultural festivals.' },
  { year: '2024', title: '500+ Projects', desc: 'Crossed 500 successful projects across events, campaigns and productions.' },
  { year: '2025', title: 'Portfolio Expanded', desc: 'Added weddings, baby showers, birthdays, mall activations and vehicle launches to our event lineup.' },
];

export default function About() {
  useSEO(
    'About Us | Maa Mantra Ventures',
    '17+ years in digital marketing, 500+ projects delivered — weddings, festivals, corporate launches and more. Learn about Maa Mantra Ventures, Mangalore\'s event and brand marketing agency.'
  );
  return (
    <div className="page-enter">
      <PageHeader
        eyebrow="About Us"
        title="Mangalore's Creative"
        accent="Event & Brand Studio"
        sub="Maa Mantra Ventures is a leading event management company based in Mangalore, known for creating impactful experiences across brand launches, corporate activations, weddings and personal celebrations."
      />

      <section className="section">
        <div className="container about-grid">
          <Reveal className="reveal-scale">
            <div className="about-visual" />
          </Reveal>
          <Reveal delay={1}>
            <div>
              <span className="eyebrow">Our Story</span>
              <h2 className="section-title" style={{ marginBottom: 20 }}>
                Built on Passion, <span className="accent">Proven</span> by Results
              </h2>
              <p className="about-text">
                Maa Mantra Ventures is a full-service creative agency specializing in advertising,
                filmmaking, event management, and brand storytelling. Founded by the first female
                director of the Tulu film industry, our company is backed by over 15 years of
                experience in ad filmmaking, concept direction, theatre, production, and creative execution.
              </p>
              <p className="about-text">
                We transform ideas into impactful experiences through ad films, corporate videos,
                digital campaigns, photography, videography, brand activations, and professionally
                managed events. From corporate events and product launches to weddings, cultural
                celebrations, and social gatherings, we bring creativity, precision, and flawless
                execution to every occasion.
              </p>
              <p className="about-text">
                With a perfect blend of artistic vision and technical expertise, we handle every
                stage of a project — from concept development and planning to production and final
                delivery — ensuring every detail reflects excellence.
              </p>
              <p className="about-text">
                At Maa Mantra Ventures, we believe every brand and every event has a story worth
                telling. Our mission is to create memorable experiences and meaningful connections
                through creativity, innovation, and uncompromising quality.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section about-stats-section">
        <div className="container">
          <div className="about-stats">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={Math.min(i + 1, 4)}>
                <div className="about-stat">
                  <span className="about-stat-num">{s.num}</span>
                  <span className="about-stat-label">{s.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section">
        <div className="container">
          <Reveal><span className="eyebrow">Our Journey</span></Reveal>
          <Reveal delay={1}>
            <h2 className="section-title">Key <span className="accent">Milestones</span></h2>
          </Reveal>
          <div className="about-timeline">
            {milestones.map((m, i) => (
              <Reveal key={m.year} delay={Math.min(i + 1, 4)} className={i % 2 === 0 ? 'reveal-left' : 'reveal-right'}>
                <div className="about-timeline-item">
                  <div className="about-timeline-year">{m.year}</div>
                  <div className="about-timeline-dot" />
                  <div className="about-timeline-content">
                    <h3>{m.title}</h3>
                    <p>{m.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-soft)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <Reveal><span className="eyebrow">What Drives Us</span></Reveal>
          <Reveal delay={1}>
            <h2 className="section-title">Our Core <span className="accent">Values</span></h2>
          </Reveal>
          <div className="about-values-grid">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={Math.min(i + 1, 4)} className="reveal-scale">
                <div className="about-value-card">
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

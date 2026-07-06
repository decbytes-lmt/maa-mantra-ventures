import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import useSEO from '../hooks/useSEO';
import './Home.css';

const REVIEW_LINK = 'https://share.google/970PxJEuElhSyPL8K';

const testimonials = [
  { quote: 'Outstanding Event Management Team! Maa Mantra Ventures did an exceptional job organizing our event. Everything from the décor and coordination to timing and hospitality was handled perfectly. Creative, professional, and always available to help with last-minute changes.', name: 'Hrithik Poojari', role: 'Google Review', stars: 5 },
  { quote: 'Maa Mantra Ventures is truly a powerhouse of creativity and professionalism. Based in Mangalore, the team brings together exceptional storytelling, artistic vision, and flawless event execution. Highly recommend to anyone looking for a reliable and innovative partner.', name: 'Niriksha Poojari', role: 'Google Review · Local Guide', stars: 5 },
  { quote: 'Working with Maa Mantra Ventures was an outstanding experience! Their team transformed our vision into a memorable and professionally executed event. From planning and coordination to branding and on-ground execution, everything was handled flawlessly.', name: 'Sajesh Poojary', role: 'Google Review · Local Guide', stars: 5 },
  { quote: 'Their event management is top-notch! The branding, promotional reels, and overall coordination created so much hype and energy. The entire event ran perfectly thanks to their dedicated team. Absolutely the best event organizers in the coastal region!', name: 'Prajwal Poojary', role: 'Google Review · Local Guide', stars: 5 },
  { quote: 'We had a great experience with this event management team. They were professional, well-organized, and handled everything smoothly. The decorations and overall execution were excellent, and their team was responsive to all our requirements.', name: 'Shivani Shivaji Rao', role: 'Google Review', stars: 5 },
  { quote: 'Maa Mantra Ventures is truly a one-stop solution for all your event, vendor, and marketing needs. They handle everything under one roof — from event coordination and vendor management to social media and performance marketing.', name: 'Nidhi', role: 'Google Review · Local Guide', stars: 5 },
  { quote: 'A reliable and talented event partner. Maa Mantra Ventures brought our vision to life with outstanding planning, creativity, and execution. Truly impressive work!', name: 'Sadhvin Sadh', role: 'Google Review', stars: 4 },
  { quote: 'Maa Mantra Ventures is a one-stop solution for all event, vendor, and marketing needs. From social media and performance marketing to influencer campaigns, they handle everything with quick and quality delivery. One of the best agencies in Mangalore!', name: 'Prasad Banjan', role: 'Google Review', stars: 5 },
  { quote: "They pay great attention to detail, bring a highly cinematic and creative touch to everything they do. Five stars all the way! Highly recommended.", name: 'Creative Studio 2.0', role: 'Google Review', stars: 5 },
];

export default function Testimonials() {
  useSEO(
    'Client Testimonials | Maa Mantra Ventures',
    'Read real Google reviews from clients of Maa Mantra Ventures — 4.9 star rated event management and marketing agency in Mangalore.'
  );
  return (
    <div className="page-enter">
      <PageHeader
        eyebrow="Client Stories"
        title="Trusted by Brands,"
        accent="Loved by Clients"
        sub="Real feedback from the people and businesses we've had the privilege to work with — straight from Google Reviews."
      />

      <section className="section" style={{ paddingTop: 20, paddingBottom: 10 }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
          <Reveal>
            <a href={REVIEW_LINK} target="_blank" rel="noreferrer" className="btn btn-primary">
              4.9★ on Google — See All Reviews
              <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 30 }}>
        <div className="container">
          <div className="testimonial-grid">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={Math.min((i % 4) + 1, 4)} className="reveal-blur">
                <a
                  href={REVIEW_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="testimonial-card"
                  style={{ display: 'block', textDecoration: 'none' }}
                  aria-label={`Read ${t.name}'s full review on Google`}
                >
                  <svg className="quote-mark" viewBox="0 0 32 24" fill="none"><path d="M0 24V12.5C0 5 4.5 0.5 11 0v4.5C7 5.5 5 8 5 12h6v12H0zm16 0V12.5C16 5 20.5 0.5 27 0v4.5c-4 1-6 3.5-6 7h6v12H16z" fill="currentColor" /></svg>
                  <p>{t.quote}</p>
                  <div className="stars">{'★'.repeat(t.stars)}{'☆'.repeat(5 - t.stars)}</div>
                  <div className="testimonial-person">
                    <div className="avatar" />
                    <div>
                      <strong>{t.name}</strong>
                      <span>{t.role}</span>
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

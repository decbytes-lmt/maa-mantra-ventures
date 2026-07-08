import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import useSEO from '../hooks/useSEO';
import './Contact.css';

export default function Contact() {
  useSEO(
    'Contact Us | Maa Mantra Ventures',
    'Get in touch with Maa Mantra Ventures for event management, ad films and social media marketing services in Mangalore.'
  );
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="page-enter">
      <PageHeader
        eyebrow="Get In Touch"
        title="Let's Bring Your"
        accent="Vision to Life"
        sub="Tell us about your event, campaign or idea — we'll get back to you within 24 hours."
      />

      <section className="section" style={{ paddingTop: 50 }}>
        <div className="container contact-grid">
          <Reveal>
            <div className="contact-info">
              <ContactCard icon="phone" label="Call Us" value="+91 890 401 1860" href="tel:+918904011860" />
              <ContactCard icon="mail" label="Email Us" value="maamantraventures@gmail.com" href="mailto:maamantraventures@gmail.com" />
              <ContactCard icon="pin" label="Visit Us" value="Maa Mantra Ventures, Shop No#8 Yenepoya Mall, Mallikatte, Kadri Road, Mangaluru, Karnataka 575003" />
              <ContactCard icon="instagram" label="Instagram" value="@maamantraventures" href="https://instagram.com/maamantraventures" />
              <div className="contact-social-row">
                <a href="https://instagram.com/maamantraventures" target="_blank" rel="noreferrer" aria-label="Instagram" className="contact-social"><Icon name="instagram" /></a>
                <a href="https://www.facebook.com/share/14hi9WYtyP1/?mibextid=wwXIfr" target="_blank" rel="noreferrer" aria-label="Facebook" className="contact-social"><Icon name="facebook" /></a>
                <a href="https://www.youtube.com/@MaaMantraventures" target="_blank" rel="noreferrer" aria-label="YouTube" className="contact-social"><Icon name="youtube" /></a>
                <a href="#" aria-label="LinkedIn" className="contact-social"><Icon name="linkedin" /></a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="Your name" required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" placeholder="you@email.com" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone</label>
                  <input type="tel" placeholder="+91 00000 00000" />
                </div>
                <div className="form-group">
                  <label>I'm interested in</label>
                  <select required defaultValue="">
                    <option value="" disabled>Select a service</option>
                    <option>Event Management</option>
                    <option>Stage & Show Management</option>
                    <option>Photography & Videography</option>
                    <option>Advertising Solutions</option>
                    <option>Brand Promotions</option>
                    <option>Something else</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Tell us about your project</label>
                <textarea rows="5" placeholder="Share a few details — event type, date, expected guests..." required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                {sent ? 'Message Sent ✓' : 'Send Message'}
                {!sent && <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>}
              </button>
              {sent && <p className="form-success">Thanks! Our team will reach out within 24 hours.</p>}
            </form>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function ContactCard({ icon, label, value, href }) {
  const inner = (
    <div className="contact-card">
      <div className="contact-card-icon"><Icon name={icon} /></div>
      <div>
        <span className="contact-card-label">{label}</span>
        <strong className="contact-card-value">{value}</strong>
      </div>
    </div>
  );
  return href ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" style={{ textDecoration: 'none' }}>{inner}</a> : inner;
}

function Icon({ name }) {
  const paths = {
    phone: <path d="M5 4h3l1.5 4-2 1.5a12 12 0 006 6l1.5-2 4 1.5v3a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.4" fill="none" />,
    mail: <path d="M3 6h18v12H3zM3 6l9 7 9-7" stroke="currentColor" strokeWidth="1.4" fill="none" />,
    pin: <path d="M12 21s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z" stroke="currentColor" strokeWidth="1.4" fill="none" />,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" fill="none" /><circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="1.6" fill="none" /><circle cx="17" cy="7" r="1.1" fill="currentColor" /></>,
    facebook: <path d="M14 9h2V6h-2c-2 0-3 1.2-3 3v2H9v3h2v6h3v-6h2.2l.4-3H14V9z" fill="currentColor" />,
    youtube: <><rect x="2.5" y="6" width="19" height="12" rx="4" stroke="currentColor" strokeWidth="1.6" fill="none" /><path d="M10 9.5l5 2.5-5 2.5v-5z" fill="currentColor" /></>,
    linkedin: <><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.6" fill="none" /><circle cx="8" cy="8.5" r="1.2" fill="currentColor" /><path d="M8 11v6M12 17v-4c0-1.4 1-2.2 2-2.2s2 .8 2 2.2v4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" /></>,
  };
  return <svg width="19" height="19" viewBox="0 0 24 24" fill="none">{paths[name]}</svg>;
}

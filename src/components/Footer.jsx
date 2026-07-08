import { Link } from 'react-router-dom';
import './Footer.css';
import mmvLogo from '../assets/mmv_logo.png';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src={mmvLogo} alt="Maa Mantra Ventures" style={{ height: '70px', width: 'auto', objectFit: 'contain' }} />
          </div>
          <p>Creating Experiences — Building Brands.<br />Mangalore's leading event management & brand promotions company.</p>
          <div className="footer-social">
            <a href="https://instagram.com/maamantraventures" target="_blank" rel="noreferrer" aria-label="Instagram"><Icon name="instagram" /></a>
            <a href="https://www.facebook.com/share/14hi9WYtyP1/?mibextid=wwXIfr" target="_blank" rel="noreferrer" aria-label="Facebook"><Icon name="facebook" /></a>
            <a href="https://www.linkedin.com/company/maa-mantra-ventures/?fullpage=1" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin" /></a>
            <a href="https://www.youtube.com/@MaaMantraventures" target="_blank" rel="noreferrer" aria-label="YouTube"><Icon name="youtube" /></a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/services/event-management">Services</Link>
          <Link to="/portfolio">Portfolio</Link>
          <Link to="/testimonials">Testimonials</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-col">
          <h4>Services</h4>
          <Link to="/services/event-management">Event Management</Link>
          <Link to="/services/advertising-agency">Advertising Agency</Link>
          <Link to="/services/ad-films">Photography & Videography</Link>
          <Link to="/services/social-media-marketing">Brand Promotions</Link>
          <Link to="/services/film-production">Film Production</Link>
        </div>

        <div className="footer-col">
          <h4>Contact Info</h4>
          <a href="tel:+918904011860" className="footer-contact-line"><Icon name="phone" /> +91 890 401 1860</a>
          <a href="mailto:maamantraventures@gmail.com" className="footer-contact-line"><Icon name="mail" /> maamantraventures@gmail.com</a>
          <span className="footer-contact-line"><Icon name="pin" /> Maa Mantra Ventures, Shop No#8 Yenepoya Mall, Mallikatte, Kadri Road, Mangaluru 575003</span>
          <a href="https://wa.me/918904011860" target="_blank" rel="noreferrer" className="btn btn-primary footer-whatsapp">
            Chat on WhatsApp <Icon name="whatsapp" />
          </a>
        </div>
      </div>

      <div className="footer-bottom container">
        <span>© 2026 Maa Mantra Ventures. All rights reserved.</span>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms &amp; Conditions</a>
        </div>
      </div>
    </footer>
  );
}

function Icon({ name }) {
  const paths = {
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" fill="none" /><circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="1.6" fill="none" /><circle cx="17" cy="7" r="1.1" fill="currentColor" /></>,
    facebook: <path d="M14 9h2V6h-2c-2 0-3 1.2-3 3v2H9v3h2v6h3v-6h2.2l.4-3H14V9z" fill="currentColor" />,
    linkedin: <><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.6" fill="none" /><circle cx="8" cy="8.5" r="1.2" fill="currentColor" /><path d="M8 11v6M12 17v-4c0-1.4 1-2.2 2-2.2s2 .8 2 2.2v4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" /></>,
    youtube: <><rect x="2" y="6" width="20" height="12" rx="4" stroke="currentColor" strokeWidth="1.6" fill="none" /><path d="M10 9.5l5 2.5-5 2.5z" fill="currentColor" /></>,
    phone: <path d="M5 4h3l1.5 4-2 1.5a12 12 0 006 6l1.5-2 4 1.5v3a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.4" fill="none" />,
    mail: <path d="M3 6h18v12H3zM3 6l9 7 9-7" stroke="currentColor" strokeWidth="1.4" fill="none" />,
    pin: <path d="M12 21s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z" stroke="currentColor" strokeWidth="1.4" fill="none" />,
    whatsapp: <path d="M12 3a9 9 0 00-7.8 13.5L3 21l4.6-1.2A9 9 0 1012 3z" fill="currentColor" />,
  };
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none">{paths[name]}</svg>;
}

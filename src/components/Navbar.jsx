import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';
import mmvLogo from '../assets/mmv_logo.png';

const services = [
  { label: 'Event Management', path: '/services/event-management' },
  { label: 'Advertising Agency', path: '/services/advertising-agency' },
  { label: 'Photography & Videography', path: '/services/ad-films' },
  { label: 'Brand Promotions', path: '/services/social-media-marketing' },
  { label: 'Film Production', path: '/services/film-production' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-inner container">
        <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
          <img src={mmvLogo} alt="Maa Mantra Ventures" style={{ height: '44px', width: 'auto', objectFit: 'contain' }} />
        </Link>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <NavLink to="/" end onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)}>About Us</NavLink>

          <div
            className="nav-dropdown"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="nav-dropdown-trigger" onClick={() => setDropdownOpen((v) => !v)}>
              Services
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className={`nav-dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
              {services.map((s) => (
                <Link key={s.path} to={s.path} onClick={() => { setMenuOpen(false); setDropdownOpen(false); }}>
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          <NavLink to="/portfolio" onClick={() => setMenuOpen(false)}>Portfolio</NavLink>
          <NavLink to="/testimonials" onClick={() => setMenuOpen(false)}>Testimonials</NavLink>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
        </nav>

        <Link to="/contact" className="btn btn-outline nav-cta">
          Let&rsquo;s Talk
          <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </Link>

        <button
          className={`nav-burger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}

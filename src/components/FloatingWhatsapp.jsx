import './FloatingWhatsapp.css';

export default function FloatingWhatsapp() {
  return (
    <a href="https://wa.me/918904011860" target="_blank" rel="noreferrer" className="float-wa" aria-label="Chat on WhatsApp">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M12 3a9 9 0 00-7.8 13.5L3 21l4.6-1.2A9 9 0 1012 3z" fill="#16130a" />
      </svg>
      <span>Chat with us</span>
      <span className="float-wa-badge">1</span>
    </a>
  );
}

import { useEffect, useState } from 'react';
import './IntroSplash.css';
import mmvLogo from '../assets/mmv_logo.png';

const SESSION_KEY = 'mmv_intro_played';

export default function IntroSplash() {
  // Decide skip synchronously at init — safe to read sessionStorage here,
  // doesn't need to live in an effect, and avoids StrictMode double-invoke
  // issues entirely.
  const [skip] = useState(() => !!sessionStorage.getItem(SESSION_KEY));
  const [phase, setPhase] = useState('hidden'); // hidden → visible → fadeout → done

  useEffect(() => {
    if (skip) return;

    sessionStorage.setItem(SESSION_KEY, '1');
    document.body.style.overflow = 'hidden';

    const t1 = setTimeout(() => setPhase('visible'), 80);
    const t2 = setTimeout(() => setPhase('fadeout'), 1900);
    const t3 = setTimeout(() => {
      setPhase('done');
      document.body.style.overflow = '';
    }, 2750);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      document.body.style.overflow = '';
    };
  }, [skip]);

  if (skip || phase === 'done') return null;

  return (
    <div className={`intro-splash ${phase === 'fadeout' ? 'intro-splash--out' : ''}`}>
      <div className="intro-bokeh" />
      <div className={`intro-card ${phase === 'visible' ? 'intro-card--in' : ''}`}>
        <span className="intro-line intro-line--tl" />
        <span className="intro-line intro-line--tr" />
        <span className="intro-line intro-line--bl" />
        <span className="intro-line intro-line--br" />
        <div className="intro-beam" />
        <img
          src={mmvLogo}
          alt="Maa Mantra Ventures"
          className="intro-logo"
        />
        <h1 className="intro-mmv">MMV</h1>
        <div className="intro-divider" />
        <p className="intro-tagline">Maa Mantra Ventures</p>
      </div>
    </div>
  );
}

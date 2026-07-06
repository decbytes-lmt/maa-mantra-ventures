import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import HeroWavesBg from '../components/HeroWavesBg';
import useSEO from '../hooks/useSEO';
import { titleFromFilename } from '../utils/titleFromFilename';
import './Home.css';
import './ServiceDetail.css';

export default function ServiceDetail({ data }) {
  const { eyebrow, title, accent, intro, heroIcon, features, process, mediaAutoplay, mediaGrid, faqs, otherServices } = data;
  useSEO(
    `${title} ${accent} | Maa Mantra Ventures`,
    typeof intro === 'string' ? intro.slice(0, 160) : `${eyebrow} services by Maa Mantra Ventures, Mangalore.`
  );

  return (
    <div className="page-enter">
      <section className="svc-hero">
        <div className="svc-hero-glow" />
        <HeroWavesBg />
        <div className="container svc-hero-inner">
          <Reveal>
            <Link to="/" className="svc-breadcrumb">
              <svg viewBox="0 0 16 16" fill="none"><path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Back to Home
            </Link>
          </Reveal>
          <Reveal delay={1}>
            <span className="eyebrow">{eyebrow}</span>
          </Reveal>
          <Reveal delay={2}>
            <h1 className="svc-title">
              {title} <span className="accent">{accent}</span>
            </h1>
          </Reveal>
          <Reveal delay={3}>
            <p className="svc-intro">{intro}</p>
          </Reveal>
          <Reveal delay={4}>
            <Link to="/contact" className="btn btn-primary">
              Get a Free Consultation
              <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </Reveal>
        </div>
        <div className="svc-hero-icon">{heroIcon}</div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal><span className="eyebrow">What&rsquo;s Included</span></Reveal>
          <Reveal delay={1}>
            <h2 className="section-title">Everything You Need, <span className="accent">Handled</span></h2>
          </Reveal>
          <div className="svc-features-grid">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={Math.min(i + 1, 4)} className="reveal-rotate">
                <div className="svc-feature-card">
                  <div className="svc-feature-icon">{f.icon}</div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section svc-process-section">
        <div className="container">
          <Reveal><span className="eyebrow">How We Work</span></Reveal>
          <Reveal delay={1}>
            <h2 className="section-title">Our <span className="accent">Process</span></h2>
          </Reveal>
          <div className="svc-process-list">
            {process.map((step, i) => (
              <Reveal key={step.title} delay={Math.min(i + 1, 4)}>
                <div className="svc-process-step">
                  <span className="svc-process-num">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {(mediaAutoplay?.length > 0 || mediaGrid?.length > 0) && (
        <section className="section">
          <div className="container">
            <Reveal><span className="eyebrow">Recent Work</span></Reveal>
            <Reveal delay={1}>
              <h2 className="section-title">See It In <span className="accent">Action</span></h2>
            </Reveal>

            {mediaAutoplay?.length > 0 && (
              <div className="svc-autoplay-row">
                {mediaAutoplay.map((m, i) => (
                  <Reveal key={m.file} delay={Math.min(i + 1, 4)} className="reveal-scale">
                    <AutoplayVideo item={m} title={m.title || titleFromFilename(m.file)} />
                  </Reveal>
                ))}
              </div>
            )}

            {mediaGrid?.length > 0 && (
              <div className="svc-media-masonry">
                {mediaGrid.map((m, i) => (
                  <Reveal key={m.file} delay={Math.min(i + 1, 4)} className="reveal-scale">
                    <MediaCard item={m} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <Reveal><span className="eyebrow">Common Questions</span></Reveal>
          <Reveal delay={1}>
            <h2 className="section-title">Frequently Asked</h2>
          </Reveal>
          <div className="svc-faq-list">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={Math.min(i + 1, 4)}>
                <FaqItem q={f.q} a={f.a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section svc-other">
        <div className="container">
          <Reveal><span className="eyebrow">Explore More</span></Reveal>
          <Reveal delay={1}>
            <h2 className="section-title">Other <span className="accent">Services</span></h2>
          </Reveal>
          <div className="svc-other-grid">
            {otherServices.map((s, i) => (
              <Reveal key={s.path} delay={Math.min(i + 1, 4)}>
                <Link to={s.path} className="svc-other-card">
                  <h3>{s.title}</h3>
                  <span className="service-arrow">
                    <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-inner">
          <Reveal className="reveal-rotate"><h2 className="section-title">Ready to Start Your <span className="accent">{title}</span> Project?</h2></Reveal>
          <Reveal delay={1}>
            <Link to="/contact" className="btn btn-primary">
              Let&rsquo;s Talk
              <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

// Only one media item plays at a time across the whole grid. When something
// new starts, whatever was previously playing gets told to stop.
let activeStop = null;
function setActivePlayer(stopFn) {
  if (activeStop && activeStop !== stopFn) activeStop();
  activeStop = stopFn;
}
function clearActivePlayer(stopFn) {
  if (activeStop === stopFn) activeStop = null;
}

// Bare iframe only — callers own the wrapping/aspect-ratio div so it can be
// stacked with our own thumbnail layer on top.
function YouTubeEmbed({ id, title }) {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const params = `rel=0&modestbranding=1&playsinline=1&mute=1&controls=0&iv_load_policy=3&disablekb=1&autoplay=1&origin=${encodeURIComponent(origin)}`;
  const src = `https://www.youtube.com/embed/${id}?${params}`;
  return (
    <iframe
      className="svc-yt-layer"
      src={src}
      title={title}
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      frameBorder="0"
    />
  );
}

function AutoplayVideo({ item, title }) {
  const videoRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!item.youtube) return undefined;
    const t = setTimeout(() => setRevealed(true), 700);
    return () => clearTimeout(t);
  }, [item.youtube]);

  const play = () => videoRef.current?.play().catch(() => {});
  const pause = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  if (item.youtube) {
    return (
      <div className="svc-media-natural svc-media-autoplay svc-media-yt">
        <div className={`svc-yt-wrap${item.youtube.isShort ? ' svc-yt-short' : ''}`}>
          <YouTubeEmbed id={item.youtube.id} title={title} />
          {!revealed && (
            <div
              className="svc-yt-layer svc-yt-thumb"
              style={{ backgroundImage: `url(https://i.ytimg.com/vi/${item.youtube.id}/hqdefault.jpg)` }}
            />
          )}
        </div>
        <span>{title}</span>
      </div>
    );
  }

  return (
    <div
      className="svc-media-natural svc-media-autoplay"
      onMouseEnter={play}
      onMouseLeave={pause}
      onTouchStart={play}
    >
      <video ref={videoRef} src={item.src} muted loop playsInline preload="metadata" />
      <span className="svc-hover-hint">
        <svg viewBox="0 0 24 24" fill="none"><path d="M8 5v14l11-7L8 5z" fill="currentColor" /></svg>
      </span>
      <span>{title}</span>
    </div>
  );
}

function MediaCard({ item }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const revealTimer = useRef(null);

  const title = item.title || titleFromFilename(item.file);

  // --- YouTube grid item: our own thumbnail while idle, real embed only while
  // playing (mount on hover/tap, unmount on leave). Thumbnail stays layered on
  // top for a beat after play starts too, masking YouTube's own brief loading
  // flash (title/channel bar) before actual playback kicks in. One plays at once. ---
  if (item.type === 'video' && item.youtube) {
    const stop = () => {
      setPlaying(false);
      setRevealed(false);
      clearTimeout(revealTimer.current);
    };
    const play = () => {
      setActivePlayer(stop);
      setPlaying(true);
      clearTimeout(revealTimer.current);
      revealTimer.current = setTimeout(() => setRevealed(true), 700);
    };
    const toggle = () => (playing ? stop() : play());

    return (
      <div
        className={`svc-media-natural svc-media-yt${playing ? ' is-playing' : ''}`}
        onMouseEnter={play}
        onMouseLeave={stop}
        onClick={toggle}
        onTouchStart={play}
      >
        <div className={`svc-yt-wrap${item.youtube.isShort ? ' svc-yt-short' : ''}`}>
          {playing && <YouTubeEmbed id={item.youtube.id} title={title} />}
          {(!playing || !revealed) && (
            <div
              className="svc-yt-layer svc-yt-thumb"
              style={{ backgroundImage: `url(https://i.ytimg.com/vi/${item.youtube.id}/hqdefault.jpg)` }}
            />
          )}
        </div>
        {!playing && (
          <button className="svc-play-btn" aria-label={`Play ${title}`} tabIndex={-1}>
            <svg viewBox="0 0 24 24" fill="none"><path d="M8 5v14l11-7L8 5z" fill="currentColor" /></svg>
          </button>
        )}
        <span>{title}</span>
      </div>
    );
  }

  // --- Local video grid item: hover (or tap) to play; only one plays at once ---
  if (item.type === 'video') {
    const stop = () => {
      const v = videoRef.current;
      if (!v) return;
      v.pause();
      v.currentTime = 0;
      setPlaying(false);
    };
    const play = () => {
      const v = videoRef.current;
      if (!v) return;
      setActivePlayer(stop);
      v.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false)); // playback failed — keep button visible so it's not stuck black
    };
    const toggle = () => (playing ? stop() : play());

    return (
      <div
        className={`svc-media-natural svc-media-video${playing ? ' is-playing' : ''}`}
        onMouseEnter={play}
        onMouseLeave={stop}
        onClick={toggle}
        onTouchStart={play}
      >
        <video
          ref={videoRef}
          src={item.src}
          playsInline
          loop
          muted
          preload="none"
          onEnded={() => { setPlaying(false); clearActivePlayer(stop); }}
          onError={() => setPlaying(false)}
        />
        {!playing && (
          <button className="svc-play-btn" aria-label={`Play ${title}`}>
            <svg viewBox="0 0 24 24" fill="none"><path d="M8 5v14l11-7L8 5z" fill="currentColor" /></svg>
          </button>
        )}
        <span>{title}</span>
      </div>
    );
  }

  return (
    <div className="svc-media-natural">
      <img src={item.src} alt={title} loading="lazy" />
      <span>{title}</span>
    </div>
  );
}

function FaqItem({ q, a }) {
  return (
    <details className="svc-faq-item">
      <summary>
        {q}
        <svg viewBox="0 0 16 16" fill="none"><path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </summary>
      <p>{a}</p>
    </details>
  );
}

import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import useSEO from '../hooks/useSEO';
import { titleFromFilename } from '../utils/titleFromFilename';
import { portfolioImages, portfolioVideos } from '../data/portfolioMedia';
import '../pages/Home.css';
import './Portfolio.css';

const categories = ['All', 'Events', 'Ad Films', 'Social Media', 'Product Shoots'];

// Real work pulled from the service folders (brand promotions, advertising agency,
// photography&videography, event management) — see data/portfolioMedia.js.
const projects = [
  ...portfolioVideos.map((v) => ({
    title: v.title || titleFromFilename(v.file),
    tag: v.tag,
    isVideo: true,
    youtube: v.youtube,
  })),
  ...portfolioImages.map((img) => ({
    title: titleFromFilename(img.file),
    tag: img.tag,
    image: img.src,
  })),
];

function PortfolioThumb({ project: p }) {
  const [playing, setPlaying] = useState(false);

  if (p.isVideo && p.youtube) {
    const { id, isShort } = p.youtube;
    if (playing) {
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      const params = `rel=0&modestbranding=1&playsinline=1&autoplay=1&mute=1&controls=1&iv_load_policy=3&origin=${encodeURIComponent(origin)}`;
      return (
        <div className="portfolio-thumb">
          <iframe
            src={`https://www.youtube.com/embed/${id}?${params}`}
            title={p.title}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      );
    }
    return (
      <div className="portfolio-thumb" onClick={() => setPlaying(true)}>
        <img
          src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
          alt={p.title}
          loading="lazy"
          style={isShort ? { objectPosition: 'center 20%' } : undefined}
        />
        <span className="portfolio-play">
          <svg viewBox="0 0 24 24" fill="none"><path d="M8 5v14l11-7z" fill="#16130a" /></svg>
        </span>
      </div>
    );
  }

  return (
    <div className="portfolio-thumb">
      {p.image && <img src={p.image} alt={p.title} loading="lazy" />}
    </div>
  );
}

export default function Portfolio() {
  useSEO(
    'Our Portfolio | Maa Mantra Ventures',
    'Explore events, ad films and campaigns crafted by Maa Mantra Ventures — weddings, product launches, cultural festivals and brand activations.'
  );
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? projects : projects.filter((p) => p.tag === active);

  return (
    <div className="page-enter">
      <PageHeader
        eyebrow="Our Work"
        title="Moments We've"
        accent="Brought to Life"
        sub="A look at the events, films and campaigns we've crafted for brands and clients across India."
      />

      <section className="section" style={{ paddingTop: 50 }}>
        <div className="container">
          <Reveal>
            <div className="portfolio-filters">
              {categories.map((c) => (
                <button
                  key={c}
                  className={`filter-pill ${active === c ? 'active' : ''}`}
                  onClick={() => setActive(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="portfolio-grid">
            {filtered.map((p, i) => (
              <Reveal key={`${p.tag}-${p.title}-${i}`} delay={Math.min((i % 4) + 1, 4)} className="reveal-scale">
                <div className="portfolio-grid-item">
                  <PortfolioThumb project={p} />
                  <h4>{p.title}</h4>
                  <span>{p.tag}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

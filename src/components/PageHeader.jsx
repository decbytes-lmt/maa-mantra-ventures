import Reveal from './Reveal';
import GoldParticleTerrain from './GoldParticleTerrain';
import './PageHeader.css';

export default function PageHeader({ eyebrow, title, accent, sub }) {
  return (
    <section className="page-hero">
      <div className="page-hero-glow" />
      <GoldParticleTerrain />
      <div className="container">
        <Reveal><span className="eyebrow">{eyebrow}</span></Reveal>
        <Reveal delay={1}>
          <h1 className="page-hero-title">
            {title} <span className="accent">{accent}</span>
          </h1>
        </Reveal>
        {sub && (
          <Reveal delay={2}>
            <p className="page-hero-sub">{sub}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

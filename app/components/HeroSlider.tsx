"use client";

import { useEffect, useState } from "react";

const slideCount = 3;

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slideCount), 2000);
    return () => window.clearInterval(timer);
  }, [paused, active]);

  const previous = () => setActive((current) => (current - 1 + slideCount) % slideCount);
  const next = () => setActive((current) => (current + 1) % slideCount);

  return (
    <section className="hero-slider" aria-label="FERAL featured campaigns" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="hero-slider-track" style={{ transform: `translateX(-${active * 33.333333}%)` }}>
        <article className="hero-slide poster-first">
          <picture><source media="(max-width: 620px)" srcSet="/feral-campaign-poster.png" /><img src="/feral-hero-fullbleed-v2.png" alt="FERAL Wear — Unleash Your Best campaign" /></picture>
          <a className="hero-slide-link" href="/shop" aria-label="Explore FERAL Wear collection" />
        </article>
        <article className="hero-slide original-hero">
          <div className="hero-media" role="img" aria-label="Athlete training in a dark gym" /><div className="hero-scrim" />
          <div className="hero-copy"><p className="eyebrow"><span /> Drop 01 / Forged in motion</p><h1>UNLOCK<br />YOUR <i>FERAL.</i></h1><p className="hero-lede">Performance essentials for the hours nobody sees. Engineered to move. Built to endure.</p><div className="hero-cta"><a className="button primary" href="/shop">Shop the drop <span>↗</span></a><a className="text-link" href="/nutrition">Explore nutrition <span>→</span></a></div></div>
          <div className="hero-index"><span>02</span><div /><small>03</small></div><p className="vertical-note">FERAL PERFORMANCE SYSTEMS / 2026</p>
        </article>
        <article className="hero-slide poster-third">
          <picture><source media="(max-width: 620px)" srcSet="/poster2.png" /><img src="/feral-family-hero-1920x760.png" alt="FERAL Wear — Gear Up, Show Up family campaign" /></picture>
          <a className="hero-slide-link" href="/shop" aria-label="Explore FERAL sportswear for every champion" />
        </article>
      </div>
      <button className="hero-arrow hero-arrow-left" type="button" onClick={previous} aria-label="Previous poster">←</button>
      <button className="hero-arrow hero-arrow-right" type="button" onClick={next} aria-label="Next poster">→</button>
      <div className="hero-slider-progress" aria-label="Choose poster">
        {[0, 1, 2].map((index) => <button key={index} type="button" className={active === index ? "active" : ""} onClick={() => setActive(index)} aria-label={`Show poster ${index + 1}`} aria-current={active === index ? "true" : undefined} />)}
      </div>
    </section>
  );
}

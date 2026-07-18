const slides = [
  { eyebrow: "FERAL / CAMPAIGN 01", title: "UNLEASH YOUR BEST.", text: "One brand. Every athlete. Performance essentials built for strength.", href: "/shop", label: "Explore sportswear" },
  { eyebrow: "FERAL / PERFORMANCE", title: "MADE TO MOVE.", text: "Premium training wear designed for athletes who refuse to slow down.", href: "/men", label: "View the collection" },
  { eyebrow: "FERAL / COMPLETE SYSTEM", title: "FUEL. SWEAT. REPEAT.", text: "Sportswear, nutrition and sauna systems—working as one.", href: "/nutrition", label: "Explore nutrition" },
] as const;

export default function PosterSlider() {
  const loop = [...slides, slides[0]];
  return (
    <section className="poster-slider" aria-label="FERAL campaign highlights">
      <div className="poster-track">
        {loop.map((slide, index) => (
          <article className="poster-slide" key={`${slide.title}-${index}`} aria-hidden={index === slides.length}>
            <div className="poster-backdrop" aria-hidden="true" />
            <div className="poster-copy">
              <p>{slide.eyebrow}</p><h2>{slide.title}</h2><span>{slide.text}</span>
              <a href={slide.href}>{slide.label} <b>↗</b></a>
            </div>
            <img src="/feral-campaign-poster.png" alt={index === 0 ? "FERAL Wear sportswear, nutrition and sauna campaign poster" : ""} />
            <div className="poster-index" aria-hidden="true"><b>0{(index % slides.length) + 1}</b><span />03</div>
          </article>
        ))}
      </div>
      <div className="poster-timer" aria-hidden="true"><span /><span /><span /></div>
    </section>
  );
}

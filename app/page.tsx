"use client";

import { FormEvent, useMemo, useState } from "react";
import CommerceNav from "./components/CommerceNav";
import HeroSlider from "./components/HeroSlider";

type Category = "All" | "Wear" | "Supplements";

const products = [
  { id: 1, name: "Apex Compression Tee", category: "Wear", price: 8490, tag: "Best seller", image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=85" },
  { id: 2, name: "Velocity Training Short", category: "Wear", price: 6990, tag: "New", image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=900&q=85" },
  { id: 3, name: "Whey Core / Chocolate", category: "Supplements", price: 12990, tag: "24g protein", image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=900&q=85" },
  { id: 4, name: "Daily Creatine / 300g", category: "Supplements", price: 7490, tag: "Pure mono", image: "https://images.unsplash.com/photo-1579722821273-0f6c1f354f0c?auto=format&fit=crop&w=900&q=85" },
] as const;

const money = new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 });

export default function Home() {
  const [active, setActive] = useState<Category>("All");
  const [cartCount, setCartCount] = useState(0);
  const [message, setMessage] = useState("");
  const visible = useMemo(() => products.filter((item) => active === "All" || item.category === active), [active]);

  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "");
    setMessage(email.includes("@") ? "You’re on the list. Stay ready." : "Enter a valid email address.");
  }

  return (
    <main>
      <div className="announcement">FREE DELIVERY OVER PKR 15,000 <span>•</span> BUILT FOR THE RELENTLESS</div>
      <CommerceNav cartCount={cartCount}/>

      <HeroSlider />

      {false && (<section className="hero" id="top">
        <div className="hero-media" role="img" aria-label="Athlete training in a dark gym" />
        <div className="hero-scrim" />
        <div className="hero-copy">
          <p className="eyebrow"><span /> Drop 01 / Forged in motion</p>
          <h1>UNLOCK<br />YOUR <i>FERAL.</i></h1>
          <p className="hero-lede">Performance essentials for the hours nobody sees. Engineered to move. Built to endure.</p>
          <div className="hero-cta"><a className="button primary" href="/shop">Shop the drop <span>↗</span></a><a className="text-link" href="/nutrition">Explore nutrition <span>→</span></a></div>
        </div>
        <div className="hero-index"><span>01</span><div /><small>03</small></div>
        <p className="vertical-note">FERAL PERFORMANCE SYSTEMS / 2026</p>
      </section>)}

      <section className="proof" aria-label="Brand benefits">
        <div><strong>48H</strong><span>Dispatch target</span></div><div><strong>4-WAY</strong><span>Performance stretch</span></div><div><strong>30D</strong><span>Easy returns</span></div><div><strong>100%</strong><span>Focused formulas</span></div>
      </section>

      <section className="categories section" id="categories">
        <div className="section-heading"><p className="eyebrow dark"><span /> Choose your discipline</p><h2>ONE STANDARD.<br /><i>THREE SYSTEMS.</i></h2><p>From the first rep to the final recovery meal, every piece works together.</p></div>
        <div className="category-grid">
          <a className="category-card tall" href="#shop"><img src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1200&q=85" alt="Athlete lifting weights in performance clothing" /><span className="card-number">01</span><div><p>Engineered apparel</p><h3>PERFORMANCE<br />WEAR</h3><span>Explore collection ↗</span></div></a>
          <a className="category-card" href="#shop"><img src="https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=1200&q=85" alt="Sports nutrition supplement product" /><span className="card-number">02</span><div><p>Daily fuel</p><h3>SUPPLEMENTS</h3><span>Explore formulas ↗</span></div></a>
          <a className="category-card light" href="#nutrition" id="nutrition"><img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=85" alt="Balanced nutritious meal" /><span className="card-number">03</span><div><p>Evidence-led habits</p><h3>NUTRITION<br />GUIDANCE</h3><span>Build your base ↗</span></div></a>
        </div>
      </section>

      <section className="products section" id="shop">
        <div className="product-top"><div><p className="eyebrow dark"><span /> The current rotation</p><h2>TRAINING <i>ESSENTIALS.</i></h2></div><div className="filters" role="group" aria-label="Filter products">{(["All", "Wear", "Supplements"] as Category[]).map((label) => <button key={label} className={active === label ? "active" : ""} onClick={() => setActive(label)}>{label}</button>)}</div></div>
        <div className="product-grid" aria-live="polite">{visible.map((product) => <article className="product-card" key={product.id}><div className="product-image"><img src={product.image} alt={product.name} loading="lazy" /><span>{product.tag}</span><button onClick={() => setCartCount((count) => count + 1)} aria-label={`Add ${product.name} to bag`}>+</button></div><div className="product-meta"><div><p>{product.category}</p><h3>{product.name}</h3></div><strong>{money.format(product.price)}</strong></div></article>)}</div>
      </section>

      <section className="manifesto" id="story"><div className="manifesto-mark">F</div><div><p className="eyebrow"><span /> The FERAL code</p><blockquote>“DISCIPLINE IS<br />THE <i>INSTINCT</i><br />YOU CHOOSE.”</blockquote><p>FERAL is for people who train when motivation disappears. No noise. No shortcuts. Just considered gear, honest fuel, and repeatable guidance.</p><a className="text-link light-link" href="#newsletter">Join the movement <span>→</span></a></div></section>

      <section className="newsletter" id="newsletter"><p>THE FIELD NOTE / 001</p><div><h2>EARLY ACCESS.<br /><i>NO EMPTY NOISE.</i></h2><p>New drops, training notes and practical nutrition guidance—sent with restraint.</p></div><form onSubmit={subscribe} noValidate><label htmlFor="email">Email address</label><div><input id="email" name="email" type="email" placeholder="YOU@EXAMPLE.COM" required /><button type="submit">JOIN ↗</button></div><p className="form-message" role="status">{message}</p></form></section>

      <footer><a className="footer-brand" href="#top"><img src="/feral-logo.png" alt="" /><span>FERAL <b>WEAR</b></span></a><div className="footer-links"><div><p>Shop</p><a href="#shop">Performance wear</a><a href="#shop">Supplements</a><a href="#categories">All collections</a></div><div><p>Support</p><a href="#newsletter">Contact</a><a href="#newsletter">Delivery & returns</a><a href="#newsletter">Size guide</a></div><div><p>Follow</p><a href="#newsletter">Instagram ↗</a><a href="#newsletter">TikTok ↗</a><a href="#newsletter">YouTube ↗</a></div></div><div className="footer-bottom"><span>© 2026 FERAL Wear. Prototype.</span><span>Nutrition content is general information, not medical advice.</span></div></footer>
    </main>
  );
}

/* eslint-disable @next/next/no-img-element */
import GlobeCanvas from '@/components/ui/GlobeCanvas';

export default function Hero(){
 return (
  <section className="hero" id="home">
<div className="hero-mesh" aria-hidden="true"></div><div className="hero-noise"></div><div className="hero-glow hero-glow-left"></div><div className="hero-glow hero-glow-right"></div>
<div className="container hero-layout">
<div className="hero-content"><div className="micro reveal"><span className="micro-dot"></span> THE NEXT DIMENSION OF CONNECTIVITY <span className="micro-index">/ 2026</span></div>
<h1 className="hero-title reveal">RECHARGE<br /><span className="hero-title-outline">WITHOUT</span><br /><span className="shimmer">BORDERS<span className="title-period">.</span></span></h1>
<p className="hero-intro reveal">From your neighbourhood in Singapore to your favourite people around the world. Every connection deserves to feel extraordinary.</p>
<div className="hero-buttons reveal"><a className="button button-electric" href="#operators">EXPLORE NETWORKS <span className="arrow-round">↗</span></a><a className="button button-soft" href="#world">DISCOVER THE WORLD <span>↗</span></a></div>
<div className="hero-footnote reveal"><span className="pulse-beacon"></span><span>Singapore • International recharge</span><span className="foot-separator">/</span><span>Stay connected.</span></div>
</div>
<div className="hero-visual" id="hero-visual" aria-label="Animated rotating three-dimensional Earth with recharge device">
<div className="planet-light"></div><div className="planet-rim planet-rim-a"></div><div className="planet-rim planet-rim-b"></div><GlobeCanvas />
<div className="floating-3d f-card f-card-one" aria-hidden="true"><span className="pill-flag">🇸🇬</span><span><strong>SINGAPORE</strong><small>LOCAL NETWORKS</small></span><span className="f-check">↗</span></div>
<div className="floating-3d f-card f-card-two" aria-hidden="true"><span className="pill-flag">🌍</span><span><strong>GLOBAL REACH</strong><small>EXPLORE DESTINATIONS</small></span><span className="f-check">✦</span></div>
<div className="device-wrap" id="device-wrap" aria-hidden="true"><div className="phone-edge"><div className="phone-screen">
<div className="phone-status"><span>9:41</span><span>●◖◖</span></div><div className="phone-camera"></div><div className="phone-brand"><span className="phone-brand-badge">e</span> easytopup <span>⋯</span></div>
<div className="phone-overline">THE WORLD AT YOUR FINGERTIPS</div><div className="phone-title">Your world.<br /><em>Connected.</em></div>
<div className="phone-card-large"><span>WELCOME TO EASYTOPUP</span><div className="phone-orb">✦</div><strong>Make every<br />connection count.</strong><small>Mobile recharge • Prepaid networks</small></div>
<div className="phone-line"><span>🇸🇬</span><div><strong>Singapore</strong><small>Choose your network</small></div><span>↗</span></div><div className="phone-line"><span>🌏</span><div><strong>International</strong><small>Discover destinations</small></div><span>↗</span></div>
<div className="phone-pay">GET CONNECTED <span>↗</span></div><div className="phone-homebar"></div>
</div></div></div>
<span className="visual-cross cross-a">✳</span><span className="visual-cross cross-b">✳</span><span className="visual-orbit-label">EASYTOPUP / GLOBAL CONNECTION ENGINE</span>
</div>
</div>
<div className="hero-bottom container"><a href="#operators" className="scroll-discover"><span className="scroll-mouse"><i></i></span> SCROLL TO EXPLORE</a><span className="hero-bottom-right">01 — INFINITE POSSIBILITIES</span></div>
</section>
 );
}

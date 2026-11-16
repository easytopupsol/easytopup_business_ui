'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { whatsapp } from '@/lib/links';
import ThemeToggle from '@/components/ui/ThemeToggle';

const anchors = [['#operators', 'Networks'], ['#world', 'The world'], ['#journey', 'Experience'], ['#portals', 'Our solutions']] as const;

export default function Header() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 35);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenu(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return <header className={`nav ${scrolled ? 'scrolled' : ''}`} id="top">
    <div className="nav-shell container">
      <a className="logo" href="#top" aria-label="EasyTopup home"><img src="/assets/easytopup-logo.jpg" alt="EasyTopup" width="165" height="31" /></a>
      <nav className="nav-center" aria-label="Main">
        {anchors.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
      </nav>
      <div className="nav-actions">
        <a className="nav-contact" href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer">LET&apos;S CONNECT <ArrowUpRight size={16} /></a>
        <ThemeToggle />
        <button className="menu-button" aria-label={menu ? 'Close navigation' : 'Open navigation'} aria-expanded={menu} aria-controls="mobile-nav" onClick={() => setMenu(!menu)}>
          {menu ? <X /> : <Menu />}
        </button>
      </div>
    </div>
    {menu && <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile">
      <div className="mobile-nav-links">
        {[...anchors, ['#contact', 'Contact'] as const].map(([href, label]) => <a href={href} key={href} onClick={() => setMenu(false)}>{label}<ArrowUpRight size={18} /></a>)}
      </div>
    </nav>}
  </header>;
}

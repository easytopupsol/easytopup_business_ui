'use client';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react';
import { portalLinks, whatsapp } from '@/lib/links';
import ThemeToggle from '@/components/ui/ThemeToggle';

const anchors = [['#operators','Networks'],['#world','The world'],['#journey','Experience'],['#portals','Portals']] as const;
export default function Header() {
 const [menu, setMenu] = useState(false);
 const [login, setLogin] = useState(false);
 const [scrolled, setScrolled] = useState(false);
 useEffect(() => {
  const fn = () => setScrolled(window.scrollY > 35);
  window.addEventListener('scroll', fn, { passive: true });fn();
  const close = (e: KeyboardEvent) => { if(e.key === 'Escape') {setMenu(false);setLogin(false);} };
  window.addEventListener('keydown',close);
  return ()=>{window.removeEventListener('scroll',fn);window.removeEventListener('keydown',close);};
 },[]);
 return <header className={`nav ${scrolled?'scrolled':''}`} id="top">
  <div className="nav-shell container">
   <a className="logo" href="#top" aria-label="EasyTopup home"><img src="/assets/easytopup-logo.jpg" alt="EasyTopup" width="165" height="31"/></a>
   <nav className="nav-center" aria-label="Main">{anchors.map(([href,label])=><a key={href} href={href}>{label}</a>)}</nav>
   <div className="nav-actions"><a className="nav-contact" href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer">LET&apos;S CONNECT <ArrowUpRight size={16}/></a>
    <ThemeToggle />
    <div className="login" style={{position:'relative'}}>
     <button className="login-switch" onClick={()=>setLogin(!login)} aria-expanded={login} aria-haspopup="menu">Login <ChevronDown size={15}/></button>
     {login && <div className="login-panel" role="menu"><small>CHOOSE YOUR PORTAL</small>{Object.entries(portalLinks).map(([name,url])=><a key={name} role="menuitem" href={url}>{name[0].toUpperCase()+name.slice(1)} <ArrowUpRight size={15}/></a>)}</div>}
    </div>
    <button className="menu-button" aria-label={menu?'Close navigation':'Open navigation'} aria-expanded={menu} aria-controls="mobile-nav" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button>
   </div>
  </div>
  {menu && <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile"><div className="mobile-nav-links">{[...anchors,['#contact','Contact'] as const].map(([href,label])=><a href={href} key={href} onClick={()=>setMenu(false)}>{label}<ArrowUpRight size={18}/></a>)}<div className="mobile-portals">{Object.entries(portalLinks).map(([name,url])=><a key={name} href={url}>{name[0].toUpperCase()+name.slice(1)} login ↗</a>)}</div></div></nav>}
 </header>;
}

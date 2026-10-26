/* eslint-disable @next/next/no-img-element */

export default function Footer(){
 return (
  <footer className="footer"><div className="container"><div className="footer-main"><div><a className="footer-logo" href="#top"><img src="/assets/easytopup-logo.jpg" alt="EasyTopup" /></a><p>Connections without borders.<br />EasyTopup Solutions Pte Ltd</p></div><div className="footer-address"><span>FIND US</span><p>26 Kallang Place, #03-14<br />Singapore 339157</p></div><nav className="footer-nav" aria-label="Footer"><a href="#operators">Operators</a><a href="#world">Destinations</a><a href="#portals">Our portals</a><a href="#contact">Contact</a></nav></div><div className="footer-bottom"><span>© <span id="year">{new Date().getFullYear()}</span> EasyTopup Solutions Pte Ltd.</span><span>STAY CONNECTED, EVERYWHERE.</span><a href="#top">BACK TO TOP ↑</a></div></div></footer>
 );
}

const cards = [
  { name: 'AGENT', color: '#a7ff70', geometry: '◈', icon: 'agent', description: 'Tools and services designed for professional agent operations.' },
  { name: 'DEALER', color: '#85c8ff', geometry: '⬡', icon: 'dealer', description: 'A connected business experience built for our dealer partners.' },
  { name: 'CUSTOMER', color: '#db9fff', geometry: '✦', icon: 'customer', description: 'Simple mobile recharge experiences for everyday connections.' },
];

// Informational cards only: no hyperlinks, login redirects or click handlers.
export default function Portals() {
  return <section id="portals" className="portals section">
    <div className="container">
      <div className="portals-heading reveal">
        <span className="eyebrow">04 / ONE CONNECTED ECOSYSTEM</span>
        <h2 className="display">BUILT FOR EVERY<br /><em>CONNECTION.</em></h2>
        <p>One connected ecosystem. Purpose-built experiences for agents, dealers and customers.</p>
      </div>
      <div className="portals-grid">
        {cards.map((card, i) => <div key={card.name} className="portal portal-static reveal" style={{ '--portal': card.color, '--delay': `${i * 100}ms` } as React.CSSProperties}>
          <span className="portal-kicker">0{i + 1} / FOR {card.name === 'CUSTOMER' ? 'CUSTOMERS' : `${card.name}S`}</span>
          <div className="portal-emblem"><div className={`portal-geometry geometry-${card.icon}`}><span>{card.geometry}</span></div></div>
          <div className="portal-foot"><h3>{card.name}</h3><p>{card.description}</p></div>
        </div>)}
      </div>
    </div>
  </section>;
}

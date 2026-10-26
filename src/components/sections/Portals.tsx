import {portalLinks} from '@/lib/links';
const cards=[
 {name:'AGENT',url:portalLinks.agent,color:'#a7ff70',geometry:'◈',icon:'agent',description:'Access your dedicated workspace for customer assistance and agent operations.'},
 {name:'DEALER',url:portalLinks.dealer,color:'#85c8ff',geometry:'⬡',icon:'dealer',description:'Explore your business workspace through our dedicated dealer portal.'},
 {name:'CUSTOMER',url:portalLinks.customer,color:'#db9fff',geometry:'✦',icon:'customer',description:'Explore mobile recharge and enter your customer account in a few taps.'},
];
export default function Portals(){
 return <section id="portals" className="portals section"><div className="container"><div className="portals-heading reveal">
  <span className="eyebrow">04 / YOUR WORLD, YOUR PORTAL</span><h2 className="display">CHOOSE YOUR<br/><em>DIMENSION.</em></h2>
  <p>One connected ecosystem. Three dedicated ways to continue.</p></div>
  <div className="portals-grid">{cards.map((card,i)=><a key={card.name} className="portal tilt reveal" href={card.url} style={{'--portal':card.color,'--delay':`${i*100}ms`} as React.CSSProperties}>
   <span className="portal-kicker">0{i+1} / FOR {card.name==='CUSTOMER'?'CUSTOMERS':`${card.name}S`} <span>↗</span></span>
   <div className="portal-emblem"><div className={`portal-geometry geometry-${card.icon}`}><span>{card.geometry}</span></div></div>
   <div className="portal-foot"><h3>{card.name}</h3><p>{card.description}</p><span>ENTER PORTAL <b>↗</b></span></div>
  </a>)}</div>
 </div></section>;
}

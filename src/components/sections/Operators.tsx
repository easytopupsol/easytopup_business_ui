import {operators} from '@/data/content';

export default function Operators(){
 return <section className="operators section" id="operators"><div className="container">
  <div className="section-top reveal"><div><span className="eyebrow"><span className="eyebrow-rule"/> 01 / THE NETWORKS</span>
    <h2 className="display">THE NAMES<br/><em>YOU KNOW.</em></h2></div>
   <div className="side-note"><span className="rotating-glyph">✳</span><p>Familiar networks. A new dimension of connection. Explore the Singapore operators featured on EasyTopup.</p></div>
  </div>
  <div className="operator-grid">{operators.map((op,i)=><article key={op.name} className="operator-card tilt reveal" style={{'--accent':op.accent,'--delay':`${(i%4)*70}ms`} as React.CSSProperties} aria-label={`${op.name} operator`}>
   <div className="op-reflect"/><span className="op-index">NETWORK / {String(i+1).padStart(2,'0')}</span><span className="op-symbol">{op.symbol}</span>
   <div className="op-bottom"><div><h3>{op.name}</h3><small>{op.caption}</small></div><span className="op-arrow" aria-hidden="true">↗</span></div>
  </article>)}</div>
  <p className="clarify">Operators shown are from your supplied website. Service and product availability should be confirmed before purchase.</p>
 </div></section>;
}

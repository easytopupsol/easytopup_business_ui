'use client';
import {useEffect,useRef,useState} from 'react';

const stages = [
 { number:'01', label:'DISCOVER', first:'YOUR NETWORK.', second:'YOUR WAY.', text:'Discover Singapore operators through a beautifully simple experience. Every great connection starts with a choice.', href:'#operators', action:'EXPLORE OPERATORS', tags:['SINGTEL / STARHUB / M1','YOUR NETWORKS, YOUR CHOICE'] },
 { number:'02', label:'EXPLORE', first:'THE WORLD', second:'IS CLOSER.', text:'From India to Australia and beyond. Discover featured destinations and enquire about recharge availability.', href:'#world', action:'EXPLORE COUNTRIES', tags:['INDIA / MALAYSIA / JAPAN','THE WORLD IS WAITING'] },
 { number:'03', label:'CONNECT', first:'ONE TAP.', second:'NEW POSSIBILITIES.', text:'Continue through your dedicated Customer, Agent or Dealer portal. Built around the way you connect.', href:'#portals', action:'CHOOSE YOUR PORTAL', tags:['CUSTOMER / AGENT / DEALER','YOUR SPACE TO CONNECT'] },
];
export default function Journey(){
 const section=useRef<HTMLElement>(null);
 const [scene,setScene]=useState(0);
 useEffect(()=>{
  let raf=0;
  function onScroll(){if(raf)return;raf=requestAnimationFrame(()=>{raf=0;const el=section.current;if(!el)return;const bounds=el.getBoundingClientRect();if(bounds.top>innerHeight||bounds.bottom<0)return;const d=Math.max(1,el.offsetHeight-innerHeight);const p=Math.max(0,Math.min(.9999,-bounds.top/d));setScene(Math.min(2,Math.floor(p*3)));});}
  addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll,{passive:true});onScroll();
  return()=>{removeEventListener('scroll',onScroll);removeEventListener('resize',onScroll);cancelAnimationFrame(raf);};
 },[]);
 return <section className="journey" id="journey" ref={section} aria-label="Scroll-driven EasyTopup experience">
  <div className="journey-pin"><div className="journey-glow"/><div className="container journey-layout">
   <div className="journey-copy"><span className="eyebrow">02 / THE EXPERIENCE <span className="journey-count">0{scene+1} — 03</span></span>
    {stages.map((item,i)=><div className={`journey-slide ${scene===i?'active':''}`} key={item.number} aria-hidden={scene!==i}>
     <span className="journey-number">{item.number} <span>/ {item.label}</span></span>
     <h2>{item.first}<br/><em>{item.second}</em></h2><p>{item.text}</p><a href={item.href} tabIndex={scene===i?0:-1}>{item.action} <span>↗</span></a>
    </div>)}
   </div>
   <div className="journey-stage" aria-hidden="true"><div className="stage-aura"/><div className="stage-platform"/>
    <div className="stage-cube" id="stage-cube" style={{transform:`rotateX(${-20+scene*8}deg) rotateY(${-25+scene*100}deg) rotateZ(${scene*5}deg)`}}>
     <div className="cube-side cube-front"><span>e</span><strong>easytopup</strong><small>CONNECTED</small></div>
     <div className="cube-side cube-right"><span>🌏</span><strong>WORLDWIDE</strong><small>EXPLORE</small></div>
     <div className="cube-side cube-back"><span>✦</span><strong>ONE PLATFORM</strong><small>THREE PORTALS</small></div>
     <div className="cube-side cube-left"><span>🇸🇬</span><strong>NETWORKS</strong><small>SINGAPORE</small></div>
     <div className="cube-side cube-top"/><div className="cube-side cube-bottom"/>
    </div><div className="stage-ring ring-one"/><div className="stage-ring ring-two"/>
    <span className="stage-floating stage-float-top">{stages[scene].tags[0]}</span>
    <span className="stage-floating stage-float-bottom">{stages[scene].tags[1]}</span>
   </div></div><div className="journey-pagination" aria-label="Current scroll chapter">{stages.map((e,i)=><span key={e.number} className={`stage-indicator ${scene===i?'active':''}`}/>)}</div>
  </div>
 </section>;
}

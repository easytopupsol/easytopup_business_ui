'use client';
import {useEffect} from 'react';
export default function ExperienceController(){
 useEffect(()=>{
  const html=document.documentElement;
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  if(!media.matches)html.classList.add('motion-ready');else html.classList.add('reduce-motion');
  const reveal=Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
  let observer:IntersectionObserver|undefined;
  if('IntersectionObserver' in window && !media.matches){observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer?.unobserve(e.target)}}),{threshold:.05,rootMargin:'0px 0px -30px 0px'});reveal.forEach(el=>observer!.observe(el));}
  else reveal.forEach(el=>el.classList.add('visible'));
  const progress=document.querySelector<HTMLElement>('#reading-progress');
  const visual=document.querySelector<HTMLElement>('#hero-visual');
  const phone=document.querySelector<HTMLElement>('#device-wrap');
  let raf=0;
  function onScroll(){if(raf)return;raf=requestAnimationFrame(()=>{raf=0;const y=window.scrollY;const full=document.documentElement.scrollHeight-innerHeight; if(progress)progress.style.width=`${Math.max(0,Math.min(100,100*y/Math.max(full,1)))}%`;if(visual && phone && !media.matches && !html.classList.contains('still')){const t=Math.max(0,Math.min(1,y/(innerHeight||1)));phone.style.setProperty('--scroll-y',`${t*12}px`);phone.style.setProperty('--scroll-rotate',`${t*4}deg`);}})}
  addEventListener('scroll',onScroll,{passive:true});onScroll();
  const tilts=document.querySelectorAll<HTMLElement>('.operator-card.tilt, .portal.tilt');
  const fine=matchMedia('(hover: hover) and (pointer: fine)').matches;
  const unsubs: Array<()=>void>=[];
  if(fine&&!media.matches){
   tilts.forEach(card=>{let frame=0;const move=(e:PointerEvent)=>{if(html.classList.contains('still'))return;cancelAnimationFrame(frame);const r=card.getBoundingClientRect();const dx=(e.clientX-r.left)/r.width-.5,dy=(e.clientY-r.top)/r.height-.5;frame=requestAnimationFrame(()=>{card.style.transform=`perspective(1100px) rotateY(${dx*10}deg) rotateX(${-dy*9}deg) translateY(-8px)`;card.style.setProperty('--mx',`${(dx+.5)*100}%`);card.style.setProperty('--my',`${(dy+.5)*100}%`);});};const leave=()=>{cancelAnimationFrame(frame);card.style.transform='';};card.addEventListener('pointermove',move);card.addEventListener('pointerleave',leave);unsubs.push(()=>{card.removeEventListener('pointermove',move);card.removeEventListener('pointerleave',leave);cancelAnimationFrame(frame);});});
  }
  // Pointer-tracked atmospheric lighting; no global cursor replacement.
  const hero=document.querySelector<HTMLElement>('.hero');
  if(hero && fine){const move=(e:PointerEvent)=>{const r=hero.getBoundingClientRect();hero.style.setProperty('--pointer-x',`${e.clientX-r.left}px`);hero.style.setProperty('--pointer-y',`${e.clientY-r.top}px`);};hero.addEventListener('pointermove',move);unsubs.push(()=>hero.removeEventListener('pointermove',move));}
  return()=>{observer?.disconnect();removeEventListener('scroll',onScroll);cancelAnimationFrame(raf);unsubs.forEach(x=>x());};
 },[]);
 return null;
}

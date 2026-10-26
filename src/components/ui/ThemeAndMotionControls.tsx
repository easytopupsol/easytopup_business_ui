'use client';
import { useEffect,useState } from 'react';
import { Pause,Play } from 'lucide-react';
export default function ThemeAndMotionControls(){
 const [paused,setPaused]=useState(false);
 const [reduced,setReduced]=useState(false);
 useEffect(()=>{const rm=matchMedia('(prefers-reduced-motion: reduce)');setReduced(rm.matches);const fn=()=>setReduced(rm.matches);rm.addEventListener('change',fn);return()=>rm.removeEventListener('change',fn)},[]);
 function toggle(){const next=!paused;setPaused(next);document.documentElement.classList.toggle('still',next);window.dispatchEvent(new CustomEvent('easytopup:motion',{detail:{paused:next}}));if(next)document.querySelectorAll('.reveal').forEach(x=>x.classList.add('visible'));}
 if(reduced)return null;
 return <button className="motion-control v3-motion-control" onClick={toggle} type="button" aria-label={paused?'Resume animations':'Pause animations'} title={paused?'Resume animations':'Pause animations'}>{paused?<Play size={16}/>:<Pause size={16}/>}<span>{paused?'RESUME':'PAUSE'}</span></button>;
}

'use client';
import { useEffect,useState } from 'react';
import { Moon,Sun } from 'lucide-react';
type Theme='dark'|'light';
export default function ThemeToggle(){
 const [theme,setTheme]=useState<Theme>('dark');
 useEffect(()=>{setTheme(document.documentElement.dataset.theme==='light'?'light':'dark')},[]);
 function toggle(){
  const next=theme==='dark'?'light':'dark';
  setTheme(next);document.documentElement.dataset.theme=next;
  document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute('content',next==='light'?'#f7f9fd':'#060917');
  try{localStorage.setItem('easytopup-theme',next)}catch{}
 }
 return <button className="theme-toggle" onClick={toggle} type="button" aria-label={`Switch to ${theme==='dark'?'light':'dark'} theme`} title={`Switch to ${theme==='dark'?'light':'dark'} mode`}>
   {theme==='dark'?<Sun size={19}/>:<Moon size={19}/>}<span className="theme-label">{theme==='dark'?'LIGHT':'DARK'}</span>
  </button>;
}

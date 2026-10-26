'use client';
import {useEffect,useRef} from 'react';
import { startGlobe } from '@/lib/globe';
export default function GlobeCanvas({variant='hero'}:{variant?:'hero'|'mini'}){
 const ref=useRef<HTMLCanvasElement>(null);
 useEffect(()=>{if(!ref.current)return;return startGlobe(ref.current,variant)},[variant]);
 return <canvas id={variant==='hero'?'planet':'spotlight-planet'} className="globe-canvas" ref={ref} aria-hidden="true"/>;
}

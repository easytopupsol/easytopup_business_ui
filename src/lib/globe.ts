import landDots from '@/data/land-dots.json';

type Vec=[number,number,number];
type Point=[number,number];
const R=Math.PI/180;
const coords: Point[] = [[1.35,103.82],[20.59,78.96],[4.21,101.97],[-2.55,118],[12.87,122.37],[15.87,100.99],[14.05,108.28],[35.86,104.19],[36.2,138.3],[35.9,127.76],[-25.27,133.78],[55.38,-3.44],[37.09,-95.71]];
const mesh:Vec[]=(landDots as number[][]).map(([lat,lon])=>spherical(lat,lon));
function spherical(lat:number,lon:number):Vec{const a=lat*R,b=lon*R;return [Math.cos(a)*Math.sin(b),Math.sin(a),Math.cos(a)*Math.cos(b)];}
function interpolate(a:Vec,b:Vec,t:number):Vec{const dot=Math.max(-1,Math.min(1,a[0]*b[0]+a[1]*b[1]+a[2]*b[2]));const w=Math.acos(dot);if(w<.000001)return a;const d=Math.sin(w);const p=Math.sin((1-t)*w)/d,q=Math.sin(t*w)/d;return [a[0]*p+b[0]*q,a[1]*p+b[1]*q,a[2]*p+b[2]*q];}

/** Canvas-rendered spherical Earth with land point cloud and Singapore outbound arcs.
 * No WebGL dependency or external map API. Respects reduced motion and browser visibility.
 */
export function startGlobe(canvas:HTMLCanvasElement,variant:'hero'|'mini'){
 const ctx=canvas.getContext('2d',{alpha:true});if(!ctx)return ()=>{};
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 let size=640,rotation=-1.75,clock=0,last=0,frame=0,visible=true,paused=document.documentElement.classList.contains('still');
 const mobile=()=>window.innerWidth<660;
 const motion=()=>!reduce.matches&&!paused&&!document.hidden&&visible;
 function projection([x,y,z]:Vec,cx:number,cy:number,r:number):Vec{const cs=Math.cos(rotation),sn=Math.sin(rotation),tilt=.25,ct=Math.cos(tilt),st=Math.sin(tilt);const xx=x*cs+z*sn,zz=z*cs-x*sn;const yy=y*ct-zz*st,depth=y*st+zz*ct;return [cx+xx*r,cy-yy*r,depth];}
 function arc(points:Vec[],stroke:string,lineWidth:number){if(!ctx)return;ctx.strokeStyle=stroke;ctx.lineWidth=lineWidth;ctx.beginPath();let drawing=false;for(const p of points){if(p[2]<.015){drawing=false;continue;}if(!drawing){ctx.moveTo(p[0],p[1]);drawing=true}else ctx.lineTo(p[0],p[1]);}ctx.stroke();}
 function draw(){if(!ctx)return;const n=size,cx=n*.50,cy=n*.50,r=n*(variant==='mini'?.345:.342);ctx.clearRect(0,0,n,n);
   const haze=ctx.createRadialGradient(cx,cy,r*.4,cx,cy,r*1.42);haze.addColorStop(0,'rgba(60,204,221,.26)');haze.addColorStop(.65,'rgba(63,145,227,.11)');haze.addColorStop(1,'rgba(80,160,230,0)');ctx.fillStyle=haze;ctx.beginPath();ctx.arc(cx,cy,r*1.42,0,Math.PI*2);ctx.fill();
   ctx.save();ctx.translate(cx,cy);ctx.rotate(-.38);ctx.beginPath();ctx.ellipse(0,0,r*1.28,r*.47,0,0,Math.PI*2);ctx.strokeStyle='rgba(130,235,255,.26)';ctx.lineWidth=1.25;ctx.stroke();ctx.restore();
   const water=ctx.createRadialGradient(cx-r*.38,cy-r*.4,r*.06,cx,cy,r*1.1);water.addColorStop(0,'#21688a');water.addColorStop(.43,'#123b56');water.addColorStop(1,'#06162a');ctx.fillStyle=water;ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.fill();
   ctx.save();ctx.beginPath();ctx.arc(cx,cy,r-.5,0,Math.PI*2);ctx.clip();
   for(let lat=-75;lat<=75;lat+=15){const list:Vec[]=[];for(let lon=-180;lon<=180;lon+=5)list.push(projection(spherical(lat,lon),cx,cy,r));arc(list,'rgba(132,211,236,.12)',.8);}
   for(let lon=-180;lon<180;lon+=15){const list:Vec[]=[];for(let lat=-90;lat<=90;lat+=5)list.push(projection(spherical(lat,lon),cx,cy,r));arc(list,'rgba(132,211,236,.12)',.8);}
   ctx.fillStyle='#99f8d1';let stride=mobile()?3:variant==='mini'?2:1;
   for(let i=0;i<mesh.length;i+=stride){const p=projection(mesh[i],cx,cy,r);if(p[2]<=.02)continue;ctx.globalAlpha=.20+p[2]*.72;ctx.beginPath();ctx.arc(p[0],p[1],(mobile()?.64:.79)+(p[2]*.25),0,Math.PI*2);ctx.fill();}ctx.globalAlpha=1;
   const origin=spherical(...coords[0]);[1,2,5,8,10,11,12].forEach((index,j)=>{const endpoint=spherical(...coords[index]);const projected:Vec[]=[];for(let z=0;z<=45;z++)projected.push(projection(interpolate(origin,endpoint,z/45),cx,cy,r));arc(projected,j%2?'rgba(111,215,255,.25)':'rgba(216,255,129,.27)',1.1);const moving=projection(interpolate(origin,endpoint,(clock*.09+j*.19)%1),cx,cy,r);if(moving[2]>.02){ctx.fillStyle='#d9ff78';ctx.shadowColor='#d4ff67';ctx.shadowBlur=14;ctx.beginPath();ctx.arc(moving[0],moving[1],2.4,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;}});
   coords.forEach((p,i)=>{const dot=projection(spherical(...p),cx,cy,r);if(dot[2]<.13)return;ctx.fillStyle=i===0?'#e7ff8b':'#7dffe0';ctx.beginPath();ctx.arc(dot[0],dot[1],i===0?3.5:1.9,0,Math.PI*2);ctx.fill();});ctx.restore();
   ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.strokeStyle='rgba(138,249,223,.38)';ctx.lineWidth=3;ctx.stroke();
   ctx.strokeStyle='rgba(150,248,240,.10)';ctx.lineWidth=12;ctx.beginPath();ctx.arc(cx,cy,r+7,0,Math.PI*2);ctx.stroke();
   const dotX=cx+Math.cos(clock*.24)*r*1.22,dotY=cy+Math.sin(clock*.24)*r*.48;ctx.shadowBlur=12;ctx.shadowColor='#d4ff67';ctx.fillStyle='#e8ff9b';ctx.beginPath();ctx.arc(dotX,dotY,3,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
 }
 function resize(){
   const bounds=canvas.getBoundingClientRect();
   // Render at the actual displayed size; a responsive stage can resize without
   // a window resize (font load, grid breakpoint, device orientation).
   size=Math.max(160,Math.min(bounds.width||640,bounds.height||bounds.width||640,890));
   const dpr=Math.min(devicePixelRatio||1,1.7);
   const pixels=Math.round(size*dpr);
   if(canvas.width===pixels&&canvas.height===pixels)return;
   canvas.width=pixels;canvas.height=pixels;
   ctx!.setTransform(dpr,0,0,dpr,0,0);draw();
 }
 function tick(ts:number){frame=0;if(!motion())return;if(ts-last>=32){const dt=Math.min(.055,(ts-last)/1000||.032);clock+=dt;rotation+=dt*.15;draw();last=ts;}frame=requestAnimationFrame(tick);}
 function start(){if(frame||!motion())return;last=0;frame=requestAnimationFrame(tick)}
 function stop(){if(frame)cancelAnimationFrame(frame);frame=0;}
 const watch=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)start();else stop()},{rootMargin:'100px'});watch.observe(canvas);
 const onVisibility=()=>document.hidden?stop():start();
 const onMotion=(event:Event)=>{paused=(event as CustomEvent<{paused:boolean}>).detail.paused;if(paused)stop();else start()};
 let resizeTask:ReturnType<typeof setTimeout>;
 const onResize=()=>{clearTimeout(resizeTask);resizeTask=setTimeout(resize,90)};
 const observer=typeof ResizeObserver!=='undefined'?new ResizeObserver(onResize):null;
 observer?.observe(canvas);
 const onReduce=()=>{if(reduce.matches)stop();else start()};
 document.addEventListener('visibilitychange',onVisibility);window.addEventListener('easytopup:motion',onMotion);window.addEventListener('resize',onResize,{passive:true});reduce.addEventListener('change',onReduce);
 resize();start();
 return ()=>{stop();watch.disconnect();observer?.disconnect();clearTimeout(resizeTask);document.removeEventListener('visibilitychange',onVisibility);window.removeEventListener('easytopup:motion',onMotion);window.removeEventListener('resize',onResize);reduce.removeEventListener('change',onReduce);};
}

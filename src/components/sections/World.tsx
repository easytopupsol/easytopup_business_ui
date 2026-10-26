'use client';
import {useState} from 'react';
import Image from 'next/image';
import {countries} from '@/data/content';
import {enquiryLink} from '@/lib/links';
import GlobeCanvas from '@/components/ui/GlobeCanvas';

type Region='All'|'Asia'|'Global';
const filters: {label:string;value:Region}[] = [
 {value:'All',label:'All destinations'},
 {value:'Asia',label:'Asia Pacific'},
 {value:'Global',label:'Beyond Asia'},
];

/** Compact and completely self-hosted destination flag grid. No remote photo requests. */
export default function World(){
 const [region,setRegion]=useState<Region>('All');
 const visible=countries.filter(country=>region==='All'||country.region===region);
 return <section className="world section" id="world">
  <div className="world-beam"/>
  <div className="container">
   <div className="world-heading reveal">
    <div><span className="eyebrow">03 / THE WORLD AWAITS</span><h2 className="display">PASSPORT TO<br/><em>EVERYWHERE.</em></h2></div>
    <p>Wherever life takes your loved ones, a connection makes the distance smaller. Discover featured destinations across the world.</p>
   </div>
   <div className="world-spotlight reveal">
    <div className="spotlight-map" aria-label="Animated international connection globe">
     <div className="spotlight-grid"/>
     <div className="spotlight-globe-stage"><GlobeCanvas variant="mini"/></div>
     <span className="map-arc map-arc-one"/><span className="map-arc map-arc-two"/>
     <span className="map-label map-label-a">🇸🇬 SINGAPORE</span>
     <span className="map-label map-label-b">🇮🇳 INDIA</span>
     <span className="map-label map-label-c">🇯🇵 JAPAN</span>
    </div>
    <div className="spotlight-copy">
     <span className="tiny-key">A LITTLE CLOSER / EVERY DAY</span>
     <strong>12<span>+</span></strong>
     <span>FEATURED COUNTRY DESTINATIONS</span>
     <p>Choose a country below to enquire about recharge service availability.</p>
    </div>
   </div>
   <div className="filter-bar reveal">
    <span>DISCOVER BY REGION</span>
    <div className="filters" role="group" aria-label="Filter countries by region">
     {filters.map(filter=><button
       type="button" key={filter.value}
       className={`filter ${region===filter.value?'active':''}`}
       aria-pressed={region===filter.value}
       onClick={()=>setRegion(filter.value)}
      >{filter.label}{filter.value==='All'&&<span>{countries.length}</span>}</button>)}
    </div>
   </div>
   <div className="country-grid" aria-live="polite" aria-label="Featured destination countries" key={region}>
    {visible.map((country,i)=><a
      className="country-tile" key={country.name}
      href={enquiryLink(country.name)} target="_blank" rel="noopener noreferrer"
      aria-label={`Enquire about mobile recharge to ${country.name}`}
      style={{animationDelay:`${Math.min(i,9)*36}ms`}}
     >
      <span className="country-tile-flag">
       <Image src={country.flagImage} width={160} height={120} alt={`${country.name} flag`} loading="lazy" unoptimized/>
      </span>
      <span className="country-tile-name">{country.name}</span>
      <span className="country-tile-arrow" aria-hidden="true">↗</span>
     </a>)}
   </div>
   <p className="world-disclaimer">Featured destinations are for enquiries. Operator, product and recharge availability should be confirmed with EasyTopup.</p>
  </div>
 </section>;
}

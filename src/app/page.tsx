import Header from '@/components/layout/Header';
import Footer from '@/components/sections/Footer';
import Hero from '@/components/sections/Hero';
import Ticker from '@/components/sections/Ticker';
import Operators from '@/components/sections/Operators';
import SignalBreak from '@/components/sections/SignalBreak';
import Journey from '@/components/sections/Journey';
import World from '@/components/sections/World';
import Portals from '@/components/sections/Portals';
import Contact from '@/components/sections/Contact';
import ChatFloat from '@/components/sections/ChatFloat';
import ExperienceController from '@/components/ui/ExperienceController';
import ThemeAndMotionControls from '@/components/ui/ThemeAndMotionControls';

export default function HomePage() {
  return <>
    <div className="grain" aria-hidden="true"/><div id="reading-progress" className="reading-progress"/>
    <a className="skip" href="#main">Skip to content</a>
    <ExperienceController />
    <Header />
    <main id="main"><Hero/><Ticker/><Operators/><SignalBreak/><Journey/><World/><Portals/><Contact/></main>
    <Footer/><ChatFloat/><ThemeAndMotionControls/>
  </>;
}

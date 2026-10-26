import type { Metadata, Viewport } from 'next';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/800.css';
import '@fontsource/poppins/900.css';
import '@/styles/legacy.css';
import '@/styles/theme.css';
import '@/styles/animations.css';
import '@/styles/refinement.css';
import '@/styles/responsive.css';
import '@/styles/country-flags.css';

export const metadata: Metadata = {
  title: 'EasyTopup — Beyond borders. Beyond ordinary.',
  description: 'Explore Singapore prepaid operators and featured international mobile recharge destinations with EasyTopup.',
  applicationName: 'EasyTopup',
  // Icons are sourced from the original EasyTopup company logo.
  appleWebApp: { capable: true, title: 'EasyTopup', statusBarStyle: 'default' },
  openGraph: { title: 'EasyTopup — Beyond borders', description: 'Stay connected across Singapore and beyond.', type: 'website' },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#060917' };

// Inline theme bootstrap runs before hydration to prevent light/dark flash.
const themeBootstrap = `try{var t=localStorage.getItem('easytopup-theme');document.documentElement.dataset.theme=t==='light'||t==='dark'?t:(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark')}catch(e){document.documentElement.dataset.theme='dark'}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeBootstrap }}/></head><body>{children}</body></html>;
}

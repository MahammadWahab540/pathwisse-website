import type { Metadata } from 'next';
import './globals.css';
import { Tracking } from './tracking';
import { SITE_URL } from '@/lib/site-config';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Pathwisse | Institutional Employability & Placement Platform', template: '%s | Pathwisse' },
  description: 'Pathwisse is the institutional employability platform for colleges — structured roadmaps, verified skill proof and placement readiness reporting in one system.',
  icons: { icon: '/favicon.svg', apple: '/apple-touch-icon.svg' },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a>{children}<Tracking /></body></html>;
}

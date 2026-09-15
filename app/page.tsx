import { absoluteUrl, APP_AUTH_URL, CAREER_VOICE_URL, SITE_URL } from '@/lib/site-config';
import { HomePage } from './site';

export const metadata = {
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'Pathwisse | Institutional Employability & Placement Platform',
    description: 'Structured roadmaps, verified skill proof and placement readiness reporting for colleges, students and educators.',
    url: SITE_URL,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pathwisse | Institutional Employability & Placement Platform',
    description: 'Structured roadmaps, verified skill proof and placement readiness reporting for colleges, students and educators.',
  },
};

export default function Page() {
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Pathwisse',
      legalName: 'Shaquantum Labs Private Limited',
      url: SITE_URL,
      email: 'partnership@pathwisse.com',
      logo: absoluteUrl('/favicon.svg'),
      sameAs: [APP_AUTH_URL, CAREER_VOICE_URL],
    },
    { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Pathwisse', url: SITE_URL },
  ];
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} /><HomePage /></>;
}

import type { Metadata } from 'next';
import { Header, Footer } from '@/app/site';
import { absoluteUrl, SITE_URL } from '@/lib/site-config';
import { CareersExplorerClient } from '@/components/careers/CareersExplorerClient';

export const metadata: Metadata = {
  title: 'Explore Career Roles & Roadmaps | Pathwisse',
  description: 'Explore careers through the work they involve, the skills they require, and the proof that gets you noticed. Original collectible Pathwisse Role Cards.',
  alternates: {
    canonical: absoluteUrl('/careers'),
  },
  openGraph: {
    title: 'Explore Career Roles & Roadmaps | Pathwisse',
    description: 'Find a direction. Understand the work. Build the capability. Prove you can do it with Pathwisse collectible career role blueprints.',
    url: absoluteUrl('/careers'),
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Explore Career Roles & Roadmaps | Pathwisse',
    description: 'Find a direction. Understand the work. Build the capability. Prove you can do it.',
  },
};

export default function CareersPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Pathwisse Career Role Explorer',
    description: 'Discover early-career and specialist engineering roles with concrete skill paths and verifiable project evidence.',
    url: absoluteUrl('/careers'),
    publisher: {
      '@type': 'Organization',
      name: 'Pathwisse',
      url: SITE_URL,
      logo: absoluteUrl('/favicon.svg'),
    },
  };

  return (
    <>
      <Header />
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CareersExplorerClient />
      </main>
      <Footer />
    </>
  );
}

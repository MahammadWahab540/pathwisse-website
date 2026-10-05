import type { Metadata } from 'next';
import { Header, Footer } from '@/app/site';
import { absoluteUrl, SITE_URL } from '@/lib/site-config';
import { HirePageClient } from './HirePageClient';

export const metadata: Metadata = {
  title: 'Hire Early-Career Engineering Talent | Pathwisse',
  description: 'Tell us which early-career engineering role you’re hiring for. Browse 206 roles across 13 engineering streams and evaluate candidates through verified project evidence.',
  alternates: {
    canonical: absoluteUrl('/hire'),
  },
  openGraph: {
    title: 'Hire Early-Career Engineering Talent | Pathwisse',
    description: 'Share your hiring requirements for entry-level engineering roles and paid internships. Evaluate candidates through demonstrated project proof and rubrics.',
    url: absoluteUrl('/hire'),
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hire Early-Career Engineering Talent | Pathwisse',
    description: 'Browse 206 engineering roles across 13 disciplines and share hiring requirements for evaluated early-career talent.',
  },
};

export default function HirePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Hire Talent — Pathwisse Early-Career Engineering Directory',
    description: 'Submit hiring requirements for early-career engineering roles across 13 disciplines with verified project capability evidence.',
    url: absoluteUrl('/hire'),
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
        <HirePageClient />
      </main>
      <Footer />
    </>
  );
}

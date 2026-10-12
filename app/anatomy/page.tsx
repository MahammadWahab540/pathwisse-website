import type { Metadata } from 'next';
import { Header, Footer } from '@/app/site';
import { absoluteUrl } from '@/lib/site-config';
import { AnatomyTrilogy } from '@/components/anatomy/AnatomyFigures';

export const metadata: Metadata = {
  title: 'Physical Anatomy of Pathwisse | Isometric Instrument Showcase',
  description:
    'Explore the three crafted physical mechanisms of Pathwisse: the Candidate Sieve, Institutional Diagnostic Centrifuge, and Connected 4-Stage Pathway Rig.',
  alternates: {
    canonical: absoluteUrl('/anatomy'),
  },
};

export default function AnatomyPage() {
  return (
    <div className="min-h-screen bg-[#fafbfd] text-slate-900 flex flex-col justify-between">
      <Header />
      <main id="main" className="pt-28 pb-20 flex-grow">
        <AnatomyTrilogy />
      </main>
      <Footer />
    </div>
  );
}

import { absoluteUrl, APP_AUTH_URL, CAREER_VOICE_URL, SITE_URL } from '@/lib/site-config';
import { HOMEPAGE_FAQS } from '@/components/home/faq-data';
import { HomePage } from './site';

export const metadata = {
  title: 'Pathwisse — ONE PLATFORM. ONE ECOSYSTEM. CONNECTING STUDENTS, COLLEGES & COMPANIES.',
  description:
    'Where ambitious students turn real coursework into verified capability, colleges gain continuous pre-season placement readiness visibility, and leading companies discover talent through inspectable technical proof.',
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'Pathwisse — ONE PLATFORM. ONE ECOSYSTEM. CONNECTING STUDENTS, COLLEGES & COMPANIES.',
    description:
      'Where ambitious students turn real coursework into verified capability, colleges gain continuous pre-season placement readiness visibility, and leading companies discover talent through inspectable technical proof.',
    url: SITE_URL,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pathwisse — ONE PLATFORM. ONE ECOSYSTEM. CONNECTING STUDENTS, COLLEGES & COMPANIES.',
    description:
      'Where ambitious students turn real coursework into verified capability, colleges gain continuous pre-season placement readiness visibility, and leading companies discover talent through inspectable technical proof.',
  },
};

export default function Page() {
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Pathwisse',
      url: SITE_URL,
      logo: absoluteUrl('/favicon.svg'),
      description:
        'Pathwisse is a capability intelligence platform that turns learning and applied work into verifiable proof for students, colleges, and enterprises.',
      knowsAbout: [
        'Career Roadmaps',
        'Placement Readiness',
        'Student Employability',
        'Evidence-Based Hiring',
        'Talent Intelligence',
        'Applied Skill Proof',
      ],
      sameAs: [APP_AUTH_URL, CAREER_VOICE_URL],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Pathwisse',
      url: SITE_URL,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/resources/blog?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Pathwisse Platform',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Web',
      url: `${SITE_URL}/product`,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      description:
        'An AI-supported career roadmap and readiness intelligence system connecting students, colleges, and hiring enterprises.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: HOMEPAGE_FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
      />
      <HomePage />
    </>
  );
}

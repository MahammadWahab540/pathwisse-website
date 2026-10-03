import { absoluteUrl, APP_AUTH_URL, CAREER_VOICE_URL, SITE_URL } from '@/lib/site-config';
import { HomePage } from './site';

export const metadata = {
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'Pathwisse — Turn capability into proof',
    description: 'Know what to do next. Hire with evidence. Upskill with direction.',
    url: SITE_URL,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pathwisse — Turn capability into proof',
    description: 'Know what to do next. Hire with evidence. Upskill with direction.',
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
      description: 'Pathwisse is a capability intelligence platform that turns learning and applied work into verifiable proof for students, colleges, and enterprises.',
      knowsAbout: [
        'Career Roadmaps',
        'Placement Readiness',
        'Student Employability',
        'Enterprise Upskilling',
        'Talent Intelligence',
        'Applied Skill Proof'
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
      description: 'An AI-supported career roadmap and readiness intelligence system connecting students, colleges, and hiring enterprises.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is Pathwisse?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Pathwisse is a connected capability platform that turns learning, daily practice, and applied project work into verifiable proof. It provides career roadmaps for students, cohort readiness analytics for colleges, and evidence-grounded hiring and upskilling for enterprises.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does Pathwisse measure career and placement readiness?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Pathwisse evaluates readiness through demonstrable proof rather than mere certificates or CGPA. It monitors consistent skill practice, problem-solving execution, applied project portfolio artifacts, and role-specific diagnostic assessments before placement drives start.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is Career Voice by Pathwisse?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Career Voice is Pathwisse\'s interactive diagnostic guide that allows students to audit their interests, compare roles, diagnose capability gaps, and receive a concrete next action through conversational audio or text interactions.',
          },
        },
      ],
    },
  ];
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} /><HomePage /></>;
}

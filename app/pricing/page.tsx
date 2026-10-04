import type { Metadata } from 'next';
import Link from 'next/link';
import { Header, Footer } from '@/app/site';
import { absoluteUrl, APP_AUTH_URL, CAREER_VOICE_URL } from '@/lib/site-config';
import { Button } from '@/components/ui/button';
import { CTABand } from '@/components/shared/CTABand';
import { Check, ArrowRight, HelpCircle, Sparkles, Building2, GraduationCap, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing — Transparent Plans for Students, Colleges & Enterprise | Pathwisse',
  description: 'Self-serve student access is free of charge. Dedicated cohort intelligence for colleges and talent analytics for enterprise teams.',
  alternates: {
    canonical: absoluteUrl('/pricing'),
  },
};

export default function PricingPage() {
  const tiers = [
    {
      name: 'Free Student',
      badge: 'SELF-SERVE',
      price: '$0',
      period: 'forever free',
      description: 'Everything an individual learner needs to navigate career direction, follow role roadmaps, and build verified code proof.',
      cta: {
        label: 'Start Free',
        href: APP_AUTH_URL,
        variant: 'default' as const,
      },
      features: [
        'Career Voice diagnostic access',
        'Structured roadmaps (Data, Eng, PM)',
        'Core project blueprints & specifications',
        'Daily practice problems & streak tracking',
        'Public Skill Passport profile',
      ],
      popular: false,
    },
    {
      name: 'Campus / College',
      badge: 'INSTITUTIONAL',
      price: 'Custom',
      period: 'per student cohort',
      description: 'Continuous placement readiness intelligence, diagnostic audits, and recruiter portfolios for college engineering cohorts.',
      cta: {
        label: 'Book Campus Demo',
        href: '/colleges/request-demo',
        variant: 'accent' as const,
      },
      features: [
        'Cohort-wide baseline readiness audit',
        'Skill gap analytics across departments',
        'Placement faculty dashboard & tracking',
        'Curated technical project sprint library',
        'Recruiter-ready verified candidate portfolios',
        'Dedicated academic success partner',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      badge: 'ORGANIZATION',
      price: 'Custom',
      period: 'annual agreement',
      description: 'Workforce skill mapping, AI-readiness diagnostics, and pre-evaluated early-career hiring intelligence.',
      cta: {
        label: 'Book Hiring Demo',
        href: '/enterprise/request-demo',
        variant: 'default' as const,
      },
      features: [
        'Early-career talent search with verified proof',
        'Inspection of code architectures & PRs',
        'Internal employee upskilling tracks',
        'Custom role competency benchmarking',
        'Single sign-on (SSO) & HRIS integration',
        'Enterprise SLA & dedicated talent advisor',
      ],
      popular: false,
    },
  ];

  const comparisonRows = [
    { feature: 'Career Voice Diagnostics', free: true, college: true, enterprise: true },
    { feature: 'Role Roadmaps & Project Blueprints', free: true, college: true, enterprise: true },
    { feature: 'Public Skill Passport Profile', free: true, college: true, enterprise: true },
    { feature: 'Cohort Progress & Skill Gap Dashboard', free: false, college: true, enterprise: true },
    { feature: 'Faculty / Admin Reporting Workflows', free: false, college: true, enterprise: false },
    { feature: 'Candidate Dossier Code Inspection', free: false, college: false, enterprise: true },
    { feature: 'Custom Role Benchmark Rubrics', free: false, college: false, enterprise: true },
    { feature: 'Priority Support & Dedicated Advisor', free: false, college: true, enterprise: true },
  ];

  const faqs = [
    {
      q: 'Is Pathwisse really free for individual learners?',
      a: 'Yes. Individual student accounts have free access to Career Voice diagnostics, learning roadmaps, daily practice, and project blueprints. We believe career direction and skill development should be accessible to every aspiring engineer.'
    },
    {
      q: 'How does college pricing work?',
      a: 'College pricing is based on the size of the student cohort, the departments enrolled, and custom integration requirements with campus ERP or LMS systems. We offer semester-based and annual institutional licenses.'
    },
    {
      q: 'What is included in the Enterprise Talent Intelligence license?',
      a: 'Enterprise licenses give hiring teams direct access to inspect candidate dossiers—including real technical decision memos, GitHub repositories, and automated test suite metrics—saving hundreds of engineering interview hours.'
    },
    {
      q: 'Are there any hidden commitments or setup fees?',
      a: 'No hidden fees. We provide clear, itemized institutional agreements with transparent support scopes and onboarding timelines.'
    }
  ];

  return (
    <>
      <Header />
      <main id="main" className="min-h-screen bg-[#f8fafc]">
        {/* Hero Section */}
        <section className="bg-white border-b border-[#e2e8f0] pt-16 pb-12 md:pt-20 md:pb-16 text-center">
          <div className="max-w-4xl mx-auto px-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#edf2f8] text-[#173c6e] text-xs font-semibold mb-4 border border-[#d5e0ee]">
              <span>Transparent & Evidence-Led</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-['Outfit'] text-[#0f172a] tracking-tight leading-[1.08] mb-4">
              Simple plans for learners, colleges & teams.
            </h1>
            <p className="text-base sm:text-lg text-[#475569] max-w-2xl mx-auto leading-relaxed">
              Start free as an individual learner. Partner with Pathwisse as an academic institution or engineering employer to unlock cohort intelligence.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-8 bg-white transition-all flex flex-col justify-between ${
                  tier.popular
                    ? 'border-2 border-[#2458ae] shadow-xl relative'
                    : 'border border-[#e2e8f0] shadow-xs'
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#2458ae] text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
                    MOST POPULAR
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#64748b]">
                      {tier.badge}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold font-['Outfit'] text-[#0f172a] mb-2">
                    {tier.name}
                  </h2>

                  <div className="mb-4">
                    <span className="text-4xl font-extrabold text-[#0f172a] font-['Outfit']">
                      {tier.price}
                    </span>
                    <span className="text-xs text-[#64748b] ml-1.5 font-medium">
                      / {tier.period}
                    </span>
                  </div>

                  <p className="text-xs text-[#475569] leading-relaxed mb-6">
                    {tier.description}
                  </p>

                  <div className="pt-6 border-t border-[#f1f5f9] mb-8 space-y-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#0f172a] block">
                      What is included:
                    </span>
                    <ul className="space-y-2.5 text-xs text-[#475569]">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Button
                  asChild
                  size="lg"
                  variant={tier.cta.variant}
                  className="w-full font-bold shadow-xs"
                >
                  <a href={tier.cta.href}>
                    {tier.cta.label} <ArrowRight size={16} />
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Feature Table */}
        <section className="max-w-5xl mx-auto px-6 pb-20">
          <div className="rounded-2xl border border-[#e2e8f0] bg-white overflow-hidden shadow-xs">
            <div className="p-6 border-b border-[#e2e8f0] bg-[#f8fafc]">
              <h3 className="text-lg font-bold font-['Outfit'] text-[#0f172a]">
                Compare Feature Inclusions
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#e2e8f0] bg-[#fbfcfd] text-[#64748b]">
                    <th className="py-3.5 px-6 font-semibold w-1/2">Capability</th>
                    <th className="py-3.5 px-4 font-semibold text-center w-1/6">Free Student</th>
                    <th className="py-3.5 px-4 font-semibold text-center w-1/6 text-[#2458ae]">College</th>
                    <th className="py-3.5 px-4 font-semibold text-center w-1/6 text-[#173c6e]">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0]">
                  {comparisonRows.map((r) => (
                    <tr key={r.feature} className="hover:bg-[#f8fafc]">
                      <td className="py-3.5 px-6 font-medium text-[#0f172a]">{r.feature}</td>
                      <td className="py-3.5 px-4 text-center">
                        {r.free ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <span className="text-slate-300">—</span>}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {r.college ? <Check className="w-4 h-4 text-[#2458ae] mx-auto" /> : <span className="text-slate-300">—</span>}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {r.enterprise ? <Check className="w-4 h-4 text-[#173c6e] mx-auto" /> : <span className="text-slate-300">—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="max-w-4xl mx-auto px-6 pb-20">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-[#0f172a]">
              Frequently Asked Questions
            </h3>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-xl border border-[#e2e8f0] bg-white p-5 transition-all open:shadow-xs"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none font-semibold text-sm text-[#0f172a]">
                  <span>{faq.q}</span>
                  <span className="text-slate-400 group-open:rotate-45 transition-transform text-lg">+</span>
                </summary>
                <p className="pt-3 text-xs sm:text-sm text-[#475569] leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Shared Bottom CTA Band */}
        <CTABand
          title="Start building proof people can act on."
          description="Whether you are an individual learner discovering your fit or an institution preparing a cohort, Pathwisse provides the evidence."
          primaryAction={{
            label: "Start Free Student Audit",
            href: APP_AUTH_URL,
          }}
          secondaryAction={{
            label: "Schedule Institutional Demo",
            href: "/colleges/request-demo",
          }}
        />
      </main>
      <Footer />
    </>
  );
}

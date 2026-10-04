import type { Metadata } from 'next';
import { Header, Footer } from '@/app/site';
import { absoluteUrl, LEGAL_ENTITY } from '@/lib/site-config';
import { Button } from '@/components/ui/button';
import { CTABand } from '@/components/shared/CTABand';
import { ShieldCheck, Compass, Target, Building2, MapPin, Users, HeartHandshake } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Pathwisse — Grounding Early-Career Capability in Real Evidence',
  description: 'Pathwisse is built by Shaquantum Labs Pvt. Ltd. We believe talent is distributed equally, but verified proof has been locked behind pedigree.',
  alternates: {
    canonical: absoluteUrl('/company/about'),
  },
};

export default function AboutPage() {
  const values = [
    {
      title: 'Evidence over Pedigree',
      desc: 'Résumés list claims and college degrees signal privilege. We believe engineering capability should be proven through inspected code architectures, PR decisions, and working software.',
      icon: ShieldCheck,
    },
    {
      title: 'Clarity over Volume',
      desc: 'Learners do not need 500 hours of video lectures. They need diagnostic clarity: where am I now, what is my biggest gap, and what is the single next task I should complete today.',
      icon: Compass,
    },
    {
      title: 'Defensible Hiring Proof',
      desc: 'Recruiters shouldn’t have to sift through keyword-stuffed PDFs. We generate candidate dossiers with real technical memos and test passes that engineering leads can audit in 60 seconds.',
      icon: Target,
    },
  ];

  return (
    <>
      <Header />
      <main id="main" className="min-h-screen bg-[#f8fafc]">
        {/* Header Hero */}
        <section className="bg-white border-b border-[#e2e8f0] pt-16 pb-12 md:pt-20 md:pb-16 text-center">
          <div className="max-w-4xl mx-auto px-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#edf2f8] text-[#173c6e] text-xs font-semibold mb-4 border border-[#d5e0ee]">
              <Building2 className="w-3.5 h-3.5" />
              <span>Our Story & Mission</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-['Outfit'] text-[#0f172a] tracking-tight leading-[1.08] mb-6">
              Making capability visible, measurable, and defensible.
            </h1>
            <p className="text-base sm:text-lg text-[#475569] max-w-2xl mx-auto leading-relaxed">
              We started Pathwisse to solve the deepest structural mismatch in tech education: millions of learners learning in isolation, and thousands of engineering teams drowning in unverified résumés.
            </p>
          </div>
        </section>

        {/* Narrative Section: The Origin */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="space-y-6 text-[#334155] text-base sm:text-lg leading-relaxed">
            <h2 className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-[#0f172a] tracking-tight">
              Why We Built Pathwisse
            </h2>
            <p>
              In traditional tech recruitment, the only proxies for capability have been college prestige, keyword matching, and rote LeetCode memorization. As a result, talented students from non-tier-1 campuses are filtered out before an engineer ever looks at their work, while hiring managers waste hundreds of hours screening candidates who cannot ship production code.
            </p>
            <p>
              We built <strong>Pathwisse</strong> to create an evidence layer that connects the entire journey: from a student’s first career audit to verified pull requests and defensible offer letters.
            </p>
          </div>
        </section>

        {/* Core Principles */}
        <section className="bg-white border-y border-[#e2e8f0] py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2458ae]">OUR CORE VALUES</span>
              <h3 className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-[#0f172a] mt-2">
                Principles that Guide Our Work
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((v) => {
                const Icon = v.icon;
                return (
                  <div key={v.title} className="p-7 rounded-2xl border border-[#e2e8f0] bg-[#f8fafc]">
                    <div className="w-10 h-10 rounded-xl bg-[#173c6e] text-white flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-lg font-bold font-['Outfit'] text-[#0f172a] mb-2">{v.title}</h4>
                    <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">{v.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Corporate Entity Details */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="rounded-2xl border border-[#e2e8f0] bg-white p-8 shadow-xs">
            <h3 className="text-xl font-bold font-['Outfit'] text-[#0f172a] mb-4">
              Registered Corporate Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm text-[#475569]">
              <div>
                <strong className="text-[#0f172a] block mb-1">Operating Entity:</strong>
                <p>{LEGAL_ENTITY}</p>
              </div>
              <div>
                <strong className="text-[#0f172a] block mb-1">Headquarters & Operations:</strong>
                <p className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#2458ae]" /> Bengaluru & Hyderabad, India
                </p>
              </div>
              <div>
                <strong className="text-[#0f172a] block mb-1">Corporate Registration:</strong>
                <p>Private Limited Company incorporated under the Companies Act, 2013.</p>
              </div>
              <div>
                <strong className="text-[#0f172a] block mb-1">Data & Privacy Standards:</strong>
                <p>TLS 1.3 encryption, DPDP 2023 consent aligned, zero third-party data broker sharing.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Shared Closing CTA */}
        <CTABand
          title="Join us in building the capability layer."
          description="Whether you are an aspiring engineer or an academic partner, let’s make capability measurable and real."
          primaryAction={{
            label: "Explore Open Career Audits",
            href: "/career-audit/start",
          }}
          secondaryAction={{
            label: "Partner With Us",
            href: "/contact",
          }}
        />
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from 'next';
import { Header, Footer } from '@/app/site';
import { absoluteUrl, SITE_URL } from '@/lib/site-config';
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  Code,
  FileCode2,
  FolderGit2,
  Layers,
  Search,
  ShieldCheck,
  Target,
  Terminal,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CTABand } from '@/components/shared/CTABand';
import { HairlineFigure } from '@/components/ui/hairline-figure';

export const metadata: Metadata = {
  title: 'For Enterprises: Hire With Evidence & Talent Intelligence | Pathwisse',
  description: 'Discover early-career talent through demonstrated capability, not résumé keywords. Inspect authentic code architectures, technical decision memos, and verified role readiness.',
  alternates: {
    canonical: absoluteUrl('/enterprise'),
  },
  openGraph: {
    title: 'For Enterprises: Hire With Evidence & Talent Intelligence | Pathwisse',
    description: 'Evaluate candidates by inspecting actual engineering artifacts, problem-solving consistency, and verified capability proof.',
    url: absoluteUrl('/enterprise'),
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'For Enterprises: Hire With Evidence | Pathwisse',
    description: 'Transform early-career hiring with verified candidate capability proof and inspectable project dossiers.',
  },
};

export default function EnterprisePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'For Enterprises — Hire With Evidence & Talent Intelligence',
    description: 'Pathwisse enables engineering organizations and talent acquisition teams to discover, evaluate, and shortlist candidates through verified technical project evidence.',
    url: absoluteUrl('/enterprise'),
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
      <main id="main" className="min-h-screen bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />

        {/* 1. Enterprise Hero */}
        <section className="relative overflow-hidden bg-[#f8fafc] border-b border-[#e2e8f0] pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#e2e8f0] shadow-2xs mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#173c6e]" />
                  <span className="text-xs font-semibold text-[#173c6e] tracking-wide uppercase">
                    Early-Career Talent Intelligence
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-['Outfit'] text-[#0f172a] tracking-tight leading-[1.08] mb-6">
                  Hire with evidence. <br className="hidden sm:inline" />
                  <span className="text-[#2458ae]">Look behind the résumé.</span>
                </h1>
                <p className="text-base sm:text-lg text-[#334155] leading-relaxed max-w-2xl mb-8">
                  Résumés are uncalibrated claims; coding quizzes test memorization. Pathwisse lets hiring teams evaluate early-career engineers through authentic code architectures, real technical decision memos, and verifiable readiness signals.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Button asChild size="lg" variant="default">
                    <a href="/enterprise/request-demo">
                      Request Enterprise Demo <ArrowRight size={16} />
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-[#cbd5e1] text-[#173c6e] hover:bg-[#f1f5f9]">
                    <a href="#evidence-model">
                      See The Evidence Model <ArrowUpRight size={15} />
                    </a>
                  </Button>
                </div>
                <div className="mt-8 flex items-center gap-6 text-xs text-[#64748b]">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="text-[#1e824c]" /> Inspected project artifacts
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="text-[#1e824c]" /> Defensible capability signals
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="text-[#1e824c]" /> Zero résumé spam
                  </span>
                </div>
              </div>

              {/* Hero Candidate Dossier Mockup */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-xl">
                  <div className="flex items-center justify-between pb-4 border-b border-[#f1f5f9] mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#173c6e] text-white flex items-center justify-center font-bold text-sm">
                        AK
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#0f172a]">Ananya K.</h4>
                        <span className="text-[11px] text-[#64748b]">Target: Associate Full Stack Engineer</span>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#eaf5ee] text-[#1e824c] text-xs font-semibold">
                      94% Role Match
                    </span>
                  </div>

                  <div className="space-y-4 mb-5">
                    <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-[#0f172a] flex items-center gap-1.5">
                          <FolderGit2 size={15} className="text-[#2458ae]" /> Demonstrated Project Proof
                        </span>
                        <span className="text-[11px] text-[#2458ae] font-semibold">3 Verified Artifacts</span>
                      </div>
                      <p className="text-xs text-[#475569] leading-relaxed">
                        Built high-concurrency event ingestion pipeline with PostgreSQL connection pooling and structured schema migrations.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
                      <span className="text-xs font-bold text-[#0f172a] block mb-2">
                        Evaluated Engineering Dimensions
                      </span>
                      <div className="space-y-2">
                        {[
                          { dim: 'API Architecture & Error Handling', score: '95/100', width: 'w-[95%]' },
                          { dim: 'Data Query Optimization (SQL)', score: '91/100', width: 'w-[91%]' },
                          { dim: 'Code Maintainability & Test Coverage', score: '88/100', width: 'w-[88%]' },
                        ].map((m) => (
                          <div key={m.dim}>
                            <div className="flex justify-between text-[11px] text-[#334155] mb-1">
                              <span>{m.dim}</span>
                              <span className="font-bold text-[#0f172a]">{m.score}</span>
                            </div>
                            <div className="w-full bg-[#e2e8f0] h-1.5 rounded-full overflow-hidden">
                              <div className={`h-full bg-[#173c6e] rounded-full ${m.width}`} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#f1f5f9] flex items-center justify-between text-xs">
                    <span className="text-[#64748b]">Ready for Technical Screen</span>
                    <a
                      href="/enterprise/request-demo"
                      className="px-3 py-1.5 rounded-md bg-[#173c6e] text-white font-semibold text-xs hover:bg-[#122f56] transition-all"
                    >
                      Shortlist Candidate ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Core Value Pillars */}
        <section id="evidence-model" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="max-w-2xl mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2458ae]">
                THE CAPABILITY ADVANTAGE
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-['Outfit'] text-[#0f172a] tracking-tight mt-2">
                Why Engineering Teams Trust Pathwisse Signals
              </h2>
              <p className="text-[#334155] text-base mt-4 leading-relaxed">
                We remove the guesswork from junior hiring. By looking directly at authentic technical artifacts, recruiters and engineering leads save hundreds of wasted interview hours.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: FileCode2,
                  figure: 'exploded' as const,
                  title: 'Inspectable Decision Memos',
                  desc: 'Every candidate portfolio includes technical design briefs, architectural trade-offs, and reasoning—not just raw copied tutorial repos.',
                },
                {
                  icon: Terminal,
                  figure: 'terminal' as const,
                  title: 'Production-Grounded Code',
                  desc: 'Projects are evaluated on modularity, error resilience, edge-case coverage, and clean documentation matching real engineering team standards.',
                },
                {
                  icon: ShieldCheck,
                  figure: 'vault' as const,
                  title: 'Authenticity Guarantee',
                  desc: 'We trace iterative progress, daily consistency, and multi-checkpoint submissions to verify that work was genuinely built by the student.',
                },
                {
                  icon: Target,
                  figure: 'keyboard' as const,
                  title: 'Custom Role Calibration',
                  desc: 'Map capability benchmarks directly to your company’s tech stack, junior leveling rubrics, and engineering culture requirements.',
                },
                {
                  icon: Zap,
                  figure: 'sieve' as const,
                  title: 'High-Conversion Shortlisting',
                  desc: 'Bypass generic job portal spam. Connect directly with pre-screened talent who meet your exact baseline readiness score.',
                },
                {
                  icon: Briefcase,
                  figure: 'branches' as const,
                  title: 'Accelerated Day-One Impact',
                  desc: 'Candidates familiar with real engineering workflows, code review hygiene, and delivery deadlines require 60% less onboarding ramp-up.',
                },
              ].map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.title} className="p-7 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] hover:bg-white hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-12 h-12 rounded-lg bg-white border border-[#e2e8f0] flex items-center justify-center text-[#173c6e] shadow-2xs">
                          <Icon size={24} />
                        </div>
                        <div className="w-16 h-12 text-[#173c6e]">
                          <HairlineFigure figure={card.figure} intensity={0.65} label={card.title} />
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-[#0f172a] mb-2">{card.title}</h3>
                      <p className="text-sm text-[#475569] leading-relaxed">{card.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. The 4-Step Hiring Workflow */}
        <section className="py-20 bg-[#f8fafc] border-y border-[#e2e8f0]">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2458ae]">
                EVIDENCE-LED HIRING WORKFLOW
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-['Outfit'] text-[#0f172a] tracking-tight mt-2">
                From Role Definition to Verified Offer
              </h2>
              <p className="text-[#334155] text-base mt-3">
                A streamlined technical recruitment process designed for engineering leaders and high-performing talent teams.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: '01', title: 'Role Benchmark', desc: 'Define required tech skills, core project archetypes, and minimum readiness thresholds.' },
                { step: '02', title: 'Evidence Search', desc: 'Filter candidates by demonstrated proof, code quality metrics, and algorithmic consistency.' },
                { step: '03', title: 'Artifact Review', desc: 'Inspect architectural memos, PR structures, and test suites in one structured candidate dossier.' },
                { step: '04', title: 'Direct Offer', desc: 'Conduct fast, high-confidence technical conversations and make definitive hiring offers.' },
              ].map((col) => (
                <div key={col.step} className="p-6 rounded-xl border border-[#e2e8f0] bg-white shadow-2xs relative">
                  <span className="text-3xl font-extrabold text-[#173c6e]/20 block mb-3 font-['Outfit']">{col.step}</span>
                  <h4 className="text-base font-bold text-[#0f172a] mb-2">{col.title}</h4>
                  <p className="text-xs text-[#475569] leading-relaxed">{col.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Enterprise CTA Banner */}
        <CTABand
          title="Stop filtering résumés. Start inspecting capability."
          description="Partner with Pathwisse to discover pre-evaluated engineering talent ready to ship code from week one."
          primaryAction={{
            label: "Schedule Talent Intelligence Demo",
            href: "/enterprise/request-demo",
          }}
          secondaryAction={{
            label: "Talk to Hiring Team",
            href: "/contact?interest=enterprise",
          }}
        />
      </main>
      <Footer />
    </>
  );
}

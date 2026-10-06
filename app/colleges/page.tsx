import type { Metadata } from 'next';
import { Header, Footer } from '@/app/site';
import { absoluteUrl, SITE_URL } from '@/lib/site-config';
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  GraduationCap,
  Layers,
  LineChart,
  ShieldCheck,
  Target,
  Users,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CTABand } from '@/components/shared/CTABand';
import { HairlineFigure } from '@/components/ui/hairline-figure';

export const metadata: Metadata = {
  title: 'For Colleges & Universities: Placement Readiness & Cohort Intelligence | Pathwisse',
  description: 'Turn placement uncertainty into continuous readiness intelligence. Track cohort skill gaps, verify authentic student projects, and connect job-ready talent with top recruiters.',
  alternates: {
    canonical: absoluteUrl('/colleges'),
  },
  openGraph: {
    title: 'For Colleges: Pre-Season Placement Readiness & Cohort Intelligence | Pathwisse',
    description: 'Empower placement teams and faculty with real-time cohort visibility, skill gap diagnostics, and verified student project evidence.',
    url: absoluteUrl('/colleges'),
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'For Colleges: Placement Readiness & Cohort Intelligence | Pathwisse',
    description: 'Transform campus placement outcomes with verifiable skill proof and proactive cohort intervention.',
  },
};

export default function CollegesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'For Colleges — Placement Readiness & Cohort Intelligence',
    description: 'Pathwisse empowers colleges and university placement cells with pre-season readiness tracking, skill gap diagnostics, and verified student capability proof.',
    url: absoluteUrl('/colleges'),
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

        {/* 1. College Hero */}
        <section className="relative overflow-hidden bg-[#f8fafc] border-b border-[#e2e8f0] pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#e2e8f0] shadow-2xs mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#2458ae]" />
                  <span className="text-xs font-semibold text-[#173c6e] tracking-wide uppercase">
                    Institutional Placement Intelligence
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-['Outfit'] text-[#0f172a] tracking-tight leading-[1.08] mb-6">
                  Know who is ready <br className="hidden sm:inline" />
                  <span className="text-[#2458ae]">before placement season begins.</span>
                </h1>
                <p className="text-base sm:text-lg text-[#334155] leading-relaxed max-w-2xl mb-8">
                  Move from late-stage placement panic to continuous, evidence-grounded visibility. Track cohort progress, diagnose specific skill gaps early, and shortlist verified student talent with defensible proof.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Button asChild size="lg" variant="default">
                    <a href="/colleges/request-demo">
                      Request Partnership Demo <ArrowRight size={16} />
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-[#cbd5e1] text-[#173c6e] hover:bg-[#f1f5f9]">
                    <a href="#cohort-intelligence">
                      Inspect Cohort Analytics <ArrowUpRight size={15} />
                    </a>
                  </Button>
                </div>
                <div className="mt-8 flex items-center gap-6 text-xs text-[#64748b]">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="text-[#1e824c]" /> Pre-season diagnostic audit
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="text-[#1e824c]" /> Role-specific readiness benchmarks
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="text-[#1e824c]" /> Zero fake resumes or inflated claims
                  </span>
                </div>
              </div>

              {/* Hero Visual Mockup */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-xl">
                  <div className="flex items-center justify-between pb-4 border-b border-[#f1f5f9] mb-5">
                    <div>
                      <span className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider">Placement Cockpit</span>
                      <h4 className="text-base font-bold text-[#0f172a]">B.Tech 2027 Cohort Overview</h4>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#eaf5ee] text-[#1e824c] text-xs font-semibold">
                      ● Active Term
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
                      <span className="text-xs text-[#64748b] block mb-1">Total Enrolled</span>
                      <strong className="text-2xl font-bold text-[#0f172a]">640</strong>
                      <span className="text-[11px] text-[#2458ae] font-medium block mt-1">Computer Science & IT</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
                      <span className="text-xs text-[#64748b] block mb-1">Placement Ready</span>
                      <strong className="text-2xl font-bold text-[#1e824c]">78.4%</strong>
                      <span className="text-[11px] text-[#1e824c] font-medium block mt-1">+14.2% lift after sprints</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <span className="text-xs font-semibold text-[#0f172a] block">Target Role Preparedness</span>
                    {[
                      { role: 'Full Stack Developer', ready: 84, total: '190 / 226 Students', color: 'bg-[#2458ae]' },
                      { role: 'Data & Analytics', ready: 72, total: '144 / 200 Students', color: 'bg-[#173c6e]' },
                      { role: 'AI & Machine Learning', ready: 61, total: '130 / 214 Students', color: 'bg-[#3b82f6]' },
                    ].map((item) => (
                      <div key={item.role} className="p-3 rounded-lg border border-[#f1f5f9] bg-[#f8fafc]">
                        <div className="flex justify-between text-xs font-medium text-[#0f172a] mb-1.5">
                          <span>{item.role}</span>
                          <span className="font-bold">{item.ready}% Ready</span>
                        </div>
                        <div className="w-full bg-[#e2e8f0] h-2 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.ready}%` }} />
                        </div>
                        <span className="text-[11px] text-[#64748b] block mt-1">{item.total}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#f1f5f9] flex items-center justify-between text-xs text-[#64748b]">
                    <span>Verified Project Artifacts: <strong>1,840</strong></span>
                    <a href="/colleges/request-demo" className="text-[#2458ae] font-semibold hover:underline">
                      View Demo ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Core Capabilities Matrix */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="max-w-2xl mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2458ae]">
                WHAT PLACEMENT CELLS GET
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-['Outfit'] text-[#0f172a] tracking-tight mt-2">
                Four Pillars of Institutional Capability Intelligence
              </h2>
              <p className="text-[#334155] text-base mt-4 leading-relaxed">
                Pathwisse transforms fragmented academic scores into actionable capability signals that recruiters respect and placement directors can defend.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: BarChart3,
                  title: 'Pre-Season Readiness Audit',
                  desc: 'Comprehensive diagnostic assessing student problem-solving consistency, project depth, and role alignment before recruitment drives begin.',
                  figure: 'plot' as const,
                  label: 'Interactive 3D cohort readiness chart',
                },
                {
                  icon: Users,
                  title: 'Targeted Intervention Engine',
                  desc: 'Isolate cohort-wide bottlenecks (e.g., system design, SQL window functions, communication) and deploy focused 2-week sprint interventions.',
                  figure: 'loupe' as const,
                  label: 'Cohort bottleneck inspection loupe',
                },
                {
                  icon: ShieldCheck,
                  title: 'Verifiable Project Portfolios',
                  desc: 'Recruiters inspect authentic code architectures, technical decision memos, and test coverage rather than unverified résumé bullets.',
                  figure: 'branches' as const,
                  label: 'Verifiable student git commit tree',
                },
                {
                  icon: LineChart,
                  title: 'Recruiter Match Intelligence',
                  desc: 'Instantly filter students by specific company requirements, demonstrated skill signals, and verified project outcomes for high-conversion shortlists.',
                  figure: 'sieve' as const,
                  label: 'Candidate screening and qualification sieves',
                },
              ].map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.title} className="p-6 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] hover:bg-white hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-lg bg-white border border-[#e2e8f0] flex items-center justify-center text-[#2458ae] shadow-2xs">
                          <Icon size={20} />
                        </div>
                        <span className="text-[10px] font-mono text-[#64748b] bg-white px-2 py-0.5 rounded border border-[#e2e8f0]">
                          Live Signal
                        </span>
                      </div>
                      <div className="w-full max-w-[130px] mx-auto my-3">
                        <HairlineFigure figure={card.figure} interactiveHint intensity={0.65} label={card.label} />
                      </div>
                      <h3 className="text-base font-bold text-[#0f172a] mb-2">{card.title}</h3>
                      <p className="text-xs text-[#475569] leading-relaxed">{card.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. Deep Dive: Cohort Intelligence */}
        <section id="cohort-intelligence" className="py-20 bg-[#f8fafc] border-y border-[#e2e8f0]">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2458ae]">
                  COHORT INTELLIGENCE IN ACTION
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold font-['Outfit'] text-[#0f172a] tracking-tight mt-2 mb-6">
                  Spot skill gaps early enough to fix them.
                </h2>
                <p className="text-base text-[#334155] leading-relaxed mb-6">
                  Traditional placement efforts fail when skill deficits are discovered during final-year technical interviews. Pathwisse surfaces cohort-wide vulnerabilities months in advance.
                </p>
                <div className="space-y-4">
                  {[
                    { title: 'Branch & Section Benchmarks', text: 'Compare readiness movement across engineering departments to allocate coaching resources efficiently.' },
                    { title: 'Real-Time Consistency Signals', text: 'Distinguish between learners who practice daily and those who cram before assessments.' },
                    { title: 'Recruiter-Ready Shortlists', text: 'Export custom cohorts mapped precisely to company job descriptions with 1-click proof dossiers.' },
                  ].map((item, idx) => (
                    <div key={item.title} className="flex gap-4 items-start">
                      <div className="w-6 h-6 rounded-full bg-[#173c6e] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#0f172a]">{item.title}</h4>
                        <p className="text-xs text-[#64748b] leading-relaxed mt-0.5">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-lg">
                  <h4 className="text-sm font-bold text-[#0f172a] mb-4">Cohort Skill Deficit Diagnostic (CSE-2027)</h4>
                  <div className="space-y-3.5">
                    {[
                      { skill: 'Data Structures & Algorithmic Complexity', status: 'Proficient', pct: 86, tag: 'bg-[#eaf5ee] text-[#1e824c]' },
                      { skill: 'Database Query Optimization & Window Functions', status: 'Intervention Deployed', pct: 64, tag: 'bg-[#fef3c7] text-[#92400e]' },
                      { skill: 'System Architecture & API Error Handling', status: 'Moderate Gap', pct: 58, tag: 'bg-[#fef3c7] text-[#92400e]' },
                      { skill: 'Technical Communication & Design Memos', status: 'Priority Focus', pct: 49, tag: 'bg-[#fdf2f2] text-[#c53030]' },
                    ].map((row) => (
                      <div key={row.skill} className="p-3.5 rounded-xl border border-[#e2e8f0] bg-[#f8fafc]">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-[#0f172a]">{row.skill}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${row.tag}`}>
                            {row.status}
                          </span>
                        </div>
                        <div className="w-full bg-[#e2e8f0] h-2 rounded-full overflow-hidden">
                          <div className="h-full bg-[#173c6e] rounded-full" style={{ width: `${row.pct}%` }} />
                        </div>
                        <div className="flex justify-between items-center mt-1.5 text-[11px] text-[#64748b]">
                          <span>Benchmark Target: 75%</span>
                          <span className="font-bold text-[#0f172a]">{row.pct}% verified</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Implementation Timeline */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2458ae]">
                SEAMLESS ONBOARDING
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-['Outfit'] text-[#0f172a] tracking-tight mt-2">
                Four Steps From Pilot to Placement Drives
              </h2>
              <p className="text-[#334155] text-base mt-3">
                We integrate directly with your institutional schedule without burdening faculty or disrupting existing curriculum.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: '01', title: 'Cohort Onboarding', desc: 'Secure roster import and single sign-on integration for student and placement faculty teams.' },
                { step: '02', title: 'Baseline Diagnostic', desc: 'Students complete career audits and role diagnostics to map initial baseline readiness.' },
                { step: '03', title: 'Targeted Sprints', desc: 'Deploy automated project sprints to close specific algorithmic, design, and domain skill gaps.' },
                { step: '04', title: 'Recruiter Showcase', desc: 'Generate verified talent portfolios for hiring partners with defensible project proofs.' },
              ].map((col) => (
                <div key={col.step} className="p-6 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] relative">
                  <span className="text-3xl font-extrabold text-[#2458ae]/20 block mb-3 font-['Outfit']">{col.step}</span>
                  <h4 className="text-base font-bold text-[#0f172a] mb-2">{col.title}</h4>
                  <p className="text-xs text-[#475569] leading-relaxed">{col.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Institutional CTA Banner */}
        <CTABand
          title="Equip your institution with verified placement intelligence."
          description="Discuss your cohort size, placement timeline, and corporate recruiting goals with our academic partnerships team."
          primaryAction={{
            label: "Schedule Partnership Session",
            href: "/colleges/request-demo",
          }}
          secondaryAction={{
            label: "Contact Academic Team",
            href: "/contact?interest=college",
          }}
        />
      </main>
      <Footer />
    </>
  );
}

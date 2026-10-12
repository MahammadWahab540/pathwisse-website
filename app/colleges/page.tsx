import type { Metadata } from 'next';
import { Header, Footer } from '@/app/site';
import { absoluteUrl, SITE_URL } from '@/lib/site-config';
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  FileCode2,
  FolderGit2,
  GitBranch,
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

        {/* 1. College Hero (C01 & C02) */}
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

              {/* Hero Visual Mockup: Placement Cockpit (C02) */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-xl relative">
                  <div className="flex items-center justify-between pb-4 border-b border-[#f1f5f9] mb-5">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Placement Cockpit</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f1f5f9] text-[#475569] font-medium">
                          SAMPLE COHORT DATA · DEMO
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-[#0f172a]">B.Tech 2027 Cohort Overview</h4>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#eaf5ee] text-[#1e824c] text-xs font-semibold">
                      ● Active Term
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
                      <span className="text-xs text-[#64748b] block mb-1">Total Enrolled</span>
                      <strong className="text-2xl font-bold text-[#0f172a]">640 Students</strong>
                      <span className="text-[11px] text-[#2458ae] font-medium block mt-1">Computer Science & IT</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
                      <span className="text-xs text-[#64748b] block mb-1">Placement Ready</span>
                      <strong className="text-2xl font-bold text-[#1e824c]">78.4% ready</strong>
                      <span className="text-[11px] text-[#1e824c] font-medium block mt-1">+14.2% lift after sprints</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <span className="text-xs font-semibold text-[#0f172a] block">Target Role Preparedness</span>
                    {[
                      { role: 'Full Stack Developer', ready: 84, readyPct: '84% ready', total: '190 / 226 Students', color: 'bg-[#2458ae]' },
                      { role: 'Data & Analytics', ready: 72, readyPct: '72% ready', total: '144 / 200 Students', color: 'bg-[#173c6e]' },
                      { role: 'AI & Machine Learning', ready: 61, readyPct: '61% ready', total: '130 / 214 Students', color: 'bg-[#3b82f6]' },
                    ].map((item) => (
                      <div key={item.role} className="p-3 rounded-lg border border-[#f1f5f9] bg-[#f8fafc]">
                        <div className="flex justify-between text-xs font-medium text-[#0f172a] mb-1.5">
                          <span>{item.role}</span>
                          <span className="font-bold">{item.readyPct}</span>
                        </div>
                        <div className="w-full bg-[#e2e8f0] h-2 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.ready}%` }} />
                        </div>
                        <span className="text-[11px] text-[#64748b] block mt-1">{item.total}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#f1f5f9] flex items-center justify-between text-xs text-[#64748b]">
                    <span>Verified Project Artifacts: <strong>1,840+</strong></span>
                    <a href="/colleges/request-demo" className="text-[#2458ae] font-semibold hover:underline">
                      Request Cohort Audit ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. 4 Institutional Partnership Pillars with Hairline figures (C04) */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="max-w-2xl mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2458ae]">
                INSTITUTIONAL PARTNERSHIP PILLARS
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-['Outfit'] text-[#0f172a] tracking-tight mt-2">
                Four Pillars of Institutional Placement Intelligence
              </h2>
              <p className="text-[#334155] text-base mt-4 leading-relaxed">
                Pathwisse transforms fragmented academic scores into actionable capability signals that recruiters respect and placement directors can defend.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: BarChart3,
                  title: 'Pre-Season Readiness Audits',
                  desc: 'Comprehensive diagnostics assessing student problem-solving consistency, project depth, and role alignment before campus placement season opens.',
                  figure: 'plot' as const,
                  label: 'Interactive 3D cohort readiness chart',
                },
                {
                  icon: Users,
                  title: 'Targeted Acceleration Sprints',
                  desc: 'Isolate cohort-wide bottlenecks (e.g., system design, SQL modeling, communication) and deploy focused 2-week sprint interventions to lift placement rates.',
                  figure: 'loupe' as const,
                  label: 'Cohort bottleneck inspection loupe',
                },
                {
                  icon: ShieldCheck,
                  title: 'Inspectable Proof of Work',
                  desc: 'Recruiters inspect authentic code architectures, technical decision memos, and test coverage rather than unverified résumé bullets.',
                  figure: 'branches' as const,
                  label: 'Verifiable student git commit tree',
                },
                {
                  icon: LineChart,
                  title: 'Direct Recruiter Matching',
                  desc: 'Instantly match pre-screened students against verified employer job specifications with defensible capability dossiers for 3x higher interview conversions.',
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

        {/* 3. Skill Gap Deficit Analytics (C03) */}
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
                  Traditional placement efforts fail when skill deficits are discovered during final-year technical interviews. Pathwisse surfaces cohort-wide vulnerabilities months in advance so placement teams can deploy targeted acceleration sprints.
                </p>
                <div className="space-y-4">
                  {[
                    { title: 'Granular Deficit Diagnosis', text: 'Pinpoint precise technical weak points across DSA, database modeling, and distributed system architectures.' },
                    { title: 'Department & Batch Benchmarks', text: 'Compare readiness movement across engineering departments to allocate coaching resources efficiently.' },
                    { title: 'Targeted Sprint Lift (+14.2%)', text: 'Turn deficits into readiness through 2-week structured project builds with automated feedback loops.' },
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
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#f1f5f9]">
                    <div>
                      <h4 className="text-sm font-bold text-[#0f172a]">Cohort Skill Deficit Diagnostic</h4>
                      <span className="text-[11px] text-[#64748b]">CSE-2027 Pre-Season Benchmark</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f1f5f9] text-[#475569] font-medium">
                      DEFICIT AUDIT
                    </span>
                  </div>

                  <div className="space-y-3.5">
                    {[
                      {
                        skill: 'DSA & Problem-Solving',
                        status: '88% On Track',
                        pct: 88,
                        tag: 'bg-[#eaf5ee] text-[#1e824c]',
                        detail: 'Algorithmic time complexity, recursion, tree traversal',
                      },
                      {
                        skill: 'SQL & Database Modeling',
                        status: '64% Needs Sprints',
                        pct: 64,
                        tag: 'bg-[#fef3c7] text-[#92400e]',
                        detail: 'Complex joins, window functions, schema normalization',
                      },
                      {
                        skill: 'Production System Design',
                        status: '52% Priority Gap',
                        pct: 52,
                        tag: 'bg-[#fdf2f2] text-[#c53030]',
                        detail: 'API rate limiting, async message queues, caching',
                      },
                    ].map((row) => (
                      <div key={row.skill} className="p-3.5 rounded-xl border border-[#e2e8f0] bg-[#f8fafc]">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-[#0f172a]">{row.skill}</span>
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${row.tag}`}>
                            {row.status}
                          </span>
                        </div>
                        <div className="w-full bg-[#e2e8f0] h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${row.pct >= 80 ? 'bg-[#1e824c]' : row.pct >= 60 ? 'bg-[#2458ae]' : 'bg-[#e11d48]'}`}
                            style={{ width: `${row.pct}%` }}
                          />
                        </div>
                        <div className="flex justify-between items-center mt-2 text-[11px] text-[#64748b]">
                          <span>{row.detail}</span>
                          <span className="font-semibold text-[#0f172a]">{row.pct}% benchmark verified</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#f1f5f9] flex items-center justify-between text-xs text-[#64748b]">
                    <span>Intervention: <strong>2-Week Sprints Activated</strong></span>
                    <a href="/colleges/request-demo" className="text-[#2458ae] font-semibold hover:underline">
                      Deploy Sprints For Your Campus ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Proof Dossier & Verification Artifacts (C05) */}
        <section id="proof-dossier" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2458ae]">
                VERIFIED INSTITUTIONAL EVIDENCE
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-['Outfit'] text-[#0f172a] tracking-tight mt-2">
                Proof Dossiers & Verification Artifacts
              </h2>
              <p className="text-[#334155] text-base mt-3">
                Give visiting recruiters inspectable engineering proof that eliminates résumé doubts and justifies top-tier salary packages.
              </p>
            </div>

            {/* Proof Metrics Banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="p-6 rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] text-center">
                <span className="text-3xl sm:text-4xl font-bold font-['Outfit'] text-[#173c6e] block mb-2">
                  1,840+
                </span>
                <h4 className="text-sm font-bold text-[#0f172a] mb-1">Verified Project Artifacts</h4>
                <p className="text-xs text-[#64748b]">Real Git repositories, passing test suites, and deployed services.</p>
              </div>

              <div className="p-6 rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] text-center">
                <span className="text-3xl sm:text-4xl font-bold font-['Outfit'] text-[#1e824c] block mb-2">
                  0
                </span>
                <h4 className="text-sm font-bold text-[#0f172a] mb-1">Inflated Résumé Claims</h4>
                <p className="text-xs text-[#64748b]">Every skill badge is backed by tamper-proof commit history.</p>
              </div>

              <div className="p-6 rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] text-center">
                <span className="text-3xl sm:text-4xl font-bold font-['Outfit'] text-[#2458ae] block mb-2">
                  100%
                </span>
                <h4 className="text-sm font-bold text-[#0f172a] mb-1">Inspectable Git Trees</h4>
                <p className="text-xs text-[#64748b]">Recruiters evaluate clean branch architecture in under 60 seconds.</p>
              </div>
            </div>

            {/* Inspectable Artifact Showcase Card */}
            <div className="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-8 md:p-10 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#e2e8f0] text-xs font-semibold text-[#173c6e]">
                    <GitBranch className="w-3.5 h-3.5 text-[#2458ae]" />
                    Inspectable Artifact Architecture
                  </div>
                  <h3 className="text-2xl font-bold font-['Outfit'] text-[#0f172a]">
                    What recruiters see behind each student profile
                  </h3>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    Instead of generic bullet points, each student builds a defensible portfolio of production-grade artifacts. Placement teams can generate instant cohort export dossiers filtered by specific corporate tech stacks.
                  </p>
                  <ul className="space-y-2.5 text-xs text-[#334155] pt-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#1e824c] shrink-0" />
                      Cryptographic commit hash verification and authorship tracking
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#1e824c] shrink-0" />
                      Automated CI test coverage reports and edge-case execution
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#1e824c] shrink-0" />
                      Documented technical decision memos highlighting engineering trade-offs
                    </li>
                  </ul>
                </div>

                <div className="lg:col-span-7">
                  <div className="rounded-xl border border-[#e2e8f0] bg-white p-5 shadow-md">
                    <div className="flex items-center justify-between pb-3 border-b border-[#f1f5f9] mb-4">
                      <div className="flex items-center gap-2">
                        <FolderGit2 className="w-4 h-4 text-[#2458ae]" />
                        <span className="text-xs font-mono font-bold text-[#0f172a]">
                          artifact://github.com/pathwisse-verified/task-queue
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#eaf5ee] text-[#1e824c] font-semibold">
                        VERIFIED · 24/24 TESTS PASSING
                      </span>
                    </div>

                    <div className="space-y-3 font-mono text-xs">
                      <div className="p-3 rounded-lg bg-[#f8fafc] border border-[#e2e8f0]">
                        <span className="text-[#64748b] block text-[11px] mb-1">Architecture Decision Memo #04</span>
                        <p className="text-[#0f172a] text-xs font-sans leading-relaxed">
                          Implemented Redis Streams with consumer groups for distributed job execution. Enforced exponential backoff with dead-letter queue routing for idempotent retries.
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center text-[11px] pt-1">
                        <div className="p-2 rounded bg-[#f1f5f9] border border-[#e2e8f0]">
                          <span className="text-[#64748b] block text-[10px]">P99 Latency</span>
                          <strong className="text-[#0f172a] font-sans">18ms</strong>
                        </div>
                        <div className="p-2 rounded bg-[#f1f5f9] border border-[#e2e8f0]">
                          <span className="text-[#64748b] block text-[10px]">Test Coverage</span>
                          <strong className="text-[#1e824c] font-sans">94.2%</strong>
                        </div>
                        <div className="p-2 rounded bg-[#f1f5f9] border border-[#e2e8f0]">
                          <span className="text-[#64748b] block text-[10px]">Commit Integrity</span>
                          <strong className="text-[#2458ae] font-sans">GPG Signed</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. 4-Week Fast-Track Deployment Onboarding Timeline (C07) */}
        <section className="py-20 bg-[#f8fafc] border-t border-[#e2e8f0]">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2458ae]">
                4-WEEK FAST-TRACK DEPLOYMENT
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-['Outfit'] text-[#0f172a] tracking-tight mt-2">
                Four Weeks From Campus Audit to Recruiter Activation
              </h2>
              <p className="text-[#334155] text-base mt-3">
                Seamless onboarding designed specifically for university placement cells, academic deans, and department heads.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: 'Week 1',
                  title: 'Cohort Baseline Diagnostic',
                  desc: 'Comprehensive diagnostic audits across DSA, database design, and systems to establish defensible baseline readiness metrics for every student.',
                },
                {
                  step: 'Week 2',
                  title: 'Personalized Sprint Roadmaps',
                  desc: 'Deploy targeted 2-week acceleration modules isolating specific cohort gaps (SQL window functions, API design, system architecture).',
                },
                {
                  step: 'Week 3',
                  title: 'Project Verification & Milestone Reviews',
                  desc: 'Students push production code artifacts, resolve real engineering briefs, and verify repository commits through automated test runners.',
                },
                {
                  step: 'Week 4',
                  title: 'Recruiter Dashboard Activation',
                  desc: 'Placement cells export pre-qualified student shortlists mapped directly to visiting company requirements with defensible proof dossiers.',
                },
              ].map((col) => (
                <div key={col.step} className="p-6 rounded-xl border border-[#e2e8f0] bg-white shadow-2xs relative">
                  <span className="text-2xl font-extrabold text-[#2458ae] block mb-3 font-['Outfit']">{col.step}</span>
                  <h4 className="text-base font-bold text-[#0f172a] mb-2">{col.title}</h4>
                  <p className="text-xs text-[#475569] leading-relaxed">{col.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Institutional Lead Capture CTA Banner (C06) */}
        <CTABand
          title="Equip your institution with verified placement intelligence."
          description="Discuss your cohort size, placement timeline, and corporate recruiting goals with our academic partnerships team."
          primaryAction={{
            label: "Request Partnership Demo",
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

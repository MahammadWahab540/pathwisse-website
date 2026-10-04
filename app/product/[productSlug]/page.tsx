import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header, Footer } from '@/app/site';
import { absoluteUrl, APP_AUTH_URL, CAREER_VOICE_URL } from '@/lib/site-config';
import { Button } from '@/components/ui/button';
import { CTABand } from '@/components/shared/CTABand';
import { 
  AudioLines, 
  Map, 
  Flame, 
  FolderGit2, 
  ShieldCheck, 
  BarChart3, 
  LineChart, 
  Layers,
  ArrowRight,
  CheckCircle2,
  Terminal,
  Database,
  Cpu,
  Sparkles,
  Zap
} from 'lucide-react';

interface ProductData {
  title: string;
  tagline: string;
  description: string;
  audience: string;
  ctaText: string;
  ctaHref: string;
  visualType: 'voice' | 'integrations' | 'code' | 'dashboard' | 'passport';
  features: { title: string; desc: string }[];
  specs: string[];
}

const PRODUCTS: Record<string, ProductData> = {
  'career-voice': {
    title: 'Career Voice',
    tagline: 'Start with the question beneath the question.',
    description: 'A guided career audit for interests, role comparison, evidence review, diagnosis, and a definitive next action. Speak your answers or type them naturally.',
    audience: 'For Individual Learners & Students',
    ctaText: 'Launch Career Voice',
    ctaHref: CAREER_VOICE_URL,
    visualType: 'voice',
    features: [
      { title: 'Audio & Text Multi-Modal Input', desc: 'Speak aloud to express your technical ambitions, past project struggles, and what kind of problems you actually enjoy.' },
      { title: 'Interactive Gap Diagnosis', desc: 'Identifies misalignment between your target roles and current demonstrable technical proof.' },
      { title: 'Instant Tailored Milestones', desc: 'Directly converts diagnostic signals into an executable 30-day technical sprint roadmap.' },
    ],
    specs: ['Sub-second latency', 'Role scoring engine', 'Multi-turn conversational context']
  },
  'career-roadmaps': {
    title: 'Career Roadmaps',
    tagline: 'Role-based paths that connect skills, projects, and readiness.',
    description: 'Structured step-by-step roadmaps from foundations to verifiable capstones for Data Analysts, Full-Stack Developers, and AI Engineers.',
    audience: 'For Students & Career Transitioners',
    ctaText: 'Explore Role Roadmaps',
    ctaHref: '/careers',
    visualType: 'code',
    features: [
      { title: 'Zero Tutorial Hell', desc: 'Every milestone requires a working code or analytical artifact, not passive video watch time.' },
      { title: 'Integrated Skill Sprints', desc: 'Each stage links directly to exercises and project blueprints in our curriculum library.' },
      { title: 'India Tech Hiring Calibrated', desc: 'Curriculum requirements tuned to current engineering hiring rubrics across top product startups.' },
    ],
    specs: ['5 Core Engineering Tracks', '30+ Capstone Blueprints', 'Automated Rubrics']
  },
  'practice-lab': {
    title: 'Practice Lab',
    tagline: 'Daily consistency converted into defensible skill signals.',
    description: 'Interactive daily practice problems designed to build authentic problem-solving habits and code reliability.',
    audience: 'For Active Learners',
    ctaText: 'Enter Practice Lab',
    ctaHref: APP_AUTH_URL,
    visualType: 'code',
    features: [
      { title: 'Real Test Suites', desc: 'Run your code against production-like unit tests and edge cases, not simplistic regex checkers.' },
      { title: 'Streak & Momentum Metrics', desc: 'Consistency tracking that feeds directly into your public Skill Passport.' },
      { title: 'Algorithmic & Domain Breadth', desc: 'From relational SQL joins to asynchronous Node.js concurrency patterns.' },
    ],
    specs: ['Automated test execution', 'Edge-case validator', 'Syntax & complexity linter']
  },
  'projects': {
    title: 'Projects Engine',
    tagline: 'Applied work that captures problem context, decisions, and outcomes.',
    description: 'Engineered project specifications that force architectural thinking, clear technical trade-off memos, and deployable repositories.',
    audience: 'For Aspiring Engineers',
    ctaText: 'View Project Blueprints',
    ctaHref: '/students#projects',
    visualType: 'code',
    features: [
      { title: 'Architectural Decision Memos', desc: 'Candidates document WHY they picked Redis, PostgreSQL, or DynamoDB over alternatives.' },
      { title: 'Deployable Artifacts', desc: 'Projects must have running demo URLs, test suites, and structured Git commit histories.' },
      { title: 'Reviewer Rubric Ready', desc: 'Built for hiring managers to inspect in 3 minutes during technical screens.' },
    ],
    specs: ['Docker & Cloud Ready', 'CI/CD pipeline templates', 'Architectural RFC guidelines']
  },
  'skill-passport': {
    title: 'Skill Passport',
    tagline: 'A portable, auditable view of demonstrated technical capability.',
    description: 'Replace the uncalibrated PDF résumé with a living profile backed by inspectable code artifacts, verified test passes, and peer reviews.',
    audience: 'For Students & Recruiters',
    ctaText: 'Inspect Skill Passport',
    ctaHref: APP_AUTH_URL,
    visualType: 'passport',
    features: [
      { title: 'Artifact-Backed Verification', desc: 'Every badge links to an inspected PR, commit hash, and automated benchmark run.' },
      { title: 'Recruiter One-Click Dossier', desc: 'Engineering leads can review algorithmic pass rates, PR structure, and architectural choices at a glance.' },
      { title: 'Tamper-Evident History', desc: 'Verifiable progression history that prevents resume embellishment.' },
    ],
    specs: ['Sharable public URL', 'ATS-compatible export', 'Defensible proof score']
  },
  'readiness-scoring': {
    title: 'Readiness Scoring',
    tagline: 'A transparent readiness layer across students, cohorts, and candidates.',
    description: 'Multi-dimensional readiness indexes measuring algorithmic consistency, architectural soundness, and project completeness.',
    audience: 'For College Deans & Hiring Leads',
    ctaText: 'View Scoring Framework',
    ctaHref: '/colleges',
    visualType: 'dashboard',
    features: [
      { title: 'Multi-Factor Evaluation', desc: 'Combines algorithmic performance, system design, and documentation rigor into a calibrated 0-100 index.' },
      { title: 'Pre-Season Benchmark', desc: 'Colleges know 6 months ahead of placement which students need urgent skill intervention.' },
      { title: 'Objective Recruiter Filtering', desc: 'Companies filter candidate cohorts by verifiable readiness thresholds.' },
    ],
    specs: ['Standardized rubrics', 'Percentile cohort ranking', 'Audit trail history']
  },
  'analytics': {
    title: 'Cohort Analytics',
    tagline: 'Deep visibility into institutional student progress and skill gaps.',
    description: 'Actionable institutional dashboards that identify which departments, semesters, and cohorts are lagging behind industry benchmarks.',
    audience: 'For Academic Institutions & Enterprise L&D',
    ctaText: 'Request Analytics Demo',
    ctaHref: '/colleges/request-demo',
    visualType: 'dashboard',
    features: [
      { title: 'Real-Time Cohort Traversal', desc: 'Filter 2,000+ students by target specialization, active sprint progress, and risk factors.' },
      { title: 'Intervention Tracking', desc: 'Assign remedial skill sprints to specific cohorts and measure readiness movement over time.' },
      { title: 'Accreditation & Placement Export', desc: 'One-click reporting for academic boards and corporate recruiting partners.' },
    ],
    specs: ['Real-time roster sync', 'Automated risk alerts', 'Custom KPI builder']
  },
  'integrations': {
    title: 'Integrations',
    tagline: 'Connecting Pathwisse to your existing academic & hiring workflows.',
    description: 'Connect Pathwisse seamlessly with GitHub, campus ERP systems, ATS platforms, and single sign-on providers without vendor lock-in.',
    audience: 'For Enterprise IT & Campus Administrators',
    ctaText: 'Inspect Integrations',
    ctaHref: '/contact?interest=general',
    visualType: 'integrations',
    features: [
      { title: 'Campus LMS & SIS Sync', desc: 'Sync student rosters, batch schedules, and department structures effortlessly.' },
      { title: 'Enterprise ATS & HRIS Handoff', desc: 'Export pre-screened candidate dossiers straight into Greenhouse, Lever, or Workday.' },
      { title: 'Developer Tooling Connections', desc: 'Native webhook synchronization with GitHub, GitLab, and CI pipelines.' },
    ],
    specs: ['OAuth 2.0 & SAML SSO', 'RESTful API endpoints', 'Real-time Webhook hooks']
  }
};

type Props = { params: Promise<{ productSlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productSlug } = await params;
  const p = PRODUCTS[productSlug];
  if (!p) return { title: 'Product Not Found' };

  return {
    title: `${p.title} — ${p.tagline} | Pathwisse`,
    description: p.description,
    alternates: { canonical: absoluteUrl(`/product/${productSlug}`) },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { productSlug } = await params;
  const p = PRODUCTS[productSlug];
  if (!p) notFound();

  return (
    <>
      <Header />
      <main id="main" className="min-h-screen bg-[#f8fafc]">
        {/* Product Hero */}
        <section className="bg-white border-b border-[#e2e8f0] pt-16 pb-12 md:pt-20 md:pb-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2458ae] block mb-3">
                  {p.audience}
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-['Outfit'] text-[#0f172a] tracking-tight leading-[1.08] mb-4">
                  {p.title}
                </h1>
                <p className="text-xl sm:text-2xl font-medium text-[#173c6e] mb-4 font-['Outfit']">
                  {p.tagline}
                </p>
                <p className="text-base text-[#475569] leading-relaxed mb-8 max-w-xl">
                  {p.description}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Button asChild size="lg" variant="default">
                    <a href={p.ctaHref}>
                      {p.ctaText} <ArrowRight size={16} />
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-[#cbd5e1] text-[#173c6e]">
                    <a href="#features">
                      Inspect Capabilities ↗
                    </a>
                  </Button>
                </div>
              </div>

              {/* Bespoke Visual Mockup per Product Type */}
              <div className="lg:col-span-5">
                {p.visualType === 'voice' && (
                  <div className="rounded-2xl border border-[#cbd5e1] bg-gradient-to-br from-[#173c6e] to-[#2458ae] p-8 text-white shadow-xl text-center relative overflow-hidden">
                    <div className="w-24 h-24 rounded-full bg-white/10 mx-auto flex items-center justify-center mb-6 animate-pulse border border-white/20">
                      <AudioLines className="w-12 h-12 text-sky-200" />
                    </div>
                    <span className="text-xs font-mono uppercase tracking-widest text-sky-300 block mb-2">Listening & Transcribing</span>
                    <blockquote className="text-lg font-['Outfit'] italic text-slate-100 mb-6">
                      &quot;I enjoy writing SQL queries, but I get stuck when designing large database schemas...&quot;
                    </blockquote>
                    <div className="p-3 rounded-xl bg-white/10 text-xs text-left border border-white/15">
                      <span className="text-[10px] text-sky-200 uppercase font-bold block mb-1">Diagnostic Output:</span>
                      <p className="text-white font-medium">Recommending Data Analyst Path with Focus on Relational Normalization.</p>
                    </div>
                  </div>
                )}

                {p.visualType === 'integrations' && (
                  <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-xl">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#64748b] block mb-4">Supported Integrations Status</span>
                    <div className="space-y-3">
                      {[
                        { name: 'GitHub & GitLab Webhooks', status: 'Live', col: 'bg-emerald-100 text-emerald-800' },
                        { name: 'Canvas & Blackboard LMS', status: 'Live', col: 'bg-emerald-100 text-emerald-800' },
                        { name: 'Greenhouse & Lever ATS', status: 'Beta', col: 'bg-blue-100 text-blue-800' },
                        { name: 'Workday & SAP SuccessFactors', status: 'Planned', col: 'bg-slate-100 text-slate-700' },
                      ].map((item) => (
                        <div key={item.name} className="flex items-center justify-between p-3 rounded-xl border border-[#f1f5f9] bg-[#f8fafc]">
                          <span className="text-xs font-semibold text-[#0f172a]">{item.name}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${item.col}`}>
                            {item.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {(p.visualType === 'code' || p.visualType === 'passport' || p.visualType === 'dashboard') && (
                  <div className="rounded-2xl border border-[#cbd5e1] bg-white p-6 shadow-xl space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#f1f5f9]">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#10b981]" />
                        <span className="text-xs font-bold text-[#142e50]">{p.title} System</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">v2.4 Production</span>
                    </div>
                    <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] text-xs space-y-2">
                      <div className="flex justify-between text-[#64748b]">
                        <span>Diagnostic Reliability</span>
                        <strong className="text-[#173c6e]">Calibrated</strong>
                      </div>
                      <div className="flex justify-between text-[#64748b]">
                        <span>Verification Mode</span>
                        <strong className="text-emerald-600">Artifact Tested</strong>
                      </div>
                      <div className="flex justify-between text-[#64748b]">
                        <span>Hiring Signal</span>
                        <strong className="text-[#2458ae]">Defensible</strong>
                      </div>
                    </div>
                    <p className="text-xs text-[#64748b] leading-relaxed">
                      Calibrated to reflect real engineering capability without synthetic test pollution.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Feature Breakdown */}
        <section id="features" className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2458ae]">CORE CAPABILITIES</span>
            <h2 className="text-3xl font-bold font-['Outfit'] text-[#0f172a] mt-2">
              Engineered for Defensible Proof
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {p.features.map((feat) => (
              <div key={feat.title} className="p-7 rounded-2xl border border-[#e2e8f0] bg-white shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mb-4" />
                <h3 className="text-lg font-bold font-['Outfit'] text-[#0f172a] mb-2">{feat.title}</h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Shared Bottom CTA */}
        <CTABand
          title={`Ready to experience ${p.title}?`}
          description={p.description}
          primaryAction={{
            label: p.ctaText,
            href: p.ctaHref,
          }}
          secondaryAction={{
            label: "Explore All Products",
            href: "/product",
          }}
        />
      </main>
      <Footer />
    </>
  );
}

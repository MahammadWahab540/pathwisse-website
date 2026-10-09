import type { Metadata } from 'next';
import { Header, Footer } from '@/app/site';
import { PerspectiveCardsHero } from '@/components/students/perspective-cards-hero';
import { StageSelector } from '@/components/students/stage-selector';
import { CuratedRoadmapCard } from '@/components/students/curated-roadmap-card';
import { STUDENT_OUTCOME_CARDS, CURATED_ROADMAP_CARDS } from '@/components/students/cards-data';
import { APP_AUTH_URL, CAREER_VOICE_URL, SITE_URL, absoluteUrl } from '@/lib/site-config';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Terminal,
  ShieldCheck, 
  Layers
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HairlineFigure } from '@/components/ui/hairline-figure';

export const metadata: Metadata = {
  title: "DON'T JUST LEARN. PROVE WHAT YOU CAN DO. | For Students | Pathwisse",
  description: 'Turn what you learn into proof employers can inspect. Navigate your career direction, follow structured skill roadmaps, build real projects, and unlock verified capability.',
  alternates: {
    canonical: absoluteUrl('/students'),
  },
  openGraph: {
    title: "DON'T JUST LEARN. PROVE WHAT YOU CAN DO. | Pathwisse",
    description: 'Turn daily practice into verified proof. Navigate role fit, execute authentic engineering projects, and get shortlisted by top companies.',
    url: absoluteUrl('/students'),
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "DON'T JUST LEARN. PROVE WHAT YOU CAN DO. | Pathwisse",
    description: 'From career direction to real projects and verified proof. The complete student capability engine.',
  },
};

export default function StudentsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: "DON'T JUST LEARN. PROVE WHAT YOU CAN DO. — For Students",
    description: 'Pathwisse helps students discover career fit, build structured skills, engineer real projects, and showcase verified capability to employers.',
    url: absoluteUrl('/students'),
    publisher: {
      '@type': 'Organization',
      name: 'Pathwisse',
      url: SITE_URL,
      logo: absoluteUrl('/favicon.svg'),
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: STUDENT_OUTCOME_CARDS.map((card, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: card.title,
        description: card.description,
      })),
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

        {/* 1. S01 Perspective 3D Orbiting Cards Interactive Hero Experience */}
        <PerspectiveCardsHero />

        {/* 2. S09 Interactive Horizontal Stage Selector & Smooth Flow Strip */}
        <StageSelector />

        {/* 3. S02–S08 & S11–S12 Deep-Dive Section: The 7 Student Capability Stages */}
        <section id="journey-breakdown" className="py-20 lg:py-28 max-w-[1280px] mx-auto px-6 scroll-mt-24">
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2458ae]">
              THE 7 CAPABILITY STAGES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142e50] tracking-tight mt-2 mb-4 leading-tight">
              Designed around how real engineering capability is built.
            </h2>
            <p className="text-base text-[#586a80] leading-relaxed">
              Traditional certificates show you watched a video. Pathwisse builds an inspectable portfolio of real work, architectural trade-offs, and verified readiness that hiring managers can audit in 60 seconds.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {STUDENT_OUTCOME_CARDS.map((card, idx) => {
              const Icon = card.icon;
              const mockup = card.demoMockup;

              return (
                <div
                  key={card.id}
                  id={`stage-${card.id}`}
                  data-stage-id={card.id}
                  className="rounded-3xl border border-[#e2e8f0] bg-white p-7 sm:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group scroll-mt-32"
                >
                  <div className="space-y-4">
                    {/* Header badge & Icon */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-slate-100 text-[#142e50]">
                          STAGE {card.stageNumber}
                        </span>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#2458ae] border border-blue-100">
                          {card.badge}
                        </span>
                      </div>
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm"
                        style={{ background: card.gradient }}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>

                    {/* S12 Hairline Isometric Interactive Simulation Figure */}
                    <div className="w-full max-w-[160px] mx-auto py-2">
                      <HairlineFigure 
                        figure={card.hairlineFigure} 
                        interactiveHint 
                        intensity={0.65} 
                        label={`${card.title} interactive simulation`} 
                      />
                    </div>

                    {/* Title & Caption */}
                    <div>
                      <h3 className="text-xl font-bold text-[#142e50] tracking-tight group-hover:text-[#2458ae] transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-xs font-semibold text-[#2458ae] mt-1">
                        {card.caption}
                      </p>
                    </div>

                    <p className="text-sm text-[#586a80] leading-relaxed">
                      {card.description}
                    </p>

                    {/* S11 Real Product UI Mockup Box with Sample Demo Badge */}
                    <div className="rounded-2xl border border-slate-200 bg-slate-900 text-slate-100 p-3.5 shadow-inner space-y-2.5 font-sans">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <span className="text-[11px] font-mono font-bold text-slate-200 truncate">
                          {mockup.title}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                          {mockup.badge}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-1.5 pt-0.5">
                        {mockup.metrics.map((m, i) => (
                          <div key={i} className="p-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-center">
                            <span className="block text-[9px] font-mono text-slate-400 truncate">{m.label}</span>
                            <span className="block text-[11px] font-bold text-white mt-0.5 truncate">{m.value}</span>
                          </div>
                        ))}
                      </div>

                      <div className="p-2 rounded-lg bg-black/50 border border-slate-800 font-mono text-[10px] text-emerald-400 flex items-start gap-1.5">
                        <Terminal className="w-3 h-3 shrink-0 mt-0.5 text-slate-500" />
                        <span className="line-clamp-2">{mockup.codeOrOutput}</span>
                      </div>
                    </div>

                    {/* Key Capability Outcomes Checklist */}
                    <div className="pt-3 border-t border-slate-100 space-y-2">
                      {card.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2 text-xs text-[#334155]">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stage Card Footer Actions */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#142e50]">
                    <span className="text-slate-500">{card.metrics}</span>
                    <a
                      href={APP_AUTH_URL}
                      className="inline-flex items-center gap-1.5 text-[#2458ae] hover:underline font-bold"
                    >
                      <span>Explore stage</span>
                      <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              );
            })}

            {/* Final Highlight Card: Ready for Opportunities */}
            <div 
              className="rounded-3xl p-8 flex flex-col justify-between text-white relative overflow-hidden bg-[#132b4a]"
              style={{
                background: 'linear-gradient(145deg, #132b4a 0%, #173c6e 100%)',
              }}
            >
              <div className="space-y-4 relative z-10">
                <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-white/20 text-white uppercase tracking-wider">
                  READY TO BEGIN
                </span>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Your next chapter starts with one click.
                </h3>
                <p className="text-sm text-slate-200 leading-relaxed">
                  Join ambitious students turning coursework and deliberate practice into verified, job-ready proof.
                </p>
                
                <div className="pt-4 space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Free career direction diagnostic</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Inspectable code artifacts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>Direct recruiter matching</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 relative z-10">
                <Button
                  asChild
                  variant="inverse"
                  size="lg"
                  className="w-full rounded-full font-bold shadow-md hover:shadow-lg text-[#142e50] !text-[#142e50]"
                >
                  <a href={APP_AUTH_URL}>
                    <span>Start Your Path</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Compare Traditional Learning vs Pathwisse Proof */}
        <section className="bg-[#f8fafc] border-y border-[#e5eaf0] py-20 lg:py-24">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="text-center max-w-xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-widest text-[#2458ae]">
                PROOF VS RESUMES
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142e50] tracking-tight mt-2">
                Why Pathwisse beats traditional resumes
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="p-8 rounded-3xl bg-white border border-[#e2e8f0] shadow-sm">
                <h3 className="text-lg font-bold text-slate-500 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-400" />
                  Traditional Student Route
                </h3>
                <ul className="space-y-3.5 text-sm text-slate-600">
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-500 font-bold">✕</span>
                    <span>Stacking 20+ video completion certificates that recruiters ignore.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-500 font-bold">✕</span>
                    <span>Generic tutorial clones with zero unique problem solving.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-500 font-bold">✕</span>
                    <span>Keyword stuffing resumes to pass automated screening bots.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-500 font-bold">✕</span>
                    <span>Anxiety during placement season due to unmeasured skill gaps.</span>
                  </li>
                </ul>
              </div>

              <div className="p-8 rounded-3xl bg-gradient-to-br from-white to-blue-50/50 border-2 border-[#2563eb]/20 shadow-md">
                <h3 className="text-lg font-bold text-[#142e50] mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#2563eb]" />
                  The Pathwisse Capability Route
                </h3>
                <ul className="space-y-3.5 text-sm text-[#142e50]">
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><strong>Career Direction:</strong> AI-assisted diagnostic finds roles aligned with your strengths.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><strong>Focused Roadmap:</strong> Milestone-based paths with zero video bloat.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><strong>Real Projects:</strong> Architecture documents and deployable production code.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><strong>Verified Capability:</strong> Verified readiness badges recruiters can test immediately.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 5. S10 EXACT 6 Curated Career Roadmap Cards Showcase */}
        <section id="curated-roadmaps" className="py-20 bg-slate-50 border-t border-slate-200/80 scroll-mt-24">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-widest uppercase bg-blue-100 text-[#002f6c] mb-3">
                  Curated Career Roadmaps · Approved Sequence
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002f6c] tracking-tight">
                  You don’t need to guess your career. Explore where you could go.
                </h2>
                <p className="mt-3 text-slate-600 text-base sm:text-lg">
                  Every card represents a concrete engineering capability you can understand, build, and prove. Pick a role to inspect its skill stack or start learning immediately.
                </p>
              </div>
              <div>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full border-slate-300 font-semibold text-[#002f6c] hover:bg-slate-100"
                >
                  <Link href="/careers">
                    Explore all 206+ roles <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* S10 Approved Sequence: 1. Data Analyst, 2. Business Analyst, 3. Product Manager, 4. AI Engineer, 5. Full Stack Developer, 6. UI/UX Designer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {CURATED_ROADMAP_CARDS.map((role) => (
                <CuratedRoadmapCard key={role.slug} role={role} />
              ))}
            </div>
          </div>
        </section>

        {/* 6. Master Bottom CTA: Start Your Path */}
        <section className="py-24 max-w-[1280px] mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto rounded-3xl p-10 md:p-16 bg-[#142e50] text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <span className="px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-bold uppercase tracking-widest text-sky-300 border border-white/15">
                START TODAY · FREE ACCESS
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
                Ready to build proof people can act on?
              </h2>
              <p className="text-base sm:text-lg text-slate-200 max-w-xl mx-auto leading-relaxed">
                Take the career audit, inspect your skill gaps, and begin working on your first verified project.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  variant="inverse"
                  size="lg"
                  className="w-full sm:w-auto font-bold rounded-full shadow-xl hover:shadow-2xl text-[#142e50] !text-[#142e50]"
                >
                  <a href={APP_AUTH_URL}>
                    <span>Start Your Path</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>

                <Button
                  asChild
                  variant="inverseOutline"
                  size="lg"
                  className="w-full sm:w-auto rounded-full border-white/20 text-white hover:bg-white/10"
                >
                  <a href={CAREER_VOICE_URL}>
                    <Sparkles className="h-4 w-4 text-sky-300" />
                    <span>Try Career Voice Audit</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

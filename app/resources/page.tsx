import type { Metadata } from 'next';
import { Header, Footer } from '@/app/site';
import { absoluteUrl, CAREER_VOICE_URL, APP_AUTH_URL } from '@/lib/site-config';
import { 
  Compass, 
  Layers3, 
  Sparkles, 
  ArrowRight, 
  ArrowUpRight, 
  Search, 
  BookOpen, 
  GraduationCap, 
  Building2, 
  Briefcase, 
  CheckCircle2, 
  Terminal, 
  FileCode,
  TrendingUp,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { careers, skills, blogPosts } from '@/content';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Resource Hub — Career Roadmaps, Guides & Capability Blueprints | Pathwisse',
  description: 'Practical guides, interactive role roadmaps, and capability blueprints for students, placement leaders, and high-growth enterprise teams.',
  alternates: { canonical: absoluteUrl('/resources') },
  openGraph: {
    title: 'Resource Hub — Career Roadmaps, Guides & Capability Blueprints | Pathwisse',
    description: 'Practical guides, role roadmaps, and capability blueprints. Turn potential into provable career proof.',
    url: absoluteUrl('/resources'),
    type: 'website',
  },
};

export default function ResourcesPage() {
  return (
    <>
      <Header />
      <main id="main" className="min-h-screen bg-[#fafbfc]">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-[#e5ebf2] bg-gradient-to-b from-white via-[#f6f9fc] to-[#f0f4f9] pt-14 pb-16 px-6 sm:px-12">
          {/* Subtle architectural grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#142e50 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#eff4fc] border border-[#d6e3f5] text-xs font-semibold text-[#2458ae] mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Knowledge & Roadmaps</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#142e50] mb-5 font-['Outfit']">
              Clear direction, <span className="text-[#2458ae]">measurable proof.</span>
            </h1>

            <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#586a80] leading-relaxed mb-8">
              Explore authentic roadmaps, practical role guides, and placement capability blueprints. Everything is grounded in verifiable skills and real problem-solving artifacts.
            </p>

            {/* Quick Navigation Filter Bar */}
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
              <a 
                href="#career-roadmaps" 
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-white text-[#142e50] border border-[#dce4ee] shadow-sm hover:border-[#2458ae] hover:text-[#2458ae] transition-colors"
              >
                Career Roadmaps ({careers.length})
              </a>
              <a 
                href="#skill-guides" 
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-white text-[#142e50] border border-[#dce4ee] shadow-sm hover:border-[#2458ae] hover:text-[#2458ae] transition-colors"
              >
                Core Skills ({skills.length})
              </a>
              <a 
                href="#in-depth-guides" 
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-white text-[#142e50] border border-[#dce4ee] shadow-sm hover:border-[#2458ae] hover:text-[#2458ae] transition-colors"
              >
                Strategic Insights ({blogPosts.length})
              </a>
              <a 
                href="#comparisons" 
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-white text-[#142e50] border border-[#dce4ee] shadow-sm hover:border-[#2458ae] hover:text-[#2458ae] transition-colors"
              >
                Role Comparisons (3)
              </a>
              <a 
                href={CAREER_VOICE_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-[#142e50] text-white shadow-sm hover:bg-[#1e4a8a] transition-colors inline-flex items-center gap-1.5"
              >
                <span>Career Voice Audit</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* Feature Spotlight: Career Voice Interactive Diagnosis */}
        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="relative rounded-2xl border border-[#173c6e]/40 bg-gradient-to-r from-[#142e50] via-[#1a3d6b] to-[#1e4a8a] p-8 sm:p-12 text-white shadow-xl overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
              <Compass className="w-96 h-96 text-white" />
            </div>

            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold mb-4 border border-white/20">
                <span>Interactive Diagnosis</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-['Outfit'] mb-3 text-white">
                Unsure which direction fits your strengths?
              </h2>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-6">
                Take an interactive diagnostic assessment with Career Voice. Answer by voice or text, clarify what you actually enjoy building, diagnose your current skill gaps, and receive a customized roadmap.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Button
                  asChild
                  variant="inverse"
                  size="lg"
                  className="font-bold text-[#142e50] shadow-sm hover:bg-slate-100"
                >
                  <a
                    href={CAREER_VOICE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Launch Career Voice</span>
                    <ArrowRight className="w-4 h-4 text-[#142e50]" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="inverseOutline"
                  size="lg"
                  className="border-white/25 text-white hover:bg-white/20"
                >
                  <a href="/career-audit/start">
                    <span>Guided Career Audit</span>
                    <ChevronRight className="w-4 h-4 text-white" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Career Roadmaps */}
        <section id="career-roadmaps" className="max-w-6xl mx-auto px-6 py-12 border-t border-[#e8edf3]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#142e50] font-['Outfit']">
                Role-Based Career Roadmaps
              </h2>
              <p className="text-sm sm:text-base text-[#586a80] mt-1">
                Complete progression maps connecting core responsibilities, essential skills, and portfolio projects.
              </p>
            </div>
            <a 
              href="/careers" 
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#2458ae] hover:underline"
            >
              <span>View all career roadmaps</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careers.map((career) => (
              <a
                key={career.slug}
                href={`/careers/${career.slug}`}
                className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white border border-[#e1e7ec] shadow-sm hover:shadow-md hover:border-[#2458ae]/50 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-10 h-10 rounded-xl bg-[#eff4fc] text-[#2458ae] flex items-center justify-center font-bold text-sm">
                      <Briefcase className="w-5 h-5" />
                    </span>
                    <span className="text-[11px] font-semibold text-[#586a80] uppercase tracking-wider bg-[#f4f7fb] px-2.5 py-1 rounded-md">
                      Roadmap
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#142e50] group-hover:text-[#2458ae] transition-colors font-['Outfit'] mb-2">
                    {career.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#586a80] leading-relaxed mb-5">
                    {career.shortSummary}
                  </p>

                  <div className="space-y-2 mb-6 border-t border-slate-100 pt-4">
                    <div className="text-[11px] font-semibold text-[#7e8e9f] uppercase tracking-wider">
                      Key Skills
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {career.requiredSkills.map((sk) => (
                        <span key={sk} className="text-xs px-2 py-0.5 rounded-md bg-[#f1f5fa] text-[#142e50] font-medium">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-semibold text-[#2458ae] pt-3 border-t border-slate-100">
                  <span>Explore role roadmap</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Section 2: Core Skill Blueprints */}
        <section id="skill-guides" className="max-w-6xl mx-auto px-6 py-12 border-t border-[#e8edf3]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#142e50] font-['Outfit']">
                Core Skill Blueprints
              </h2>
              <p className="text-sm sm:text-base text-[#586a80] mt-1">
                Foundational and applied competencies required to build production artifacts.
              </p>
            </div>
            <a 
              href="/skills" 
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#2458ae] hover:underline"
            >
              <span>View all skills</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill) => (
              <a
                key={skill.slug}
                href={`/skills/${skill.slug}`}
                className="group flex flex-col justify-between p-6 rounded-2xl bg-white border border-[#e1e7ec] shadow-sm hover:shadow-md hover:border-[#2458ae]/50 transition-all duration-200"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-[#eef6ff] text-[#2458ae] flex items-center justify-center font-bold text-sm mb-4">
                    <Terminal className="w-4 h-4" />
                  </div>

                  <h3 className="text-lg font-bold text-[#142e50] group-hover:text-[#2458ae] transition-colors font-['Outfit'] mb-2">
                    {skill.name}
                  </h3>

                  <p className="text-xs text-[#586a80] leading-relaxed mb-4">
                    {skill.description}
                  </p>

                  <div className="text-[11px] text-[#788ca3] font-medium">
                    Progression: <span className="text-[#142e50] font-semibold">{skill.progression.length} stages</span>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#2458ae]">
                  <span>Study blueprint</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Section 3: In-Depth Guides & Strategic Insights */}
        <section id="in-depth-guides" className="max-w-6xl mx-auto px-6 py-12 border-t border-[#e8edf3]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#142e50] font-['Outfit']">
                Strategic Guides & Frameworks
              </h2>
              <p className="text-sm sm:text-base text-[#586a80] mt-1">
                Evidence-led articles on choosing career paths, placement readiness signals, and talent capability.
              </p>
            </div>
            <a 
              href="/resources/blog" 
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#2458ae] hover:underline"
            >
              <span>Explore blog & insights</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <a
                key={post.slug}
                href={`/resources/blog/${post.slug}`}
                className="group flex flex-col justify-between p-6 rounded-2xl bg-white border border-[#e1e7ec] shadow-sm hover:shadow-md hover:border-[#2458ae]/50 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs text-[#71849a]">
                    <span className="font-semibold text-[#2458ae] bg-[#f0f5fc] px-2.5 py-0.5 rounded-full">
                      {post.category}
                    </span>
                    <span>5 min read</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#142e50] group-hover:text-[#2458ae] transition-colors font-['Outfit'] mb-2.5 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#586a80] leading-relaxed line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs font-semibold text-[#2458ae] pt-3 border-t border-slate-100">
                  <span>Read complete guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Section 4: Role Comparisons */}
        <section id="comparisons" className="max-w-6xl mx-auto px-6 py-12 border-t border-[#e8edf3]">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#142e50] font-['Outfit']">
              Role Comparisons
            </h2>
            <p className="text-sm sm:text-base text-[#586a80] mt-1">
              Objective side-by-side breakdowns across responsibilities, day-to-day work, and learning curves.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Data Analyst vs Business Analyst',
                slug: 'data-analyst-vs-business-analyst',
                description: 'Compare data manipulation & SQL models against stakeholder requirements and business processes.',
              },
              {
                title: 'Product Manager vs Business Analyst',
                slug: 'product-manager-vs-business-analyst',
                description: 'Compare product vision, outcome ownership, and roadmap prioritization with detailed systems analysis.',
              },
              {
                title: 'Data Scientist vs Data Analyst',
                slug: 'data-scientist-vs-data-analyst',
                description: 'Contrast machine learning engineering and predictive pipelines with descriptive insights and KPI reporting.',
              },
            ].map((comp) => (
              <a
                key={comp.slug}
                href={`/compare/${comp.slug}`}
                className="group flex flex-col justify-between p-6 rounded-2xl bg-white border border-[#e1e7ec] shadow-sm hover:shadow-md hover:border-[#2458ae]/50 transition-all duration-200"
              >
                <div>
                  <span className="text-[11px] font-bold text-[#2458ae] uppercase tracking-wider block mb-2">
                    Side-by-Side Breakdown
                  </span>
                  <h3 className="text-base font-bold text-[#142e50] group-hover:text-[#2458ae] transition-colors font-['Outfit'] mb-2">
                    {comp.title}
                  </h3>
                  <p className="text-xs text-[#586a80] leading-relaxed mb-4">
                    {comp.description}
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs font-semibold text-[#2458ae] pt-3 border-t border-slate-100">
                  <span>Compare roles</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Audience-Specific Solution Gateways */}
        <section className="max-w-6xl mx-auto px-6 py-14 border-t border-[#e8edf3]">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#142e50] font-['Outfit']">
              Tailored Capability Pathways
            </h2>
            <p className="text-sm text-[#586a80] mt-1.5">
              Specific solutions engineered for each phase of the talent and placement lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#2458ae] flex items-center justify-center mb-4">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#142e50] font-['Outfit'] mb-1.5">
                  For Students
                </h3>
                <p className="text-xs sm:text-sm text-[#586a80] leading-relaxed mb-5">
                  Discover your best role fit, build structured project artifacts, and obtain verifiable proof employers can inspect directly.
                </p>
              </div>
              <a 
                href="/students" 
                className="inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-white text-[#142e50] text-xs font-semibold border border-slate-200 hover:border-[#2458ae] transition-colors"
              >
                <span>Student Hub</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#2458ae]" />
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#d97706] flex items-center justify-center mb-4">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#142e50] font-['Outfit'] mb-1.5">
                  For Colleges & TPOs
                </h3>
                <p className="text-xs sm:text-sm text-[#586a80] leading-relaxed mb-5">
                  Gain continuous cohort visibility before placement season starts. Identify skill gaps early and coordinate targeted interventions.
                </p>
              </div>
              <a 
                href="/colleges" 
                className="inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-white text-[#142e50] text-xs font-semibold border border-slate-200 hover:border-[#2458ae] transition-colors"
              >
                <span>Placement Solutions</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#2458ae]" />
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#059669] flex items-center justify-center mb-4">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#142e50] font-['Outfit'] mb-1.5">
                  For Enterprises
                </h3>
                <p className="text-xs sm:text-sm text-[#586a80] leading-relaxed mb-5">
                  Assess workforce capabilities against emerging technical demands, build role-based upskilling journeys, and discover verified talent.
                </p>
              </div>
              <a 
                href="/enterprise" 
                className="inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-white text-[#142e50] text-xs font-semibold border border-slate-200 hover:border-[#2458ae] transition-colors"
              >
                <span>Enterprise Overview</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#2458ae]" />
              </a>
            </div>
          </div>
        </section>

        {/* Global CTA */}
        <section className="bg-[#142e50] text-white py-16 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold font-['Outfit'] mb-4">
              Start building proof that speaks for itself.
            </h2>
            <p className="text-white/80 text-sm sm:text-base mb-8 leading-relaxed">
              Join thousands of learners, educators, and enterprise leaders who use Pathwisse to transform raw potential into actionable capability.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                variant="accent"
                size="lg"
                className="shadow-lg hover:shadow-xl font-bold"
              >
                <a href={APP_AUTH_URL}>
                  Get Started Free
                </a>
              </Button>
              <Button
                asChild
                variant="inverseOutline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <a href="/contact">
                  Schedule an Institutional Demo
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

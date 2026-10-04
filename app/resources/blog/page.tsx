import type { Metadata } from 'next';
import Link from 'next/link';
import { Header, Footer } from '@/app/site';
import { blogPosts } from '@/content';
import { absoluteUrl } from '@/lib/site-config';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Clock, Calendar, ArrowUpRight, Compass } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pathwisse Blog — Career Direction, Readiness & Capability Intelligence',
  description: 'Evidence-based insights, research notes, and tactical frameworks for career growth, institutional readiness, and early-career hiring.',
  alternates: {
    canonical: absoluteUrl('/resources/blog'),
  },
  openGraph: {
    title: 'Pathwisse Blog — Career Direction, Readiness & Capability Intelligence',
    description: 'Evidence-based insights, research notes, and tactical frameworks for career growth, institutional readiness, and early-career hiring.',
    url: absoluteUrl('/resources/blog'),
    type: 'website',
  },
};

export default function BlogIndexPage() {
  const featuredPost = blogPosts.find((p) => p.featured) || blogPosts[0];
  const regularPosts = blogPosts.filter((p) => p.slug !== featuredPost.slug);

  const categories = [
    { label: 'All Articles', count: blogPosts.length, active: true },
    { label: 'Career Direction', count: blogPosts.filter(p => p.category === 'Career Direction').length },
    { label: 'Placement Readiness', count: blogPosts.filter(p => p.category === 'Placement Readiness').length },
    { label: 'Enterprise Capability', count: blogPosts.filter(p => p.category === 'Enterprise Capability').length },
  ];

  return (
    <>
      <Header />
      <main id="main" className="min-h-screen bg-[#f8fafc]">
        {/* Blog Header & Kicker */}
        <section className="border-b border-[#e2e8f0] bg-white pt-16 pb-12 md:pt-20 md:pb-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#edf2f8] text-[#173c6e] text-xs font-semibold mb-4 border border-[#d5e0ee]">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Pathwisse Publications</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-['Outfit'] text-[#0f172a] tracking-tight leading-[1.08] mb-4">
              Capability, Readiness & Career Direction
            </h1>
            <p className="text-base sm:text-lg text-[#475569] max-w-2xl leading-relaxed">
              Research notes, tactical frameworks, and evidence-grounded thinking for students navigating choices, colleges evaluating cohorts, and enterprises hiring capability.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2.5 mt-8 pt-6 border-t border-[#f1f5f9]">
              {categories.map((cat) => (
                <span
                  key={cat.label}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    cat.active
                      ? 'bg-[#173c6e] text-white shadow-xs'
                      : 'bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0]'
                  }`}
                >
                  {cat.label} <span className="opacity-70 ml-1">({cat.count})</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post Card */}
        {featuredPost && (
          <section className="max-w-6xl mx-auto px-6 py-12">
            <div className="rounded-2xl border border-[#cbd5e1] bg-white overflow-hidden shadow-md hover:shadow-lg transition-all grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs font-semibold text-[#2458ae] uppercase tracking-wider mb-3">
                    <span className="px-2.5 py-1 rounded-md bg-[#edf2f8] text-[#173c6e] font-bold">
                      FEATURED
                    </span>
                    <span>{featuredPost.category}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-['Outfit'] text-[#0f172a] tracking-tight leading-tight mb-4 hover:text-[#173c6e] transition-colors">
                    <Link href={`/resources/blog/${featuredPost.slug}`}>
                      {featuredPost.title}
                    </Link>
                  </h2>
                  <p className="text-[#334155] text-sm sm:text-base leading-relaxed mb-6">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-4 text-xs text-[#64748b] mb-6">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(featuredPost.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      5 min read
                    </span>
                    <span>•</span>
                    <span>{featuredPost.author}</span>
                  </div>

                  <Button asChild size="default" variant="default">
                    <Link href={`/resources/blog/${featuredPost.slug}`}>
                      Read Article <ArrowRight size={16} />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Decorative Cover Surface */}
              <div className="lg:col-span-5 bg-gradient-to-br from-[#173c6e] via-[#1a3d6b] to-[#2458ae] p-8 sm:p-12 flex flex-col justify-between text-white relative overflow-hidden">
                <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-12 translate-y-12">
                  <Compass className="w-72 h-72 text-white" />
                </div>
                <div className="relative z-10">
                  <span className="text-xs font-bold uppercase tracking-widest text-sky-300 block mb-2">
                    Research Brief
                  </span>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    Designed for students stuck between endless possible specializations. Learn how to run a personal career diagnostic.
                  </p>
                </div>
                <div className="relative z-10 pt-6 border-t border-white/20 flex items-center justify-between text-xs text-slate-200">
                  <span>Structured Guidance</span>
                  <span className="font-semibold text-white">Full Playbook ↗</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Regular Posts Grid */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#e2e8f0]">
            <h3 className="text-xl font-bold font-['Outfit'] text-[#0f172a]">
              All Published Analyses
            </h3>
            <span className="text-xs font-medium text-[#64748b]">
              Showing {blogPosts.length} articles
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {regularPosts.map((post) => (
              <article
                key={post.slug}
                className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-[#2458ae] mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#f1f5f9] text-[#173c6e]">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-[#64748b]">
                      <Clock className="w-3.5 h-3.5" /> 4 min read
                    </span>
                  </div>

                  <h4 className="text-xl font-bold font-['Outfit'] text-[#0f172a] tracking-tight leading-snug mb-3 hover:text-[#173c6e] transition-colors">
                    <Link href={`/resources/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h4>

                  <p className="text-sm text-[#475569] leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#f1f5f9] flex items-center justify-between text-xs text-[#64748b]">
                  <span>
                    {new Date(post.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <Link
                    href={`/resources/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 font-semibold text-[#173c6e] hover:text-[#2458ae]"
                  >
                    Read article <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

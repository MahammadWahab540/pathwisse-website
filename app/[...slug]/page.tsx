import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { pages, hubs, skills } from '../content';
import { Header, Footer } from '../site';
import { Experience } from '../experience';
import { ArrowRight, ArrowUpRight, CheckCircle2, Sparkles, ExternalLink } from 'lucide-react';
import { absoluteUrl, legacyRedirects, SITE_URL } from '@/lib/site-config';
import { ContactForm } from '../contact/form';
import { rawDb } from '../../db/raw';
import {
  PATHWISSE_ROLE_CARDS,
  getRoleCardBySlug,
  ALL_206_ROLE_CARDS,
  getSeoRoleContentBySlug,
  type SeoRoleContent,
} from '@/lib/role-card-data';
import { PathwisseRoleCard } from '@/components/careers/PathwisseRoleCard';

type Props = { params: Promise<{ slug: string[] }> };

function parseBlogRow(row: Record<string, unknown>): Record<string, any> {
  return {
    ...row,
    tags: JSON.parse((row.tags as string) || '[]'),
    faq: JSON.parse((row.faq as string) || '[]'),
    references: JSON.parse((row.references as string) || '[]'),
    relatedCareers: JSON.parse((row.related_careers as string) || '[]'),
    relatedSkills: JSON.parse((row.related_skills as string) || '[]'),
    relatedProducts: JSON.parse((row.related_products as string) || '[]'),
    relatedGuides: JSON.parse((row.related_guides as string) || '[]'),
  };
}

async function getBlogPostFromDb(slug: string) {
  try {
    const db = rawDb();
    const row = await db.prepare(
      "SELECT * FROM blog_posts WHERE slug = ? AND status = 'published'"
    ).bind(slug).first<Record<string, unknown>>();
    if (!row) return null;
    return parseBlogRow(row);
  } catch {
    return null;
  }
}

function parseCareerRoleRow(row: Record<string, unknown>): SeoRoleContent {
  return {
    slug: String(row.slug || ''),
    role_name: String(row.role_name || ''),
    stream_name: String(row.stream_name || ''),
    role_hook: String(row.role_hook || ''),
    what_work_looks_like: String(row.what_work_looks_like || ''),
    problems_solves: String(row.problems_solves || ''),
    skill_count: Number(row.skill_count || 15),
    top_skills: typeof row.top_skills === 'string' ? JSON.parse(row.top_skills || '[]') : ((row.top_skills as string[]) || []),
    proof_project: String(row.proof_project || ''),
    evidence_to_show: String(row.evidence_to_show || ''),
    pathwisse_approach: String(row.pathwisse_approach || ''),
    role_cta: String(row.role_cta || 'Try for Free on Pathwisse'),
    reference_skill: String(row.reference_skill || ''),
    reference_book: String(row.reference_book || ''),
    reference_author: String(row.reference_author || ''),
    onet_benchmark: String(row.onet_benchmark || ''),
    external_url: String(row.external_url || ''),
    seo_title: String(row.seo_title || ''),
    meta_description: String(row.meta_description || ''),
    faq: typeof row.faq === 'string' ? JSON.parse(row.faq || '[]') : ((row.faq as [string, string][]) || []),
  };
}

async function getCareerRoleFromDb(slug: string): Promise<SeoRoleContent | null> {
  try {
    const db = rawDb();
    const row = await db.prepare(
      'SELECT * FROM career_roles WHERE slug = ?'
    ).bind(slug).first<Record<string, unknown>>();
    if (row) return parseCareerRoleRow(row);
  } catch {
    // Database unavailable or during build time
  }
  return getSeoRoleContentBySlug(slug) || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const key = (await params).slug.join('/');
  const path = '/' + key;
  if (legacyRedirects[path]) return { title: 'Redirecting', robots: { index: false, follow: true } };

  // Check if blog post
  if (key.startsWith('resources/blog/') && key.split('/').length === 3) {
    const postSlug = key.split('/')[2];
    const post = await getBlogPostFromDb(postSlug);
    if (post) {
      const url = absoluteUrl(path);
      const rawTitle = (post.seo_title as string) || (post.title as string);
      const cleanTitle = rawTitle.replace(/\s*[|\-–—]\s*Pathwisse.*$/i, '').trim();
      return {
        title: cleanTitle,
        description: (post.meta_description as string) || (post.excerpt as string),
        alternates: { canonical: url },
        openGraph: { title: post.title as string, description: post.excerpt as string, url, type: 'article' },
        twitter: { card: 'summary_large_image', title: post.title as string, description: post.excerpt as string },
      };
    }
  }

  // Check if career role
  if (key.startsWith('careers/') && key.split('/').length === 2) {
    const roleSlug = key.split('/')[1];
    const role = await getCareerRoleFromDb(roleSlug);
    if (role) {
      const url = absoluteUrl(path);
      const rawTitle = role.seo_title || `${role.role_name} Career Roadmap, Skills & Projects | Pathwisse`;
      const cleanTitle = rawTitle.replace(/\s*[|\-–—]\s*Pathwisse.*$/i, '').trim();
      return {
        title: cleanTitle,
        description: role.meta_description || role.role_hook,
        alternates: { canonical: url },
        openGraph: {
          title: cleanTitle,
          description: role.meta_description || role.role_hook,
          url,
          type: 'article',
        },
        twitter: {
          card: 'summary_large_image',
          title: cleanTitle,
          description: role.meta_description || role.role_hook,
        },
      };
    }
  }

  const p = pages[key] || hubs[key];
  if (!p) return { title: 'Page not found', robots: { index: false, follow: false } };
  const url = absoluteUrl(path);
  return {
    title: 'seoTitle' in p && p.seoTitle ? p.seoTitle : p.title,
    description: 'metaDescription' in p && p.metaDescription ? p.metaDescription : p.description,
    alternates: { canonical: url },
    openGraph: { title: p.title, description: p.description, url, type: 'website' },
    twitter: { card: 'summary_large_image', title: p.title, description: p.description },
    robots: ('draft' in p && p.draft) || ('noindex' in p && p.noindex) ? { index: false, follow: true } : undefined,
  };
}

export default async function Page({ params }: Props) {
  const key = (await params).slug.join('/');
  const path = '/' + key;
  if (legacyRedirects[path]) permanentRedirect(legacyRedirects[path]);

  // Check D1 Blog post
  const isBlogPost = key.startsWith('resources/blog/') && key.split('/').length === 3;
  if (isBlogPost) {
    const postSlug = key.split('/')[2];
    const post = await getBlogPostFromDb(postSlug);
    if (!post) notFound();

    const url = absoluteUrl(path);
    const faq = (post.faq as [string, string][]) || [];
    const relatedCareers = (post.relatedCareers as string[]) || [];
    const relatedProducts = (post.relatedProducts as string[]) || [];

    const schema: object[] = [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        url,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        author: {
          '@type': 'Person',
          name: post.author,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Pathwisse',
          url: SITE_URL,
          logo: {
            '@type': 'ImageObject',
            url: absoluteUrl('/favicon.svg'),
          },
        },
        datePublished: post.publish_date,
        dateModified: post.modified_date || post.publish_date,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: absoluteUrl('/resources/blog') },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
    ];

    if (faq.length) {
      schema.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
      });
    }

    const related = [...relatedProducts, ...relatedCareers.map((c: string) => `careers/${c}`)];

    return (
      <>
        <Header />
        <main id="main">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
          <section className="inner-hero with-product">
            <div>
              <nav aria-label="Breadcrumb" className="breadcrumb">
                <a href="/" className="hover:text-[#2458ae]">Home</a>
                <span aria-hidden="true">/</span>
                <a href="/resources/blog" className="hover:text-[#2458ae]">Blog</a>
                <span aria-hidden="true">/</span>
                <span className="text-[#142e50] font-medium" aria-current="page">{String(post.category)}</span>
              </nav>
              <span className="eyebrow">{String(post.category).toUpperCase()}</span>
              <h1>{String(post.title)}</h1>
              <p>{String(post.excerpt)}</p>
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', fontSize: '0.875rem', color: '#64748B', margin: '1rem 0 1.5rem', flexWrap: 'wrap' }}>
                <span>By <strong style={{ color: '#1E293B' }}>{String(post.author || 'Pathwisse Research')}</strong></span>
                <span>•</span>
                <time dateTime={String(post.publish_date)}>Published: {new Date(String(post.publish_date)).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</time>
                {post.modified_date && (
                  <>
                    <span>•</span>
                    <time dateTime={String(post.modified_date)}>Updated: {new Date(String(post.modified_date)).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</time>
                  </>
                )}
              </div>
              <a className="button" href={String(post.cta_url || '/contact')}>
                {post.cta_type === 'career_voice' ? 'Explore with Career Voice' : 'Talk to Pathwisse'}
                <ArrowRight size={16} />
              </a>
            </div>
          </section>

          <div className="article-layout">
            <aside className="article-nav">
              <span className="eyebrow">ON THIS PAGE</span>
              <a href="#section-summary">Summary</a>
              <a href="#section-guide">Guide</a>
              {faq.length > 0 && <a href="#questions">Common questions</a>}
            </aside>
            <article>
              <section id="section-summary">
                <span className="eyebrow">01</span>
                <h2>Summary</h2>
                <p>{String(post.excerpt)}</p>
              </section>
              <section id="section-guide">
                <span className="eyebrow">02</span>
                <h2>Guide</h2>
                <div style={{ whiteSpace: 'pre-line', lineHeight: '1.75' }}>{String(post.body)}</div>
              </section>
              {faq.length > 0 && (
                <section id="questions" className="faq">
                  <span className="eyebrow">A LITTLE MORE CLARITY</span>
                  <h2>Common questions</h2>
                  {faq.map(([q, a]) => (
                    <details key={q}>
                      <summary>{q}<span>+</span></summary>
                      <p>{a}</p>
                    </details>
                  ))}
                </section>
              )}
            </article>
          </div>

          {related.length > 0 && (
            <section className="related">
              <span className="eyebrow">CONNECT YOUR NEXT STEP</span>
              <h2>Keep exploring.</h2>
              <div>
                {related.map((rpath) => (
                  <a key={rpath} href={'/' + rpath}>
                    {(pages[rpath] || hubs[rpath])?.title || 'Explore'}
                    <ArrowUpRight size={18} />
                  </a>
                ))}
              </div>
            </section>
          )}

          <section className="inner-cta">
            <h2>Make the next step a clear one.</h2>
            <a className="button" href={String(post.cta_url || '/contact')}>
              {post.cta_type === 'career_voice' ? 'Explore with Career Voice' : 'Talk to Pathwisse'}
              <ArrowRight size={16} />
            </a>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  // Check D1 Career Role
  const isCareerRole = key.startsWith('careers/') && key.split('/').length === 2;
  if (isCareerRole) {
    const roleSlug = key.split('/')[1];
    const role = await getCareerRoleFromDb(roleSlug);
    if (role) {
      const url = absoluteUrl(path);
      const roleCard = getRoleCardBySlug(roleSlug);
      const relatedRoles = ALL_206_ROLE_CARDS
        .filter((r) => r.streamName === role.stream_name && r.slug !== role.slug)
        .slice(0, 4);

      const schema: object[] = [
        {
          '@context': 'https://schema.org',
          '@type': 'Occupation',
          name: role.role_name,
          description: role.meta_description || role.role_hook,
          occupationalCategory: role.stream_name,
          skills: role.top_skills.join(', '),
          responsibilities: role.what_work_looks_like,
          qualifications: role.proof_project,
          mainEntityOfPage: { '@type': 'WebPage', '@id': url },
          ...(role.onet_benchmark ? { code: role.onet_benchmark } : {}),
          publisher: {
            '@type': 'Organization',
            name: 'Pathwisse',
            url: SITE_URL,
            logo: {
              '@type': 'ImageObject',
              url: absoluteUrl('/favicon.svg'),
            },
          },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Careers Universe', item: absoluteUrl('/careers') },
            { '@type': 'ListItem', position: 3, name: role.stream_name, item: absoluteUrl(`/hire?stream=${encodeURIComponent(role.stream_name)}`) },
            { '@type': 'ListItem', position: 4, name: role.role_name, item: url },
          ],
        },
      ];

      if (role.faq && role.faq.length > 0) {
        schema.push({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: role.faq.map(([q, a]) => ({
            '@type': 'Question',
            name: q,
            acceptedAnswer: { '@type': 'Answer', text: a },
          })),
        });
      }

      const tryForFreeUrl = `https://app.pathwisse.com/auth?intent=try_free&role=${encodeURIComponent(role.slug)}`;
      const hireUrl = `/hire?role=${encodeURIComponent(role.slug)}&stream=${encodeURIComponent(role.stream_name)}`;

      return (
        <>
          <Header />
          <main id="main">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
            />

            {/* HERO SECTION */}
            <section className="inner-hero with-product bg-gradient-to-b from-[#f8fafc] to-white border-b border-[#e2e8f0]">
              <div>
                <nav aria-label="Breadcrumb" className="breadcrumb mb-6">
                  <a href="/" className="hover:text-[#2458ae]">Home</a>
                  <span aria-hidden="true">/</span>
                  <a href="/careers" className="hover:text-[#2458ae]">Careers Universe</a>
                  <span aria-hidden="true">/</span>
                  <a href={`/hire?stream=${encodeURIComponent(role.stream_name)}`} className="hover:text-[#2458ae]">
                    {role.stream_name}
                  </a>
                  <span aria-hidden="true">/</span>
                  <span className="text-[#142e50] font-semibold" aria-current="page">
                    {role.role_name}
                  </span>
                </nav>

                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono font-semibold uppercase tracking-wider bg-[#edf2f8] text-[#173c6e] border border-[#d5dfeb]">
                    {role.stream_name}
                  </span>
                  {role.onet_benchmark && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-mono font-medium text-[#64748b] bg-[#f1f5f9] border border-[#e2e8f0]">
                      O*NET {role.onet_benchmark.split(' - ')[0]}
                    </span>
                  )}
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0f172a] leading-tight mb-4">
                  {role.role_name}
                </h1>

                <p className="text-base sm:text-lg text-[#475569] leading-relaxed mb-8 max-w-2xl">
                  {role.role_hook}
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    className="button inline-flex items-center gap-2.5 bg-[#173c6e] hover:bg-[#2458ae] text-white px-6 py-3.5 rounded-lg font-semibold text-sm transition-all shadow-sm"
                    href={tryForFreeUrl}
                  >
                    <Sparkles size={16} className="text-[#93c5fd]" />
                    <span>Try for Free on Pathwisse</span>
                  </a>
                  <a
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg font-semibold text-sm text-[#173c6e] hover:text-[#2458ae] bg-white border border-[#cbd5e1] hover:border-[#94a3b8] transition-all"
                    href={hireUrl}
                  >
                    <span>Hire {role.role_name}</span>
                    <ArrowRight size={16} />
                  </a>
                </div>

                <div className="flex items-center gap-6 mt-6 pt-6 border-t border-[#e2e8f0] text-xs text-[#64748b] font-mono">
                  <span><strong>{role.skill_count}</strong> Skills Mapped</span>
                  <span>•</span>
                  <span><strong>1</strong> Signature Proof Project</span>
                  <span>•</span>
                  <span><strong>Free</strong> Diagnostic Assessment</span>
                </div>
              </div>

              {roleCard && (
                <div className="inner-product flex justify-center lg:justify-end py-4">
                  <PathwisseRoleCard role={roleCard} isHero className="max-w-[340px] w-full" />
                </div>
              )}
            </section>

            {/* ARTICLE LAYOUT */}
            <div className="article-layout">
              <aside className="article-nav">
                <span className="eyebrow">ON THIS PAGE</span>
                <a href="#work-in-practice">01. Work in Practice</a>
                <a href="#problems-solved">02. Problems Solved</a>
                <a href="#skill-progression">03. Core Skill Progression</a>
                <a href="#proof-project">04. Signature Proof Project</a>
                <a href="#academic-benchmark">05. Industry Benchmark</a>
                <a href="#pathwisse-method">06. Learning Approach</a>
                {role.faq && role.faq.length > 0 && <a href="#questions">07. Common Questions</a>}
              </aside>

              <article className="space-y-12">
                {/* 01: What the Work Actually Looks Like */}
                <section id="work-in-practice" className="scroll-mt-24">
                  <span className="eyebrow text-[#0d7a53] font-mono font-bold tracking-wider">01 · PRACTICAL EXECUTION</span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mt-2 mb-4">
                    What the Work Actually Looks Like in Practice
                  </h2>
                  <div className="text-base text-[#334155] leading-relaxed bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-6 sm:p-7">
                    <p className="text-base sm:text-lg leading-relaxed text-[#1e293b]">
                      {role.what_work_looks_like}
                    </p>
                  </div>
                </section>

                {/* 02: High-Impact Problems This Role Solves */}
                <section id="problems-solved" className="scroll-mt-24">
                  <span className="eyebrow text-[#c86011] font-mono font-bold tracking-wider">02 · COMMERCIAL & TECHNICAL VALUE</span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mt-2 mb-4">
                    High-Impact Problems This Role Solves
                  </h2>
                  <div className="text-base text-[#334155] leading-relaxed bg-white border border-[#e2e8f0] rounded-xl p-6 sm:p-7 shadow-xs">
                    <p className="text-base leading-relaxed text-[#334155]">
                      {role.problems_solves}
                    </p>
                  </div>
                </section>

                {/* 03: Core Skills Progression */}
                <section id="skill-progression" className="scroll-mt-24">
                  <span className="eyebrow text-[#2458ae] font-mono font-bold tracking-wider">03 · CAPABILITY SPECTRUM</span>
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mt-2 mb-4">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a]">
                      Core Skill Stack & Progression
                    </h2>
                    <span className="text-xs font-mono font-semibold px-2.5 py-1 bg-[#edf2f8] text-[#173c6e] rounded border border-[#d5dfeb]">
                      {role.skill_count} Verified Skills Evaluated
                    </span>
                  </div>
                  <p className="text-sm text-[#64748b] mb-5">
                    Pathwisse evaluates concrete applied capability across each technical domain rather than superficial keyword matching:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {role.top_skills.map((skill, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg transition-colors hover:border-[#cbd5e1]"
                      >
                        <CheckCircle2 size={18} className="text-[#059669] shrink-0 mt-0.5" />
                        <div>
                          <span className="text-sm font-semibold text-[#0f172a] block">{skill}</span>
                          <span className="text-[11px] font-mono text-[#64748b]">Core competency · Rubric assessed</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 bg-[#f0fdf4] border border-[#bbf7d0] rounded-lg text-xs text-[#166534] leading-relaxed">
                    <strong>How readiness scoring works:</strong> Each competency is verified through step-by-step simulations, automated linting, test benches, and peer review before earning a verified readiness badge.
                  </div>
                </section>

                {/* 04: Signature Proof Project & Evidence */}
                <section id="proof-project" className="scroll-mt-24">
                  <span className="eyebrow text-[#7c3aed] font-mono font-bold tracking-wider">04 · VERIFIABLE EVIDENCE</span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mt-2 mb-4">
                    Signature Proof Project & Evidence to Show
                  </h2>
                  <div className="bg-[#fff] border-2 border-[#1e293b]/10 rounded-xl p-6 sm:p-7 shadow-xs space-y-5">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#7c3aed] bg-[#f5f3ff] px-2.5 py-0.5 rounded border border-[#ddd6fe]">
                          Capstone Portfolio Artifact
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-[#0f172a] mt-2">
                        {role.proof_project}
                      </h3>
                    </div>

                    <div className="border-t border-[#e2e8f0] pt-4">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748b] mb-2">
                        Tangible Evidence Hiring Managers Inspect:
                      </h4>
                      <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-4 font-mono text-xs text-[#1e293b] leading-relaxed">
                        {role.evidence_to_show}
                      </div>
                    </div>

                    <p className="text-xs text-[#64748b] leading-relaxed">
                      Employers evaluating early-career candidates value verified, reproducible project deliverables over generic claims. This project artifact demonstrates direct execution ability from day one.
                    </p>
                  </div>
                </section>

                {/* 05: Academic & Industry Grounding */}
                <section id="academic-benchmark" className="scroll-mt-24">
                  <span className="eyebrow text-[#0284c7] font-mono font-bold tracking-wider">05 · ACADEMIC & INDUSTRY GROUNDING</span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mt-2 mb-4">
                    Authoritative Benchmarks & Curated References
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 bg-white border border-[#e2e8f0] rounded-xl">
                      <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#0284c7] block mb-2">
                        Curated Engineering Reference
                      </span>
                      <h4 className="font-semibold text-sm text-[#0f172a] mb-1">
                        {role.reference_book || 'Standard Engineering Reference'}
                      </h4>
                      <p className="text-xs text-[#64748b]">
                        Author / Source: <strong className="text-[#334155]">{role.reference_author || 'Standard Academic Curriculum'}</strong>
                      </p>
                      {role.reference_skill && (
                        <div className="mt-3 pt-3 border-t border-[#f1f5f9] text-[11px] text-[#64748b]">
                          Focus Domain: <span className="font-medium text-[#1e293b]">{role.reference_skill}</span>
                        </div>
                      )}
                    </div>

                    <div className="p-5 bg-white border border-[#e2e8f0] rounded-xl flex flex-col justify-between">
                      <div>
                        <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#0284c7] block mb-2">
                          Official Occupational Standard
                        </span>
                        <h4 className="font-semibold text-sm text-[#0f172a] mb-1">
                          {role.onet_benchmark || 'Engineering Professional Benchmark'}
                        </h4>
                        <p className="text-xs text-[#64748b]">
                          Standardized occupational taxonomy mapped to US Department of Labor & global competencies.
                        </p>
                      </div>
                      {role.external_url && (
                        <a
                          href={role.external_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0284c7] hover:text-[#0369a1] mt-4"
                        >
                          <span>View O*NET Occupational Code</span>
                          <ExternalLink size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                </section>

                {/* 06: Pathwisse Capability Methodology */}
                <section id="pathwisse-method" className="scroll-mt-24">
                  <span className="eyebrow text-[#0d7a53] font-mono font-bold tracking-wider">06 · PATHWISSE APPROACH</span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mt-2 mb-4">
                    The Pathwisse Capability Methodology
                  </h2>
                  <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-6 sm:p-7">
                    <p className="text-base leading-relaxed text-[#334155] mb-4">
                      {role.pathwisse_approach}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#64748b] pt-4 border-t border-[#e2e8f0]">
                      <span>✓ Step-by-step diagnostic milestones</span>
                      <span>✓ Authentic industry failure mode simulations</span>
                      <span>✓ Rubric-scored portfolio evidence</span>
                    </div>
                  </div>
                </section>

                {/* 07: FAQ Accordion */}
                {role.faq && role.faq.length > 0 && (
                  <section id="questions" className="faq scroll-mt-24">
                    <span className="eyebrow">A LITTLE MORE CLARITY</span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mt-2 mb-6">
                      Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                      {role.faq.map(([q, a], idx) => (
                        <details key={idx} className="group border border-[#e2e8f0] rounded-lg p-5 bg-white">
                          <summary className="font-semibold text-base text-[#0f172a] cursor-pointer flex items-center justify-between gap-4">
                            <span>{q}</span>
                            <span className="text-[#64748b] group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                          </summary>
                          <p className="text-sm text-[#475569] leading-relaxed mt-3 pt-3 border-t border-[#f1f5f9]">
                            {a}
                          </p>
                        </details>
                      ))}
                    </div>
                  </section>
                )}
              </article>
            </div>

            {/* RELATED ROLES IN THE SAME STREAM */}
            {relatedRoles.length > 0 && (
              <section className="related">
                <span className="eyebrow">DISCOVER ADJACENT ENGINEERING ROLES</span>
                <h2>More roles in {role.stream_name}</h2>
                <div>
                  {relatedRoles.map((r) => (
                    <a key={r.slug} href={`/careers/${r.slug}`} className="group hover:text-[#2458ae]">
                      <div>
                        <strong className="block text-[#0f172a] group-hover:text-[#2458ae] font-semibold">
                          {r.roleName}
                        </strong>
                        <span className="text-xs text-[#64748b] font-mono">
                          {r.skillsCount} skills · {r.projectsCount} projects
                        </span>
                      </div>
                      <ArrowUpRight size={18} className="text-[#64748b] group-hover:text-[#2458ae] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  ))}
                </div>
              </section>
            )}

            {/* BOTTOM CONVERSION HERO */}
            <section className="inner-cta bg-[#142e50] text-white py-14 px-6 sm:px-12 rounded-none flex-col sm:flex-row text-center sm:text-left justify-between items-center max-w-5xl mx-auto my-16 rounded-2xl gap-8 shadow-md">
              <div className="max-w-xl">
                <span className="text-xs font-mono uppercase tracking-wider text-[#93c5fd] font-semibold block mb-2">
                  VERIFIED CAPABILITY BLUEPRINT
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  Start building verified readiness for {role.role_name}
                </h2>
                <p className="text-sm text-[#cbd5e1] leading-relaxed">
                  Access tailored roadmaps, hands-on proof project blueprints, and diagnostic readiness scoring. Free to start.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                <a
                  className="button w-full sm:w-auto bg-[#ffffff] text-[#142e50] hover:bg-[#f1f5f9] px-6 py-3.5 rounded-lg font-semibold text-sm transition-all text-center justify-center flex items-center gap-2"
                  href={tryForFreeUrl}
                >
                  <Sparkles size={16} className="text-[#2563eb]" />
                  <span>Try for free</span>
                </a>
                <a
                  className="w-full sm:w-auto px-5 py-3.5 rounded-lg font-semibold text-sm text-white hover:text-[#93c5fd] border border-white/20 hover:border-white/40 transition-all text-center"
                  href={hireUrl}
                >
                  <span>Hire Talent</span>
                </a>
              </div>
            </section>
          </main>
          <Footer />
        </>
      );
    }
  }

  const p = pages[key], hub = hubs[key];
  if (!p && !hub) notFound();
  const item = p || hub;
  const url = absoluteUrl(path);

  // Determine specific Schema type for AI search disambiguation
  let primaryType = 'WebPage';
  if (key.startsWith('careers/')) {
    primaryType = 'Occupation';
  } else if (key.startsWith('guides/')) {
    primaryType = 'Article';
  } else if (key.startsWith('skills/')) {
    primaryType = 'DefinedTerm';
  }

  const schema: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': primaryType,
      name: item.title,
      description: item.description,
      url,
      publisher: {
        '@type': 'Organization',
        name: 'Pathwisse',
        url: SITE_URL,
        logo: absoluteUrl('/favicon.svg'),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: item.title, item: url }
      ]
    },
  ];
  if (p?.faq) schema.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: p.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
  const source = (skills.find((s) => 'skills/' + s.slug === key) as { source?: string } | undefined)?.source;
  const showCampaignForm = p?.kind === 'campaign';

  return (
    <>
      <Header />
      <main id="main">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
        <section className={'inner-hero ' + (p?.kind ? 'with-product' : '')}>
          <div>
            <nav aria-label="Breadcrumb" className="breadcrumb">
              <a href="/" className="hover:text-[#2458ae]">Home</a>
              <span aria-hidden="true">/</span>
              {key.includes('/') ? (
                <>
                  <a href={`/${key.split('/')[0]}`} className="hover:text-[#2458ae] capitalize">
                    {key.split('/')[0].replaceAll('-', ' ')}
                  </a>
                  <span aria-hidden="true">/</span>
                  <span className="text-[#142e50] font-medium" aria-current="page">{item.title}</span>
                </>
              ) : (
                <span className="text-[#142e50] font-medium" aria-current="page">{item.title}</span>
              )}
            </nav>
            <span className="eyebrow">{p?.eyebrow || 'EXPLORE PATHWISSE'}</span>
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            {p?.cta && <a className="button" href={p.href}>{p.cta}<ArrowRight size={16} /></a>}
          </div>
          {p?.kind === 'career' ? (() => {
            const roleSlug = key.replace('careers/', '');
            const matchingCard = getRoleCardBySlug(roleSlug);
            return matchingCard ? (
              <div className="inner-product flex justify-center lg:justify-end py-4">
                <PathwisseRoleCard role={matchingCard} isHero className="max-w-[340px] w-full" />
              </div>
            ) : (
              <div className="inner-product"><Experience kind={p.kind} /></div>
            );
          })() : p?.kind ? (
            <div className="inner-product"><Experience kind={p.kind} /></div>
          ) : null}
        </section>
        {hub ? (
          <section className="hub-list">
            {hub.items.map((hpath, i) => {
              const x = pages[hpath] || hubs[hpath];
              return (
                <a href={'/' + hpath} key={hpath}>
                  <span className="hub-number">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <span className="eyebrow">{'eyebrow' in x ? x.eyebrow : hpath.toUpperCase()}</span>
                    <h2>{x?.title || hpath}</h2>
                    <p>{x?.description || ''}</p>
                  </div>
                  <ArrowUpRight size={24} />
                </a>
              );
            })}
          </section>
        ) : (
          <>
            <div className="article-layout">
              <aside className="article-nav">
                <span className="eyebrow">ON THIS PAGE</span>
                {p.sections.map(([title], i) => (
                  <a key={title} href={'#section-' + i}>{title}</a>
                ))}
                {p.faq && <a href="#questions">Common questions</a>}
              </aside>
              <article>
                {p.sections.map(([title, text], i) => (
                  <section id={'section-' + i} key={title}>
                    <span className="eyebrow">0{i + 1}</span>
                    <h2>{title}</h2>
                    <p>{text}</p>
                  </section>
                ))}
                {source && (
                  <p className="source-link">Further learning: <a href={source} target="_blank" rel="noreferrer">Official {p.title} documentation ↗</a></p>
                )}
                {p.faq && (
                  <section id="questions" className="faq">
                    <span className="eyebrow">A LITTLE MORE CLARITY</span>
                    <h2>Common questions</h2>
                    {p.faq.map(([q, a]) => (
                      <details key={q}>
                        <summary>{q}<span>+</span></summary>
                        <p>{a}</p>
                      </details>
                    ))}
                  </section>
                )}
              </article>
            </div>
            {p.related && (
              <section className="related">
                <span className="eyebrow">CONNECT YOUR NEXT STEP</span>
                <h2>Keep exploring.</h2>
                <div>
                  {p.related.map((rpath) => (
                    <a key={rpath} href={'/' + rpath}>
                      {(pages[rpath] || hubs[rpath])?.title || 'Contact Pathwisse'}
                      <ArrowUpRight size={18} />
                    </a>
                  ))}
                </div>
              </section>
            )}
            {showCampaignForm && (
              <section className="campaign-form">
                <div>
                  <span className="eyebrow">LEAD CAPTURE</span>
                  <h2>Continue with Pathwisse.</h2>
                  <p>Share your details and the Pathwisse team will respond with the right next step for this campaign.</p>
                </div>
                <ContactForm />
              </section>
            )}
            {p.cta && (
              <section className="inner-cta">
                <h2>Make the next step a clear one.</h2>
                <a className="button" href={p.href}>{p.cta}<ArrowRight size={16} /></a>
              </section>
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

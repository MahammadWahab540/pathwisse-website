import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { pages, hubs, skills } from '../content';
import { Header, Footer } from '../site';
import { Experience } from '../experience';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { absoluteUrl, legacyRedirects, SITE_URL } from '@/lib/site-config';
import { ContactForm } from '../contact/form';
import { rawDb } from '../../db/raw';
import { PATHWISSE_ROLE_CARDS, getRoleCardBySlug } from '@/lib/role-card-data';
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

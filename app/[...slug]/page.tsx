import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { pages,hubs,skills } from '../content';
import { Header,Footer } from '../site';
import { Experience } from '../experience';
import { ArrowRight,ArrowUpRight } from 'lucide-react';
import { absoluteUrl, legacyRedirects, SITE_URL } from '@/lib/site-config';
import { ContactForm } from '../contact/form';

type Props={params:Promise<{slug:string[]}>};

// Fetch a single blog post from the backend API
async function fetchBlogPost(slug: string): Promise<Record<string, unknown> | null> {
  try {
    const res = await fetch(absoluteUrl(`/api/blog/${slug}`), { next: { revalidate: 300 } });
    if (!res.ok) return null;
    const data = await res.json() as { post?: Record<string, unknown> };
    return data.post ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({params}:Props):Promise<Metadata>{const key=(await params).slug.join('/');const path='/'+key;if(legacyRedirects[path])return {title:'Redirecting',robots:{index:false,follow:true}};const p=pages[key]||hubs[key];if(!p)return {title:'Page not found',robots:{index:false,follow:false}};const url=absoluteUrl(path);return {title:'seoTitle'in p&&p.seoTitle?p.seoTitle:p.title,description:'metaDescription'in p&&p.metaDescription?p.metaDescription:p.description,alternates:{canonical:url},openGraph:{title:p.title,description:p.description,url,type:'website'},twitter:{card:'summary_large_image',title:p.title,description:p.description},robots:('draft' in p&&p.draft)||('noindex'in p&&p.noindex)?{index:false,follow:true}:undefined};}
export default async function Page({params}:Props){
  const key=(await params).slug.join('/'),path='/'+key;
  if(legacyRedirects[path])permanentRedirect(legacyRedirects[path]);

  // Blog posts are served from the database
  const isBlogPost = key.startsWith('resources/blog/') && key.split('/').length === 3;
  if (isBlogPost) {
    const postSlug = key.split('/')[2];
    const post = await fetchBlogPost(postSlug);
    if (!post) notFound();
    const url = absoluteUrl(path);
    const faq = (post.faq as [string,string][]) || [];
    const relatedCareers = (post.relatedCareers as string[]) || [];
    const relatedProducts = (post.relatedProducts as string[]) || [];
    const schema: object[] = [
      {'@context':'https://schema.org','@type':'Article',headline:post.title,description:post.excerpt,url,author:{'@type':'Organization',name:post.author},datePublished:post.publishDate,dateModified:post.modifiedDate},
      {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:SITE_URL},{'@type':'ListItem',position:2,name:'Blog',item:absoluteUrl('/resources/blog')},{'@type':'ListItem',position:3,name:post.title,item:url}]},
    ];
    if(faq.length)schema.push({'@context':'https://schema.org','@type':'FAQPage',mainEntity:faq.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))});
    const related = [...relatedProducts, ...relatedCareers.map((c:string) => `careers/${c}`)];
    return <><Header/><main id="main"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/><section className="inner-hero with-product"><div><a href="/resources/blog" className="breadcrumb">Blog <span>/</span> {String(post.category)}</a><span className="eyebrow">{String(post.category).toUpperCase()}</span><h1>{String(post.title)}</h1><p>{String(post.excerpt)}</p><a className="button" href={String(post.ctaUrl)}>{post.ctaType === 'career_voice' ? 'Explore with Career Voice' : 'Talk to Pathwisse'}<ArrowRight size={16}/></a></div></section><div className="article-layout"><aside className="article-nav"><span className="eyebrow">ON THIS PAGE</span><a href="#section-summary">Summary</a><a href="#section-guide">Guide</a>{faq.length > 0 && <a href="#questions">Common questions</a>}</aside><article><section id="section-summary"><span className="eyebrow">01</span><h2>Summary</h2><p>{String(post.excerpt)}</p></section><section id="section-guide"><span className="eyebrow">02</span><h2>Guide</h2><p>{String(post.body)}</p></section>{faq.length > 0 && <section id="questions" className="faq"><span className="eyebrow">A LITTLE MORE CLARITY</span><h2>Common questions</h2>{faq.map(([q,a])=><details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</section>}</article></div>{related.length > 0 && <section className="related"><span className="eyebrow">CONNECT YOUR NEXT STEP</span><h2>Keep exploring.</h2><div>{related.map(rpath=><a key={rpath} href={'/'+rpath}>{(pages[rpath]||hubs[rpath])?.title||'Explore'}<ArrowUpRight size={18}/></a>)}</div></section>}<section className="inner-cta"><h2>Make the next step a clear one.</h2><a className="button" href={String(post.ctaUrl)}>{post.ctaType === 'career_voice' ? 'Explore with Career Voice' : 'Talk to Pathwisse'}<ArrowRight size={16}/></a></section></main><Footer/></>;
  }

  const p=pages[key],hub=hubs[key];if(!p&&!hub)notFound();const item=p||hub;const url=absoluteUrl(path);const schema:object[]=[{'@context':'https://schema.org','@type':'WebPage',name:item.title,description:item.description,url},{'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:SITE_URL},{'@type':'ListItem',position:2,name:item.title,item:url}]}];if(p?.faq)schema.push({'@context':'https://schema.org','@type':'FAQPage',mainEntity:p.faq.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))});
  const source=(skills.find(s=>'skills/'+s.slug===key) as { source?: string } | undefined)?.source;
  const showCampaignForm=p?.kind==='campaign';
  return <><Header/><main id="main"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/><section className={'inner-hero '+(p?.kind?'with-product':'')}><div><a href="/" className="breadcrumb">Home <span>/</span> {key.split('/')[0].replaceAll('-',' ')}</a><span className="eyebrow">{p?.eyebrow||'EXPLORE PATHWISSE'}</span><h1>{item.title}</h1><p>{item.description}</p>{p?.cta&&<a className="button" href={p.href}>{p.cta}<ArrowRight size={16}/></a>}</div>{p?.kind&&<div className="inner-product"><Experience kind={p.kind} slug={p.slug}/></div>}</section>{hub?<section className="hub-list">{hub.items.map((path,i)=>{const x=pages[path]||hubs[path];return <a href={'/'+path} key={path}><span className="hub-number">{String(i+1).padStart(2,'0')}</span><div><span className="eyebrow">{'eyebrow'in x?x.eyebrow:path.toUpperCase()}</span><h2>{x.title}</h2><p>{x.description}</p></div><ArrowUpRight size={24}/></a>})}</section>:<><div className="article-layout"><aside className="article-nav"><span className="eyebrow">ON THIS PAGE</span>{p.sections.map(([title],i)=><a key={title} href={'#section-'+i}>{title}</a>)}{p.faq&&<a href="#questions">Common questions</a>}</aside><article>{p.sections.map(([title,text],i)=><section id={'section-'+i} key={title}><span className="eyebrow">0{i+1}</span><h2>{title}</h2><p>{text}</p></section>)}{source&&<p className="source-link">Further learning: <a href={source} target="_blank" rel="noreferrer">Official {p.title} documentation ↗</a></p>}{p.faq&&<section id="questions" className="faq"><span className="eyebrow">A LITTLE MORE CLARITY</span><h2>Common questions</h2>{p.faq.map(([q,a])=><details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</section>}</article></div>{p.related&&<section className="related"><span className="eyebrow">CONNECT YOUR NEXT STEP</span><h2>Keep exploring.</h2><div>{p.related.map(path=><a key={path} href={'/'+path}>{(pages[path]||hubs[path])?.title||'Contact Pathwisse'}<ArrowUpRight size={18}/></a>)}</div></section>}{showCampaignForm&&<section className="campaign-form"><div><span className="eyebrow">LEAD CAPTURE</span><h2>Continue with Pathwisse.</h2><p>Share your details and the Pathwisse team will respond with the right next step for this campaign.</p></div><ContactForm/></section>}{p.cta&&<section className="inner-cta"><h2>Make the next step a clear one.</h2><a className="button" href={p.href}>{p.cta}<ArrowRight size={16}/></a></section>}</>}</main><Footer/></>}






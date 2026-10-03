import { absoluteUrl } from '@/lib/site-config';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin', '/admin/', '/campaigns/'],
      },
      // Search engine & AI discovery crawlers (ChatGPT Search, Claude Search, Perplexity)
      {
        userAgent: ['OAI-SearchBot', 'Claude-SearchBot', 'PerplexityBot', 'Googlebot', 'Bingbot'],
        allow: '/',
        disallow: ['/api/', '/admin/', '/campaigns/'],
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}


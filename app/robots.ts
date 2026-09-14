import { absoluteUrl } from '@/lib/site-config';

export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/campaigns/'] },
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}

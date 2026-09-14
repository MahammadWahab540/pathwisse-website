import { absoluteUrl } from '@/lib/site-config';
import { blogPosts } from '../../../content';

export function GET() {
  const items = blogPosts.filter((post) => post.status === 'published').map((post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${absoluteUrl(`/resources/blog/${post.slug}`)}</link>
      <guid>${absoluteUrl(`/resources/blog/${post.slug}`)}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.publishDate).toUTCString()}</pubDate>
    </item>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0"><channel><title>Pathwisse Blog</title><link>${absoluteUrl('/resources/blog')}</link><description>Career readiness, placement intelligence, and workforce capability.</description>${items}</channel></rss>`, {
    headers: { 'content-type': 'application/rss+xml; charset=utf-8' },
  });
}

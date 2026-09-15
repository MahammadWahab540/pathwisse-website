import { absoluteUrl } from '@/lib/site-config';
import { rawDb } from '@/db/raw';

export async function GET() {
  let items = '';
  try {
    const db = rawDb();
    const rows = (await db.prepare(
      "SELECT slug, title, excerpt, publish_date FROM blog_posts WHERE status = 'published' ORDER BY publish_date DESC"
    ).all()).results as { slug: string; title: string; excerpt: string; publish_date: string }[];

    items = rows.map((post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${absoluteUrl(`/resources/blog/${post.slug}`)}</link>
      <guid>${absoluteUrl(`/resources/blog/${post.slug}`)}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.publish_date).toUTCString()}</pubDate>
    </item>`).join('');
  } catch {
    // Return empty feed if DB is unavailable
    items = '';
  }

  return new Response(`<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0"><channel><title>Pathwisse Blog</title><link>${absoluteUrl('/resources/blog')}</link><description>Career readiness, placement intelligence, and workforce capability.</description>${items}</channel></rss>`, {
    headers: { 'content-type': 'application/rss+xml; charset=utf-8' },
  });
}

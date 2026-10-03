import { absoluteUrl } from '@/lib/site-config';
import { indexablePaths } from './content';
import { rawDb } from '../db/raw';

export default async function sitemap() {
  let blogPaths: string[] = [];
  try {
    const db = rawDb();
    const rows = await db.prepare("SELECT slug, modified_date FROM blog_posts WHERE status = 'published'").all<{ slug: string; modified_date: string }>();
    if (rows && rows.results) {
      blogPaths = rows.results.map((r) => `resources/blog/${r.slug}`);
    }
  } catch {
    // fallback if db is unavailable during static generation
  }

  const allPaths = Array.from(new Set([...indexablePaths, ...blogPaths]));

  return [
    { url: absoluteUrl('/') },
    ...allPaths.map((path) => ({ url: absoluteUrl(`/${path}`) })),
    { url: absoluteUrl('/contact') },
    { url: absoluteUrl('/career-audit/start') },
  ];
}

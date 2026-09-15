import { rawDb, allowedOrigin, smallJson } from '../../../db/raw';

// Helper: parse JSON columns stored as text
function parseBlogRow(row: Record<string, unknown>) {
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

// GET /api/blog — list all published blog posts (or all if ?status=all with API key)
export async function GET(request: Request) {
  const url = new URL(request.url);
  const status = url.searchParams.get('status');
  const apiKey = request.headers.get('x-api-key');
  const validKey = apiKey && apiKey === (globalThis as Record<string, unknown>).BLOG_API_KEY;

  try {
    const db = rawDb();
    let rows: Record<string, unknown>[];

    if (status === 'all' && validKey) {
      // Admin: return every post regardless of status
      rows = (await db.prepare(
        'SELECT * FROM blog_posts ORDER BY publish_date DESC'
      ).all()).results as Record<string, unknown>[];
    } else {
      // Public: only published posts
      rows = (await db.prepare(
        "SELECT * FROM blog_posts WHERE status = 'published' ORDER BY publish_date DESC"
      ).all()).results as Record<string, unknown>[];
    }

    const posts = rows.map(parseBlogRow);
    return Response.json({ posts }, {
      headers: { 'Cache-Control': 'public, max-age=60, stale-while-revalidate=300' },
    });
  } catch {
    return Response.json({ error: 'Could not load blog posts.' }, { status: 503 });
  }
}

// POST /api/blog — create a new blog post (requires x-api-key header)
export async function POST(request: Request) {
  if (!allowedOrigin(request)) {
    return Response.json({ error: 'Request origin is not allowed.' }, { status: 403 });
  }

  const apiKey = request.headers.get('x-api-key');
  if (!apiKey || apiKey !== (globalThis as Record<string, unknown>).BLOG_API_KEY) {
    return Response.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await smallJson(request);
  } catch {
    return Response.json({ error: 'Invalid or oversized payload.' }, { status: 400 });
  }

  const {
    slug, title, excerpt, body: postBody, heroImage = '', ogImage = '',
    author = 'Pathwisse Team', authorBio = '', category, tags = [],
    publishDate, modifiedDate, status = 'draft', featured = false,
    seoTitle, metaDescription, canonical = '', audience = 'all',
    relatedCareers = [], relatedSkills = [], relatedProducts = [],
    relatedGuides = [], ctaType = 'demo', ctaUrl = '/contact',
    faq = [], references = [],
  } = body;

  if (!slug || !title || !excerpt || !postBody || !category || !publishDate || !modifiedDate || !seoTitle || !metaDescription) {
    return Response.json({ error: 'Missing required fields: slug, title, excerpt, body, category, publishDate, modifiedDate, seoTitle, metaDescription.' }, { status: 400 });
  }

  try {
    const db = rawDb();
    await db.prepare(
      `INSERT INTO blog_posts (slug,title,excerpt,body,hero_image,og_image,author,author_bio,category,tags,
        publish_date,modified_date,status,featured,seo_title,meta_description,canonical,audience,
        related_careers,related_skills,related_products,related_guides,cta_type,cta_url,faq,references)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
       ON CONFLICT(slug) DO NOTHING`
    ).bind(
      slug, title, excerpt, postBody, heroImage, ogImage, author, authorBio, category,
      JSON.stringify(tags), publishDate, modifiedDate, status,
      featured ? 1 : 0, seoTitle, metaDescription, canonical, audience,
      JSON.stringify(relatedCareers), JSON.stringify(relatedSkills),
      JSON.stringify(relatedProducts), JSON.stringify(relatedGuides),
      ctaType, ctaUrl, JSON.stringify(faq), JSON.stringify(references)
    ).run();

    return Response.json({ ok: true, slug }, { status: 201, headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return Response.json({ error: 'Could not save the blog post.' }, { status: 503 });
  }
}

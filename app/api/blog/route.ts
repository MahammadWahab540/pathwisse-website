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

// GET /api/blog — list blog posts
export async function GET(request: Request) {
  const url = new URL(request.url);
  const status = url.searchParams.get('status');

  try {
    const db = rawDb();
    let rows: Record<string, unknown>[];

    if (status === 'all') {
      rows = (await db.prepare(
        'SELECT * FROM blog_posts ORDER BY publish_date DESC, created_at DESC'
      ).all()).results as Record<string, unknown>[];
    } else {
      rows = (await db.prepare(
        "SELECT * FROM blog_posts WHERE status = 'published' ORDER BY publish_date DESC, created_at DESC"
      ).all()).results as Record<string, unknown>[];
    }

    const posts = rows.map(parseBlogRow);
    return Response.json({ posts }, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch {
    return Response.json({ error: 'Could not load blog posts.' }, { status: 503 });
  }
}

// POST /api/blog — create a new blog post
export async function POST(request: Request) {
  if (!allowedOrigin(request)) {
    return Response.json({ error: 'Request origin is not allowed.' }, { status: 403 });
  }

  let body: Record<string, unknown>;
  try {
    body = await smallJson(request);
  } catch {
    return Response.json({ error: 'Invalid or oversized payload.' }, { status: 400 });
  }

  const {
    slug, title, excerpt, body: postBody, heroImage = '', ogImage = '',
    author = 'Pathwisse Editorial Team', authorBio = '', category = 'Career Direction', tags = [],
    publishDate = new Date().toISOString().slice(0, 10),
    modifiedDate = new Date().toISOString().slice(0, 10),
    status = 'published', featured = false,
    seoTitle, metaDescription, canonical = '', audience = 'students',
    relatedCareers = [], relatedSkills = [], relatedProducts = [],
    relatedGuides = [], ctaType = 'career_voice', ctaUrl = 'https://careervoice.pathwisse.com',
    faq = [], references = [],
  } = body;

  const resolvedSeoTitle = (seoTitle as string) || (title as string);
  const resolvedMetaDesc = (metaDescription as string) || (excerpt as string);

  if (!slug || !title || !excerpt || !postBody || !category) {
    return Response.json({ error: 'Missing required fields: slug, title, excerpt, body, category.' }, { status: 400 });
  }

  try {
    const db = rawDb();
    await db.prepare(
      `INSERT INTO blog_posts (slug,title,excerpt,body,hero_image,og_image,author,author_bio,category,tags,
        publish_date,modified_date,status,featured,seo_title,meta_description,canonical,audience,
        related_careers,related_skills,related_products,related_guides,cta_type,cta_url,faq,references)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
       ON CONFLICT(slug) DO UPDATE SET
        title = excluded.title,
        excerpt = excluded.excerpt,
        body = excluded.body,
        hero_image = excluded.hero_image,
        og_image = excluded.og_image,
        author = excluded.author,
        author_bio = excluded.author_bio,
        category = excluded.category,
        tags = excluded.tags,
        publish_date = excluded.publish_date,
        modified_date = excluded.modified_date,
        status = excluded.status,
        featured = excluded.featured,
        seo_title = excluded.seo_title,
        meta_description = excluded.meta_description,
        canonical = excluded.canonical,
        audience = excluded.audience,
        related_careers = excluded.related_careers,
        related_skills = excluded.related_skills,
        related_products = excluded.related_products,
        related_guides = excluded.related_guides,
        cta_type = excluded.cta_type,
        cta_url = excluded.cta_url,
        faq = excluded.faq,
        references = excluded.references,
        updated_at = CURRENT_TIMESTAMP`
    ).bind(
      slug, title, excerpt, postBody, heroImage, ogImage, author, authorBio, category,
      JSON.stringify(tags), publishDate, modifiedDate, status,
      featured ? 1 : 0, resolvedSeoTitle, resolvedMetaDesc, canonical, audience,
      JSON.stringify(relatedCareers), JSON.stringify(relatedSkills),
      JSON.stringify(relatedProducts), JSON.stringify(relatedGuides),
      ctaType, ctaUrl, JSON.stringify(faq), JSON.stringify(references)
    ).run();

    return Response.json({ ok: true, slug }, { status: 201, headers: { 'Cache-Control': 'no-store' } });
  } catch (e) {
    console.error('Error inserting blog post:', e);
    return Response.json({ error: 'Could not save the blog post.' }, { status: 503 });
  }
}

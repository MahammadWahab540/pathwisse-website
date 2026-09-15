import { rawDb, allowedOrigin, smallJson } from '../../../../db/raw';

type Props = { params: Promise<{ slug: string }> };

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

function isAuthorized(request: Request) {
  const apiKey = request.headers.get('x-api-key');
  return apiKey && apiKey === (globalThis as Record<string, unknown>).BLOG_API_KEY;
}

// GET /api/blog/:slug — fetch a single blog post (published posts are public)
export async function GET(_request: Request, { params }: Props) {
  const { slug } = await params;
  try {
    const db = rawDb();
    const row = await db.prepare(
      "SELECT * FROM blog_posts WHERE slug = ? AND status = 'published'"
    ).bind(slug).first<Record<string, unknown>>();

    if (!row) return Response.json({ error: 'Post not found.' }, { status: 404 });

    return Response.json({ post: parseBlogRow(row) }, {
      headers: { 'Cache-Control': 'public, max-age=300, stale-while-revalidate=600' },
    });
  } catch {
    return Response.json({ error: 'Could not load the post.' }, { status: 503 });
  }
}

// PUT /api/blog/:slug — update an existing post (requires API key)
export async function PUT(request: Request, { params }: Props) {
  if (!allowedOrigin(request)) {
    return Response.json({ error: 'Request origin is not allowed.' }, { status: 403 });
  }
  if (!isAuthorized(request)) {
    return Response.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const { slug } = await params;
  let body: Record<string, unknown>;
  try {
    body = await smallJson(request);
  } catch {
    return Response.json({ error: 'Invalid or oversized payload.' }, { status: 400 });
  }

  const fields: string[] = [];
  const values: unknown[] = [];

  const allowed: Record<string, string> = {
    title: 'title', excerpt: 'excerpt', body: 'body',
    heroImage: 'hero_image', ogImage: 'og_image',
    author: 'author', authorBio: 'author_bio', category: 'category',
    publishDate: 'publish_date', modifiedDate: 'modified_date',
    status: 'status', featured: 'featured',
    seoTitle: 'seo_title', metaDescription: 'meta_description',
    canonical: 'canonical', audience: 'audience',
    ctaType: 'cta_type', ctaUrl: 'cta_url',
  };
  const jsonFields: Record<string, string> = {
    tags: 'tags', faq: 'faq', references: 'references',
    relatedCareers: 'related_careers', relatedSkills: 'related_skills',
    relatedProducts: 'related_products', relatedGuides: 'related_guides',
  };

  for (const [jsKey, colName] of Object.entries(allowed)) {
    if (jsKey in body) {
      fields.push(`\`${colName}\` = ?`);
      values.push(jsKey === 'featured' ? (body[jsKey] ? 1 : 0) : body[jsKey]);
    }
  }
  for (const [jsKey, colName] of Object.entries(jsonFields)) {
    if (jsKey in body) {
      fields.push(`\`${colName}\` = ?`);
      values.push(JSON.stringify(body[jsKey]));
    }
  }

  if (fields.length === 0) {
    return Response.json({ error: 'No valid fields to update.' }, { status: 400 });
  }

  fields.push('`updated_at` = CURRENT_TIMESTAMP');
  values.push(slug);

  try {
    const db = rawDb();
    const existing = await db.prepare('SELECT slug FROM blog_posts WHERE slug = ?').bind(slug).first();
    if (!existing) return Response.json({ error: 'Post not found.' }, { status: 404 });

    await db.prepare(`UPDATE blog_posts SET ${fields.join(', ')} WHERE slug = ?`).bind(...values).run();
    return Response.json({ ok: true, slug }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return Response.json({ error: 'Could not update the post.' }, { status: 503 });
  }
}

// DELETE /api/blog/:slug — delete a post (requires API key)
export async function DELETE(request: Request, { params }: Props) {
  if (!isAuthorized(request)) {
    return Response.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const { slug } = await params;
  try {
    const db = rawDb();
    const existing = await db.prepare('SELECT slug FROM blog_posts WHERE slug = ?').bind(slug).first();
    if (!existing) return Response.json({ error: 'Post not found.' }, { status: 404 });

    await db.prepare('DELETE FROM blog_posts WHERE slug = ?').bind(slug).run();
    return Response.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return Response.json({ error: 'Could not delete the post.' }, { status: 503 });
  }
}

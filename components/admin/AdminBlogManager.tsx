'use client';

import { useState, useEffect } from 'react';
import { 
  FileText, Plus, Check, AlertCircle, ArrowUpRight, 
  Trash2, RefreshCw, Eye, Edit3, Sparkles 
} from 'lucide-react';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  audience: string;
  status: 'published' | 'draft';
  featured: number | boolean;
  author: string;
  publish_date?: string;
  publishDate?: string;
  cta_type?: string;
  ctaType?: string;
  cta_url?: string;
  ctaUrl?: string;
}

export function AdminBlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [slug, setSlug] = useState('');
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('Career Direction');
  const [audience, setAudience] = useState('students');
  const [author, setAuthor] = useState('Pathwisse Editorial Team');
  const [status, setStatus] = useState<'published' | 'draft'>('published');
  const [featured, setFeatured] = useState(false);
  const [ctaType, setCtaType] = useState('career_voice');
  const [ctaUrl, setCtaUrl] = useState('https://careervoice.pathwisse.com');

  async function loadPosts() {
    setLoading(true);
    try {
      const res = await fetch('/api/blog?status=all');
      if (res.ok) {
        const data = (await res.json()) as { posts: BlogPost[] };
        setPosts(data.posts || []);
      }
    } catch {
      setMessage({ text: 'Failed to load posts from database.', type: 'error' });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  function resetForm() {
    setSlug('');
    setTitle('');
    setExcerpt('');
    setBody('');
    setCategory('Career Direction');
    setAudience('students');
    setAuthor('Pathwisse Editorial Team');
    setStatus('published');
    setFeatured(false);
    setCtaType('career_voice');
    setCtaUrl('https://careervoice.pathwisse.com');
    setIsEditing(false);
  }

  function handleEdit(p: BlogPost) {
    setSlug(p.slug);
    setTitle(p.title);
    setExcerpt(p.excerpt);
    setBody(p.body);
    setCategory(p.category);
    setAudience(p.audience || 'students');
    setAuthor(p.author || 'Pathwisse Editorial Team');
    setStatus(p.status);
    setFeatured(Boolean(p.featured));
    setCtaType(p.ctaType || p.cta_type || 'career_voice');
    setCtaUrl(p.ctaUrl || p.cta_url || 'https://careervoice.pathwisse.com');
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function generateSlug(val: string) {
    return val
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const payload = {
      slug: slug.trim(),
      title: title.trim(),
      excerpt: excerpt.trim(),
      body: body.trim(),
      category,
      audience,
      author,
      status,
      featured: featured ? 1 : 0,
      publishDate: new Date().toISOString().slice(0, 10),
      modifiedDate: new Date().toISOString().slice(0, 10),
      ctaType,
      ctaUrl,
      seoTitle: `${title.trim()} | Pathwisse`,
      metaDescription: excerpt.trim(),
    };

    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json() as { error?: string };
        throw new Error(err.error || 'Failed to save post');
      }

      setMessage({
        text: `Post "${title}" saved successfully! It is now live in Cloudflare D1.`,
        type: 'success',
      });
      resetForm();
      await loadPosts();
    } catch (err: unknown) {
      setMessage({
        text: err instanceof Error ? err.message : 'Error saving blog post',
        type: 'error',
      });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(targetSlug: string) {
    if (!confirm(`Are you sure you want to delete post "${targetSlug}"?`)) return;

    try {
      const res = await fetch(`/api/blog/${targetSlug}`, { method: 'DELETE' });
      if (res.ok) {
        setMessage({ text: `Post "${targetSlug}" deleted.`, type: 'success' });
        await loadPosts();
      } else {
        throw new Error('Failed to delete post');
      }
    } catch {
      setMessage({ text: 'Error deleting post from database.', type: 'error' });
    }
  }

  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', color: '#0F172A', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header Banner */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#2563EB', background: '#EFF6FF', padding: '4px 10px', borderRadius: 999, marginBottom: 8 }}>
            <Sparkles size={13} />
            Cloudflare D1 Live Studio
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '4px 0 6px', color: '#0F172A', letterSpacing: '-0.02em' }}>
            Content & Blog Administration
          </h1>
          <p style={{ margin: 0, color: '#64748B', fontSize: '0.98rem' }}>
            Publish and manage editorial guides and role roadmaps stored directly in the Cloudflare D1 database (<code style={{ background: '#E2E8F0', padding: '2px 6px', borderRadius: 4, fontSize: '0.85em' }}>pathwisse-db</code>).
          </p>
        </div>

        <button
          onClick={loadPosts}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#fff', border: '1px solid #CBD5E1', padding: '9px 16px', borderRadius: 8, fontSize: '0.88rem', fontWeight: 600, color: '#334155', cursor: 'pointer', transition: 'all 0.15s ease' }}
        >
          <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          Refresh D1
        </button>
      </div>

      {message && (
        <div style={{
          padding: '12px 18px',
          borderRadius: 8,
          marginBottom: 24,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: message.type === 'success' ? '#F0FDF4' : '#FEF2F2',
          border: `1px solid ${message.type === 'success' ? '#86EFAC' : '#FECACA'}`,
          color: message.type === 'success' ? '#166534' : '#991B1B',
          fontWeight: 500,
          fontSize: '0.95rem'
        }}>
          {message.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Editor & List Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 28, alignItems: 'start' }}>
        
        {/* Editor Form */}
        <section style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 16, padding: '28px', boxShadow: '0 4px 16px -4px rgba(15, 23, 42, 0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
              {isEditing ? <Edit3 size={19} color="#2563EB" /> : <Plus size={19} color="#2563EB" />}
              {isEditing ? 'Edit Blog Article' : 'Compose New Article'}
            </h2>
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                style={{ background: 'transparent', border: 'none', color: '#64748B', fontSize: '0.82rem', textDecoration: 'underline', cursor: 'pointer' }}
              >
                Cancel editing
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            
            <div>
              <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                Article Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (!isEditing) setSlug(generateSlug(e.target.value));
                }}
                placeholder="e.g. How to Build Verified Proof as an AI Engineer in 2026"
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: '0.95rem', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                  URL Slug * (auto-generated)
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(generateSlug(e.target.value))}
                  placeholder="ai-engineer-career-proof-2026"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none', fontFamily: 'monospace' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none', background: '#fff' }}
                >
                  <option value="Career Direction">Career Direction</option>
                  <option value="Placement Readiness">Placement Readiness</option>
                  <option value="Enterprise Capability">Enterprise Capability</option>
                  <option value="Skill Guides">Skill Guides</option>
                  <option value="Role Comparison">Role Comparison</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                Excerpt / Meta Description * (Summary shown in card and search results)
              </label>
              <textarea
                required
                rows={2}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A concise summary of what the learner or reader will discover..."
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none', resize: 'vertical' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                Full Article Content * (Markdown / Structured Text)
              </label>
              <textarea
                required
                rows={9}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write your article body here. Markdown paragraphs, bullet points, and code samples are supported..."
                style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: '0.92rem', outline: 'none', resize: 'vertical', lineHeight: '1.6' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                  Target Audience
                </label>
                <select
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: '0.88rem', background: '#fff' }}
                >
                  <option value="students">Students / Learners</option>
                  <option value="colleges">Colleges / Placement</option>
                  <option value="enterprise">Enterprise / Teams</option>
                  <option value="all">All Audiences</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                  Publish Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'published' | 'draft')}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: '0.88rem', background: '#fff' }}
                >
                  <option value="published">Live / Published</option>
                  <option value="draft">Draft (Hidden)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                  Author
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                />
              </div>
            </div>

            {/* In-article CTA Configuration */}
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 10, padding: '14px', marginTop: 4 }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
                Call-To-Action Destination
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#64748B', marginBottom: 4 }}>CTA Type</label>
                  <select
                    value={ctaType}
                    onChange={(e) => setCtaType(e.target.value)}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: '0.85rem', background: '#fff' }}
                  >
                    <option value="career_voice">Career Voice Button</option>
                    <option value="demo">Demo / Contact Request</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#64748B', marginBottom: 4 }}>CTA URL</label>
                  <input
                    type="text"
                    value={ctaUrl}
                    onChange={(e) => setCtaUrl(e.target.value)}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
              <input
                type="checkbox"
                id="featuredCheck"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                style={{ width: 17, height: 17, accentColor: '#2563EB', cursor: 'pointer' }}
              />
              <label htmlFor="featuredCheck" style={{ fontSize: '0.9rem', fontWeight: 500, color: '#334155', cursor: 'pointer' }}>
                Highlight as Featured Spotlight on Blog Home
              </label>
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
              <button
                type="submit"
                disabled={saving}
                style={{
                  flex: 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  background: '#2563EB',
                  color: '#fff',
                  border: 'none',
                  padding: '12px 20px',
                  borderRadius: 8,
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  cursor: saving ? 'not-allowed' : 'pointer',
                  opacity: saving ? 0.7 : 1,
                  boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)',
                }}
              >
                {saving ? 'Writing to D1 Database...' : isEditing ? 'Update Post in Cloudflare D1' : 'Publish Article to Website'}
              </button>
            </div>
          </form>
        </section>

        {/* Live Articles In Database */}
        <section style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 16, padding: '24px', boxShadow: '0 4px 16px -4px rgba(15, 23, 42, 0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h2 style={{ fontSize: '1.18rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
              <FileText size={18} color="#2563EB" />
              Live Posts in Database ({posts.length})
            </h2>
            <span style={{ fontSize: '0.78rem', color: '#64748B', background: '#F1F5F9', padding: '3px 8px', borderRadius: 6 }}>
              D1 Table: blog_posts
            </span>
          </div>

          {loading ? (
            <div style={{ padding: '36px 0', textAlign: 'center', color: '#64748B' }}>
              <RefreshCw size={24} className="animate-spin" style={{ margin: '0 auto 8px', display: 'block' }} />
              Connecting to Cloudflare D1...
            </div>
          ) : posts.length === 0 ? (
            <div style={{ padding: '36px 0', textAlign: 'center', color: '#94A3B8' }}>
              No posts found. Use the editor on the left to write your first post!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {posts.map((p) => (
                <div
                  key={p.slug}
                  style={{
                    border: '1px solid #E2E8F0',
                    borderRadius: 10,
                    padding: '14px',
                    background: p.status === 'published' ? '#FAFAFA' : '#FFFBEB',
                    transition: 'border-color 0.2s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                        <span style={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          color: p.status === 'published' ? '#166534' : '#B45309',
                          background: p.status === 'published' ? '#DCFCE7' : '#FEF3C7',
                          padding: '2px 6px',
                          borderRadius: 4,
                        }}>
                          {p.status}
                        </span>
                        {p.featured ? (
                          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#1E40AF', background: '#DBEAFE', padding: '2px 6px', borderRadius: 4 }}>
                            Featured
                          </span>
                        ) : null}
                        <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                          {p.category}
                        </span>
                      </div>
                      <h3 style={{ fontSize: '0.98rem', fontWeight: 700, margin: '0 0 4px', color: '#0F172A', lineHeight: 1.35 }}>
                        {p.title}
                      </h3>
                      <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748B', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {p.excerpt}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, paddingTop: 10, borderTop: '1px solid #F1F5F9' }}>
                    <span style={{ fontSize: '0.76rem', color: '#94A3B8', fontFamily: 'monospace' }}>
                      /resources/blog/{p.slug}
                    </span>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      {p.status === 'published' && (
                        <a
                          href={`/resources/blog/${p.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          title="View live post on site"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: 3, padding: '4px 8px', borderRadius: 6, background: '#F1F5F9', color: '#2563EB', fontSize: '0.78rem', textDecoration: 'none', fontWeight: 600 }}
                        >
                          <Eye size={12} /> View <ArrowUpRight size={11} />
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => handleEdit(p)}
                        title="Edit post"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 3, padding: '4px 8px', borderRadius: 6, background: '#F1F5F9', border: 'none', color: '#334155', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600 }}
                      >
                        <Edit3 size={12} /> Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(p.slug)}
                        title="Delete from database"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 3, padding: '4px 8px', borderRadius: 6, background: '#FEE2E2', border: 'none', color: '#DC2626', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600 }}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}

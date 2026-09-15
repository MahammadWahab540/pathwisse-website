/**
 * Seed script: migrates the 3 existing hardcoded blog posts into the D1 database.
 *
 * Usage (run against your local D1 or remote):
 *   npx wrangler d1 execute DB --local --file=scripts/seed-blog.sql
 *
 * Or generate the SQL below and paste it into the Cloudflare D1 dashboard.
 */

const CAREER_VOICE_URL = process.env.CAREER_VOICE_URL || 'https://careervoice.pathwisse.com';

const posts = [
  {
    slug: 'choose-career-path',
    title: 'How to choose a career path when everything feels open',
    excerpt: 'A practical guide for turning uncertainty into a first useful direction.',
    category: 'Career Direction',
    audience: 'students',
  },
  {
    slug: 'placement-readiness-before-season',
    title: 'What placement readiness should measure before placement season',
    excerpt: 'A placement-team guide to readiness signals, cohort gaps, and timely support.',
    category: 'Placement Readiness',
    audience: 'colleges',
  },
  {
    slug: 'hire-with-evidence-upskill-with-direction',
    title: 'Hire with evidence, upskill with direction',
    excerpt: 'How enterprises can connect hiring signals, workforce gaps, and role-based learning.',
    category: 'Enterprise Capability',
    audience: 'enterprise',
  },
];

const CAREER_VOICE = CAREER_VOICE_URL || 'https://careervoice.pathwisse.com';

const sqls = posts.map((p) => {
  const body = `${p.excerpt} Pathwisse connects the idea to practical skill signals, projects, readiness, and the next useful action.`;
  const tags = JSON.stringify([p.audience, 'readiness']);
  const ctaType = p.audience === 'students' ? 'career_voice' : 'demo';
  const ctaUrl = p.audience === 'students' ? CAREER_VOICE : '/contact';
  const faq = JSON.stringify([['How should I use this guide?', 'Use it to choose a next step, then validate progress with practice and project evidence.']]);
  const relatedCareers = JSON.stringify(['data-analyst']);
  const relatedSkills = JSON.stringify(['communication']);
  const relatedProducts = JSON.stringify(['product/career-voice']);
  const relatedGuides = JSON.stringify(['resources/guides']);
  const featured = p.slug === 'choose-career-path' ? 1 : 0;

  return `INSERT OR IGNORE INTO blog_posts (
  slug, title, excerpt, body, author, author_bio, category, tags,
  publish_date, modified_date, status, featured, seo_title, meta_description,
  audience, related_careers, related_skills, related_products, related_guides,
  cta_type, cta_url, faq
) VALUES (
  '${p.slug}',
  '${p.title.replace(/'/g, "''")}',
  '${p.excerpt.replace(/'/g, "''")}',
  '${body.replace(/'/g, "''")}',
  'Pathwisse Team',
  'The Pathwisse team writes about career direction, readiness, and capability evidence.',
  '${p.category}',
  '${tags}',
  '2026-09-14',
  '2026-09-14',
  'published',
  ${featured},
  '${p.title.replace(/'/g, "''")}',
  '${p.excerpt.replace(/'/g, "''")}',
  '${p.audience}',
  '${relatedCareers}',
  '${relatedSkills}',
  '${relatedProducts}',
  '${relatedGuides}',
  '${ctaType}',
  '${ctaUrl}',
  '${faq.replace(/'/g, "''")}'
);`;
});

const sql = sqls.join('\n\n');

// Write to seed file
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, 'seed-blog.sql');
writeFileSync(outPath, sql, 'utf8');

console.log(`\n✅ Seed SQL written to: ${outPath}`);
console.log('\nTo seed your LOCAL D1 database, run:');
console.log('  npx wrangler d1 execute DB --local --file=scripts/seed-blog.sql\n');
console.log('To seed your PRODUCTION D1 database, run:');
console.log('  npx wrangler d1 execute DB --remote --file=scripts/seed-blog.sql\n');
